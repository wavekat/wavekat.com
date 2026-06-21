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
- **IndexNow is handled at the Cloudflare layer, not in code.** Cloudflare **Crawler Hints** is enabled (Caching → Configuration → Crawler Hints), which auto-pings IndexNow when content changes — so Bing/Yandex/Naver re-index faster. Bing's index is the retrieval layer behind ChatGPT search & Copilot, so this is a GEO win, not just SEO. Don't re-implement IndexNow (key file + ping endpoint) in the repo; the CF toggle already covers it. (Note: Google does not use IndexNow.)
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

## Internationalization (i18n)

i18n is **global, URL-driven infrastructure**, not a per-section feature. `src/lib/i18n.ts` is the single source of truth; the layouts and shared chrome read from it automatically. Don't reinvent any of this per page.

### How it works (don't reinvent it)

- **Locale is derived from the URL, never passed as a prop.** Every layout calls `resolveLocale(Astro.url.pathname)` → `{ code, basePath }`. `/zh/voice/` → `code: 'zh-Hans'`, `basePath: '/voice/'`. Because of this, `Base.astro` (hreflang, `<html lang>`, `og:locale`, the suggestion banner), `Header.astro` (localized nav + `LanguageSwitcher`), `Voice.astro` (sub-nav), and `Footer`/`VoiceDownload`/`TalkCTA` are all locale-aware with zero per-page wiring.
- **Two registries drive everything**, both in `src/lib/i18n.ts`:
  - `localeDefs` — each locale's `code` (BCP-47, for hreflang/`<html lang>`), `slug` (URL segment), `label` (endonym for the switcher), `ogLocale`, and optional `hreflangAliases` (region fan-out).
  - `translatedRoutes` — which base paths exist in which non-default locale. This is what makes a page "translated": `hreflang`, the sitemap alternates, and the switcher targets all read from it.
