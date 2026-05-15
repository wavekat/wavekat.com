-- Per-repo sync metadata so the chart can distinguish exact rows from
-- sampled curve points, and so backfill can short-circuit on the giants.
ALTER TABLE repos ADD COLUMN sync_mode TEXT;            -- 'exact' | 'sampled' | NULL (not yet synced)
ALTER TABLE repos ADD COLUMN stargazers_count INTEGER;  -- snapshot from GitHub at last sync

-- Sampled curve points for repos too large to enumerate per-user.
-- starred_at is the timestamp of a sampled stargazer; cumulative is the
-- 1-based index of that stargazer in the repo's chronological order (i.e.
-- the page number * per_page + offset, which equals the cumulative star
-- total at that moment in time).
CREATE TABLE IF NOT EXISTS samples (
  repo TEXT NOT NULL,
  starred_at TEXT NOT NULL,
  cumulative INTEGER NOT NULL,
  PRIMARY KEY (repo, starred_at),
  FOREIGN KEY (repo) REFERENCES repos(full_name)
);

CREATE INDEX IF NOT EXISTS idx_samples_repo ON samples(repo, starred_at);
