// Which typefaces the OG cards are set in, and which of them each locale uses.
//
// Shared by scripts/sync-fonts.js (which downloads them) and the card renderer
// (which loads and measures them), so the two can never disagree about what a
// locale needs.

import { join } from 'node:path';
import { existsSync } from 'node:fs';
import { loadFontMetrics } from './font-metrics.js';

export const fontDir = (root) => join(root, 'vendor/fonts');

/** Every face we fetch. `file` is the name it lands under in vendor/fonts/. */
export const FONTS = [
  { family: 'Inter', weight: 500, file: 'Inter-500.ttf' },
  { family: 'Inter', weight: 700, file: 'Inter-700.ttf' },
  { family: 'Noto Sans SC', weight: 700, file: 'NotoSansSC-700.ttf' },
  { family: 'Noto Sans TC', weight: 700, file: 'NotoSansTC-700.ttf' },
  { family: 'Noto Sans JP', weight: 700, file: 'NotoSansJP-700.ttf' },
  { family: 'Noto Sans KR', weight: 700, file: 'NotoSansKR-700.ttf' },
];

// Latin always leads the stack, so "WaveKat", "AI" and a URL are set in Inter
// on every card regardless of locale — the brand reads the same in nine
// languages. The script face behind it only ever catches what Inter has no
// glyph for, which is exactly the CJK.
//
// Han unification is why this is a per-locale map and not one fallback: 直,
// 骨, 令 and hundreds of other shared codepoints are drawn differently in
// Simplified, Traditional and Japanese. One pan-CJK fallback would render some
// locale's page in another locale's letterforms.
const LATIN = { stack: [], files: ['Inter-700.ttf', 'Inter-500.ttf'] };
const withScript = (family, file) => ({ stack: [family], files: [...LATIN.files, file] });

export const LOCALE_FONTS = {
  en: LATIN,
  de: LATIN,
  es: LATIN,
  fr: LATIN,
  it: LATIN,
  'zh-Hans': withScript('Noto Sans SC', 'NotoSansSC-700.ttf'),
  'zh-Hant': withScript('Noto Sans TC', 'NotoSansTC-700.ttf'),
  ja: withScript('Noto Sans JP', 'NotoSansJP-700.ttf'),
  ko: withScript('Noto Sans KR', 'NotoSansKR-700.ttf'),
};

/**
 * The font-family list resvg resolves against, and the metrics used to measure
 * line lengths — in the same order, so what we measure is what gets drawn.
 *
 * Metrics are cached per file: the Simplified face alone is ~6 MB and every
 * zh-Hans card would otherwise re-parse it.
 */
const metricsCache = new Map();

export function fontsForLocale(root, code) {
  const def = LOCALE_FONTS[code] ?? LATIN;
  const dir = fontDir(root);

  const fontFiles = def.files.map((f) => join(dir, f));
  const missing = fontFiles.filter((f) => !existsSync(f));
  if (missing.length) {
    throw new Error(
      `Missing OG card fonts:\n  ${missing.join('\n  ')}\n` +
        'Run `npm run sync:fonts` (or `make sync`) to fetch them.',
    );
  }

  // Inter first, then the locale's script face; `sans-serif` is a last resort
  // that should never be reached, and would be visible if it were.
  const fontStack = ['Inter', ...def.stack, 'sans-serif']
    .map((f) => (f.includes(' ') ? `'${f}'` : f))
    .join(', ');

  const metrics = fontFiles
    .filter((f) => f.endsWith('-700.ttf')) // titles are bold; measure the bold face
    .map((f) => {
      if (!metricsCache.has(f)) metricsCache.set(f, loadFontMetrics(f));
      return metricsCache.get(f);
    });

  return { fontFiles, fontStack, metrics };
}
