# 05 — Windows downloads

Offer the Windows installers we already build, pick the right architecture for
the machine asking, and stop telling readers — and answer engines — that
WaveKat Voice is Mac and Linux only.

## 1. Where this starts

We have been building a Windows client on every release for months. It is
packaged, uploaded, and published to an R2 update feed by the same workflow
that ships Mac and Linux, and `wavekat-voice/docs/site/installation.md` walks a
Windows reader through installing it. `wavekat-voice` `docs/54` puts the
resulting state plainly:

> We already pay ~100% of the engineering and CI cost of a Windows client, and
> capture ~0% of the revenue, because the website will not offer a Windows
> visitor the installer we built for them twenty minutes ago.

A Windows visitor to `/voice/download/` is handed a `.dmg`. This doc is that
document's Phase 1a and Phase 4, done together: offer the build, and say we
offer it.

Two things changed recently that make this cheap:

- **The platform already resolves Windows.** `docs/04` moved every download to
  `platform.wavekat.com/api/voice/download/latest/{platform}`, and
  `lib/downloads/latest.ts` shipped with `windows` in `PUBLISHED`
  (`voice/latest.yml`, ext `exe`) and a comment saying which platforms get a
  button is the site's decision. So the API side of the button already works.
- **Windows became two installers.** wavekat-voice `a3bc34c` added a native
  Windows-on-ARM build: one electron-builder run now emits
  `WaveKat Voice Setup <version>-x64.exe` and `…-arm64.exe`, both listed in a
  single `latest.yml`.

That second change is what stops this from being a one-line site edit.

## 2. The architecture problem

`installerFromFeed()` picks the installer by extension:

```ts
const name = files.find((f) => f.toLowerCase().endsWith(suffix));
```

With one `.exe` in the feed that is correct. With two it is whichever
electron-builder happened to list first. An x64 visitor handed `arm64.exe` does
not get a slow download — they get a file Windows refuses to run.

So the resolver has to name an architecture, and something has to decide which
one a given visitor gets. The visitor is never asked: the words "Intel or AMD"
don't appear on the page, because naming the chip in the common path makes a
decision out of something that isn't one.

**The chip is not in the user-agent string, and never will be.** A Windows 11
machine on ARM64 reports `Windows NT 10.0; Win64; x64` — Windows masks the
architecture on purpose so x64 software keeps working. UA sniffing cannot find
it at any length. The only place it is exposed is
`navigator.userAgentData.getHighEntropyValues(['architecture', 'bitness'])`,
which is Chromium-only and returns a promise.

That signal is partial and slow, so it can only be acted on where being wrong
is free — and here it is, in one direction. The two files are not symmetric: an
x64 installer runs on every Windows PC we support (natively on Intel and AMD,
emulated on Windows 11 for ARM) while an arm64 installer runs on almost none of
them. Only one of the two mistakes is fatal, and it isn't the one x64 makes.

So **x64 is the download until something proves otherwise**, and it stays the
download for every browser that can't answer. A machine that answers
`architecture: 'arm', bitness: '64'` is upgraded to the native build a few
milliseconds later — the one case where the safe default is also the wrong one,
and the only case worth a second pass. Windows on ARM is overwhelmingly a
Chromium-browser population (Edge is the default and ships as ARM64), so the
probe reaches close to all of the people it exists for.

Both bitness and architecture are checked: 32-bit ARM Windows exists and cannot
run this installer, so `arm` alone is not enough.

## 3. Platform — targets instead of platforms

`Published` stops meaning "operating system" and starts meaning "a thing you
can download":

```ts
export type Published = 'mac' | 'linux' | 'windows-x64' | 'windows-arm64';

export const PUBLISHED: Record<Published, Target> = {
  mac:             { feedKey: 'voice/latest-mac.yml',   ext: 'dmg' },
  linux:           { feedKey: 'voice/latest-linux.yml', ext: 'deb' },
  'windows-x64':   { feedKey: 'voice/latest.yml',       ext: 'exe', arch: 'x64' },
  'windows-arm64': { feedKey: 'voice/latest.yml',       ext: 'exe', arch: 'arm64' },
};
```

Selection filters on extension **and** architecture, read through `classify()`
— which already parses `-x64` / `-arm64` out of a filename, and is the same
function that dimensions the row the download is logged on. Order in the feed
stops mattering, which is the point.

