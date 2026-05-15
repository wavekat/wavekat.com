import { Hono } from 'hono';
import {
  exchangeOAuthCode,
  fetchAuthenticatedUser,
  fetchOrgRole,
  fetchStargazers,
  listOwnerPublicRepos,
  verifySignature,
} from './github';
import * as db from './db';
import * as pages from './pages';
import { renderSVG } from './chart';
import {
  clearSession,
  issueSession,
  randomToken,
  readSession,
  setOAuthState,
  takeOAuthState,
} from './auth';

export interface Env {
  Bindings: {
    DB: D1Database;
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    JWT_SECRET: string;
    PUBLIC_URL: string;
  };
  Variables: { user: db.User | null };
}

const SLUG_RE = /^[a-z0-9](?:[a-z0-9-]{0,38})$/i;

const app = new Hono<Env>();

// Resolve the current user (if any) from the session cookie on every request.
app.use('*', async (c, next) => {
  const userId = await readSession(c, c.env.JWT_SECRET);
  if (userId) {
    const u = await db.getUser(c.env.DB, userId);
    c.set('user', u);
  } else {
    c.set('user', null);
  }
  await next();
});

function requireUser(c: any): db.User | Response {
  const u = c.get('user') as db.User | null;
  if (!u) return c.redirect('/auth/login');
  return u;
}

// -- Landing ----------------------------------------------------------------

app.get('/', (c) => c.html(pages.landing(c.get('user'))));

// -- OAuth ------------------------------------------------------------------

app.get('/auth/login', (c) => {
  const state = randomToken(16);
  setOAuthState(c, state);
  const redirectUri = `${c.env.PUBLIC_URL}/auth/callback`;
  const params = new URLSearchParams({
    client_id: c.env.GITHUB_CLIENT_ID,
    redirect_uri: redirectUri,
    scope: 'read:org',
    state,
  });
  return c.redirect(`https://github.com/login/oauth/authorize?${params}`);
});

app.get('/auth/callback', async (c) => {
  const code = c.req.query('code');
  const state = c.req.query('state');
  const expected = takeOAuthState(c);
  if (!code || !state || state !== expected) return c.html(pages.error(null, 400, 'OAuth state mismatch.'), 400);

  try {
    const accessToken = await exchangeOAuthCode(
      c.env.GITHUB_CLIENT_ID,
      c.env.GITHUB_CLIENT_SECRET,
      code,
      `${c.env.PUBLIC_URL}/auth/callback`,
    );
    const gh = await fetchAuthenticatedUser(accessToken);
    const user = await db.upsertUser(c.env.DB, gh.id, gh.login, gh.avatar_url, accessToken);
    await issueSession(c, user.id, c.env.JWT_SECRET);
  } catch (err) {
    return c.html(pages.error(null, 500, `OAuth failed: ${(err as Error).message}`), 500);
  }
  return c.redirect('/dashboard');
});

app.post('/auth/logout', (c) => {
  clearSession(c);
  return c.redirect('/');
});

// -- Dashboard --------------------------------------------------------------

app.get('/dashboard', async (c) => {
  const user = requireUser(c);
  if (user instanceof Response) return user;
  const tenants = await db.listTenantsByOwner(c.env.DB, user.id);
  return c.html(pages.dashboard(user, tenants, c.env.PUBLIC_URL));
});

// -- Tenant creation --------------------------------------------------------