- **hreflang, the switcher, and the sitemap are automatic.** `buildAlternates()` emits the reciprocal set (+ region aliases + `x-default`) only for pages in `translatedRoutes`; untranslated pages get **no** hreflang (so we never claim a translation that doesn't exist) but **still show the switcher** (it falls back to the locale home, never a 404). The sitemap `i18n` map in `astro.config.mjs` mirrors the slug↔code mapping.
- **A "suggest, don't force" banner** (in `Base.astro`) offers the visitor's browser language when this page has it, in the target language, and remembers dismissal in `localStorage`. Never auto-redirect — it breaks SEO/crawling and traps shared-machine users.

### Naming rules (these are deliberate — follow them)

1. **Slug = the shortest *correct* language code.** Use the bare code (`/ja/`, `/es/`, `/fr/`) and add a qualifier *only* when a language ships more than one variant we serve (`/zh/` Simplified vs `/zh-hant/` Traditional). The visible slug stays short; the `code`/hreflang underneath stays standards-correct, so they can differ but never drift.
2. **`jp`/`cn` are *country* codes, not languages.** Japanese is `ja`, not `jp`. Chinese is split by **script** (`zh-Hans`/`zh-Hant`), never by region — Traditional (`zh-Hant`) serves TW/HK/MO, Simplified serves CN/SG, and region targeting is done with `hreflangAliases` (`zh-Hant-TW`, `zh-Hans-SG`, …) pointing at the one script page. Don't create per-country Chinese pages.
3. **`en` is the default locale and stays unprefixed** (`/voice/`), so existing URLs and canonicals are unchanged. `prefixDefaultLocale: false`.

### Adding a translation

1. Create the page under the slug dir, mirroring the English page **section-for-section** (e.g. `src/pages/zh/voice/index.astro` mirrors `voice/index.astro`). Translate the *body* copy in the page; the chrome localizes itself via the shared components.
2. Add the base path to that locale's list in `translatedRoutes`. That one line lights up hreflang, the sitemap, and the switcher.
3. Add the locale's chrome strings. `en` and `zh-Hans` live inline in the `strings` dict in `i18n.ts`; every other locale keeps its `UIStrings` in its own file `src/lib/ui/<slug>.ts` (imported into the dict) so locales can be authored independently without colliding on one file. Keep each locale's `UIStrings` complete — page body copy lives in the page, only shared chrome lives here.
4. Keep localized JSON-LD in sync: set the localized `url` and add `inLanguage` (see `zh/voice/index.astro`).

**Blog posts** are localized via the content collection: English posts live at `src/content/blog/*.md`; translations live under `src/content/blog/<lang>/*.md` with a `lang:` frontmatter field (schema in `content.config.ts`). The default-locale blog routes filter to `data.lang === 'en'`; each `/​<slug>/blog/` route filters to its own language and strips the `<slug>/` id prefix for the URL. **Data-driven pages** (e.g. `voice/alternatives/`) keep one template per locale and read locale-keyed datasets via `getAlternatives(locale)` in `voice-alternatives.ts`; `en` and `zh-Hans` are inline there, every other locale's dataset lives in `src/lib/alternatives/<slug>.ts` and is imported (same per-locale-file pattern as the UI strings).

To add a whole new language: add its `localeDefs` entry (with `slug` and any `hreflangAliases`), add its base paths to `translatedRoutes`, add its slug↔code to both the `i18n` and `sitemap` maps in `astro.config.mjs`, create `src/lib/ui/<slug>.ts` + `src/lib/alternatives/<slug>.ts`, and create the `src/pages/<slug>/**` page tree + `src/content/blog/<slug>/*.md` posts.

**Nine locales ship, all fully translated** — `en` (default) plus `zh-Hans`, `zh-Hant`, `ja`, `ko`, `de`, `es`, `fr`, `it`, matching the languages the WaveKat Voice app supports. "Fully translated" = the homepage, the entire `voice/*` section (overview, use-cases, download, talk, changelog chrome, alternatives hub + each comparison), and the blog (listing + every post). **Nav-label convention:** the lowercase `voice`/`docs`/`blog` nav is localized per `UIStrings` (`navVoice`/`navDocs`/`navBlog`); the *product* word "voice" becomes the local common noun (语音/語音/音声/보이스/voz/voix/voce/stimme) while the full product name **WaveKat Voice** is never translated anywhere. **Not translatable from this repo** (synced from the private `wavekat-voice` upstream at build, so they must be localized there): `docs/*` and the changelog *body* — `/​<slug>/voice/changelog/` chrome is localized, but its release notes come from the synced markdown.

## Brand assets

Logo SVGs come from `vendor/wavekat-brand` (git submodule — source of truth, never edit here).
`make sync` copies the needed files into `public/logos/` which is gitignored.
`make dev` and `make build` both run sync automatically.

To pull brand updates:
```sh
git submodule update --remote vendor/wavekat-brand
make sync
```

## Product screenshots

Real, localized app screenshots are shown across the site via `<AppScreenshot scene="…" />` (`src/components/AppScreenshot.astro`). Don't reinvent this per page.

- **Source.** Generated by wavekat-voice's screenshot pipeline (its `docs/41`, `make screenshots`) — a matrix of `scene × locale × theme`. Those PNGs are git-ignored build artifacts *there*, and the site builds on Cloudflare Pages without the private renderer, so the curated subset is **committed here** under `src/assets/screenshots/<scene>/<code>-<theme>.webp` (the build's source of truth; Astro re-encodes responsive WebP/AVIF at delivery).
- **Refreshing.** Run `make screenshots` in a local wavekat-voice checkout, then `make screenshots` here (`npm run sync:screenshots`) — `scripts/sync-screenshots.js` copies the curated scenes for all 9 locales × light/dark, downscales to 1366px, and writes WebP (~4.5 MB total). `npm run check:screenshots` asserts the committed set is complete. The committed scene list lives in that script; keep it in sync with the `scene="…"` usages.
- **Locale + theme are automatic.** The component reads the page locale (`resolveLocale`), picks `…/<code>-<theme>.webp` (falling back to `en`), and renders both light and dark variants swapped by the site's `dark:` class — no JS, no per-page wiring. Filenames use the locale `code` (`en`, `zh-Hans`, `zh-Hant`, `ja`, `ko`, `de`, `es`, `fr`, `it`), which is exactly what wavekat-voice writes.
- **Captions/alt** are localized in `src/lib/screenshots.ts` (one entry per scene, all 9 locales, English fallback) — used as `alt` (a11y + GEO) and the optional visible `<figcaption>` (`showCaption`). Pass `priority` for an above-the-fold hero shot.
- **Display UX.** Shots sit inline at a modest size (control width/centering via the `class` prop, e.g. `mx-auto max-w-xl`; keep them narrow so they read as figures, not full-bleed) and are **click-to-zoom** — one delegated handler opens a full-size lightbox in the page's current theme (ESC or click closes). Don't bolt a heavier image library on top.

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