> **Since 2026-09-01: Linux split the same way.** The snippet above is left as
> it was written, so the shape of the Windows decision stays readable. Linux
> has since become `linux-x64` / `linux-arm64`, and the machinery in this
> document carried it with no new ideas — the `Published` table, the alias
> rule in §3.1, the promotion probe in §2, and the per-row availability flags
> all generalised as they stand.
>
> **One difference is worth knowing**, because it makes Linux *simpler* rather
> than harder: electron-builder appends the architecture to the *channel
> filename* on Linux and nowhere else, so the two Linux targets read separate
> feeds (`latest-linux.yml`, `latest-linux-arm64.yml`) instead of sharing one
> the way both Windows installers share `latest.yml`. So the "order in the
> feed stops mattering" problem this section solves never arises there.

### 3.1 The legacy-feed rule

Every Windows release up to and including 0.0.45 was named
`WaveKat Voice Setup <version>.exe` — no arch token, because
electron-builder's arch suffix is empty for the default arch. `classify()`
reads that as `arch: null`.

`windows-x64` therefore accepts `x64` **or** `null`: an unsuffixed Windows
installer has always meant x64. `windows-arm64` requires an exact match, so it
resolved to nothing until 0.0.46 — the first release built with the new
`artifactName` — published one.

The rule stops being load-bearing for the current feed the moment 0.0.46 is
live, and stays correct for anyone still sitting on 0.0.45.

Without this rule the Windows button 404s on the currently-published feed, and
it would 404 quietly — the failure arrives at the visitor, not at us.

### 3.2 `windows` stays as an alias

`adminVoiceDownloads.ts` builds `latestUrl` from `classify()`'s platform, which
is still `mac | linux | windows`, so the admin artifacts page links at
`/download/latest/windows`. The download route normalises `windows` →
`windows-x64` before resolving. One line, and the alternative is an admin page
that 404s on a link nobody would think to test.

`classify()`'s own `Platform` type is untouched. A download's *platform* is
still `windows`; only the *target you can ask for* is finer-grained.

### 3.3 `no_arch` is a 404, not a 500

A feed listing no installer at all is a half-published release — our
problem, and a `500`. A feed listing installers but not this architecture
is a release that did not build one, which is every Windows feed published
before this change. That is a `404`: the visitor asked for something that
does not exist, not something that broke. Both reasons are surfaced on the
admin artifacts page, which now shows one row per target.

### 3.4 `GET /api/voice/releases/latest`

Emits the four target keys, each with its own size — 0.0.46, the first
two-architecture release, as actually served:

```json
{ "mac":           { "version": "0.0.46", "sizeBytes": 125596265 },
  "linux":         { "version": "0.0.46", "sizeBytes": 106842816 },
  "windows-x64":   { "version": "0.0.46", "sizeBytes":  98710571 },
  "windows-arm64": { "version": "0.0.46", "sizeBytes": 104657605 } }
```

which resolve to:

```
windows-x64    302 → dl.wavekat.com/voice/WaveKat Voice Setup 0.0.46-x64.exe
windows-arm64  302 → dl.wavekat.com/voice/WaveKat Voice Setup 0.0.46-arm64.exe
windows        302 → dl.wavekat.com/voice/WaveKat Voice Setup 0.0.46-x64.exe
```

Per-target rather than per-platform because the two Windows installers differ
in size and the menu prints the size next to each choice. A platform that
cannot be resolved is still nulled rather than failing the response, so an
arm64 entry that does not exist yet costs nothing.

## 4. Site — one button per platform

### 4.1 `src/lib/voice-download.ts`

`PlatformKey` gains both Windows targets, and the two named getters collapse
into `getDownload(key)`. The fallback constants keep one entry per target.

### 4.2 `src/components/VoiceDownload.astro`

Windows joins Mac and Linux as one plain pill that downloads on click —
"Download for Windows", the same shape as the other two, wired to
`windows-x64`:

```
[ ⊞ Download for Windows ]   Other Platforms ▾
  The Windows builds aren't    ┌──────────────────────────────────────────┐
  code-signed yet…             │ Download for Mac                 120 MB │
                               │ Download for Linux               102 MB │
                               │ Download for Windows on ARM EARLY 92 MB │
                               └──────────────────────────────────────────┘
```

Every row in the menu is a download, so every row is worded like one. The ARM
build is the one entry that isn't a platform of its own, but a menu of three
buttons where the third drops the verb reads as an oversight rather than as a
distinction — the requirement line under each label already says which machine
it is for.

