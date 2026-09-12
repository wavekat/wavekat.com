// ─────────────────────────────────────────────────────────────────────────
// Site-wide i18n. This is global infrastructure, not a per-section feature:
// every layout derives its locale from the URL automatically, so adding a
// translated page is a matter of (1) dropping a file under /<slug>/ and
// (2) registering its base path in `translatedRoutes` below. hreflang, the
// language switcher, and the suggestion banner all update from those two facts.
//
// Two concepts are deliberately separate:
//   • `code` — the BCP-47 language tag (e.g. 'ja', 'zh-Hans'). Drives <html lang>
//     and hreflang. ALWAYS standards-correct, because crawlers read it.
//   • `slug` — the short, human-facing URL segment. Use the BARE language code
//     ('ja', 'es', 'fr') and add a qualifier only to disambiguate variants we
//     actually ship ('zh' vs 'zh-hant'). NOTE: 'jp' is the *country* code for
//     Japan; the *language* is 'ja' — slugs follow the language code.
// ─────────────────────────────────────────────────────────────────────────

export interface LocaleDef {
  /** BCP-47 tag for <html lang> + hreflang. */
  code: string;
  /** URL segment; '' = default locale (unprefixed URLs). */
  slug: string;
  /** Endonym shown in the language switcher. */
  label: string;
  /** <meta property="og:locale"> value. */
  ogLocale: string;
  /**
   * Extra region hreflang tags routed to this same page, so search engines
   * serve the right script to each region without separate content. Chinese
   * splits by script, not country: Traditional (zh-Hant) serves TW/HK/MO.
   */
  hreflangAliases?: string[];
}

export const defaultLocale = 'en';

export const localeDefs: LocaleDef[] = [
  { code: 'en', slug: '', label: 'English', ogLocale: 'en_US' },
  {
    code: 'zh-Hans',
    slug: 'zh',
    label: '简体中文',
    ogLocale: 'zh_CN',
    hreflangAliases: ['zh-Hans-SG'],
  },
  // Traditional Chinese splits by script, not country: this one page serves
  // TW/HK/MO via the region aliases below — no per-country Chinese pages.
  {
    code: 'zh-Hant',
    slug: 'zh-hant',
    label: '繁體中文',
    ogLocale: 'zh_TW',
    hreflangAliases: ['zh-Hant-TW', 'zh-Hant-HK', 'zh-Hant-MO'],
  },
  { code: 'ja', slug: 'ja', label: '日本語', ogLocale: 'ja_JP' },
  { code: 'ko', slug: 'ko', label: '한국어', ogLocale: 'ko_KR' },
  { code: 'de', slug: 'de', label: 'Deutsch', ogLocale: 'de_DE' },
  { code: 'es', slug: 'es', label: 'Español', ogLocale: 'es_ES' },
  { code: 'fr', slug: 'fr', label: 'Français', ogLocale: 'fr_FR' },
  { code: 'it', slug: 'it', label: 'Italiano', ogLocale: 'it_IT' },
];

// The full set of in-repo pages. Every fully-translated locale covers all of
// them; partial locales would list only what they actually ship. (docs/* and
// the changelog *body* are synced from the private wavekat-voice repo and must
// be localized there, so they are not in this list.)
const fullSite = [
  '/',
  '/voice/',
  '/voice/prompts/',
  '/voice/use-cases/',
  '/voice/download/',
  '/voice/talk/',
  '/voice/changelog/',
  '/voice/alternatives/',
  '/voice/alternatives/linphone/',
  '/voice/providers/2talk/',
  '/blog/',
  '/blog/hello-world/',
  '/blog/common-voice-explorer/',
  '/blog/place-calls-from-the-command-line/',
  '/blog/share-a-call-recording/',
  '/blog/hold-switch-and-transfer-calls/',
  '/blog/our-own-sip-engine/',
  '/blog/click-to-call-phone-links/',
  '/blog/phone-menu-ivr-voice-generator/',
  '/blog/answer-calls-with-a-call-flow/',
  '/blog/why-phone-links-dont-work/',
  '/blog/log-calls-in-hubspot/',
  '/about/',
  '/privacy/',
];

// Which base paths exist in which non-default locale. The default locale is
// assumed to have every path. Add a path here when you translate that page.
export const translatedRoutes: Record<string, string[]> = {
  'zh-Hans': fullSite,
  'zh-Hant': fullSite,
  ja: fullSite,
  ko: fullSite,
  de: fullSite,
  es: fullSite,
  fr: fullSite,
  it: fullSite,
};

const byCode = new Map(localeDefs.map((l) => [l.code, l]));
const bySlug = new Map(localeDefs.map((l) => [l.slug, l]));