app.post('/tenants', async (c) => {
  const user = requireUser(c);
  if (user instanceof Response) return user;

  const form = await c.req.parseBody();
  const slug = String(form.slug ?? '').toLowerCase().trim();
  if (!SLUG_RE.test(slug)) {
    const tenants = await db.listTenantsByOwner(c.env.DB, user.id);
    return c.html(pages.dashboard(user, tenants, c.env.PUBLIC_URL, 'Invalid slug.'), 400);
  }

  if (await db.getTenant(c.env.DB, slug)) {
    const tenants = await db.listTenantsByOwner(c.env.DB, user.id);
    return c.html(pages.dashboard(user, tenants, c.env.PUBLIC_URL, `Slug "${slug}" is already taken.`), 409);
  }

  // Ownership verification.
  let allowed = slug === user.username.toLowerCase();
  if (!allowed && user.github_access_token) {
    try {
      const role = await fetchOrgRole(user.github_access_token, slug);
      allowed = role === 'admin';
    } catch {
      allowed = false;
    }
  }
  if (!allowed) {
    const tenants = await db.listTenantsByOwner(c.env.DB, user.id);
    return c.html(
      pages.dashboard(
        user,
        tenants,
        c.env.PUBLIC_URL,
        `You aren't an admin of "${slug}" on GitHub (or your OAuth grant didn't include read:org). Re-authenticate and grant the requested scope.`,
      ),
      403,
    );
  }

  const secret = randomToken(24);
  await db.createTenant(c.env.DB, slug, user.id, secret, slug);
  const tenant = (await db.getTenant(c.env.DB, slug))!;
  return c.html(pages.tenantDetail(user, tenant, c.env.PUBLIC_URL, [], 0, true));
});

// -- Webhook ----------------------------------------------------------------

app.post('/webhook', async (c) => {
  const eventType = c.req.header('x-github-event');
  const signature = c.req.header('x-hub-signature-256') ?? null;
  const body = await c.req.text();

  if (eventType === 'ping') return c.json({ ok: true, pong: true });
  if (eventType !== 'star') return c.json({ ok: true, ignored: eventType }, 202);

  let payload: {
    action: 'created' | 'deleted';
    starred_at: string | null;
    repository: { full_name: string };
    sender: { id: number; login: string };
  };
  try {
    payload = JSON.parse(body);
  } catch {
    return c.text('invalid json', 400);
  }
  const fullName = payload.repository?.full_name;
  if (!fullName || !payload.sender?.id) return c.text('malformed payload', 400);
  const slug = fullName.split('/')[0]!.toLowerCase();

  const tenant = await db.getTenant(c.env.DB, slug);
  if (!tenant) return c.text('unknown tenant', 404);

  const ok = await verifySignature(body, signature, tenant.webhook_secret);
  if (!ok) return c.text('signature mismatch', 401);

  await db.ensureRepo(c.env.DB, slug, fullName);
  await db.recordEvent(c.env.DB, slug, fullName, payload.action, payload.sender, payload.starred_at);

  if (payload.action === 'created' && payload.starred_at) {
    await db.applyStar(c.env.DB, slug, fullName, payload.sender, payload.starred_at);
  } else if (payload.action === 'deleted') {
    await db.removeStar(c.env.DB, fullName, payload.sender.id);
  }
  return c.json({ ok: true });
});

// -- Tenant page + chart + backfill ----------------------------------------

app.get('/:slug', async (c) => {
  const slug = c.req.param('slug').toLowerCase();
  if (!SLUG_RE.test(slug)) return c.notFound();
  const tenant = await db.getTenant(c.env.DB, slug);
  if (!tenant) return c.notFound();

  const user = c.get('user');
  if (!user || user.id !== tenant.owner_user_id) {
    // Non-owner view: just show the chart embed page.
    return c.redirect(`/${slug}/chart.svg`);
  }

  const repos = await db.listTenantRepos(c.env.DB, slug);
  const timeline = await db.tenantTimeline(c.env.DB, slug);
  return c.html(pages.tenantDetail(user, tenant, c.env.PUBLIC_URL, repos, timeline.length));
});

