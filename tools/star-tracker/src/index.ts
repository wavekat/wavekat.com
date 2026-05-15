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
import { renderSVG, renderInviteSVG } from './chart';
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

// Repo segment of /:slug/:repo paths. GitHub repo names allow letters,
// digits, '.', '_', '-' and must not start with '-'. Length cap matches
// GitHub's own (100 chars).
const REPO_RE = /^[A-Za-z0-9_.][A-Za-z0-9_.-]{0,99}$/;

// Recognised values for ?range=. Maps to a span in ms; missing/unknown
// values fall back to "all" (no clipping). Kept short on purpose — every
// option also needs a UI toggle.
const RANGES: Record<string, number> = {
  '7d': 7 * 86400_000,
  '30d': 30 * 86400_000,
  '90d': 90 * 86400_000,
  '6m': 180 * 86400_000,
  '1y': 365 * 86400_000,
};

// Bucket "now" to 5-minute boundaries so identical chart requests within
// a cache window collapse to the same ETag. Matches the cache-control
// max-age=300 used on chart responses.
const NOW_BUCKET_MS = 300_000;
function bucketedNow(): number {
  return Math.floor(Date.now() / NOW_BUCKET_MS) * NOW_BUCKET_MS;
}

// Clip a cumulative series to [rangeStart, ∞). Inserts a synthetic anchor
// at exactly rangeStart with the cumulative value as of that moment, so
// the rendered curve begins at the window's left edge instead of leaving
// a gap. Points before the window contribute only their final cumulative
// to the anchor.
function clipSeriesToRange(points: db.TimelinePoint[], rangeStart: number): db.TimelinePoint[] {
  let anchorTotal = 0;
  let firstIdx = points.length;
  for (let i = 0; i < points.length; i++) {
    if (points[i].t < rangeStart) {
      anchorTotal = points[i].total;
    } else {
      firstIdx = i;
      break;
    }
  }
  const out: db.TimelinePoint[] = [{ t: rangeStart, total: anchorTotal }];
  for (let i = firstIdx; i < points.length; i++) out.push(points[i]);
  return out;
}