Every row is both a candidate primary and a menu row, and the two are exact
opposites — the menu lists precisely what the button isn't downloading. One
`entries` list drives both, keyed on `(platform, archKey)`, so the pair cannot
drift into offering a file twice or not at all. A Windows visitor on Intel sees
the ARM build in the menu; an ARM visitor sees x64 there, for the same reason
in reverse. It is the one choice their primary can't make for them.

Promotion runs in two passes, for the reason in §2:

1. **Platform**, synchronously as the markup is parsed, by plain UA sniffing
   (`/Win(dows|32|64)/` alongside the existing Linux branch). No flash of the
   wrong default.
2. **Chip**, on Windows only, when `navigator.userAgentData` answers `arm` +
   `64`. Re-runs the same `resolve()` with `activeArch = 'arm64'`.

`resolve()` is idempotent and re-entrant by design, which is what makes the
second pass a three-line addition rather than a second code path. It also
falls back per call: if the arch it wants isn't published in the current
release it reverts to `default`, so an ARM visitor is never handed a button
that 404s. Primaries carry `data-dl-avail`, which the release refresh updates
before calling `window.__wkResolveDownload()` — so a target appearing or
vanishing between deploys moves the button too, not just the menu row.

Windows rows carry an **Early** tag, and one line says the builds are not
code-signed so Windows warns on first launch, linking to the SmartScreen
walkthrough (§4.4). It covers **both** Windows builds, so inside the menu it
caps the group at the foot of the panel rather than hanging off one row:
attached to the x64 row it rendered *between* the two Windows entries, reading
as a caveat about x64 alone and cutting the ARM row loose from the group above
it. It appears **twice on purpose**: inside the menu, for
someone choosing Windows from a Mac, and under the button, for the visitor
the promotion script just handed a Windows download — the person about to
meet SmartScreen is exactly the one whose primary says Windows. The
under-button copy toggles with `data-dl-note`, on the same rule as the
version captions.

`<noscript>` carries a plain `<a href>` per target — no filename, still logged.

### 4.2.1 The menu has to be able to leave the box it opens in

The disclosure panel is absolutely positioned and taller than the gap under
the control, so it overflows whatever contains it — and two containers were
set up to stop exactly that:

- The homepage hero and the `/voice/` download card each carried
  `overflow-hidden` to keep a blurred glow inside their bounds. That clipped
  the open menu in half. The clipping moves onto the decoration itself: a
  `pointer-events-none absolute inset-0 overflow-hidden` layer wrapping the
  glow, leaving the section free to overflow.
- On the homepage the section below is a scroll-reveal band, and
  `.reveal-in`'s `transform` makes it a stacking context that paints after
  the hero — so it covered the menu even once the clipping was gone. The
  hero section takes `z-10` (the header is `z-40`, so nothing changes there).

Both were invisible until Windows made the menu two rows and a paragraph
taller. Neither is a Windows bug — Linux was being clipped the same way,
just not far enough down to notice.

### 4.3 Strings and captions

New `UIStrings` in all nine locales: `dlWindows`, `dlArchWindowsX64`,
`dlArchWindowsArm64`, `dlEarly`, `dlWindowsUnsigned`. `VoiceOverview.astro`
carries the version-and-size line for all nine `voice/index.astro`, and
`voice/download.astro` inlines its own in each of the nine — both gain a
`data-dl-meta` line per Windows target, matching the Mac and Linux ones.

### 4.4 The install walkthrough is ours, and translated

The unsigned-build note needs somewhere to send a reader, and
`/docs/voice/installation/` is the wrong somewhere: `/docs/**` is synced from
the private repo and exists only in English, so a Chinese reader clicking
"如何继续安装" would land in English prose.

So `/voice/download/` — which is already translated into all nine locales —
gains an `#windows` section: the SmartScreen box explained in one
self-contained paragraph, three steps to get past it, and which of the two
installers to pick (with where Windows tells you). Step 1 of "Getting set
up" names the `.exe` alongside the `.dmg` and the `.deb`.

The href is built with `localizedPath('/voice/download/', lang)`, so every
locale's menu points at its own page — and on `/voice/download/` itself the
link is a same-page jump. A separate `/voice/install/` page tree was the
alternative; it would have split download intent across two thin pages in
nine languages to hold four paragraphs.

## 5. Promotion — a named list, not a replacement

