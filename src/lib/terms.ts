// Data for the /terms/ page — the agreement between a user and WaveKat.
//
// This file holds the shape, the locale map and the accessor; the copy lives
// per locale in src/lib/terms/<slug>.ts, the same arrangement the comparison
// pages use (src/lib/voice-alternatives.ts). A terms page is one document said
// nine times, so keeping it as data rather than nine hand-written .astro pages
// means a clause can be added in one shape and translated nine times, and a
// section that exists in English but not in German is visible as a missing key
// rather than a paragraph nobody noticed was gone.
//
// The privacy policy is deliberately NOT built this way — it predates this and
// is nine full pages. Don't "fix" that by porting it here unless the whole
// page is being rewritten anyway; a half-migrated policy is worse than either.
//
// Voice: plain language, same as the privacy policy. The reader is a person
// running a small business, not a lawyer. Say the inconvenient parts out loud
// (no emergency calls, recording is your problem, this is beta) rather than
// burying them — a terms page nobody can read protects nobody.

/**
 * Inline markup allowed inside any string below. Deliberately tiny:
 *   **bold**            → <strong>
 *   [label](/href/)     → <a>
 * Anything else is literal text. Keeping the vocabulary this small is what
 * lets a translator work on the strings without touching markup.
 */
export type RichText = string;

export type TermsBlock =
  | { kind: 'p'; text: RichText }
  | { kind: 'list'; items: RichText[] };

export interface TermsSection {
  /** Anchor id — shared across every locale so /de/terms/#recording resolves. */
  id: string;
  heading: string;
  body: TermsBlock[];
}

export interface TermsFaq {
  q: string;
  a: string;
}

export interface TermsDoc {
  /** <title> (the layout appends nothing; keep it ≤ ~50 chars, ≤ 28 for CJK). */
  seoTitle: string;
  /** Meta description — 150–160 chars, ≤ 85 for CJK. See CLAUDE.md § check:meta. */
  seoDescription: string;
  h1: string;
  /** "Last updated {date}" — the date itself is formatted from `updated`. */
  updatedPrefix: string;
  /** Opening paragraphs, above the highlights. */
  lead: RichText[];
  /** The "three things to know first" box. */
  highlightsLabel: string;
  highlights: RichText[];
  onThisPage: string;
  sections: TermsSection[];
  faqHeading: string;
  faqs: TermsFaq[];
  contactHeading: string;
  contactIntro: RichText;
}

import { terms as termsEn } from './terms/en';
import { terms as termsZh } from './terms/zh';
import { terms as termsZhHant } from './terms/zh-hant';
import { terms as termsJa } from './terms/ja';
import { terms as termsKo } from './terms/ko';
import { terms as termsDe } from './terms/de';
import { terms as termsEs } from './terms/es';
import { terms as termsFr } from './terms/fr';
import { terms as termsIt } from './terms/it';

const byLocale: Record<string, TermsDoc> = {
  en: termsEn,
  'zh-Hans': termsZh,
  'zh-Hant': termsZhHant,
  ja: termsJa,
  ko: termsKo,
  de: termsDe,
  es: termsEs,
  fr: termsFr,
  it: termsIt,
};

/**
 * The terms in one locale, falling back to English for anything unshipped.
 * Read through this even on the English page — that is what keeps every
 * locale's template byte-identical (same rule as getAlternatives).
 */
export function getTerms(locale: string): TermsDoc {
  return byLocale[locale] ?? termsEn;
}

/**
 * The single source of truth for the "last updated" line and the WebPage
 * schema's dateModified. Change it whenever any locale's text changes — the
 * document is one agreement, so the nine pages carry one date.
 */
export const TERMS_UPDATED = new Date('2026-09-12');

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
};

export interface RichOptions {
  /** Class applied to every rendered <a>. */
  linkClass: string;
  /** Class applied to every rendered <strong>. */
  strongClass: string;
  /**
   * Maps a default-locale internal path ('/privacy/') to the one this page
   * should link to ('/de/privacy/'). Required, not optional: a localized page
   * that links to an English URL whose translation exists fails
   * `npm run check:links` in CI, and the copy below is full of them.
   */
  localeHref: (path: string) => string;
}

/**
 * Render the mini-markup above to HTML. Escapes first, so a stray `<` in the
 * copy renders as a character rather than opening a tag — the strings are ours
 * and static, but a terms page is exactly the wrong place to rely on that.
 *
 * Classes are passed in rather than hardcoded so the renderer owes nothing to
 * the page's styling; the component supplies them.
 */
export function renderRich(text: RichText, opts: RichOptions): string {
  const escaped = text.replace(/[&<>"]/g, (c) => ESCAPES[c]);
  return escaped
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, label: string, href: string) => {
      const internal = href.startsWith('/');
      const resolved = internal ? opts.localeHref(href) : href;
      const rel = href.startsWith('http') ? ' rel="noopener"' : '';
      return `<a href="${resolved}" class="${opts.linkClass}"${rel}>${label}</a>`;
    })
    .replace(
      /\*\*([^*]+)\*\*/g,
      (_m, inner: string) => `<strong class="${opts.strongClass}">${inner}</strong>`,
    );
}