function parseRangeMs(raw: string | undefined): number | null {
  if (!raw || raw === 'all') return null;
  return RANGES[raw] ?? null;
}

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
// Private repos return mode 'private' — we ensure the row exists and tag
// privacy so live webhook events can accumulate, but we can't backfill
// historical stargazers without `repo` scope.
async function backfillRepo(
  database: D1Database,
  tenantSlug: string,
  fullName: string,
  hint: { stargazers_count: number; private: boolean } | null,
  token: string | undefined,
): Promise<{ mode: 'exact' | 'sampled' | 'private'; stargazers_count: number }> {
  const meta = hint ?? (await fetchRepoMetadata(fullName, token));
  await db.ensureRepo(database, tenantSlug, fullName);
  await db.setRepoPrivacy(database, fullName, meta.private);

  const count = meta.stargazers_count;
  if (meta.private) {
    return { mode: 'private', stargazers_count: count };
  }

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

  // Pings carry no repo, but they do carry a hub-signature when the user
  // configures a secret. Verify against any tenant whose ping URL we got —
  // we identify it via the hook's URL only, so the simplest robust check
  // is: try every tenant's secret. Cheap because pings are rare and
  // tenants are few. Bump last_ping_at on first match.
  if (eventType === 'ping') {
    const tenants = await db.listAllTenants(c.env.DB);
    for (const t of tenants) {
      if (await verifySignature(body, signature, t.webhook_secret)) {
        await db.bumpTenantPing(c.env.DB, t.slug);
        return c.json({ ok: true, pong: true });
      }
    }
    // Unsigned or unknown — still 200 so GitHub doesn't retry, but don't
    // record health for a tenant we can't identify.
    return c.json({ ok: true, pong: true, identified: false });
  }

  // Acted-on event types: 'star' (drives the chart) and 'repository'
  // (visibility flips so we can hide/reveal repos). Anything else is
  // acknowledged but ignored — GitHub retries on non-2xx.
  if (eventType !== 'star' && eventType !== 'repository') {
    return c.json({ ok: true, ignored: eventType }, 202);
  }

  let payload: any;
  try {
    payload = JSON.parse(body);
  } catch {
    return c.text('invalid json', 400);
  }
  const fullName: string | undefined = payload?.repository?.full_name;
  if (!fullName) return c.text('malformed payload', 400);
  const slug = fullName.split('/')[0]!.toLowerCase();

  const tenant = await db.getTenant(c.env.DB, slug);
  if (!tenant) return c.text('unknown tenant', 404);

  const ok = await verifySignature(body, signature, tenant.webhook_secret);
  if (!ok) return c.text('signature mismatch', 401);

  if (eventType === 'repository') {
    // Only privatized/publicized affect us; created/deleted/renamed/etc.
    // are acknowledged but not acted on. Skip privacy flips for repos we
    // don't already track — there's nothing to reveal or hide.
    const action = payload.action;
    if (action !== 'privatized' && action !== 'publicized') {
      return c.json({ ok: true, ignored_action: action }, 202);
    }
    const existing = await db.getRepo(c.env.DB, fullName);
    if (existing) {
      await db.setRepoPrivacy(c.env.DB, fullName, action === 'privatized');
      await db.recordEvent(c.env.DB, slug, fullName, 'repository', action, payload.sender ?? null, null);
      await db.bumpTenantLastEvent(c.env.DB, slug);
    }
    return c.json({ ok: true });
  }

  // eventType === 'star'
  if (!payload.sender?.id) return c.text('malformed payload', 400);

  await db.ensureRepo(c.env.DB, slug, fullName);
  // Trust the freshest signal we get — the star payload carries the
  // current visibility, so every event keeps our flag in sync even if
  // the user didn't subscribe to the 'repository' event.
  await db.setRepoPrivacy(c.env.DB, fullName, payload.repository?.private === true);
  // GitHub includes the post-action stargazers_count on the repo object,
  // so use it to keep our cached count fresh between nightly reconciles.
  // Without this the "Tracked repos — N stars" line lags behind the live
  // chart by up to a day after a webhook-driven star.
  const liveCount = payload.repository?.stargazers_count;
  if (typeof liveCount === 'number') {
    await db.updateStargazersCount(c.env.DB, fullName, liveCount);
  }
  await db.recordEvent(c.env.DB, slug, fullName, 'star', payload.action, payload.sender, payload.starred_at);
  await db.bumpTenantLastEvent(c.env.DB, slug);

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
  const user = c.get('user');

  // Not tracked yet — render an invite page rather than 404. Anyone can
  // land here from a shared README link, so the copy nudges admins to
  // register and gives non-admins something to forward.
  if (!tenant) {
    return c.html(pages.notTrackedInvite(user, slug, c.env.PUBLIC_URL));
  }

  // Owner view: full controls + status. Public view: chart + light stats.
  const now = Date.now();
  if (user && user.id === tenant.owner_user_id) {
    const repos = await db.listTenantRepos(c.env.DB, slug);
    const timeline = await db.tenantTimeline(c.env.DB, slug);
    const counts = await db.eventCountsByType(c.env.DB, slug);
    const recent = await db.tenantRecentByRepo(c.env.DB, slug, now);
    const flash = takeFlash(c);
    return c.html(
      pages.tenantDetail(user, tenant, c.env.PUBLIC_URL, repos, timeline.length, counts, recent, flash?.justCreated, flash?.msg),
    );
  }

  const repos = await db.listTenantRepos(c.env.DB, slug);
  const timeline = await db.tenantTimeline(c.env.DB, slug);
  const recent = await db.tenantRecentByRepo(c.env.DB, slug, now);
  return c.html(pages.publicOrg(user, tenant, c.env.PUBLIC_URL, repos, timeline.length, recent));
});

