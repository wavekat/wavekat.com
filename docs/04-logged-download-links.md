# 04 — Logged download links

Make every WaveKat Voice download go through the logged endpoint, and stop
putting an artifact filename in the page.

## 1. Where this starts

The download buttons already point at the logged link. `voice-download.ts`
reads the electron-builder release feeds from `dl.wavekat.com` at **build
time**, pulls out the installer's filename, version and size, and renders:

```html
<a href="https://platform.wavekat.com/api/voice/download/WaveKat%20Voice-0.0.40-arm64.dmg?src=web">
```

That endpoint (wavekat-platform `docs/37`) records the download and 302s to
R2, so downloads are counted. Three things are still wrong with it:

1. **The link is copyable.** Anyone can lift the `href`, strip the
   `platform.wavekat.com` prefix back to `dl.wavekat.com`, and share a
   direct link. Every download taken through it is a download nobody
   counts, and there is no way to notice that happening.
2. **The page publishes the artifact layout.** `WaveKat Voice-0.0.40-arm64.dmg`
   in a hover tooltip tells a reader the bucket's naming scheme, the arch
   split, and the exact version, for no benefit to them.
3. **The version is frozen at build time.** Publishing a release does not
   change the site. Until someone triggers a rebuild, wavekat.com offers
   the previous installer and prints the previous version number.

## 2. What changes

The button stops being a link. It becomes a `<button>` that navigates to a
**version-less resolver** on the platform, which works out the current
installer server-side, records the download, and redirects.

```
wavekat.com                       platform.wavekat.com                dl.wavekat.com
───────────                       ────────────────────                ──────────────
<button data-dl-platform="mac">
   click
     └─ location.href ──────────► GET /api/voice/download/latest/mac?src=web
                                    read latest-mac.yml from R2
                                    pick the .dmg, classify it
                                    head() → size
                                    record the event
                                    302 ──────────────────────────────► voice/…arm64.dmg
                                                                          the bytes, unchanged
```

Nothing in the delivered HTML resolves to a file. The only download URL a
reader can reach is the resolver itself — which is exactly the URL we want
every download to go through, so copying it is harmless and still counted.

