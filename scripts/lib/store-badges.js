// Which badge file belongs to which locale, shared by the downloader
// (`scripts/sync-badges.js`) and the completeness check it runs with
// `--check`. Kept in `scripts/lib/` rather than `src/lib/` because Astro
// never reads it: the page side needs only a path, and derives that from
// the locale it already has (see `src/lib/badges.ts`).
//
// Apple and Microsoft each publish the badge as artwork in a fixed set of
// languages, and NEITHER agrees with our locale codes or with the other's:
//
//   ours       Apple      Microsoft
//   ────────   ────────   ─────────
//   zh-Hans    zh-cn      zh-cn
//   zh-Hant    zh-hk      zh-tw      ← the two stores disagree
//   ja         ja-jp      ja         ← Apple regionalises, Microsoft doesn't
//   ko         ko-kr      ko
//   en         en-us      en-us
//
// So the mapping is a table, not a transformation. `zh-hk` is not a typo
// and not a region choice: Apple's Traditional artwork is filed under Hong
// Kong (its <title> reads `…_CNTC_…`, TC for Traditional Chinese) and
// `zh-tw` 404s on their endpoint, while Microsoft's is the exact reverse.
// Both render the same Traditional glyphs; only the shelf label differs.

/**
 * Our locale code → the code each store files its artwork under.
 *
 * Every locale in `localeDefs` must appear here. A missing entry is a page
 * that renders a broken image, which is why `sync-badges.js` iterates THIS
 * table rather than a directory listing.
 */
export const BADGE_LOCALES = [
  { code: 'en', apple: 'en-us', ms: 'en-us' },
  { code: 'zh-Hans', apple: 'zh-cn', ms: 'zh-cn' },
  { code: 'zh-Hant', apple: 'zh-hk', ms: 'zh-tw' },
  { code: 'ja', apple: 'ja-jp', ms: 'ja' },
  { code: 'ko', apple: 'ko-kr', ms: 'ko' },
  { code: 'de', apple: 'de-de', ms: 'de' },
  { code: 'es', apple: 'es-es', ms: 'es' },
  { code: 'fr', apple: 'fr-fr', ms: 'fr' },
  { code: 'it', apple: 'it-it', ms: 'it' },
];

// The two variants, named for the PAGE they sit on rather than for the ink
// they are drawn in — which is the one thing the two stores name in exact
// opposite ways. Apple calls its dark-ink badge `black`; Microsoft calls
// its dark-ink badge `dark`. Both mean "for a light background".
//
// Getting this backwards is invisible in a light-theme dev session and
// renders a white badge on a white page for every dark-theme visitor, so
// the site side never says `black` or `light` — it says `onLight` /
// `onDark` and this table resolves it.
export const VARIANTS = [
  { name: 'on-light', apple: 'black', ms: 'dark' },
  { name: 'on-dark', apple: 'white', ms: 'light' },
];

/** Apple's badge toolbox. Takes a bare locale — a `.svg` suffix 404s. */
export const appleUrl = (variant, locale) =>
  `https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-mac-app-store/${variant}/${locale}`;

/** Microsoft's badge CDN. The space before the variant is real, hence %20. */
export const msUrl = (variant, locale) =>
  `https://get.microsoft.com/images/${locale}%20${variant}.svg`;

/** Every file the site expects to exist, as `<store>/<variant>/<code>.svg`. */
export function badgeFiles() {
  const out = [];
  for (const loc of BADGE_LOCALES) {
    for (const v of VARIANTS) {
      out.push({
        path: `apple/${v.name}/${loc.code}.svg`,
        url: appleUrl(v.apple, loc.apple),
        store: 'apple',
      });
      out.push({
        path: `ms/${v.name}/${loc.code}.svg`,
        url: msUrl(v.ms, loc.ms),
        store: 'ms',
      });
    }
  }
  return out;
}
