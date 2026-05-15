-- Track repo visibility so we can record events for private repos but
-- exclude them from public chart output. Star events still flow into the
-- DB; the read path filters them out and the chart's ETag listens to
-- `private_changed_at` so a privatized repo disappears from caches
-- immediately, and a publicized one reappears with full history intact.
ALTER TABLE repos ADD COLUMN private INTEGER NOT NULL DEFAULT 0;  -- 0 = public, 1 = private
ALTER TABLE repos ADD COLUMN private_changed_at TEXT;             -- last visibility flip (ISO-8601), folded into chart ETag
