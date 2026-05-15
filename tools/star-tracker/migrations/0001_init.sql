-- Users authenticated via GitHub OAuth.
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,                -- UUID we mint
  github_id INTEGER NOT NULL UNIQUE,
  username TEXT NOT NULL,             -- GitHub login at last sign-in
  avatar_url TEXT,
  github_access_token TEXT,           -- last issued OAuth access token (used for ownership checks + backfill)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- One tenant per tracked GitHub org or user login. Tenant slug = the GitHub
-- login that owns the webhook (the first segment of repo full_name).
CREATE TABLE IF NOT EXISTS tenants (
  slug TEXT PRIMARY KEY,              -- e.g. "wavekat"
  owner_user_id TEXT NOT NULL,        -- the user who registered it
  webhook_secret TEXT NOT NULL,
  display_name TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (owner_user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_tenants_owner ON tenants(owner_user_id);

CREATE TABLE IF NOT EXISTS repos (
  full_name TEXT PRIMARY KEY,         -- e.g. "wavekat/wavekat-vad"
  tenant_slug TEXT NOT NULL,
  first_seen_at TEXT NOT NULL,
  last_synced_at TEXT,
  FOREIGN KEY (tenant_slug) REFERENCES tenants(slug)
);

CREATE INDEX IF NOT EXISTS idx_repos_tenant ON repos(tenant_slug);

-- Current stargazer set. One row per (repo, user). Unstars delete the row.
CREATE TABLE IF NOT EXISTS stars (
  tenant_slug TEXT NOT NULL,
  repo TEXT NOT NULL,
  user_id INTEGER NOT NULL,           -- the GitHub user who starred (not us)
  user_login TEXT NOT NULL,
  starred_at TEXT NOT NULL,
  PRIMARY KEY (repo, user_id),
  FOREIGN KEY (repo) REFERENCES repos(full_name)
);

CREATE INDEX IF NOT EXISTS idx_stars_tenant_starred ON stars(tenant_slug, starred_at);

-- Append-only audit log of webhook events.
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_slug TEXT NOT NULL,
  repo TEXT NOT NULL,
  action TEXT NOT NULL,               -- "created" | "deleted"
  user_login TEXT,
  user_id INTEGER,
  starred_at TEXT,
  received_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_events_tenant_received ON events(tenant_slug, received_at);
