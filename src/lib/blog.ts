import type { CollectionEntry } from 'astro:content';

// Draft posts are hidden from every blog route (listings, per-post pages, RSS)
// in normal builds. To preview them locally, set DRAFTS=1 — `make dev-draft`
// (dev server) or `make build-draft` (production build) do this for you. The
// env var is read at build/dev time in Node, so it never ships to the client
// and production builds (where it's unset) always exclude drafts.
export const showDrafts = process.env.DRAFTS === '1' || process.env.DRAFTS === 'true';

/**
 * Predicate for getCollection('blog', …): keeps posts in `lang`, hiding drafts
 * unless DRAFTS is set. Every blog route filters through this so drafts appear
 * or vanish everywhere at once.
 */
export function blogFilter(lang: string) {
  return ({ data }: CollectionEntry<'blog'>) =>
    (showDrafts || !data.draft) && data.lang === lang;
}
