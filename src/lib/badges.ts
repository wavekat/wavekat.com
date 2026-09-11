// Official store badges — where the artwork lives and how big it is.
//
// The FILES are fetched by `scripts/sync-badges.js` into gitignored
// public/badges/<store>/<variant>/<locale>.svg; this module is the page
// side, and it deals only in paths and geometry. The locale→store-code
// mapping that the downloader needs (Apple files Traditional Chinese under
// `zh-hk`, Microsoft under `zh-tw`, Canonical under `tw`) does not appear
// here at all: once the files are on disk they are named by OUR locale
// code, so a page that knows its locale already knows its badge.
//
// What DOES appear here is which locales each store publishes at all — see
// `hasBadge`. That is a page-side question rather than a download-side one:
// the Snap Store has no Simplified Chinese or Korean badge, and those two
// pages have to draw something else instead of a missing file.
//
// Why the size is read from the SVG rather than written down
// ----------------------------------------------------------
// Every badge is a fixed height with a width set by how long the phrase is
// in that language, and the range is wide: Apple's is 140 wide in Japanese
// and 161 in Korean, Microsoft's 161 in most languages and 183 in German,
// Canonical's a flat 182. A hardcoded table would be up to nine numbers per
// store that are wrong the day any of the three companies retypesets a
// badge — and "wrong" here means a stretched logo or a layout shift, on a
// download control.
//
// So the intrinsic size is read from the file at build time — from the
// viewBox where there is one and from width/height where there isn't, since
// the three stores don't agree on which to ship. Astro renders in Node, the
// files are already on disk by then (`npm run sync` precedes `astro
// build`), and the read is memoized per file, so nine locales across 241
// pages cost one read each.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export type BadgeStore = 'apple' | 'ms' | 'snap';

/**
 * The locales each store actually publishes artwork for.
 *
 * Apple and Microsoft both cover all nine of ours, so for them this is the
 * whole set and `hasBadge` never returns false. Canonical covers seven: it
 * publishes no Simplified Chinese and no Korean badge at all, under any code
 * (`zh`, `zh-CN`, `zh-Hans`, `cn`, `ko`, `ko-KR` all 404 on their endpoint).
 *
 * That gap is the reason `hasBadge` exists rather than this being a detail of
 * the downloader. A page cannot fall back to the English badge — artwork
 * reading "Get it from the Snap Store" on a fully localized `/zh/` page is
 * the one thing worse than no badge — so those two locales draw our own
 * icon-and-label row instead, with translated text. See VoiceDownloadRow.
 *
 * Kept here rather than imported from `scripts/lib/store-badges.js` because
 * the two answer different questions: that table maps our code to each
 * store's own code so files can be FETCHED, this one says which files a page
 * may reference. They are checked against each other by `check:badges`,
 * which iterates the downloader's table — so a locale added there without
 * being added here renders no badge, and one added here without being added
 * there fails the build rather than shipping a broken image.
 */
const BADGE_LOCALES: Record<BadgeStore, readonly string[] | null> = {
  apple: null,
  ms: null,
  snap: ['en', 'de', 'es', 'fr', 'it', 'ja', 'zh-Hant'],
};

/**
 * Does this store publish badge artwork in this locale?
 *
 * `null` above means "every locale we ship", which is not the same as "assume
 * yes": it is the answer for the two stores whose sets we have verified to be
 * complete, and it keeps the common case from needing nine strings repeated
 * twice.
 */
export function hasBadge(store: BadgeStore, locale: string): boolean {
  const locales = BADGE_LOCALES[store];
  return locales === null || locales.includes(locale);
}

/**
 * Natural rendered height, in CSS pixels, for ALL THREE stores.
 *
 * "Natural" because `StoreBadge.astro` caps the badge at its container's
 * width, so in the one narrow band where a three-column grid is tighter
 * than the widest badge, both dimensions scale down together. Everywhere
 * else this is the height on the page.
 *
 * One number for all of them is a requirement, not a tidiness preference:
 * Apple's marketing guidelines say its badge may never be drawn smaller
 * than another store's badge shown alongside it, and all three appear in
 * one row of columns on the download grid. Equal height satisfies that in
 * every direction and survives any of the three companies changing their
 * artwork's intrinsic size — which they declare differently anyway (Apple
 * and Microsoft ship a viewBox, Canonical ships width/height).
 *
 * 44 because it matches the height of the orange pill it stands in for on
 * the hero (`px-6 py-3 text-sm`), so promoting Linux over Mac swaps the
 * control without moving the page — and because it clears Apple's 40px
 * minimum with room to spare.
 */
