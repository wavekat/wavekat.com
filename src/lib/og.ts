// Per-page Open Graph cards: which pages get one, what it says, and where it
// lives.
//
// Every page used to share a single /og.png, so 300-odd URLs unfurled
// identically in Slack, LinkedIn and X. Each opted-in page now gets a
// 1200×630 card carrying its own <title>.
//
// How the image actually gets made: `Base.astro` calls `ogCardFor()` while it
// renders, which returns the card's URL *and* records what the card should say
// in a build-wide manifest. After every page has rendered, the
// `wavekat-og-cards` integration (scripts/og-integration.mjs) drains that
// manifest and writes the PNGs into dist/. Recording at render time is the
// whole point: the card's title is the same value that went into <title> and
// og:title on that page, so the two cannot drift, and no page has to be
// listed anywhere for this to work.

import { localizedPath, t, type UIStrings } from './i18n';

/** A card the build still has to render. */
export interface OgCard {
  /** Site-absolute URL of the PNG, e.g. `/og/ja/blog/place-calls….png`. */
  src: string;
  /** The page's own title — the line set large on the card. */
  title: string;
  /** Small orange label above the title (the section). */
  eyebrow: string;
  /** Muted line at the bottom, e.g. `wavekat.com/ja/blog`. */
  footer: string;
  /** BCP-47 code, so the renderer picks the right script's typeface. */
  locale: string;
}

// A Symbol.for key rather than a module-level Map: Astro renders pages through
// Vite's SSR module graph while the integration is imported by plain Node, so
// the two get *different* instances of this module. The global registry is the
// one thing they demonstrably share.
const STORE = Symbol.for('wavekat.og.cards');

type Store = Map<string, OgCard>;

export function ogCardManifest(): Store {
  const g = globalThis as unknown as Record<symbol, Store | undefined>;
  return (g[STORE] ??= new Map());
}

/**
 * Sections that get a card, in match order — most specific first.
 *
 * Deliberately not everything: /docs/** is synced prose whose titles we don't
 * own, and /about, /privacy and /brand are not pages anyone shares. Those keep
 * the sitewide /og.png.
 */
const SECTIONS: { prefix: string; label: (ui: UIStrings) => string }[] = [
  { prefix: '/voice/alternatives/', label: (ui) => ui.subAlternatives },
  { prefix: '/blog/', label: (ui) => ui.navBlog },
  { prefix: '/voice/', label: (ui) => ui.navVoice },
];

/**
 * Drop the ` — WaveKat` that `Post.astro` and `Voice.astro` append for the
 * SERP. On a card the wordmark is already sitting in the top-left corner, so
 * the suffix buys nothing and costs a whole line of the title at the size that
 * matters most — in CJK it was pushing two-line titles onto a third.
 */
function stripBrandSuffix(title: string): string {
  return title.replace(/\s+—\s+WaveKat(\s+Docs)?$/, '');
}

/** `/zh/voice/` → `/og/zh/voice.png`; `/` → `/og/index.png`. */
export function ogCardPath(pathname: string): string {
  const trimmed = pathname.replace(/^\/+|\/+$/g, '');
  return `/og/${trimmed || 'index'}.png`;
}

/**
 * The card for `pathname`, or null if this page isn't one we generate for.
 *
 * Calling this records the card in the build manifest as a side effect — see
 * the note at the top of the file for why that is the right place for it.
 */
export function ogCardFor(
  pathname: string,
  locale: string,
  basePath: string,
  title: string,
): OgCard | null {
  const section = SECTIONS.find((s) => basePath.startsWith(s.prefix));
  if (!section) return null;

  const ui = t(locale);
  // The footer names the section, not the page: a blog slug spelled out in
  // full would run past the card's edge, and the title already says the page.
  const sectionURL = localizedPath(section.prefix, locale).replace(/\/$/, '');

  const card: OgCard = {
    src: ogCardPath(pathname),
    title: stripBrandSuffix(title),
    eyebrow: section.label(ui),
    footer: `wavekat.com${sectionURL}`,
    locale,
  };

  ogCardManifest().set(card.src, card);
  return card;
}