export function localeByCode(code: string): LocaleDef | undefined {
  return byCode.get(code);
}

export function localeLabel(code: string): string {
  return byCode.get(code)?.label ?? code;
}

/**
 * Split a pathname into its locale and base (default-locale) path.
 * '/zh/voice/' → { code: 'zh-Hans', basePath: '/voice/' }
 * '/voice/'    → { code: 'en',      basePath: '/voice/' }
 */
export function resolveLocale(pathname: string): { code: string; basePath: string } {
  const segments = pathname.split('/').filter(Boolean);
  const def = segments.length ? bySlug.get(segments[0]) : undefined;
  if (def && def.slug) {
    const rest = segments.slice(1).join('/');
    return { code: def.code, basePath: rest ? `/${rest}/` : '/' };
  }
  return { code: defaultLocale, basePath: pathname };
}

/** Map a base path to its URL in a given locale. */
export function localizedPath(basePath: string, code: string): string {
  const slug = byCode.get(code)?.slug ?? '';
  return slug ? `/${slug}${basePath}` : basePath;
}

/** Every locale a given page is available in (default locale always included). */
export function localesForPath(basePath: string): string[] {
  const others = localeDefs
    .filter((l) => l.code !== defaultLocale && translatedRoutes[l.code]?.includes(basePath))
    .map((l) => l.code);
  return [defaultLocale, ...others];
}

export interface Alternate {
  hreflang: string;
  href: string;
}

/**
 * Full hreflang alternate set (incl. region aliases + x-default) for a page,
 * or [] if the page exists in only the default locale. Both the English and
 * translated pages produce the same set from the same base path, so the
 * alternates are reciprocal by construction.
 */
export function buildAlternates(basePath: string, site: URL | string): Alternate[] {
  const codes = localesForPath(basePath);
  if (codes.length <= 1) return [];
  const alts: Alternate[] = [];
  for (const code of codes) {
    const href = new URL(localizedPath(basePath, code), site).href;
    alts.push({ hreflang: code, href });
    for (const alias of byCode.get(code)?.hreflangAliases ?? []) {
      alts.push({ hreflang: alias, href });
    }
  }
  alts.push({ hreflang: 'x-default', href: new URL(basePath, site).href });
  return alts;
}

export interface SwitcherItem {
  code: string;
  label: string;
  href: string;
  current: boolean;
}

/**
 * Language-switcher menu for the current page. Lists every site locale; links
 * to the translated page when it exists, otherwise to that locale's home so a
 * switch never dead-ends on a 404.
 */
export function switcherItems(basePath: string, currentCode: string): SwitcherItem[] {
  const available = localesForPath(basePath);
  return localeDefs.map((l) => ({
    code: l.code,
    label: l.label,
    href: available.includes(l.code) ? localizedPath(basePath, l.code) : localizedPath('/', l.code),
    current: l.code === currentCode,
  }));
}

