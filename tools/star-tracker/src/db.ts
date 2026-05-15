import type { Stargazer } from './github';

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

export async function replaceStargazers(
  db: D1Database,
  tenant: string,
  repo: string,
  stargazers: Stargazer[],
): Promise<void> {
  const stmts: D1PreparedStatement[] = [];
  stmts.push(db.prepare('DELETE FROM stars WHERE repo = ?').bind(repo));
  for (const s of stargazers) {
    stmts.push(
      db
        .prepare(
          `INSERT INTO stars (tenant_slug, repo, user_id, user_login, starred_at) VALUES (?, ?, ?, ?, ?)`,
        )
        .bind(tenant, repo, s.user_id, s.user_login, s.starred_at),
    );
  }
  stmts.push(
    db
      .prepare('UPDATE repos SET last_synced_at = ? WHERE full_name = ?')
      .bind(new Date().toISOString(), repo),
  );
  await db.batch(stmts);
}

export type TimelinePoint = { t: number; total: number };

export async function tenantTimeline(db: D1Database, tenant: string): Promise<TimelinePoint[]> {
  const { results } = await db
    .prepare('SELECT starred_at FROM stars WHERE tenant_slug = ? ORDER BY starred_at ASC')
    .bind(tenant)
    .all<{ starred_at: string }>();
  const points: TimelinePoint[] = [];
  let total = 0;
  for (const row of results ?? []) {
    total += 1;
    points.push({ t: Date.parse(row.starred_at), total });
  }
  return points;
}

export async function listTenantRepos(db: D1Database, tenant: string): Promise<string[]> {
  const { results } = await db
    .prepare('SELECT full_name FROM repos WHERE tenant_slug = ? ORDER BY full_name')
    .bind(tenant)
    .all<{ full_name: string }>();
  return (results ?? []).map((r) => r.full_name);
}

export async function listAllTenants(db: D1Database): Promise<Tenant[]> {
  const { results } = await db.prepare('SELECT * FROM tenants').all<Tenant>();
  return results ?? [];
}
