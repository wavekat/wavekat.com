# Blog & SEO Plan

## Goal

Add a blog to `wavekat.com` for publishing articles about WaveKat's work — voice AI,
open-source libraries, engineering deep-dives, and company updates. The blog is the
primary driver for organic search traffic and establishing domain authority.

---

## Phase B1 — Content Collections & Blog Infrastructure

Use Astro's built-in **Content Collections** (the `src/content/` convention) with
Markdown (`.md`) files. No MDX needed unless we later want interactive components
inside posts.

### Tasks

- [ ] Define a `blog` content collection in `src/content.config.ts`
  - Schema (Zod): `title`, `description`, `date`, `updated?`, `author?`,
    `tags?`, `draft?`, `ogImage?`
- [ ] Create `src/content/blog/` directory for Markdown posts
- [ ] Add a seed post (e.g. "Hello World" or "Why We Built WaveKat") so we can
      develop against real content

### Routing

Astro generates routes from `src/pages/`. We need two new page files:

| Route | File | Purpose |
|-------|------|---------|
| `/blog` | `src/pages/blog/index.astro` | Post listing (newest first) |
| `/blog/<slug>` | `src/pages/blog/[slug].astro` | Individual post page |

`[slug].astro` uses `getStaticPaths()` to generate one page per post at build time.
Drafts (`draft: true`) are excluded from production builds.

### Layout

- [ ] Create `src/layouts/Post.astro` — wraps `Base.astro`, adds:
  - Post title as `<h1>`
  - Date, author, tags
  - `<article>` with Tailwind typography (`@tailwindcss/typography`)
  - Back-to-blog link
  - Open Graph meta overrides (title, description, og:image per post)
- [ ] Install `@tailwindcss/typography` for Markdown prose styling

### Components

- [ ] `src/components/PostCard.astro` — used on the listing page; shows title,
      date, description, tags
- [ ] `src/components/TagList.astro` (optional, can defer) — renders tag links

---

## Phase B2 — SEO Foundations

### Sitemap

- [ ] Install `@astrojs/sitemap`
- [ ] Add to `astro.config.mjs` integrations
- [ ] Verify `sitemap-index.xml` is generated at build time
  - Relies on `site: 'https://wavekat.com'` already set in config

### RSS Feed

- [ ] Install `@astrojs/rss`
- [ ] Create `src/pages/rss.xml.ts` — generates an RSS 2.0 feed from the blog
      collection
- [ ] Add `<link rel="alternate" type="application/rss+xml">` to `Base.astro`
      `<head>`

### robots.txt

- [ ] Add `public/robots.txt`
  ```
  User-agent: *
  Allow: /

  Sitemap: https://wavekat.com/sitemap-index.xml
  ```

### Meta & Structured Data

- [ ] Ensure every blog post sets unique `<title>`, `<meta description>`,
      `og:title`, `og:description`, `og:image`
  - `Base.astro` already supports these via props — `Post.astro` forwards them
- [ ] Add JSON-LD structured data (`Article` schema) to `Post.astro`
  - Includes: headline, datePublished, dateModified, author, publisher, image
- [ ] Add `<link rel="canonical">` to each post (already in `Base.astro` for
      the homepage — extend to work per-page)

---

## Phase B3 — Blog Polish

### Tag Pages (optional, can defer)

- [ ] `src/pages/blog/tag/[tag].astro` — lists posts filtered by tag
- [ ] `getStaticPaths()` generates one page per unique tag

### Pagination (when needed)

- [ ] If post count exceeds ~15, add pagination to the blog index
  - Astro has built-in `paginate()` for this

### Navigation

- [ ] Add a "Blog" link to the homepage header/nav
- [ ] Add a "Blog" link in the footer

### Reading Time

- [ ] Calculate estimated reading time from word count, display on post card and
      post page

### OG Images

- [ ] Auto-generate per-post OG images (title overlaid on a branded template)
  - Can use `@resvg/resvg-js` (already a dependency) or Satori
  - Or: just use the site-wide `og.png` as default and allow manual override
      via frontmatter `ogImage`

---

## Phase B4 — Advanced SEO (Future)

- [ ] Google Search Console verification & monitoring
- [ ] Internal linking strategy (link between related posts)
- [ ] Performance audit (Core Web Vitals — Astro static is already fast)
- [ ] Schema.org `Organization` and `WebSite` structured data on homepage

---

## Dependencies to Add

| Package | Purpose |
|---------|---------|
| `@tailwindcss/typography` | Prose styling for Markdown content |
| `@astrojs/sitemap` | Auto-generated sitemap.xml |
| `@astrojs/rss` | RSS feed generation |

All are official Astro/Tailwind packages with minimal footprint.

---

## File Tree (After B1 + B2)

```
src/
├── content/
│   ├── content.config.ts        # Collection schemas
│   └── blog/
│       └── hello-world.md       # Seed post
├── layouts/
│   ├── Base.astro               # (existing)
│   └── Post.astro               # Blog post layout
├── components/
│   └── PostCard.astro           # Blog listing card
├── pages/
│   ├── index.astro              # (existing)
│   ├── rss.xml.ts               # RSS feed
│   └── blog/
│       ├── index.astro          # Blog listing
│       └── [slug].astro         # Individual post
public/
└── robots.txt                   # Crawl directives + sitemap pointer
```

---

## Notes

- **Static output**: Blog posts are built at deploy time. No server needed.
  Publishing a new post = merge to main → release-please → Cloudflare deploys.
- **Markdown-first**: Write posts in `src/content/blog/*.md` with frontmatter.
  Can upgrade to MDX later if interactive components are needed.
- **SEO is cumulative**: The biggest wins come from consistently publishing
  quality content. The technical SEO (sitemap, structured data, meta tags) just
  makes sure search engines can find and understand it.
