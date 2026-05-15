-- Surface webhook health on the tenant page: did GitHub deliver the
-- initial ping, when did the most recent event arrive, and what kinds of
-- events are flowing in. The events table currently only logged stars,
-- but with `repository` (privatized/publicized) now in scope we want to
-- distinguish them, hence event_type.
ALTER TABLE tenants ADD COLUMN last_ping_at TEXT;     -- ISO-8601 of the most recent successful ping
ALTER TABLE tenants ADD COLUMN last_event_at TEXT;    -- ISO-8601 of the most recent non-ping event

ALTER TABLE events ADD COLUMN event_type TEXT NOT NULL DEFAULT 'star';  -- 'star' | 'repository'

CREATE INDEX IF NOT EXISTS idx_events_tenant_type ON events(tenant_slug, event_type);