// Max number of per-repo lines we'll render in split mode. Beyond this the
// legend wraps to many rows and lines start crowding each other.
const SPLIT_CAP = 8;

app.get('/:slug/chart.svg', async (c) => {
  const slug = c.req.param('slug').toLowerCase();
  const theme = c.req.query('theme') === 'dark' ? 'dark' : 'light';
  const tenant = await db.getTenant(c.env.DB, slug);
  if (!tenant) {
    // Render an inviting placeholder rather than 404, so README embeds
    // for not-yet-tracked orgs become self-explaining ("visit X to
    // register") instead of broken-image icons.
    if (!SLUG_RE.test(slug)) return c.text('invalid slug', 400);
    const svg = renderInviteSVG(slug, theme, `${c.env.PUBLIC_URL}/${slug}`);
    return new Response(svg, {
      headers: {
        'content-type': 'image/svg+xml; charset=utf-8',
        // Short cache: the moment the org gets registered, this should
        // flip to the live chart on next refresh.
        'cache-control': 'public, max-age=60',
      },
    });
  }

  const repos = await db.listTenantRepos(c.env.DB, slug);
  // hasSampled drives the "≈ approximate" footnote. Private repos are
  // excluded from chart series, so they shouldn't trigger the footnote.
  const hasSampled = repos.some((r) => r.sync_mode === 'sampled' && !r.private);

  const splitRaw = c.req.query('split');
  const splitN = splitRaw ? Math.max(1, Math.min(SPLIT_CAP, parseInt(splitRaw, 10) || 0)) : 1;
  const style = c.req.query('style') === 'step' ? 'step' : 'smooth';
  const rangeRaw = c.req.query('range') ?? '';
  const rangeMs = parseRangeMs(rangeRaw);
  const now = bucketedNow();
  const rangeStart = rangeMs ? now - rangeMs : null;

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

  if (rangeStart !== null) {
    series = series.map((s) => ({ label: s.label, points: clipSeriesToRange(s.points, rangeStart) }));
  }

  const title = c.req.query('title') ?? defaultTitle;

  // ETag = hash of inputs that change the rendered output. Latest event
  // timestamp captures "did any star arrive since last render"; latest
  // privacy flip captures "did a repo just get hidden/revealed even
  // though no new star arrived"; the bucketed `now` extends the curve
  // to today and rolls forward in 5-minute steps; theme/split/style/
  // range/title cover the URL-level variants. Clients send If-None-Match → 304.
  let latestTs = 0;
  for (const s of series) {
    const last = s.points[s.points.length - 1];
    if (last && last.t > latestTs) latestTs = last.t;
  }
  const privTs = await db.latestPrivacyChangeMs(c.env.DB, slug);
  const reactiveTs = Math.max(latestTs, privTs);
  const etag = `"${theme}.${splitN}.${style}.${rangeRaw || 'all'}.${reactiveTs}.${now}.${djb2(title)}"`;
  if (c.req.header('if-none-match') === etag) {
    return new Response(null, { status: 304, headers: { etag, 'cache-control': 'public, max-age=300' } });
  }

  const svg = renderSVG(series, {
    title,
    theme,
    sampled: hasSampled,
    style,
    now,
    tMinOverride: rangeStart ?? undefined,
  });

  return new Response(svg, {
    headers: {
      'content-type': 'image/svg+xml; charset=utf-8',
      'cache-control': 'public, max-age=300',
      etag,
    },
  });
});

