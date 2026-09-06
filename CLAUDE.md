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

## CI runs on a shared, org-wide, mixed-arch runner pool

All workflows use `runs-on: [self-hosted, wavekat-ci]`. Two things about that label are easy to get wrong:

**It is a pool, not a machine.** A Linux x86-64 workstation and a Mac mini (running the runners as Docker containers, so they report `Linux`/`ARM64`) both carry it, and a job lands on either non-deterministically. Setup lives in `scripts/setup-gha-runners.sh` (Linux, systemd), `scripts/setup-gha-runners-docker.sh` (Linux, containers) and `scripts/setup-gha-runners-macos.sh` (macOS, Docker Desktop); the full story — including why the Mac runs Linux containers rather than a native macOS runner — is `docs/06-self-hosted-runners.md`.

**It is org-wide, and this repo is not its main consumer.** Seven repos ride on `wavekat-ci` (`wavekat.com`, `wavekat-voice`, `wavekat-platform`, `wavekat-asr`, `wavekat-cli`, `wavekat-lab`, `wavekat-platform-client`). Never change what the label points at — or assume a new host is safe — based on this repo's workflows alone; `wavekat-voice` and `wavekat-asr` build sherpa-onnx/ONNX native code and are the arch-sensitive ones. No shipped artifact is built on `wavekat-ci` (installers use GitHub-hosted runners), so the blast radius of a bad host is red CI, not a bad release.

Since every runner is Ubuntu 24.04, GNU shell is fine — but **arch must never be assumed**. Anything that downloads a prebuilt binary or pins a target triple has to resolve arch at runtime (`uname -m`, `dpkg --print-architecture`), and `npm ci` needs both `linux-x64` and `linux-arm64` optional deps in `package-lock.json`, so never regenerate the lockfile with `--no-optional`.

To pin a job to one host, add the runner's automatic arch label: `runs-on: [self-hosted, wavekat-ci, X64]` or `..., ARM64]`.

## SEO & GEO — every new page must be both

This site is optimized for classic search (SEO) **and** generative answer engines (GEO — being quoted by ChatGPT, Perplexity, Google AI Overviews, Claude). The two overlap but aren't identical: SEO wants crawlable, well-described, linkable pages; GEO wants self-contained, factual, extractable passages an LLM can lift verbatim. Build for both on every page.

### Always review with the SEO skills — every page, every post, every language

**Any page or blog post you add or edit — including a translation, including a "small" copy tweak — gets an SEO/GEO review with the `claude-seo` skills before it ships.** This is not optional and not only for new pages: an edited heading, a reworded intro, or a re-translated description all move the signals the rest of this section is about.

- Start with **`claude-seo:seo-content`** (E-E-A-T, heading hierarchy, quotable leads, meta length, internal linking), then add the specialist that matches what changed: **`seo-schema`** for JSON-LD, **`seo-geo`** for AI-answer surfaces, **`seo-technical`** for routes/robots/sitemap, **`seo-hreflang`** when locales or `translatedRoutes` change.
- Finish with `npm run build && npm run check:links && npm run check:meta` (add `SYNC_DOCS=1 WAVEKAT_LOCAL_REPOS=<path>` for link-heavy changes).
- **Length budgets are hard limits, and translations break them constantly.** A `<title>` must be ≤ ~50 chars (`Post.astro`/`Base` append ` — WaveKat`, so the SERP title lands near 60) and a `description` 150–160. In CJK the SERP truncates on pixel width, not characters — budget **≤ 28 chars for a title and ≤ 85 for a description** in `zh`/`zh-Hant`/`ja`/`ko`. A faithful de/es/fr/it translation runs 30–60% longer than its English source, so re-measure every localized `title`/`description` instead of translating the English one verbatim.
- **`npm run check:meta` enforces those budgets — it is a CI gate, not advice.** This rule was written down and every locale of `/voice/prompts/` still shipped over it, along with 41 other pages holding 42% of the site's impressions at ~1.3% CTR. A paragraph is not a check. The script reads `dist/`, so it measures what actually reaches the SERP; run it after a build. Pages whose meta comes from the private sync (`/docs/**`, the changelog frontmatter) are reported as **UPSTREAM** warnings and must be fixed in `wavekat-voice/docs/site/*.md` — editing them here is overwritten by `sync:docs`.
- **Spend title characters on the demand term, never on the brand.** Brand search is ~30 impressions a quarter and already ranks #1; a trailing ` | WaveKat` burns 9 of a 50-char budget to win nothing. Title the page after what people type, not what we call the thing: `/voice/prompts/` sat at position 13 for **"phone system voice prompts"** (246 impressions, 0 clicks) while titled "Free Phone Menu & IVR Voice Generator" — a phrase that appeared nowhere in the title, H1, or body. Put the exact query in the title, the H1, and one FAQ (the FAQ feeds `FAQPage` schema at the same time). In CJK the budget is tight enough that demand-first beats brand-first outright — `Linphone 代替ツール（Mac・Linux）` over `WaveKat Voice——Mac と Linux 向けの…`.
- **Keep the entity term and the demand term apart.** Product nouns (`call flow`, `phone links`) are what the app calls things and must stay consistent everywhere; the words people actually search (`auto attendant`, `click-to-call`, `IVR`) go in titles, descriptions, and a bridging sentence or FAQ that says plainly which is which. Never let the title claim something the FAQ then denies (e.g. don't title a page "IVR" when the page correctly explains it isn't a full IVR).