The site holds roughly 325 "Mac & Linux"-shaped strings. Most are SEO titles
and headings tuned to "… for Mac" demand queries, and `CLAUDE.md` is explicit
that titles may include Mac to catch those as long as they never *exclude*
Linux. Adding a third platform to a title spends characters against a ≤50-char
budget `check:meta` enforces, and dilutes an exact-match query for nothing.

So this changes only the statements that currently deny Windows exists, ×9
locales:

| Surface | What changes |
|---|---|
| `voice/index.astro` platforms FAQ | Names Windows, with its versions and both architectures. |
| `voice/index.astro` "Will you support Windows?" FAQ | Becomes "Does WaveKat Voice run on Windows?" — a question people type, answered yes, with the signing caveat. Feeds `FAQPage` schema from the same array. |
| `voice/index.astro` meta description | "Mac and Linux" → all three. Re-measured per locale against the CJK budgets. |
| `voice-alternatives` platform row | `Mac and Linux today (Windows when there is demand)` → the truth. |
| `voice-alternatives` "pick them if" bullet | Drops Windows from the reasons to pick a competitor; mobile stays. |
| `about.astro`, `privacy.astro` | One sentence each. |
| `/voice/download/` and `/voice/alternatives/` descriptions | They named the platforms and omitted Windows — a SERP snippet telling a Windows searcher to leave. |
| `public/llms.txt` | The site's own AI-answer file (not the automation contract synced from wavekat-voice): the summary line and the download line. |
| Five blog posts' "which platforms?" closer | "Windows is coming when there's demand" in nine locales. A platform answer is the passage an AI answer lifts verbatim, so a dated post still gets a true one. |

Upstream in wavekat-voice, reversing [#251](https://github.com/wavekat/wavekat-voice/pull/251):
`docs/site/index.md`, `installation.md`'s meta description, and `llms.txt`.
These sync into this repo at build, so editing them here is overwritten — and
they are the surfaces that currently tell ChatGPT and Perplexity that WaveKat
Voice does not run on Windows.

Untouched by design: `src/lib/providers/*.ts` and the alternatives SEO titles.

## 6. What this doesn't do

Code signing, `windows-latest` in PR CI, and the clean-VM smoke test — Phases 2
and 3 of wavekat-voice `docs/54`. They are the reasons the **Early** tag is on
the rows and the signing caveat is on the page: this ships distribution, not a
claim that Windows is as proven as macOS. Auto-update and the orphaned-daemon
path have not been exercised on either Windows architecture
(`wavekat-voice/docs/31`).

Also out of scope: a Windows-intent landing page, beta and alpha channels, and
any change to the feeds the installed fleet polls.

## 7. Order

The platform ships **first**. The site reads `/releases/latest` at build time
and its buttons point at the resolver, so a site build that lands ahead of it
falls back to the constants and renders Windows buttons that 404. Then the
wavekat-voice docs change, so `sync:docs` has it. Then the site.

## 8. Failure modes

| When | What happens |
|---|---|
| Feed lists only the unsuffixed `.exe` | `windows-x64` resolves it (§3.1); `windows-arm64` is null and its row is absent. |
| arm64 published, x64 missing | Each target is independent; the x64 row is absent rather than the menu breaking. |
| Browser has no `userAgentData` | x64 stays on the button, as for every non-Windows visitor. |
| Chip probe rejects or reports 32-bit ARM | Same — the promise is caught and x64 holds. |
| ARM machine, release published no arm64 | `resolve()` reverts to `default`; the button is x64, never a 404. |
| Client metadata fetch fails | Build-time version and size stay on screen. |
| Build-time fetch fails | Fallback constants, as today. |
| JS disabled | `<noscript>` links, one per target, still logged. |
| Someone lands on `/download/latest/windows` | Alias resolves x64 (§3.2). |

## 9. Verification

Platform: the resolver picks by arch and not by feed order; the legacy
unsuffixed feed resolves `windows-x64` and nulls `windows-arm64`; the `windows`
alias resolves; `/releases/latest` carries a distinct size per Windows target.

Site: the `claude-seo:seo-content` and `seo-geo` review `CLAUDE.md` requires for
every edited page, then `npm run build && npm run check:links && npm run
check:meta` — the last one re-measured per locale, since a third platform name
lands in descriptions that are already near budget in `zh`, `zh-Hant`, `ja` and
`ko`.