app.get('/:slug/chart.svg', async (c) => {
  const slug = c.req.param('slug').toLowerCase();
  const tenant = await db.getTenant(c.env.DB, slug);
  if (!tenant) return c.text('unknown tenant', 404);

  const points = await db.tenantTimeline(c.env.DB, slug);
  const theme = c.req.query('theme') === 'dark' ? 'dark' : 'light';
  const title = c.req.query('title') ?? `${tenant.display_name ?? slug} · stars over time`;
  const svg = renderSVG(points, { title, theme });

  return new Response(svg, {
    headers: { 'content-type': 'image/svg+xml; charset=utf-8', 'cache-control': 'public, max-age=60' },
  });
});

app.post('/:slug/backfill', async (c) => {
  const user = requireUser(c);
  if (user instanceof Response) return user;

  const slug = c.req.param('slug').toLowerCase();
  const tenant = await db.getTenant(c.env.DB, slug);
  if (!tenant || tenant.owner_user_id !== user.id) return c.text('not found', 404);

  const form = await c.req.parseBody();
  const repo = String(form.repo ?? '').trim();
  if (!repo.startsWith(`${slug}/`)) {
    const repos = await db.listTenantRepos(c.env.DB, slug);
    const timeline = await db.tenantTimeline(c.env.DB, slug);
    return c.html(
      pages.tenantDetail(user, tenant, c.env.PUBLIC_URL, repos, timeline.length, false, `repo must start with "${slug}/"`),
      400,
    );
  }
  await db.ensureRepo(c.env.DB, slug, repo);
  const stars = await fetchStargazers(repo, user.github_access_token ?? undefined);
  await db.replaceStargazers(c.env.DB, slug, repo, stars);

  const repos = await db.listTenantRepos(c.env.DB, slug);
  const timeline = await db.tenantTimeline(c.env.DB, slug);
  return c.html(pages.tenantDetail(user, tenant, c.env.PUBLIC_URL, repos, timeline.length, false, `Backfilled ${repo} — ${stars.length} stars.`));
});

app.post('/:slug/backfill-all', async (c) => {
  const user = requireUser(c);
  if (user instanceof Response) return user;

  const slug = c.req.param('slug').toLowerCase();
  const tenant = await db.getTenant(c.env.DB, slug);
  if (!tenant || tenant.owner_user_id !== user.id) return c.text('not found', 404);

  let flash: string;
  try {
    const allRepos = await listOwnerPublicRepos(slug, user.github_access_token ?? undefined);
    let total = 0;
    for (const repo of allRepos) {
      await db.ensureRepo(c.env.DB, slug, repo);
      const stars = await fetchStargazers(repo, user.github_access_token ?? undefined);
      await db.replaceStargazers(c.env.DB, slug, repo, stars);
      total += stars.length;
    }
    flash = `Backfilled ${allRepos.length} ${allRepos.length === 1 ? 'repo' : 'repos'} — ${total} stars total.`;
  } catch (err) {
    flash = `Backfill failed: ${(err as Error).message}`;
  }

  const repos = await db.listTenantRepos(c.env.DB, slug);
  const timeline = await db.tenantTimeline(c.env.DB, slug);
  return c.html(pages.tenantDetail(user, tenant, c.env.PUBLIC_URL, repos, timeline.length, false, flash));
});

// -- Scheduled (nightly reconcile) -----------------------------------------

export default {
  fetch: app.fetch,
  async scheduled(_event: ScheduledEvent, env: Env['Bindings'], ctx: ExecutionContext): Promise<void> {
    ctx.waitUntil((async () => {
      const tenants = await db.listAllTenants(env.DB);
      for (const t of tenants) {
        const owner = await db.getUser(env.DB, t.owner_user_id);
        if (!owner?.github_access_token) continue;
        const repos = await db.listTenantRepos(env.DB, t.slug);
        for (const repo of repos) {
          try {
            const stars = await fetchStargazers(repo, owner.github_access_token);
            await db.replaceStargazers(env.DB, t.slug, repo, stars);
          } catch (err) {
            console.error(`reconcile ${repo}: ${(err as Error).message}`);
          }
        }
      }
    })());
  },
};
