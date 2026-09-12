// Data for the /voice/alternatives/ comparison pages.
//
// This file holds the shape, the locale map and the accessors. The copy lives
// per locale in src/lib/alternatives/<slug>.ts — so adding a competitor means
// appending an entry to every one of those files, not to this one; the hub and
// the [slug] route then pick it up automatically in each language.
//
// Each entry becomes its own page (/voice/alternatives/<slug>/) targeting the
// "<name> alternative for Mac" search intent, plus a card on the hub. Keep the
// framing honest: name what the competitor is genuinely good at, then say
// plainly where WaveKat Voice is different. A comparison page that reads as a
// fair guide ranks and converts better than one that reads as a takedown.

export interface ComparisonRow {
  /** What capability this row is about — kept in phone-user language. */
  label: string;
  /** How WaveKat Voice handles it. */
  wavekat: string;
  /** How the competitor handles it — fair, not disparaging. */
  them: string;
}

export interface AltFaq {
  q: string;
  a: string;
}

export interface Alternative {
  /** URL slug — /voice/alternatives/<slug>/. */
  slug: string;
  /** Competitor's product name, as people search for it. */
  name: string;
  /** One-line card summary on the hub. */
  tagline: string;
  /** <title> / meta description for the page. */
  seoTitle: string;
  seoDescription: string;
  /** Hero copy. */
  heading: string;
  intro: string;
  /** Honest "what it is" — what the competitor is genuinely good at. */
  whatItIs: { summary: string; strengths: string[] };
  /** Side-by-side capability table. */
  comparison: ComparisonRow[];
  /** "Choose <them> if…" — kept fair so the page reads as a guide. */
  chooseThem: string[];
  /** "Choose WaveKat Voice if…" */
  chooseWavekat: string[];
  /** 2–3 Q&A for the on-page FAQ + FAQPage structured data. */
  faqs: AltFaq[];
}



// Every locale keeps its comparison copy in its own file
// (src/lib/alternatives/<slug>.ts) so each can be authored independently.
// Slugs are shared across all of them, so /<locale>/voice/alternatives/<slug>/
// lines up 1:1 and the hreflang pairs stay reciprocal — when you add a
// competitor, add it to every file.
import { alternatives as altEn } from './alternatives/en';
import { alternatives as altZhHans } from './alternatives/zh';
import { alternatives as altZhHant } from './alternatives/zh-hant';
import { alternatives as altJa } from './alternatives/ja';
import { alternatives as altKo } from './alternatives/ko';
import { alternatives as altDe } from './alternatives/de';
import { alternatives as altEs } from './alternatives/es';
import { alternatives as altFr } from './alternatives/fr';
import { alternatives as altIt } from './alternatives/it';

// Locale-keyed datasets so every locale's comparison pages reuse one template.
const altByLocale: Record<string, Alternative[]> = {
  en: altEn,
  'zh-Hans': altZhHans,
  'zh-Hant': altZhHant,
  ja: altJa,
  ko: altKo,
  de: altDe,
  es: altEs,
  fr: altFr,
  it: altIt,
};

export function getAlternatives(locale: string): Alternative[] {
  return altByLocale[locale] ?? altEn;
}

export function getAlternative(slug: string, locale = 'en'): Alternative | undefined {
  return getAlternatives(locale).find((a) => a.slug === slug);
}