The rendered page keeps printing the version and size (they are content, and
`CLAUDE.md`'s GEO rules ask for concrete specifics), but they now come from
the platform rather than from a YAML parser in this repo.

## 3. Platform — two new routes

Both go in `services/api/src/routes/voiceDownloads.ts`, on a branch off
`origin/main`. The existing `GET /api/voice/download/{key}` stays: the
platform account page links to it and it is already deployed. It simply
stops being what the marketing site points at.

### 3.1 `GET /api/voice/download/latest/{platform}?src=web`

Registered before `/download/{key}`. No path conflict — that route matches a
single segment and this one has two — but ordering it first keeps the
intent obvious.

1. `platform` is `mac` or `linux`. Anything else, Windows included, is a
   404: we do not ship it, and a redirect to a file that isn't there is
   worse than an honest miss.
2. Read the channel feed **through the R2 binding**
   (`DOWNLOADS.get('voice/latest-mac.yml')`), not over HTTP. The bucket is
   already bound; an outbound fetch on the click path would be latency and
   a failure mode bought for nothing.
3. `parseFeed()` gives the version and every `files[].url`. Pick the human
   installer by extension — `dmg` for mac, `deb` for linux. `files[0]` is
   the self-update payload (`.zip` / `.AppImage`); handing that to a person
   is a broken download.
4. `classify()` the chosen key. The row's product, platform, arch, version
   and channel therefore come from the same function that classifies every
   other download. A debug view disagreeing with the logging path about
   what a file is would be the worst possible bug here.
5. `head()` the key — 404 if absent, otherwise the size for the event row.
6. `shouldLog()`, then `waitUntil(recordDownload(...))`. Fire-and-forget:
   a slow or broken D1 loses a row, it never costs someone their download.
7. `302` to `${DOWNLOADS_ORIGIN}/${encodeURI(key)}` with
   `Cache-Control: no-store`. Byte-for-byte the behaviour of the existing
   route — a cached redirect is a download nobody counted.

Feed unreadable at request time → `500`. Guessing at a filename would
redirect someone to a file that may not exist; a retry is better.

### 3.2 `GET /api/voice/releases/latest`

```json
{ "mac":   { "version": "0.0.40", "sizeBytes": 126241228 },
  "linux": { "version": "0.0.40", "sizeBytes": 106304532 } }
```

No filename in the response. That is the point of §1.2, and the site no
longer needs one. Never logs — this answers a page view, not a download.
`Cache-Control: public, s-maxage=300`.

### 3.3 `lib/downloads/latest.ts`

Both routes need "feed → installer key, version, size", so it lives in one
helper with its own tests rather than twice. Pure apart from the two R2
calls it is handed.

### 3.4 CORS — the part that fails silently

`index.ts` installs a global `cors({ origin: APP_URL, credentials: true })`
on `*`. Left alone it stamps the wrong `Access-Control-Allow-Origin` on
`/releases/latest` and the browser drops the response with nothing in any
log we keep.

Fix: register `cors({ origin: '*' })` scoped to `/api/voice/releases/*`
**before** the global middleware, and have the credentialed one skip that
prefix. Public release metadata carries no credentials and the feed it
summarises is already world-readable, so `*` is honest here.

A test asserts the header. This is not a thing to verify by eye.

The resolver needs no CORS at all — it is a top-level navigation.

## 4. Site

### 4.1 `src/lib/voice-download.ts` gets smaller

It stops fetching and regex-parsing `latest-*.yml` and reads
`/api/voice/releases/latest` at build time instead: one source of truth,
and roughly forty lines of YAML matching deleted. The hardcoded fallback
constants stay for builds with no network. `url` becomes
`https://platform.wavekat.com/api/voice/download/latest/{platform}?src=web`.

### 4.2 `src/components/VoiceDownload.astro`

- The primary and dropdown `<a>` become `<button type="button"
  data-dl-platform="mac">`, keeping their classes and `data-conversion`.
- A `<noscript>` block carries plain `<a href>` equivalents pointing at the
  resolver. Invisible to every JS-enabled visitor, so it does not undo any
  of §2 — and it exposes no filename and still logs every hit.
- A click handler sets `location.href` to the resolver.
- One script fetches `/api/voice/releases/latest` on load and updates the
  `[data-dl-version]` / `[data-dl-size]` spans.

### 4.3 `src/components/ConversionTracking.astro`

It binds `a[data-conversion]`. A `<button>` is not an `<a>`, so without a
change here the Google Ads download conversions stop firing and nothing
reports it. The selector drops to `[data-conversion]`.

### 4.4 Pages

`VoiceOverview.astro` holds the meta line for all nine `voice/index.astro`
locales, so one edit covers them. `voice/download.astro` inlines its own
version-and-size line and is edited in all nine locales — mechanical, and
identical in each.

## 5. What this costs

Middle-click, right-click → *Save link as*, and open-in-new-tab stop
working on the download buttons. That is inherent to there being no link,
not something the design can recover, and it was accepted knowingly.

## 6. Failure modes

| When | What happens |
|---|---|
| Feed unreadable at request time | Resolver `500`s. No guessed filename. |
| Client metadata fetch fails | Build-time version and size stay on screen. Nothing visible. |
| Build-time metadata fetch fails | Fallback constants, exactly as today. |
| D1 write fails | Row lost, download unaffected (`waitUntil`). |
| JS disabled | `<noscript>` link, still logged, still no filename. |

**Deploy order matters once.** The site build reads the platform's metadata
endpoint, and the buttons point at the resolver, so the platform change ships
first. A site build that lands ahead of it falls back to the hardcoded
constants and renders buttons that 404 — recoverable by rebuilding, but only
after someone notices.

## 7. Verification

Platform: the resolver picks the `.dmg`/`.deb` and not the update payload;
404 on `windows` and on a missing object; one row recorded carrying the
classified version; `no-store` on the 302; the CORS header on
`/releases/latest`.

Site: `npm run build && npm run check:links && npm run check:meta`.

## 8. Out of scope

Beta and alpha channels — stable only. Windows. Hiding `dl.wavekat.com`
from the address bar after the redirect. Any change to the update feeds the
installed fleet polls: `dl.wavekat.com` stays untouched, which is what
keeps this cheap (wavekat-platform `docs/37` §3.2).
