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
  dlLinux: string;
  dlOther: string;
  dlArchMac: string;
  dlArchLinux: string;
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

// Per-locale chrome strings for the fully-translated locales live in their own
// files (src/lib/ui/<slug>.ts) so each can be authored independently. en and
// zh-Hans stay inline as the reference pair.
import { ui as uiZhHant } from './ui/zh-hant';
import { ui as uiJa } from './ui/ja';
import { ui as uiKo } from './ui/ko';
import { ui as uiDe } from './ui/de';
import { ui as uiEs } from './ui/es';
import { ui as uiFr } from './ui/fr';
import { ui as uiIt } from './ui/it';

const strings: Record<string, UIStrings> = {
  'zh-Hant': uiZhHant,
  ja: uiJa,
  ko: uiKo,
  de: uiDe,
  es: uiEs,
  fr: uiFr,
  it: uiIt,
  en: {
    navVoice: 'Voice',
    navDocs: 'Docs',
    navBlog: 'Blog',
    switcherLabel: 'Change language',
    bannerText: 'This page is available in English.',
    bannerView: 'View',
    bannerDismiss: 'Dismiss',
    subOverview: 'Overview',
    subUseCases: 'Use Cases',
    subAlternatives: 'Alternatives',
    subDownload: 'Download',
    subChangelog: "What's New",
    subTalk: 'Talk to Us',
    dlMac: 'Download for Mac',
    dlLinux: 'Download for Linux',
    dlOther: 'Other Platforms',
    dlArchMac: 'Macs with Apple chip (M1 or newer)',
    dlArchLinux: 'Debian & Ubuntu (.deb, 64-bit)',
    talkHeading: 'Talk to us',
    talkBody:
      'Questions, feedback, or a device you wish we supported? Email is the best way to reach us — we read every message and reply as soon as we can.',
    talkButton: 'Email us',
    talkWritePre: 'Or write to ',
    talkWritePost: ' directly.',
    footerEmail: 'Email us',
    footerSource: 'View source on GitHub',
    footerAbout: 'About',
    footerPrivacy: 'Privacy',
    footerPrompts: 'Prompt Generator',
    footerPlatform: 'Platform',
    footerMore: 'More',
    footerTools: 'Tools',
    notFoundTitle: "Page not found",
    notFoundBody: "The page you're looking for doesn't exist or has moved.",
    notFoundHome: "Go to the homepage",
    postBack: '← Back to Blog',
    postUpdated: 'updated',
  },
  'zh-Hans': {
    navVoice: '语音',
    navDocs: '文档',
    navBlog: '博客',
    switcherLabel: '切换语言',
    bannerText: '本页面有简体中文版本。',
    bannerView: '查看',
    bannerDismiss: '关闭',
    subOverview: '概览',
    subUseCases: '应用场景',
    subAlternatives: '替代方案',
    subDownload: '下载',
    subChangelog: '更新日志',
    subTalk: '联系我们',
    dlMac: '下载 Mac 版',
    dlLinux: '下载 Linux 版',
    dlOther: '其他平台',
    dlArchMac: '搭载 Apple 芯片的 Mac（M1 或更新机型）',
    dlArchLinux: 'Debian 与 Ubuntu（.deb，64 位）',
    talkHeading: '联系我们',
    talkBody:
      '有疑问、建议，或希望我们支持某种设备？邮件是联系我们的最佳方式——我们会阅读每一条消息，并尽快回复。',
    talkButton: '给我们发邮件',
    talkWritePre: '或直接写信至 ',
    talkWritePost: '。',
    footerEmail: '给我们发邮件',
    footerSource: '在 GitHub 上查看源码',
    footerAbout: '关于',
    footerPrivacy: '隐私政策',
    footerPrompts: '语音生成器',
    footerPlatform: '平台',
    footerMore: '更多',
    footerTools: '工具',
    notFoundTitle: "页面不存在",
    notFoundBody: "您要找的页面不存在或已被移动。",
    notFoundHome: "返回首页",
    postBack: '← 返回博客',
    postUpdated: '更新于',
  },
};

/** UI strings for a locale, falling back to the default locale. */
export function t(code: string): UIStrings {
  return strings[code] ?? strings[defaultLocale];
}
