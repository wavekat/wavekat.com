// Which badge file belongs to which locale, shared by the downloader
// (`scripts/sync-badges.js`) and the completeness check it runs with
// `--check`. Kept in `scripts/lib/` rather than `src/lib/` because Astro
// never reads it: the page side needs only a path, and derives that from
// the locale it already has (see `src/lib/badges.ts`).
//
// The three stores each publish the badge as artwork in a fixed set of
// languages, and NO TWO of them agree with our locale codes or with each
// other's:
//
//   ours       Apple      Microsoft   Snap Store
//   ────────   ────────   ─────────   ──────────
//   zh-Hans    zh-cn      zh-cn       —           ← Canonical has none
//   zh-Hant    zh-hk      zh-tw       tw          ← all three disagree
//   ja         ja-jp      ja          jp          ← ditto
//   ko         ko-kr      ko          —           ← Canonical has none
//   en         en-us      en-us       en
//
// So the mapping is a table, not a transformation. `zh-hk` is not a typo
// and not a region choice: Apple's Traditional artwork is filed under Hong
// Kong (its <title> reads `…_CNTC_…`, TC for Traditional Chinese) and
// `zh-tw` 404s on their endpoint, while Microsoft's is the exact reverse.
// Both render the same Traditional glyphs; only the shelf label differs.
//
// Canonical's codes are the country-code trap our own naming rules exist to
// avoid (`ja` not `jp`, script not region) — `jp` IS their Japanese badge and
// `ja` 404s, `tw` IS their Traditional badge and every `zh-*` spelling 404s.
// Their glyphs are outlined paths rather than text, so the artwork needs no
// font and renders identically everywhere.
//
// A `null` is a real answer, not a gap to fill
// -------------------------------------------
// Canonical publishes NO Simplified Chinese and NO Korean badge, under any
// code we could find (`zh`, `zh-CN`, `zh-Hans`, `cn`, `ko`, `ko-KR`, `ko_KR`
// all 404). Those two entries are `null`, `badgeFiles()` skips them, and the
// page side draws our own row there instead — see `hasBadge` in
// src/lib/badges.ts. Substituting the English badge was rejected: untranslated
// artwork on an otherwise fully localized page is worse than no artwork.

/**
 * Our locale code → the code each store files its artwork under, or `null`
 * where that store publishes no badge in that language.
 *
 * Every locale in `localeDefs` must appear here with an entry per store. A
 * missing entry is a page that renders a broken image, which is why
 * `sync-badges.js` iterates THIS table rather than a directory listing.
 */
export const BADGE_LOCALES = [
  { code: 'en', apple: 'en-us', ms: 'en-us', snap: 'en' },
  { code: 'zh-Hans', apple: 'zh-cn', ms: 'zh-cn', snap: null },
  { code: 'zh-Hant', apple: 'zh-hk', ms: 'zh-tw', snap: 'tw' },
  { code: 'ja', apple: 'ja-jp', ms: 'ja', snap: 'jp' },
  { code: 'ko', apple: 'ko-kr', ms: 'ko', snap: null },
  { code: 'de', apple: 'de-de', ms: 'de', snap: 'de' },
  { code: 'es', apple: 'es-es', ms: 'es', snap: 'es' },
  { code: 'fr', apple: 'fr-fr', ms: 'fr', snap: 'fr' },
  { code: 'it', apple: 'it-it', ms: 'it', snap: 'it' },
];

// The two variants, named for the PAGE they sit on rather than for the ink
// they are drawn in — which is the one thing the stores name in mutually
// contradictory ways. Apple calls its dark badge `black` and Canonical calls
// its dark badge `black`; Microsoft calls its dark badge `dark`. All three
// mean "for a light background", and Microsoft's `light` — a LIGHT badge —
// means the opposite of what it looks like it means.
//
// Getting this backwards is invisible in a light-theme dev session and
// renders a white badge on a white page for every dark-theme visitor, so
// the site side never says `black` or `light` — it says `onLight` /
// `onDark` and this table resolves it.
//
// Verified rather than assumed for each store: the `on-light` file paints its
// background `#000` (Apple), `#2D2D2D` (Microsoft) or `#252525` (Canonical),
// and the `on-dark` file paints it `#FFF` in all three.
export const VARIANTS = [
  { name: 'on-light', apple: 'black', ms: 'dark', snap: 'black' },
  { name: 'on-dark', apple: 'white', ms: 'light', snap: 'white' },
];

/** Apple's badge toolbox. Takes a bare locale — a `.svg` suffix 404s. */
export const appleUrl = (variant, locale) =>
  `https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-mac-app-store/${variant}/${locale}`;

/** Microsoft's badge CDN. The space before the variant is real, hence %20. */
export const msUrl = (variant, locale) =>
  `https://get.microsoft.com/images/${locale}%20${variant}.svg`;

/**
 * Canonical's badge, served from snapcraft.io's own static assets.
 *
 * Locale comes FIRST here, unlike the other two — the path is
 * `/badges/<locale>/snap-store-<variant>.svg`. A `.svg` suffix on the locale
 * segment, or a variant without one, 404s.
 */
export const snapUrl = (variant, locale) =>
  `https://snapcraft.io/static/images/badges/${locale}/snap-store-${variant}.svg`;

/**
 * Every file the site expects to exist, as `<store>/<variant>/<code>.svg`.
 *
 * A store whose entry for a locale is `null` contributes no file for it. That
 * is what keeps `--check` honest: it asserts exactly the set that can exist,
 * so it stays a hard build gate instead of being loosened to tolerate the two
 * Snap Store locales Canonical doesn't publish.
 */
export function badgeFiles() {
  const out = [];
  const stores = [
    { store: 'apple', url: appleUrl },
    { store: 'ms', url: msUrl },
    { store: 'snap', url: snapUrl },
  ];
  for (const loc of BADGE_LOCALES) {
    for (const v of VARIANTS) {
      for (const { store, url } of stores) {
        const code = loc[store];
        if (!code) continue;
        out.push({
          path: `${store}/${v.name}/${loc.code}.svg`,
          url: url(v[store], code),
          store,
        });
      }
    }
  }
  return out;
}