// Per-repo chart. Same query params as the tenant chart (theme, style,
// range, title) minus `split` — there's nothing to split when there's
// only one repo. Returns 404 for private/untracked/unknown repos.
app.get('/:slug/:repo/chart.svg', async (c) => {
  const slug = c.req.param('slug').toLowerCase();
  const repo = c.req.param('repo');
  const theme = c.req.query('theme') === 'dark' ? 'dark' : 'light';
  if (!SLUG_RE.test(slug) || !REPO_RE.test(repo)) return c.text('invalid', 400);
  const fullName = `${slug}/${repo}`;

  const tenant = await db.getTenant(c.env.DB, slug);
  if (!tenant) return c.text('not found', 404);
  const repoRow = await db.getRepo(c.env.DB, fullName);
  if (!repoRow || repoRow.private) return c.text('not found', 404);

  // tenantPerRepoTimelines already filters out private repos; finding
  // by full_name gives us the cumulative curve for just this one.
  const all = await db.tenantPerRepoTimelines(c.env.DB, slug);
  const found = all.find((r) => r.repo === fullName);
  let points: db.TimelinePoint[] = found?.points ?? [];

  const style = c.req.query('style') === 'step' ? 'step' : 'smooth';
  const rangeRaw = c.req.query('range') ?? '';
  const rangeMs = parseRangeMs(rangeRaw);
  const now = bucketedNow();
  const rangeStart = rangeMs ? now - rangeMs : null;
  if (rangeStart !== null) points = clipSeriesToRange(points, rangeStart);

  const defaultTitle = `${fullName} · stars over time`;
  const title = c.req.query('title') ?? defaultTitle;

  const latestTs = points.length ? points[points.length - 1].t : 0;
  const privTs = await db.latestPrivacyChangeMs(c.env.DB, slug);
  const reactiveTs = Math.max(latestTs, privTs);
  const etag = `"r1.${theme}.${style}.${rangeRaw || 'all'}.${reactiveTs}.${now}.${djb2(title)}"`;
  if (c.req.header('if-none-match') === etag) {
    return new Response(null, { status: 304, headers: { etag, 'cache-control': 'public, max-age=300' } });
  }

  const svg = renderSVG([{ label: repo, points }], {
    title,
    theme,
    sampled: repoRow.sync_mode === 'sampled',
    style,
    now,
    tMinOverride: rangeStart ?? undefined,
  });

  return new Response(svg, {
    headers: {
      'content-type': 'image/svg+xml; charset=utf-8',
      'cache-control': 'public, max-age=300',
      etag,
    },
  });
});

// Per-repo HTML page. Mirrors publicOrg but scoped to a single repo so
// users can deep-link / embed the per-repo chart from a project README.
app.get('/:slug/:repo', async (c) => {
  const slug = c.req.param('slug').toLowerCase();
  const repo = c.req.param('repo');
  if (!SLUG_RE.test(slug) || !REPO_RE.test(repo)) return c.notFound();
  const fullName = `${slug}/${repo}`;
  const tenant = await db.getTenant(c.env.DB, slug);
  if (!tenant) return c.redirect(`/${slug}`, 303);
  const repoRow = await db.getRepo(c.env.DB, fullName);
  if (!repoRow || repoRow.private) return c.redirect(`/${slug}`, 303);

  const all = await db.tenantPerRepoTimelines(c.env.DB, slug);
  const series = all.find((r) => r.repo === fullName);
  const total = series?.total ?? 0;
  const gains = db.recentForSeries(series?.points ?? [], total, Date.now());
  return c.html(pages.repoDetail(c.get('user'), tenant, repoRow, total, gains, c.env.PUBLIC_URL));
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
    if (result.mode === 'private') {
      flash = `${repo} is private — recorded but hidden from the public chart. Star events will still flow in via webhook.`;
    } else if (result.mode === 'exact') {
      flash = `Backfilled ${repo} — ${result.stargazers_count} stars (exact).`;
    } else {
      flash = `Backfilled ${repo} — ${result.stargazers_count} stars (sampled curve, >${EXACT_THRESHOLD}).`;
    }
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
        // listOwnerPublicRepos already filters to public repos, so private=false.
        const result = await backfillRepo(
          c.env.DB,
          slug,
          r.full_name,
          { stargazers_count: r.stargazers_count, private: false },
          user.github_access_token ?? undefined,
        );
        if (result.mode === 'exact') exact += 1;
        else if (result.mode === 'sampled') sampled += 1;
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
