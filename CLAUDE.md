# Claude Code Context

## What this repo is

This is the source for `wavekat.com` — the homepage for the WaveKat ecosystem. It replaces the previous `wavekat.com` (a resume builder) which still exists as a separate private repo (`wavekat`) but is no longer what this domain points to.

## Mission

> Give every small business the voice of a big one.

WaveKat builds open-source, AI-powered solutions. Voice is where we start, but not all we'll do.

## The WaveKat ecosystem

All repos live under the `wavekat` GitHub org. SSH access uses the `github.com-wavekat` host alias (i.e. `git@github.com-wavekat:wavekat/<repo>.git`).

### Solutions
| Repo | What it does | Status |
|------|-------------|--------|
| `wavekat-voice` | AI phone answering for small businesses (SIP/RTP) | Private, in development |

### Libraries
| Repo | What it does | Brand color |
|------|-------------|-------------|
| `wavekat-core` | Shared audio primitives (`AudioFrame`, sample conversion) | Green `#00e676` |
| `wavekat-vad` | Voice Activity Detection — WebRTC, Silero, TEN-VAD, FireRedVAD | Cyan `#00bcd4` |
| `wavekat-turn` | Turn detection — end-of-utterance for voice pipelines | Purple `#7c4dff` |
| `wavekat-lab` | Interactive dashboard for testing audio backends | Amber `#ffd740` |
| `wavekat-tts` | Text-to-speech synthesis for voice pipelines | Pink `#ff4081` |
| `wavekat-cli` | Command-line client (`wk`) for the WaveKat platform | Blue `#2196f3` |
| `wavekat-sip` | SIP signaling and RTP transport for voice pipelines | Indigo `#3f51b5` |
| `wavekat-asr` | Streaming speech-to-text for voice pipelines | Red `#f44336` |

### Tools
| Name | What it does | URL |
|------|-------------|-----|
| Common Voice Explorer | Browse, filter, and review Mozilla Common Voice dataset clips | `commonvoice-explorer.wavekat.com` |

### Other
| Repo | What it does |
|------|-------------|
| `wavekat-brand` | All brand assets — banners, wordmarks, logos, icons, SVG sources |

## Release

This repo uses **release-please**. Since GitHub squash-merges use the PR title as the commit message, the PR title must have a conventional prefix or release-please will silently ignore the commit.

- `feat:` / `fix:` → patch bump (pre-1.0, per `bump-patch-for-minor-pre-major`)
- `feat!:` / `fix!:` → minor bump (pre-1.0)

## Tech decisions

- **Framework**: Astro (static output) — chosen for speed, simplicity, GitHub Pages / Cloudflare Pages compatibility
- **Styles**: Tailwind CSS
- **Deployment**: Cloudflare Pages (consistent with rest of org)
- **Domain**: `wavekat.com` — DNS to be pointed at Cloudflare Pages once site is ready

## SEO & GEO — every new page must be both

This site is optimized for classic search (SEO) **and** generative answer engines (GEO — being quoted by ChatGPT, Perplexity, Google AI Overviews, Claude). The two overlap but aren't identical: SEO wants crawlable, well-described, linkable pages; GEO wants self-contained, factual, extractable passages an LLM can lift verbatim. Build for both on every page.

### What's already wired (don't reinvent it)

