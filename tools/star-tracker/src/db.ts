import type { SamplePoint, Stargazer } from './github';

// -- Users ------------------------------------------------------------------

export type User = {
  id: string;
  github_id: number;
  username: string;
  avatar_url: string | null;
  github_access_token: string | null;
};

export async function upsertUser(
  db: D1Database,
  ghId: number,
  username: string,
  avatarUrl: string | null,
  accessToken: string,
): Promise<User> {
  const now = new Date().toISOString();
  const existing = await db
    .prepare('SELECT id FROM users WHERE github_id = ?')
    .bind(ghId)
    .first<{ id: string }>();

  if (existing) {
    await db
      .prepare(
        `UPDATE users SET username = ?, avatar_url = ?, github_access_token = ?, updated_at = ?
         WHERE id = ?`,
      )
      .bind(username, avatarUrl, accessToken, now, existing.id)
      .run();
    return { id: existing.id, github_id: ghId, username, avatar_url: avatarUrl, github_access_token: accessToken };
  }

  const id = crypto.randomUUID();
  await db
    .prepare(
      `INSERT INTO users (id, github_id, username, avatar_url, github_access_token, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(id, ghId, username, avatarUrl, accessToken, now, now)
    .run();
  return { id, github_id: ghId, username, avatar_url: avatarUrl, github_access_token: accessToken };
}

export async function getUser(db: D1Database, userId: string): Promise<User | null> {
  return (
    (await db
      .prepare('SELECT id, github_id, username, avatar_url, github_access_token FROM users WHERE id = ?')
      .bind(userId)
      .first<User>()) ?? null
  );
}

// -- Tenants ----------------------------------------------------------------

export type Tenant = {
  slug: string;
  owner_user_id: string;
  webhook_secret: string;
  display_name: string | null;
  created_at: string;
};

export async function getTenant(db: D1Database, slug: string): Promise<Tenant | null> {
  return (
    (await db.prepare('SELECT * FROM tenants WHERE slug = ?').bind(slug).first<Tenant>()) ?? null
  );
}

export async function createTenant(
  db: D1Database,
  slug: string,
  ownerUserId: string,
  webhookSecret: string,
  displayName: string,
): Promise<void> {
  await db
    .prepare(
      `INSERT INTO tenants (slug, owner_user_id, webhook_secret, display_name, created_at)
       VALUES (?, ?, ?, ?, ?)`,
    )
    .bind(slug, ownerUserId, webhookSecret, displayName, new Date().toISOString())
    .run();
}

export async function listTenantsByOwner(db: D1Database, ownerUserId: string): Promise<Tenant[]> {
  const { results } = await db
    .prepare('SELECT * FROM tenants WHERE owner_user_id = ? ORDER BY created_at DESC')
    .bind(ownerUserId)
    .all<Tenant>();
  return results ?? [];
}

// -- Repos + stars + events -------------------------------------------------

export type RepoRow = {
  full_name: string;
  sync_mode: 'exact' | 'sampled' | null;
  stargazers_count: number | null;
  last_synced_at: string | null;
};

export async function ensureRepo(db: D1Database, tenant: string, fullName: string): Promise<void> {
  await db
    .prepare(
      `INSERT INTO repos (full_name, tenant_slug, first_seen_at)
       VALUES (?, ?, ?)
       ON CONFLICT(full_name) DO NOTHING`,
    )
    .bind(fullName, tenant, new Date().toISOString())
    .run();
}

export async function getRepo(db: D1Database, fullName: string): Promise<RepoRow | null> {
  return (
    (await db
      .prepare('SELECT full_name, sync_mode, stargazers_count, last_synced_at FROM repos WHERE full_name = ?')
      .bind(fullName)
      .first<RepoRow>()) ?? null
  );
}

export async function setRepoSyncMode(
  db: D1Database,
  fullName: string,
  mode: 'exact' | 'sampled',
  stargazersCount: number,
): Promise<void> {
  await db
    .prepare(
      `UPDATE repos SET sync_mode = ?, stargazers_count = ?, last_synced_at = ? WHERE full_name = ?`,
    )
    .bind(mode, stargazersCount, new Date().toISOString(), fullName)
    .run();
}

export async function recordEvent(
  db: D1Database,
  tenant: string,
  repo: string,
  action: 'created' | 'deleted',
  user: { id: number; login: string } | null,
  starredAt: string | null,
): Promise<void> {
  await db
    .prepare(
      `INSERT INTO events (tenant_slug, repo, action, user_login, user_id, starred_at, received_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(tenant, repo, action, user?.login ?? null, user?.id ?? null, starredAt, new Date().toISOString())
    .run();
}

export async function applyStar(
  db: D1Database,
  tenant: string,
  repo: string,
  user: { id: number; login: string },
  starredAt: string,
): Promise<void> {
  await db
    .prepare(
      `INSERT INTO stars (tenant_slug, repo, user_id, user_login, starred_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(repo, user_id) DO UPDATE
       SET starred_at = excluded.starred_at, user_login = excluded.user_login`,
    )
    .bind(tenant, repo, user.id, user.login, starredAt)
    .run();
}

export async function removeStar(db: D1Database, repo: string, userId: number): Promise<void> {
  await db.prepare('DELETE FROM stars WHERE repo = ? AND user_id = ?').bind(repo, userId).run();
}

// Exact backfill: wipes per-user rows for the repo and replaces them.
// Caller is responsible for setRepoSyncMode('exact', ...) afterwards.
export async function replaceStargazers(
  db: D1Database,
  tenant: string,
  repo: string,
  stargazers: Stargazer[],
): Promise<void> {
  const stmts: D1PreparedStatement[] = [];
  // Clear both tables — switching exact/sampled is allowed, so wipe the
  // sample side too in case this repo used to be sampled.
  stmts.push(db.prepare('DELETE FROM stars WHERE repo = ?').bind(repo));
  stmts.push(db.prepare('DELETE FROM samples WHERE repo = ?').bind(repo));
  for (const s of stargazers) {
    stmts.push(
      db
        .prepare(
          `INSERT INTO stars (tenant_slug, repo, user_id, user_login, starred_at) VALUES (?, ?, ?, ?, ?)`,
        )
        .bind(tenant, repo, s.user_id, s.user_login, s.starred_at),
    );
  }
  await db.batch(stmts);
}

// Sampled backfill: wipes both tables and writes the curve points to samples.
// Caller is responsible for setRepoSyncMode('sampled', ...) afterwards.
export async function replaceSamples(
  db: D1Database,
  repo: string,
  points: SamplePoint[],
): Promise<void> {
  const stmts: D1PreparedStatement[] = [];
  stmts.push(db.prepare('DELETE FROM stars WHERE repo = ?').bind(repo));
  stmts.push(db.prepare('DELETE FROM samples WHERE repo = ?').bind(repo));
  // Dedupe by starred_at (multiple samples can share a timestamp at second
  // resolution); keep the higher cumulative which is the more recent index.
  const byTs = new Map<string, number>();
  for (const p of points) {
    const prev = byTs.get(p.starred_at);
    if (prev === undefined || p.cumulative > prev) byTs.set(p.starred_at, p.cumulative);
  }
  for (const [starredAt, cumulative] of byTs) {
    stmts.push(
      db
        .prepare(`INSERT INTO samples (repo, starred_at, cumulative) VALUES (?, ?, ?)`)
        .bind(repo, starredAt, cumulative),
    );
  }
  await db.batch(stmts);
}

// Live webhook update for a sampled repo: append a new (timestamp,
// cumulative ± 1) point so the curve continues past backfill time.
export async function appendSampleDelta(
  db: D1Database,
  repo: string,
  starredAt: string,
  delta: 1 | -1,
): Promise<void> {
  const row = await db
    .prepare('SELECT cumulative FROM samples WHERE repo = ? ORDER BY starred_at DESC LIMIT 1')
    .bind(repo)
    .first<{ cumulative: number }>();
  const prev = row?.cumulative ?? 0;
  const next = Math.max(0, prev + delta);
  await db
    .prepare(
      `INSERT INTO samples (repo, starred_at, cumulative) VALUES (?, ?, ?)
       ON CONFLICT(repo, starred_at) DO UPDATE SET cumulative = excluded.cumulative`,
    )
    .bind(repo, starredAt, next)
    .run();
}

export type TimelinePoint = { t: number; total: number };

// Merges per-repo series (exact = stars table, sampled = samples table)
// into a single tenant-wide cumulative curve. For each event we update the
// emitting repo's "latest total" and emit the new sum across all repos.
export async function tenantTimeline(db: D1Database, tenant: string): Promise<TimelinePoint[]> {
  const { results: exactRows } = await db
    .prepare(
      `SELECT repo, starred_at FROM stars WHERE tenant_slug = ? ORDER BY repo, starred_at ASC`,
    )
    .bind(tenant)
    .all<{ repo: string; starred_at: string }>();

  const { results: sampledRows } = await db
    .prepare(
      `SELECT s.repo, s.starred_at, s.cumulative
       FROM samples s JOIN repos r ON r.full_name = s.repo
       WHERE r.tenant_slug = ?
       ORDER BY s.repo, s.starred_at ASC`,
    )
    .bind(tenant)
    .all<{ repo: string; starred_at: string; cumulative: number }>();

  type Event = { t: number; repo: string; total: number };
  const events: Event[] = [];

  // Convert exact stars to per-repo cumulative.
  const repoRunning = new Map<string, number>();
  for (const row of exactRows ?? []) {
    const next = (repoRunning.get(row.repo) ?? 0) + 1;
    repoRunning.set(row.repo, next);
    events.push({ t: Date.parse(row.starred_at), repo: row.repo, total: next });
  }

  // Sample rows are already absolute cumulatives.
  for (const row of sampledRows ?? []) {
    events.push({ t: Date.parse(row.starred_at), repo: row.repo, total: row.cumulative });
  }

  events.sort((a, b) => a.t - b.t);

  const latest = new Map<string, number>();
  const out: TimelinePoint[] = [];
  let sum = 0;
  for (const e of events) {
    const prev = latest.get(e.repo) ?? 0;
    sum += e.total - prev;
    latest.set(e.repo, e.total);
    out.push({ t: e.t, total: sum });
  }
  return out;
}

export type RepoSeries = { repo: string; points: TimelinePoint[]; total: number };

// Per-repo cumulative curves for a tenant, sorted by current total desc.
// Same source data as tenantTimeline, but kept separated so callers can
// render N lines (the ?split=N "top repos" chart) instead of merging.
export async function tenantPerRepoTimelines(db: D1Database, tenant: string): Promise<RepoSeries[]> {
  const { results: exactRows } = await db
    .prepare(
      `SELECT repo, starred_at FROM stars WHERE tenant_slug = ? ORDER BY repo, starred_at ASC`,
    )
    .bind(tenant)
    .all<{ repo: string; starred_at: string }>();

  const { results: sampledRows } = await db
    .prepare(
      `SELECT s.repo, s.starred_at, s.cumulative
       FROM samples s JOIN repos r ON r.full_name = s.repo
       WHERE r.tenant_slug = ?
       ORDER BY s.repo, s.starred_at ASC`,
    )
    .bind(tenant)
    .all<{ repo: string; starred_at: string; cumulative: number }>();

  const byRepo = new Map<string, TimelinePoint[]>();

  let curRepo = '';
  let running = 0;
  for (const row of exactRows ?? []) {
    if (row.repo !== curRepo) {
      curRepo = row.repo;
      running = 0;
    }
    running += 1;
    let arr = byRepo.get(row.repo);
    if (!arr) {
      arr = [];
      byRepo.set(row.repo, arr);
    }
    arr.push({ t: Date.parse(row.starred_at), total: running });
  }
  for (const row of sampledRows ?? []) {
    let arr = byRepo.get(row.repo);
    if (!arr) {
      arr = [];
      byRepo.set(row.repo, arr);
    }
    arr.push({ t: Date.parse(row.starred_at), total: row.cumulative });
  }

  const out: RepoSeries[] = [];
  for (const [repo, points] of byRepo) {
    const total = points.length ? points[points.length - 1].total : 0;
    out.push({ repo, points, total });
  }
  out.sort((a, b) => b.total - a.total);
  return out;
}

export async function listTenantRepos(db: D1Database, tenant: string): Promise<RepoRow[]> {
  const { results } = await db
    .prepare(
      `SELECT full_name, sync_mode, stargazers_count, last_synced_at
       FROM repos WHERE tenant_slug = ? ORDER BY full_name`,
    )
    .bind(tenant)
    .all<RepoRow>();
  return results ?? [];
}

export async function listAllTenants(db: D1Database): Promise<Tenant[]> {
  const { results } = await db.prepare('SELECT * FROM tenants').all<Tenant>();
  return results ?? [];
}
