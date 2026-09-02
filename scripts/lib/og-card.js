// Builds a 1200×630 Open Graph card SVG for one page.
//
// The card is title + brand only: the page's own <title> set large on the
// WaveKat OG background, so the unfurl says what the page is at the ~500px
// width Slack/X/LinkedIn actually render. The background (gradient, waves,
// dot grid, glow) is lifted verbatim from vendor/wavekat-brand/assets/og.svg
// so the cards and the sitewide og.png stay one family.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { measure } from './font-metrics.js';

const W = 1200;
const H = 630;
const PAD = 72;

// Title block: auto-fit down this ladder until it fits MAX_LINES.
const TITLE_SIZES = [80, 72, 64, 56, 48];
const MAX_LINES = 3;
const LINE_RATIO = 1.16;
const TITLE_MIDDLE = 358; // vertical centre of the title block
const TRACKING = -1.5; // px of letter-spacing, matched in the <text> below

/**
 * The background layer of og.svg: everything from <defs> through the centre
 * hairline, i.e. the brand ground with its own wordmark/tagline left out so we
 * can set the page's title there instead.
 */
export function loadBackground(brandDir) {
  const svg = readFileSync(join(brandDir, 'og.svg'), 'utf8');
  const start = svg.indexOf('<defs');
  const end = svg.indexOf('<!-- ======== FOREGROUND LAYER ======== -->');
  if (start === -1 || end === -1) {
    throw new Error('og.svg no longer has the expected defs/foreground markers');
  }
  return svg.slice(start, end);
}

/**
 * The tight wordmark, inlined as a nested <svg> so resvg scales it for us.
 * The `-dark` variant is the one with light ink — it is named for the
 * background it sits on, and the card's ground is the dark brand gradient.
 */
export function loadWordmark(brandDir) {
  const svg = readFileSync(
    join(brandDir, 'logos/wavekat-tight-dark.svg'),
    'utf8',
  );
  const inner = svg.slice(svg.indexOf('>', svg.indexOf('<svg')) + 1, svg.lastIndexOf('</svg>'));
  return inner;
}

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ESC[c]);

const isCJK = (ch) => /[　-ヿ㐀-䶿一-鿿가-힯＀-￯]/.test(ch);

/**
 * Split into the smallest pieces we may break between, remembering whether a
 * space preceded each one. Latin breaks at spaces; CJK has no spaces so it
 * breaks between characters — but Korean *does* space its words, so the
 * original spacing has to survive the split or the title renders as one run.
 */
function tokenize(text) {
  const units = [];
  let latin = '';
  let latinSpace = false;
  let pendingSpace = false;

  const flushLatin = () => {
    if (latin) { units.push({ text: latin, space: latinSpace }); latin = ''; }
  };

  for (const ch of text) {
    if (/\s/.test(ch)) { flushLatin(); pendingSpace = true; continue; }
    if (isCJK(ch)) {
      flushLatin();
      units.push({ text: ch, space: pendingSpace });
      pendingSpace = false;
    } else {
      if (!latin) { latinSpace = pendingSpace; pendingSpace = false; }
      latin += ch;
    }
  }
  flushLatin();
  return units;
}

/**
 * Wrap `text` to at most `maxLines` lines no wider than `maxWidth`, measured
 * on the real font metrics plus the tracking the <text> element will apply.
 * Returns null when it doesn't fit, so the caller can try a smaller size.
 */
function wrap(text, fonts, size, tracking, maxWidth, maxLines) {
  const width = (s) => measure(s, fonts, size) + tracking * Math.max(0, [...s].length - 1);
  const lines = [];
  let line = '';

  for (const unit of tokenize(text)) {
    const next = line + (unit.space && line ? ' ' : '') + unit.text;
    if (line && width(next) > maxWidth) {
      lines.push(line);
      line = unit.text; // a leading space is dropped at the start of a line
      if (lines.length > maxLines) return null;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) return null;
  // A single unbreakable token wider than the box can't be fixed by wrapping.
  if (lines.some((l) => width(l) > maxWidth)) return null;
  return lines;
}

/**
 * @param {object} o
 * @param {string} o.title     the page's own <title> — the thing that earns the click
 * @param {string} o.eyebrow   small label above it (section, e.g. "Blog")
 * @param {string} o.footer    muted line at the bottom (e.g. "wavekat.com/blog")
 * @param {string} o.fontStack CSS font-family list resvg resolves against
 * @param {object[]} o.fonts   loaded metrics for the fonts in that stack
 */
export function buildCardSVG({ title, eyebrow, footer, background, wordmark, fontStack, fonts }) {
  const maxWidth = W - PAD * 2;

  let size = TITLE_SIZES.at(-1);
  let lines = null;
  for (const candidate of TITLE_SIZES) {
    const attempt = wrap(title, fonts, candidate, TRACKING, maxWidth, MAX_LINES);
    if (attempt) { size = candidate; lines = attempt; break; }
  }
  // Nothing fit even at the smallest size — either the title is very long, or
  // it holds one unbreakable token wider than the card (a long URL, say).
  // Take the best wrap available and clip to MAX_LINES: an overset card is a
  // better outcome than a build that dies over a headline.
  if (!lines) {
    lines = (wrap(title, fonts, size, TRACKING, maxWidth, Infinity) ?? [title]).slice(
      0,
      MAX_LINES,
    );
  }

  const lineHeight = size * LINE_RATIO;
  // Centre the title block in the space between the eyebrow and the rule, so a
  // one-line CJK title and a three-line English one both sit optically level
  // instead of one hugging the floor. The +0.35em shifts from the baseline to
  // roughly the middle of the cap height.
  const firstBaseline =
    TITLE_MIDDLE - ((lines.length - 1) * lineHeight) / 2 + size * 0.35;

  const titleTspans = lines
    .map((l, i) => `<tspan x="${PAD}" y="${firstBaseline + i * lineHeight}">${esc(l)}</tspan>`)
    .join('');

  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
${background}
  <!-- ======== FOREGROUND ======== -->
  <svg x="${PAD}" y="56" width="176" height="50" viewBox="50 12 184 53">${wordmark}</svg>

  <text x="${PAD}" y="196" font-family="${fontStack}" font-size="22" font-weight="500"
        letter-spacing="3.5" fill="#ff6d00">${esc(eyebrow.toUpperCase())}</text>

  <text font-family="${fontStack}" font-size="${size}" font-weight="700"
        letter-spacing="${TRACKING}" fill="#ffffff">${titleTspans}</text>

  <path d="M ${PAD},516 h 64 v 3 H ${PAD} Z" fill="#ff6d00" opacity="0.9"/>
  <text x="${PAD}" y="566" font-family="${fontStack}" font-size="24" font-weight="500"
        fill="#8b93a1">${esc(footer)}</text>

  <path style="opacity:0.08;fill:#ffffff" d="M 0,0 H ${W} V 2 H 0 Z"/>
  <path style="opacity:0.08;fill:#ffffff" d="m 0,${H - 2} h ${W} v 2 H 0 Z"/>
</svg>`;
}
