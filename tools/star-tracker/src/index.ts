import { Hono } from 'hono';
import {
  BACKFILL_ALL_REPO_CAP,
  EXACT_THRESHOLD,
  exchangeOAuthCode,
  fetchAuthenticatedUser,
  fetchOrgRole,
  fetchRepoMetadata,
  fetchSampledStargazers,
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
  setFlash,
  setOAuthState,
  takeFlash,
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

// Syncs one repo, choosing exact vs sampled based on stargazers_count.
// Returns the chosen mode + counts so callers can build flash messages.
async function backfillRepo(
  database: D1Database,
  tenantSlug: string,
  fullName: string,
  starsCountHint: number | null,
  token: string | undefined,
): Promise<{ mode: 'exact' | 'sampled'; stargazers_count: number }> {
  await db.ensureRepo(database, tenantSlug, fullName);
  const count = starsCountHint ?? (await fetchRepoMetadata(fullName, token)).stargazers_count;

  if (count <= EXACT_THRESHOLD) {
    const stars = await fetchStargazers(fullName, token);
    await db.replaceStargazers(database, tenantSlug, fullName, stars);
    await db.setRepoSyncMode(database, fullName, 'exact', count);
    return { mode: 'exact', stargazers_count: count };
  }

  const samples = await fetchSampledStargazers(fullName, count, token);
  await db.replaceSamples(database, fullName, samples);
  await db.setRepoSyncMode(database, fullName, 'sampled', count);
  return { mode: 'sampled', stargazers_count: count };
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
  setFlash(c, 'Tenant registered. Install the webhook below to start collecting events.', true);
  return c.redirect(`/${slug}`, 303);
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

  // Live update strategy depends on how the repo was backfilled. Sampled
  // repos don't keep per-user rows — they extend the curve via deltas.
  const repo = await db.getRepo(c.env.DB, fullName);
  if (repo?.sync_mode === 'sampled') {
    const ts = payload.starred_at ?? new Date().toISOString();
    await db.appendSampleDelta(c.env.DB, fullName, ts, payload.action === 'created' ? 1 : -1);
  } else {
    if (payload.action === 'created' && payload.starred_at) {
      await db.applyStar(c.env.DB, slug, fullName, payload.sender, payload.starred_at);
    } else if (payload.action === 'deleted') {
      await db.removeStar(c.env.DB, fullName, payload.sender.id);
    }
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
  const flash = takeFlash(c);
  return c.html(
    pages.tenantDetail(user, tenant, c.env.PUBLIC_URL, repos, timeline.length, flash?.justCreated, flash?.msg),
  );
});

// Max number of per-repo lines we'll render in split mode. Beyond this the
// legend wraps to many rows and lines start crowding each other.
const SPLIT_CAP = 8;

app.get('/:slug/chart.svg', async (c) => {
  const slug = c.req.param('slug').toLowerCase();
  const tenant = await db.getTenant(c.env.DB, slug);
  if (!tenant) return c.text('unknown tenant', 404);

  const repos = await db.listTenantRepos(c.env.DB, slug);
  const hasSampled = repos.some((r) => r.sync_mode === 'sampled');
  const theme = c.req.query('theme') === 'dark' ? 'dark' : 'light';

  const splitRaw = c.req.query('split');
  const splitN = splitRaw ? Math.max(1, Math.min(SPLIT_CAP, parseInt(splitRaw, 10) || 0)) : 1;

  let series: { label: string; points: db.TimelinePoint[] }[];
  let defaultTitle: string;
  if (splitN > 1) {
    const perRepo = await db.tenantPerRepoTimelines(c.env.DB, slug);
    const top = perRepo.slice(0, splitN);
    const rest = perRepo.slice(splitN);
    // Strip the owner prefix — every repo shares it within a tenant.
    series = top.map((r) => ({
      label: r.repo.includes('/') ? r.repo.split('/')[1]! : r.repo,
      points: r.points,
    }));
    // Stack mode: append an "Others" bucket aggregating the remaining
    // repos so top-N + others = tenant total. Skip if there's nothing left.
    if (rest.length > 0) {
      type Ev = { t: number; repo: string; total: number };
      const events: Ev[] = [];
      for (const r of rest) for (const p of r.points) events.push({ t: p.t, repo: r.repo, total: p.total });
      events.sort((a, b) => a.t - b.t);
      const latest = new Map<string, number>();
      const points: db.TimelinePoint[] = [];
      let sum = 0;
      for (const e of events) {
        const prev = latest.get(e.repo) ?? 0;
        sum += e.total - prev;
        latest.set(e.repo, e.total);
        points.push({ t: e.t, total: sum });
      }
      series.push({ label: `others (${rest.length})`, points });
    }
    defaultTitle = `${tenant.display_name ?? slug} · top ${top.length} repos`;
  } else {
    const points = await db.tenantTimeline(c.env.DB, slug);
    series = [{ label: tenant.display_name ?? slug, points }];
    defaultTitle = `${tenant.display_name ?? slug} · stars over time`;
  }

  const title = c.req.query('title') ?? defaultTitle;

  // ETag = hash of inputs that change the rendered output. Latest event
  // timestamp captures "did any star arrive since last render"; theme/split/
  // title cover the URL-level variants. Clients send If-None-Match → 304.
  let latestTs = 0;
  for (const s of series) {
    const last = s.points[s.points.length - 1];
    if (last && last.t > latestTs) latestTs = last.t;
  }
  const etag = `"${theme}.${splitN}.${latestTs}.${djb2(title)}"`;
  if (c.req.header('if-none-match') === etag) {
    return new Response(null, { status: 304, headers: { etag, 'cache-control': 'public, max-age=300' } });
  }

  const svg = renderSVG(series, { title, theme, sampled: hasSampled });

  return new Response(svg, {
    headers: {
      'content-type': 'image/svg+xml; charset=utf-8',
      'cache-control': 'public, max-age=300',
      etag,
    },
  });
});

function djb2(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}

// GET handlers redirect to the tenant page so bookmarks / refreshes of a
// previously-POSTed action URL don't 404.
app.get('/:slug/backfill', (c) => c.redirect(`/${c.req.param('slug').toLowerCase()}`, 303));
app.get('/:slug/backfill-all', (c) => c.redirect(`/${c.req.param('slug').toLowerCase()}`, 303));

app.post('/:slug/backfill', async (c) => {
  const user = requireUser(c);
  if (user instanceof Response) return user;

  const slug = c.req.param('slug').toLowerCase();
  const tenant = await db.getTenant(c.env.DB, slug);
  if (!tenant || tenant.owner_user_id !== user.id) return c.text('not found', 404);

  const form = await c.req.parseBody();
  const repo = String(form.repo ?? '').trim();
  if (!repo.startsWith(`${slug}/`)) {
    setFlash(c, `repo must start with "${slug}/"`);
    return c.redirect(`/${slug}`, 303);
  }

  let flash: string;
  try {
    const result = await backfillRepo(c.env.DB, slug, repo, null, user.github_access_token ?? undefined);
    flash =
      result.mode === 'exact'
        ? `Backfilled ${repo} — ${result.stargazers_count} stars (exact).`
        : `Backfilled ${repo} — ${result.stargazers_count} stars (sampled curve, >${EXACT_THRESHOLD}).`;
  } catch (err) {
    flash = `Backfill failed: ${(err as Error).message}`;
  }

  setFlash(c, flash);
  return c.redirect(`/${slug}`, 303);
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
    // Sort by star count desc and cap. Skipped repos are reported back so
    // the user can manually backfill anything left out.
    const sorted = [...allRepos].sort((a, b) => b.stargazers_count - a.stargazers_count);
    const selected = sorted.slice(0, BACKFILL_ALL_REPO_CAP);
    const skipped = sorted.slice(BACKFILL_ALL_REPO_CAP);

    let exact = 0;
    let sampled = 0;
    let failures = 0;
    for (const r of selected) {
      try {
        const result = await backfillRepo(
          c.env.DB,
          slug,
          r.full_name,
          r.stargazers_count,
          user.github_access_token ?? undefined,
        );
        if (result.mode === 'exact') exact += 1;
        else sampled += 1;
      } catch {
        failures += 1;
      }
    }

    const parts = [`Backfilled ${selected.length} of ${allRepos.length} repos`];
    parts.push(`${exact} exact`);
    parts.push(`${sampled} sampled`);
    if (failures) parts.push(`${failures} failed`);
    if (skipped.length) parts.push(`${skipped.length} skipped (over ${BACKFILL_ALL_REPO_CAP}-repo cap)`);
    flash = `${parts.join(' · ')}.`;
  } catch (err) {
    flash = `Backfill failed: ${(err as Error).message}`;
  }

  setFlash(c, flash);
  return c.redirect(`/${slug}`, 303);
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
        for (const r of repos) {
          try {
            // Re-detect mode each reconcile — a repo that crosses the
            // threshold should flip from exact to sampled (or back).
            await backfillRepo(env.DB, t.slug, r.full_name, null, owner.github_access_token);
          } catch (err) {
            console.error(`reconcile ${r.full_name}: ${(err as Error).message}`);
          }
        }
      }
    })());
  },
};