// ── UI strings for shared chrome (nav, switcher, banner, sub-nav, CTAs) ──
// Page *body* copy lives in each translated page; this dict is only the
// surrounding chrome so a localized page is never half-English.
export interface UIStrings {
  navVoice: string;
  navDocs: string;
  navBlog: string;
  switcherLabel: string;
  bannerText: string; // shown IN this locale, inviting a visitor to switch to it
  bannerView: string;
  bannerDismiss: string;
  subOverview: string;
  subUseCases: string;
  subAlternatives: string;
  subDownload: string;
  subChangelog: string;
  subTalk: string;
  dlMac: string;
  /**
   * The Mac App Store control. It is the primary Mac button — Apple signs,
   * installs and updates the copy it hands out — while the .dmg keeps its
   * own label on the row behind it in the menu.
   */
  dlMacAppStore: string;
  dlLinux: string;
  dlLinuxArm64: string;
  /**
   * The Microsoft Store control, and the primary Windows button. Microsoft
   * signs, installs and updates the copy it hands out, and its one listing
   * carries both the x64 and the arm64 package — so this label serves every
   * Windows PC and the two direct installers keep their own labels on the
   * rows behind it in the menu.
   */
  dlMsStore: string;
  /**
   * The Snap Store control. Unlike the other two store labels this is NOT a
   * primary button: the .deb keeps the promoted Linux control, so this label
   * is only ever read in the menu and on the download grid.
   *
   * Translated, unlike "WaveKat Voice" — "Snap Store" is Canonical's product
   * name and stays as it is, but the verb around it is localized chrome.
   *
   * On the seven locales Canonical publishes artwork for, this doubles as the
   * badge's alt text. It is OUR translation rather than a transcription of
   * the artwork, because the artwork cannot be transcribed: Canonical outlines
   * the badge text to paths, so the SVG carries no readable string (and no
   * <title>) to copy. Each locale therefore mirrors how that locale already
   * phrases `dlMsStore`, which is the same call the Microsoft line makes.
   */
  dlSnapStore: string;
  /** Downloads the x64 installer — the build every Windows PC can run. */
  dlWindows: string;
  dlWindowsArm64: string;
  dlOther: string;
  dlArchMac: string;
  /**
   * Requirement line under the App Store control. It carries no size: the
   * store publishes its own, and nothing here can read it.
   */
  dlArchMacAppStore: string;
  dlArchLinux: string;
  dlArchLinuxArm64: string;
  /**
   * Requirement line under the Microsoft Store control. It names every
   * architecture rather than one, because the Store picks the package, and
   * it carries no size for the same reason the App Store line does not:
   * the store publishes its own and nothing here can read it.
   */
  dlArchMsStore: string;
  /**
   * Requirement line under the Snap Store control. Like the other two store
   * lines it carries no size — the store publishes its own — and like the
   * Microsoft one it names every architecture rather than one, because a
   * single snap name carries both amd64 and arm64 revisions.
   *
   * It names the distro family rather than a version: snapd ships by default
   * on Ubuntu and installs on most other distributions, which is a different
   * claim from the .deb rows' "Debian & Ubuntu" and has to read as one.
   */
  dlArchSnapStore: string;
  /**
   * Lead-in to the terminal install at the foot of the Linux column, e.g.
   * "Or from a terminal:" — the command itself is not translated.
   */
  dlSnapInstall: string;
  dlArchWindowsX64: string;
  dlArchWindowsArm64: string;
  /**
   * Caveat on the two direct .exe rows — NOT on Windows as a whole. The
   * Microsoft Store package is signed, so the sentence has to say which
   * downloads it means or it contradicts the button above it.
   */
  dlWindowsUnsigned: string;
  dlWindowsUnsignedLink: string;
  /**
   * The menu's last line, linking to the download page. The menu offers one
   * recommended control per system; that page lists every installer, so the
   * label has to promise the whole set rather than "more platforms".
   */
  dlAllDownloads: string;
  /**
   * Precedes the version number above the download grid, e.g. "Latest
   * WaveKat Voice release v0.0.52". A label, not a sentence — the version
   * and the changelog link follow it.
   *
   * It names the product on purpose, even though the <h1> two lines above
   * already does. A passage extractor lifts this <p> on its own, and
   * "Latest release v0.0.52" alone states a version of nothing; with the
   * entity in it the line is a fact that survives being quoted. The
   * product name is never translated (CLAUDE.md), so only the words
   * around it change per locale.
   */
  dlLatestRelease: string;
  talkHeading: string;
  talkBody: string;
  talkButton: string;
  talkWritePre: string;
  talkWritePost: string;
  footerEmail: string;
  footerSource: string;
  footerAbout: string;
  footerPrivacy: string;
  footerPrompts: string;
  footerPlatform: string;
  footerMore: string;
  footerTools: string;
  notFoundTitle: string;
  notFoundBody: string;
  notFoundHome: string;
  postBack: string;
  postUpdated: string;
}

// Every locale's chrome strings live in their own file (src/lib/ui/<slug>.ts)
// so each can be authored independently and the directory listing is the list
// of locales. The file is named for the URL slug, not the BCP-47 code, which
// is why Simplified Chinese is ui/zh.ts and Traditional is ui/zh-hant.ts.
import { ui as uiEn } from './ui/en';
import { ui as uiZhHans } from './ui/zh';
import { ui as uiZhHant } from './ui/zh-hant';
import { ui as uiJa } from './ui/ja';
import { ui as uiKo } from './ui/ko';
import { ui as uiDe } from './ui/de';
import { ui as uiEs } from './ui/es';
import { ui as uiFr } from './ui/fr';
import { ui as uiIt } from './ui/it';

// Keyed by BCP-47 `code`, in the same order as `localeDefs` above — the
// default locale first, since every other locale falls back to it.
const strings: Record<string, UIStrings> = {
  en: uiEn,
  'zh-Hans': uiZhHans,
  'zh-Hant': uiZhHant,
  ja: uiJa,
  ko: uiKo,
  de: uiDe,
  es: uiEs,
  fr: uiFr,
  it: uiIt,
};

/** UI strings for a locale, falling back to the default locale. */
export function t(code: string): UIStrings {
  return strings[code] ?? strings[defaultLocale];
}