export const BADGE_HEIGHT = 44;

export interface BadgeArt {
  /** Dark-ink badge, for a light background. */
  onLight: string;
  /** Light-ink badge, for a dark background. */
  onDark: string;
  /** Intrinsic width scaled to BADGE_HEIGHT, rounded to whole pixels. */
  width: number;
  height: number;
}

const ratios = new Map<string, number>();

/**
 * Width ÷ height of one badge, from its intrinsic size.
 *
 * Two ways of declaring that size, because the three stores don't agree:
 * Apple's and Microsoft's artwork carries a `viewBox`, Canonical's carries
 * `width`/`height` attributes and no `viewBox` at all. Either is a complete
 * answer, so both are read — `viewBox` first, since a file carrying both
 * could in principle scale one against the other and the viewBox is what a
 * renderer would honour.
 *
 * Throws rather than guessing, on a missing file or an unreadable size. A
 * badge that renders at the wrong aspect is a distorted trademark on the page
 * most likely to be screenshotted, and the likeliest way to get here is to
 * have skipped `npm run sync` — which the error says.
 */
function aspect(path: string): number {
  const cached = ratios.get(path);
  if (cached !== undefined) return cached;

  let svg: string;
  try {
    svg = readFileSync(join(process.cwd(), 'public', path), 'utf8');
  } catch {
    throw new Error(
      `badges: /${path} is missing — run \`npm run sync:badges\` (or \`make sync\`).`,
    );
  }

  // Only the opening <svg> tag is searched. A `width` attribute further in
  // belongs to a <rect> of the artwork, and on Canonical's badges the first
  // such rect happens to be the full-bleed background — so a whole-file
  // search would appear to work and would silently start tracking a shape
  // inside the drawing.
  const open = svg.slice(0, svg.indexOf('>') + 1);

  const vb = open.match(/viewBox="[\d.]+ [\d.]+ ([\d.]+) ([\d.]+)"/);
  const wh = open.match(/\bwidth="([\d.]+)(?:px)?"[^>]*?\bheight="([\d.]+)(?:px)?"/);
  const dims = vb ?? wh;
  if (!dims) {
    throw new Error(
      `badges: /${path} declares no viewBox and no width/height — cannot size it.`,
    );
  }

  const ratio = Number(dims[1]) / Number(dims[2]);
  if (!Number.isFinite(ratio) || ratio <= 0) {
    throw new Error(`badges: /${path} has a nonsensical aspect ratio (${dims[1]}×${dims[2]}).`);
  }

  ratios.set(path, ratio);
  return ratio;
}

/**
 * The two artwork URLs and the box to reserve for one store badge in one
 * locale.
 *
 * Both variants come back because the page ships both: this site's theme
 * is a class toggle backed by localStorage, so a `<picture>` keyed on
 * `prefers-color-scheme` would ignore the visitor's actual choice and show
 * a white badge on a white page. See `StoreBadge.astro`.
 */
export function storeBadge(store: BadgeStore, locale: string): BadgeArt {
  const onLight = `badges/${store}/on-light/${locale}.svg`;
  const onDark = `badges/${store}/on-dark/${locale}.svg`;

  return {
    onLight: `/${onLight}`,
    onDark: `/${onDark}`,
    width: Math.round(BADGE_HEIGHT * aspect(onLight)),
    height: BADGE_HEIGHT,
  };
}

/**
 * Which store a download row hands off to, or `null` for a file we publish
 * ourselves.
 *
 * This is the whole badge/button decision, in one place: the rows that
 * carry an `href` are the three store handoffs, and every other row is an
 * installer we serve and count. Keyed on the row's `key` rather than on
 * `href` being set so that a future non-store handoff doesn't silently
 * inherit a badge it has no artwork for.
 *
 * Answering yes here is necessary but not sufficient — `hasBadge` still has
 * to agree that this store publishes artwork in the page's language, which
 * for the Snap Store it does not always do.
 */
export function badgeStoreFor(rowKey: string): BadgeStore | null {
  if (rowKey === 'mac-app-store') return 'apple';
  if (rowKey === 'ms-store') return 'ms';
  if (rowKey === 'snap-store') return 'snap';
  return null;
}
