-- Lite analytics for chart-svg and HTML page requests so the owner can
-- see where their embedded charts (and tenant/repo pages) are being
-- viewed from. Aggregated daily rollups instead of per-event rows keep
-- D1 footprint bounded — one row per (tenant, repo, kind, day, referer,
-- country, ua_class, cached) tuple, incremented in place. No IPs, no
-- raw user-agents.
CREATE TABLE IF NOT EXISTS views_daily (
  tenant_slug   TEXT NOT NULL,
  repo          TEXT NOT NULL DEFAULT '',     -- '' = tenant-scoped (org chart / org page)
  kind          TEXT NOT NULL,                -- 'chart' | 'page'
  day           TEXT NOT NULL,                -- 'YYYY-MM-DD' UTC
  referer_host  TEXT NOT NULL DEFAULT '',     -- '' = direct / no referer
  country       TEXT NOT NULL DEFAULT '',     -- ISO 3166-1 alpha-2 from cf.country, '' if unknown
  ua_class      TEXT NOT NULL DEFAULT 'other',-- 'camo' | 'bot' | 'browser' | 'other'
  cached        INTEGER NOT NULL DEFAULT 0,   -- 1 = 304 served, 0 = body served
  count         INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (tenant_slug, repo, kind, day, referer_host, country, ua_class, cached)
);

CREATE INDEX IF NOT EXISTS idx_views_tenant_day ON views_daily(tenant_slug, day);
