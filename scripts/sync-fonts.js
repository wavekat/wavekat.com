#!/usr/bin/env node
// Downloads the typefaces the Open Graph card renderer sets its text in.
// Runs as part of `npm run sync`, so `make dev` / `make build` both have them.
//
// Why this exists at all: resvg rasterises SVG from real font files, and the
// site's own webfonts are loaded by the browser from Google's CDN — no use to
// a build-time renderer. So the faces are fetched once into vendor/fonts/
// (gitignored, like public/logos/) and cached there; a second build is a
// no-op.
//
// Why per-script CJK faces rather than one pan-CJK font: Han unification means
// the *same* codepoint is drawn differently in Simplified Chinese, Traditional
// Chinese and Japanese (直, 骨, 令 and hundreds more). Serving a ja page in a
// Simplified face is the typographic equivalent of a spelling mistake, so each
// locale gets the face for its own script — see LOCALE_FONTS in
// scripts/lib/og-fonts.js for which locale resolves to which.
//
// Weight 700 only for CJK: the cards set titles bold, and adding the 500s
// would double a ~16 MB download to letter a 22px eyebrow. Latin keeps both
// weights because Inter is small enough not to care.

import { mkdirSync, writeFileSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FONTS, fontDir } from './lib/og-fonts.js';
import { fetchRetry } from './lib/fetch-retry.js';

// Google Fonts serves whatever format the caller's UA can handle. A modern UA
// gets woff2, which resvg can't read; this Android 4 string is the documented
// way to be handed plain TrueType instead.
const TTF_UA =
  'Mozilla/5.0 (Linux; U; Android 4.0.3; en-us; Galaxy Nexus Build/IML74K) ' +
  'AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30';

const root = join(fileURLToPath(import.meta.url), '../..');
const dir = fontDir(root);

/** sfnt magic — 0x00010000 (TrueType) or 'OTTO' (CFF outlines). */
function looksLikeFont(buf) {
  if (buf.length < 4) return false;
  const tag = buf.readUInt32BE(0);
  return tag === 0x00010000 || tag === 0x4f54544f || tag === 0x74727565;
}

async function fetchFace({ family, weight, file }) {
  const dest = join(dir, file);
  if (existsSync(dest) && looksLikeFont(readFileSync(dest, { length: 4 }))) {
    console.log(`fonts: ${file} already present (${(statSync(dest).size / 1048576).toFixed(1)} MB)`);
    return;
  }

  const cssURL =
    'https://fonts.googleapis.com/css2?family=' +
    encodeURIComponent(family) +
    ':wght@' +
    weight;
  const css = await fetchRetry(cssURL, {
    headers: { 'User-Agent': TTF_UA },
    label: `fonts: ${family} ${weight} CSS`,
  });
  if (!css.ok) throw new Error(`fonts: ${family} ${weight} — CSS request failed (${css.status})`);

  const match = (await css.text()).match(/url\((https:\/\/[^)]+)\)/);
  if (!match) throw new Error(`fonts: ${family} ${weight} — no font URL in the CSS response`);

  const res = await fetchRetry(match[1], { label: `fonts: ${file}`, timeoutMs: 120_000 });
  if (!res.ok) throw new Error(`fonts: ${family} ${weight} — download failed (${res.status})`);

  const buf = Buffer.from(await res.arrayBuffer());
  // Fail loudly rather than cache a redirect page as if it were a typeface —
  // resvg would silently fall back and every CJK card would render in tofu.
  if (!looksLikeFont(buf)) {
    throw new Error(`fonts: ${family} ${weight} — response is not a TrueType/OpenType file`);
  }

  writeFileSync(dest, buf);
  console.log(`fonts: ${file} ← ${family} ${weight} (${(buf.length / 1048576).toFixed(1)} MB)`);
}

mkdirSync(dir, { recursive: true });
for (const face of FONTS) {
  await fetchFace(face);
}
