// Official store badges — where the artwork lives and how big it is.
//
// The FILES are fetched by `scripts/sync-badges.js` into gitignored
// public/badges/<store>/<variant>/<locale>.svg; this module is the page
// side, and it deals only in paths and geometry. The locale→store-code
// mapping that the downloader needs (Apple files Traditional Chinese under
// `zh-hk`, Microsoft under `zh-tw`) does not appear here at all: once the
// files are on disk they are named by OUR locale code, so a page that
// knows its locale already knows its badge.
//
// Why the size is read from the SVG rather than written down
// ----------------------------------------------------------
// Both badges are a fixed height with a width set by how long the phrase
// is in that language, and the range is wide: Apple's is 140 wide in
// Japanese and 161 in Korean, Microsoft's 161 in most languages and 183 in
// German. A hardcoded table would be nine numbers per store that are
// wrong the day either company retypesets a badge — and "wrong" here means
// a stretched logo or a layout shift, on the primary download control.
//
// So the viewBox is read from the file at build time. Astro renders in
// Node, the files are already on disk by then (`npm run sync` precedes
// `astro build`), and the read is memoized per file, so nine locales
// across 241 pages cost one read each.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export type BadgeStore = 'apple' | 'ms';

/**
 * Natural rendered height, in CSS pixels, for BOTH stores.
 *
 * "Natural" because `StoreBadge.astro` caps the badge at its container's
 * width, so in the one narrow band where a three-column grid is tighter
 * than the widest badge, both dimensions scale down together. Everywhere
 * else this is the height on the page.
 *
 * One number for both is a requirement, not a tidiness preference: Apple's
 * marketing guidelines say its badge may never be drawn smaller than
 * another store's badge shown alongside it, and the two appear side by
 * side in the download grid. Equal height satisfies that in both
 * directions and survives either company changing their artwork's
 * intrinsic size.
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
 * Width ÷ height of one badge, from its viewBox.
 *
 * Throws rather than guessing. A badge that renders at the wrong aspect is
 * a distorted trademark on the page most likely to be screenshotted, and
 * the only way to get here is to have skipped `npm run sync` — which the
 * error says.
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

  const vb = svg.match(/viewBox="[\d.]+ [\d.]+ ([\d.]+) ([\d.]+)"/);
  if (!vb) throw new Error(`badges: /${path} has no readable viewBox.`);

  const ratio = Number(vb[1]) / Number(vb[2]);
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
 * carry an `href` are the two store handoffs, and every other row is an
 * installer we serve and count. Keyed on the row's `key` rather than on
 * `href` being set so that a future non-store handoff doesn't silently
 * inherit a badge it has no artwork for.
 */
export function badgeStoreFor(rowKey: string): BadgeStore | null {
  if (rowKey === 'mac-app-store') return 'apple';
  if (rowKey === 'ms-store') return 'ms';
  return null;
}