### What's already wired (don't reinvent it)

- **`Base.astro` is the SEO baseline** (established in #81, `feat(seo)`). It emits the canonical URL, `<meta name="description">`, the `robots` directive (with a `noindex` prop to opt a page out of indexing), the full Open Graph + Twitter card set, light/dark `theme-color`, and the sitewide `Organization` + `WebSite` JSON-LD graph (`@id`s `https://wavekat.com/#organization` and `#website`). It also takes `ogType` / `article` props so child layouts can emit article semantics. Every layout (`Voice`, `Post`, `Docs`) wraps `Base`, so every page gets this for free.
- **Sitemap + robots are automatic.** `@astrojs/sitemap` generates `sitemap-index.xml` at build from the `site` in `astro.config.mjs`; `public/robots.txt` allows all crawlers (including AI crawlers — keep it open for GEO) and points at the sitemap. A new page under `src/pages/` is in the sitemap with zero extra work.
- **IndexNow is handled at the Cloudflare layer, not in code.** Cloudflare **Crawler Hints** is enabled (Caching → Configuration → Crawler Hints), which auto-pings IndexNow when content changes — so Bing/Yandex/Naver re-index faster. Bing's index is the retrieval layer behind ChatGPT search & Copilot, so this is a GEO win, not just SEO. Don't re-implement IndexNow (key file + ping endpoint) in the repo; the CF toggle already covers it. (Note: Google does not use IndexNow.)
- **Per-page OG cards are generated at build — don't hand-author one.** Every page under `/blog/**`, `/voice/**` (including `/voice/alternatives/**` and `/voice/providers/**`), in all nine locales, gets its own 1200×630 card carrying that page's `<title>` on the brand ground — 189 today. Nothing registers a page for this: `Base.astro` calls `ogCardFor()` while it renders, which returns the card's URL *and* records what the card should say; the `wavekat-og-cards` integration (`scripts/og-integration.mjs`) drains that manifest in `astro:build:done` and writes the PNGs into `dist/og/**`. Because the card's title *is* the value that went into `<title>`, the two can't drift. **A new page or a whole new locale needs no wiring** — pass a title to a layout and the card appears.
  - **Adding a section to the set** is one entry in `SECTIONS` in `src/lib/og.ts`. `/docs/**` (synced prose whose titles we don't own) and `/about`, `/privacy`, `/brand` are deliberately out, and keep the sitewide `og.png`.
  - **A page can still override** by passing `ogImage` — that suppresses the generated card entirely. Blog posts keep the `ogImage:` frontmatter field for this.
  - **The card renders in `astro dev` too**, served on demand by the same integration once the page has been loaded.
  - Cards are **built, never committed**: they land in `dist/`, so the repo carries no image weight.
  - **`og:image` is the one absolute URL that is *not* pinned to `wavekat.com`.** It has to be absolute (LinkedIn and X won't resolve a relative `og:image`), so on a preview deploy it would otherwise point at production and 404 for any card that only exists on the branch. `src/lib/site.ts` resolves it against `SITE_ASSET_ORIGIN` when set; `preview.yml` sets that to the deploy's own branch-alias URL, which is derivable before the deploy because Cloudflare's normalisation is deterministic (lowercase, non-alphanumerics → `-`, trimmed, truncated to 28 chars — `feat/og-images` → `feat-og-images`). **Canonical, `og:url`, hreflang and the sitemap stay on `wavekat.com` on every deploy** — a preview that canonicalises to itself is a preview that can get indexed. Don't widen the override to those.
- **`og.png`** is still generated 1200×630 from the brand SVG by `make sync`, and remains the fallback for every page outside those sections.
- **OG card typefaces are fetched, not committed.** `make sync` (via `npm run sync:fonts`) downloads Inter 500/700 plus Noto Sans **SC/TC/JP/KR** Bold into gitignored `vendor/fonts/` (~28 MB on disk, cached — a second build is a no-op). resvg rasterises from real font files, so the site's browser webfonts are no use to it. Two rules that are easy to get wrong: the renderer sets `loadSystemFonts: false` on purpose, so a card looks identical on a Mac, on the mixed-arch CI pool and on Cloudflare Pages rather than silently borrowing a host font; and CJK is **per-script, not one pan-CJK fallback**, because Han unification draws 直/骨/令 and hundreds more differently in Simplified, Traditional and Japanese — serving a `ja` page in a Simplified face is a typographic error. The locale→face map is `LOCALE_FONTS` in `scripts/lib/og-fonts.js`.

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
- **Keep entity naming consistent.** Always "WaveKat Voice" (not "the app", "Voice", "WaveKat" interchangeably) so engines bind the facts to one entity. Same for platform claims — match the truth in `voice/index.astro` (**Mac, Windows and Linux**; Windows ships an x64 and an ARM64 installer, is younger than the other two, and isn't code-signed yet).
- **Don't target a single platform in copy.** Voice runs on all three desktops; write "your computer" / "desktop" in body copy and put the platforms in a table row or a "Mac, Windows & Linux" qualifier. Titles may still include "Mac" to catch the high-volume "… for Mac" queries, but never *exclude* the other two.
- **A platform claim is never one sentence.** Promoting a platform means the lead, the meta description, the FAQ answer, *and* the clause after it ("works on both" → "all three") — in all nine locales. Changing only the FAQ leaves the page contradicting itself, and the lead is the passage answer engines quote first. `grep` the whole post, not the section you came for.

When you add a page that doesn't fit the patterns above, mirror the closest existing one (`voice/alternatives/[slug].astro` is the current best example: clear `<h1>`, self-contained intro, comparison table, fair "what it is", Q&A, and `FAQPage` + `BreadcrumbList` schema).

### Reading Search Console — rank is not the metric, CTR is

When a Search Console export lands, don't read it top-down by clicks. Read it for these four shapes, in order — each one is a defect with a different fix:

1. **Good position, zero clicks → snippet defect, not a ranking problem.** A page at position 4–7 with 40 impressions and no clicks is being *shown* and *skipped*. Check the title and description length first (`npm run check:meta`), then whether the title contains the words the query used. This is the highest-yield thing in the file and it is invisible if you sort by clicks.
2. **Same page, worse CTR in English than in translation.** `/blog/phone-menu-ivr-voice-generator/` ran 1.48% at position 6.5 while its `es` twin ran 15.79% at 4.63. Identical content — so the gap is the snippet, not the page.
3. **One query carrying an outsized share of impressions.** Sum the query column before judging anything: a single phrase at position 13 was 15% of all site impressions. Compare the 28-day and 3-month exports — if a query's numbers are *identical* in both, all of it arrived in the last 28 days and it's a new pocket worth chasing, not a plateau.
4. **Two of our own URLs on one intent.** `platform.wavekat.com/voice/prompts` (no canonical, `<title>WaveKat Platform</title>`) split 166 impressions with `wavekat.com/voice/prompts/`. Any indexable page on `platform.wavekat.com` that mirrors a marketing page here needs `<link rel="canonical">` pointing at the wavekat.com twin — fixed in `wavekat-voice/apps/web`, not here.

Also worth knowing: **Bing is the GEO blind spot.** Bing's index is the retrieval layer behind ChatGPT Search and Copilot, and our Bing footprint is a rounding error next to Google's on the same terms. A Google-only read of performance overstates AI-answer visibility — check Bing Webmaster Tools separately before concluding GEO is working.

## Internationalization (i18n)

i18n is **global, URL-driven infrastructure**, not a per-section feature. `src/lib/i18n.ts` is the single source of truth; the layouts and shared chrome read from it automatically. Don't reinvent any of this per page.

### How it works (don't reinvent it)

- **Locale is derived from the URL, never passed as a prop.** Every layout calls `resolveLocale(Astro.url.pathname)` → `{ code, basePath }`. `/zh/voice/` → `code: 'zh-Hans'`, `basePath: '/voice/'`. Because of this, `Base.astro` (hreflang, `<html lang>`, `og:locale`, the suggestion banner), `Header.astro` (localized nav + `LanguageSwitcher`), `Voice.astro` (sub-nav), and `Footer`/`VoiceDownload`/`TalkCTA` are all locale-aware with zero per-page wiring.
- **Two registries drive everything**, both in `src/lib/i18n.ts`:
  - `localeDefs` — each locale's `code` (BCP-47, for hreflang/`<html lang>`), `slug` (URL segment), `label` (endonym for the switcher), `ogLocale`, and optional `hreflangAliases` (region fan-out).
  - `translatedRoutes` — which base paths exist in which non-default locale. This is what makes a page "translated": `hreflang`, the sitemap alternates, and the switcher targets all read from it.
- **hreflang, the switcher, and the sitemap are automatic.** `buildAlternates()` emits the reciprocal set (+ region aliases + `x-default`) only for pages in `translatedRoutes`; untranslated pages get **no** hreflang (so we never claim a translation that doesn't exist) but **still show the switcher** (it falls back to the locale home, never a 404). The sitemap `i18n` map in `astro.config.mjs` mirrors the slug↔code mapping.
- **A "suggest, don't force" banner** (in `Base.astro`) offers the visitor's browser language when this page has it, in the target language, and remembers dismissal in `localStorage`. Never auto-redirect — it breaks SEO/crawling and traps shared-machine users.
- **In-body links are NOT localized automatically.** The chrome localizes itself, but links written *inside* a page (`.astro` body, blog markdown) are taken verbatim — so a hand-written `/voice/download/` in a `/zh/` page leaks the reader back to English. When you write an internal link on a localized page, prefix it with the locale (`/zh/voice/download/`) **if that page is translated**; leave it unprefixed only for default-locale-only targets (e.g. the English-only `/docs/**`). `scripts/check-links.js` (`npm run check:links`, run in CI after the build) guards both failure modes — it fails the build on any broken internal link **and** on any localized page that links to a default-locale URL whose localized twin exists. Run `npm run build && npm run check:links` locally before publishing link-heavy changes (use `SYNC_DOCS=1 WAVEKAT_LOCAL_REPOS=<path>` so the private `/docs/voice/*` get checked too).

### Naming rules (these are deliberate — follow them)

1. **Slug = the shortest *correct* language code.** Use the bare code (`/ja/`, `/es/`, `/fr/`) and add a qualifier *only* when a language ships more than one variant we serve (`/zh/` Simplified vs `/zh-hant/` Traditional). The visible slug stays short; the `code`/hreflang underneath stays standards-correct, so they can differ but never drift.
2. **`jp`/`cn` are *country* codes, not languages.** Japanese is `ja`, not `jp`. Chinese is split by **script** (`zh-Hans`/`zh-Hant`), never by region — Traditional (`zh-Hant`) serves TW/HK/MO, Simplified serves CN/SG, and region targeting is done with `hreflangAliases` (`zh-Hant-TW`, `zh-Hans-SG`, …) pointing at the one script page. Don't create per-country Chinese pages.
3. **`en` is the default locale and stays unprefixed** (`/voice/`), so existing URLs and canonicals are unchanged. `prefixDefaultLocale: false`.

### Adding a translation

1. Create the page under the slug dir, mirroring the English page **section-for-section** (e.g. `src/pages/zh/voice/index.astro` mirrors `voice/index.astro`). Translate the *body* copy in the page; the chrome localizes itself via the shared components.
2. Add the base path to that locale's list in `translatedRoutes`. That one line lights up hreflang, the sitemap, and the switcher.
3. Add the locale's chrome strings. `en` and `zh-Hans` live inline in the `strings` dict in `i18n.ts`; every other locale keeps its `UIStrings` in its own file `src/lib/ui/<slug>.ts` (imported into the dict) so locales can be authored independently without colliding on one file. Keep each locale's `UIStrings` complete — page body copy lives in the page, only shared chrome lives here.
4. Keep localized JSON-LD in sync: set the localized `url` and add `inLanguage` (see `zh/voice/index.astro`).

**Blog posts** are localized via the content collection: English posts live at `src/content/blog/*.md`; translations live under `src/content/blog/<lang>/*.md` with a `lang:` frontmatter field (schema in `content.config.ts`). The default-locale blog routes filter to `data.lang === 'en'`; each `/​<slug>/blog/` route filters to its own language and strips the `<slug>/` id prefix for the URL. Every blog route (listings, per-post pages, RSS) filters through **`blogFilter(lang)` in `src/lib/blog.ts`**, the single place that drops `draft: true` posts — so drafts vanish everywhere at once. Drafts are hidden in normal builds; to preview one locally set `DRAFTS=1` (`make dev-draft` for the dev server, `make build-draft` for a production build). The var is read in Node at build/dev time, never ships to the client, and is unset in CI/Cloudflare so drafts can never leak to production. **Data-driven pages** (e.g. `voice/alternatives/`) keep one template per locale and read locale-keyed datasets via `getAlternatives(locale)` in `voice-alternatives.ts`; `en` and `zh-Hans` are inline there, every other locale's dataset lives in `src/lib/alternatives/<slug>.ts` and is imported (same per-locale-file pattern as the UI strings).

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

### The favicon says which environment you're on

Every environment is a **separate build** of a static site, so the favicon is
tinted at sync time rather than swapped by runtime JS: `scripts/lib/deploy-env.js`
resolves `dev` / `preview` / `prod` from vars the pipeline already sets
(`SITE_ASSET_ORIGIN` → preview, set only by `preview.yml`; `CF_PAGES_BRANCH` →
prod on `main` and preview otherwise; anything else → dev), and
`scripts/sync-brand.js` fills the icon's rounded square accordingly — **amber
`#f59e0b` for dev, purple `#a855f7` for preview, the mark's own black for
production**. The W stays white throughout.

Three things about this are deliberate:

- **The asset changes, not the markup.** `Base.astro`, the manifest and the
  `<link rel="icon">` set are untouched, so the tint reaches Safari and Windows
  (which ignore SVG favicons entirely) via the PNG/ICO fallbacks too. Production
  output is byte-identical to what it was before the tint existed — verify with
  `WK_DEPLOY_ENV=prod npm run sync` and a hash of `public/favicon*`.
- **The hues match wavekat-platform's env badges** (`apps/web/src/lib/env.ts`),
  so amber means dev and purple means preview across the ecosystem. What tells
  the two sites apart in a crowded tab bar is the *glyph* — a W here, an emoji
  (🛠 / 🧪) there. Keep it that way: don't give wavekat.com its own hues.
- **A local `npm run build` is a `dev` build**, not a counterfeit production one,
  and its favicon says so. Reproduce any environment with
  `WK_DEPLOY_ENV=preview npm run sync`.

Only the *icon* pair is tinted (`wavekat-icon-{light,dark}.svg`), and it is used
for nothing but the favicon — the visible header and footer wordmarks are the
`tight` pair, so no rendered page changes colour. If `vendor/wavekat-brand` ever
restructures the icon, the tint step **throws** rather than silently shipping
production's black favicon to every preview.

## Product screenshots

Real, localized app screenshots from wavekat-voice's screenshot pipeline (its
`docs/41` — `make screenshots` then `make screenshots-frames`) live in a
**shared, scene-keyed namespace**: `public/screenshots/<scene>/<code>.webp`. One
file per (scene, language) that *any* page can reference — `in-call` is one
asset, not a copy per post. **The guiding rule: a screenshot earns its place
only where it makes a page's point** — don't add one (or sync a scene) just
because the pipeline can make it.

Today the only consumer is the "place calls from the command line" blog post,
which embeds three, each illustrating the section it sits under: `in-call`
("what it actually does"), `settings-automation` ("there's nothing to install" —
the enable toggle + Install-CLI button), and `settings-automation-agents`
("connect an AI assistant in one click" — the one-click Connect rows).
`settings-automation*` are scenes added to wavekat-voice for this; the agents one
is the same page scrolled to the assistants section (a scene `scroll` hint, since
it's below the 960×640 fold).

- **Framed, not bare.** These use the pipeline's **Ubuntu/GNOME-framed** output
  (`screenshots/framed/ubuntu/…`), so the window chrome is real, not CSS — the
  app is a desktop app on every platform and the author runs Ubuntu. No
  site-drawn frame.
- **Single theme (light), per language.** A baked-in frame can't follow the
  page's dark/light toggle, so we pick light and keep it consistent — but each
  localized surface shows the app in *its* language (`/screenshots/<scene>/<code>.webp`).
- **Committed, not built.** Nothing here pulls from the private renderer at build
  time, so the chosen shots are committed under `public/screenshots/` as WebP
  (~1.1 MB) and referenced by plain markdown `![alt](/screenshots/…)` with
  translated alt text. Refresh with `make screenshots` (`npm run sync:screenshots`)
  against a local wavekat-voice checkout; `npm run check:screenshots` asserts the
  set is complete. The scene list lives in `scripts/sync-screenshots.js` — keep it
  in sync with the `![](/screenshots/<scene>/…)` refs across the site.

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