- **`Base.astro` is the SEO baseline** (established in #81, `feat(seo)`). It emits the canonical URL, `<meta name="description">`, the `robots` directive (with a `noindex` prop to opt a page out of indexing), the full Open Graph + Twitter card set, light/dark `theme-color`, and the sitewide `Organization` + `WebSite` JSON-LD graph (`@id`s `https://wavekat.com/#organization` and `#website`). It also takes `ogType` / `article` props so child layouts can emit article semantics. Every layout (`Voice`, `Post`, `Docs`) wraps `Base`, so every page gets this for free.
- **Sitemap + robots are automatic.** `@astrojs/sitemap` generates `sitemap-index.xml` at build from the `site` in `astro.config.mjs`; `public/robots.txt` allows all crawlers (including AI crawlers — keep it open for GEO) and points at the sitemap. A new page under `src/pages/` is in the sitemap with zero extra work.
- **`og.png`** is generated 1200×630 from the brand SVG by `make sync`. Pages share it unless they pass their own `ogImage`.

### Rules for every new page

1. **Always pass a real `title` and `description`** to the layout — they drive `<title>`, the meta description, OG/Twitter, and (in `Base`) the canonical. Description: one sentence, ~150–160 chars, leads with the concrete value, names the product. Never ship the layout default.
2. **Add page-type JSON-LD** as a `<script type="application/ld+json" set:html={JSON.stringify(...)} />` at the end of the page. Pick the type that fits and reference the org by `@id` (`{ '@id': 'https://wavekat.com/#organization' }`) rather than re-declaring it:
   - Product/app page → `SoftwareApplication` (see `voice/index.astro`).
   - Any page with a Q&A section → `FAQPage` built from the same array you render, so the on-page text and the schema never drift.
   - Comparison / detail pages reached through a hierarchy → `BreadcrumbList`.
   - Hub/listing pages → `ItemList` of the child URLs.
   - Blog posts → `BlogPosting` (handled by `Post.astro`).
3. **Trailing-slash, absolute internal URLs** (`/voice/alternatives/linphone/`). The sub-nav active-state and the build both assume them.
4. **One `<h1>` per page**, then a descriptive `<h2>` per section. Headings are ranking *and* extraction signals — write them as the thing the section answers, not as labels.

### GEO: write so an LLM can quote you

- **Lead with a self-contained answer.** The first sentence under a heading should stand alone if lifted out of context — name the subject, state the fact. Don't make the reader (or the model) assemble the answer from three paragraphs.
- **Q&A blocks earn their keep twice** — they render as a human FAQ *and* feed `FAQPage` schema *and* are the single most-quoted structure in AI answers. Phrase questions the way a user would type them ("Can WaveKat Voice connect to the same SIP provider as Linphone?"), and answer in 1–3 plain sentences.
- **Comparison tables are extractable gold.** Keep cells short, factual, and parallel across rows; models lift table rows almost verbatim into "X vs Y" answers.
- **Be specific and honest.** Concrete specifics (platforms, versions, prices, "records every call automatically") get quoted; vague superlatives get skipped. On comparison pages, name what the competitor is genuinely good at — fair framing reads as a trustworthy source to both readers and models, and avoids the "marketing fluff" discount.
- **Keep entity naming consistent.** Always "WaveKat Voice" (not "the app", "Voice", "WaveKat" interchangeably) so engines bind the facts to one entity. Same for platform claims — match the truth in `voice/index.astro` (Mac and Linux today; Windows when there's demand).
- **Don't target a single platform in copy.** Voice is Mac + Linux today; write "your computer" / "desktop" in body copy and put the platforms in a table row or a "Mac & Linux" qualifier. Titles may still include "Mac" to catch the high-volume "… for Mac" queries, but never *exclude* Linux.

When you add a page that doesn't fit the patterns above, mirror the closest existing one (`voice/alternatives/[slug].astro` is the current best example: clear `<h1>`, self-contained intro, comparison table, fair "what it is", Q&A, and `FAQPage` + `BreadcrumbList` schema).

## Brand assets

Logo SVGs come from `vendor/wavekat-brand` (git submodule — source of truth, never edit here).
`make sync` copies the needed files into `public/logos/` which is gitignored.
`make dev` and `make build` both run sync automatically.

To pull brand updates:
```sh
git submodule update --remote vendor/wavekat-brand
make sync
```

## Current state

- Working branch: `feat/astro-scaffold`
- Phase 1 (scaffold) and Phase 2 (homepage) are complete
- Node ≥ 22 required — use `nvm use 22`, or just use `make` (it handles this)
- Dark/light mode toggle with localStorage + OS preference fallback
- `wavekat-brand` is a git submodule at `vendor/wavekat-brand`

## What to do next

Phase 3 in `docs/01-dev-plan.md`:
- Pull remaining banners/assets from `wavekat-brand` as needed
- Optimise any additional SVGs for web

Phase 4:
- Connect repo to Cloudflare Pages (build command: `make build`, Node version: 22)
- Point `wavekat.com` DNS
