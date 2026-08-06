#!/usr/bin/env node
// Enforces the SERP snippet budgets in CLAUDE.md against the *built* site.
//
// The budgets were already written down and every locale of /voice/prompts/
// still shipped over them — a paragraph in CLAUDE.md is not a check. This is
// the check. It reads dist/, so it measures what actually reaches the SERP,
// including the ` — WaveKat` suffix Post.astro appends to blog titles (that
// suffix is subtracted before measuring, so the budget applies to the part an
// author actually types).
//
// Budgets, per CLAUDE.md § "Length budgets are hard limits":
//
//   CJK (zh-Hans, zh-Hant, ja, ko)  title ≤ 28   description ≤ 85
//   everything else                 title ≤ 50   description ≤ 160
//
// CJK is tighter because Google truncates on pixel width, not characters, and
// a CJK glyph is roughly twice as wide as a Latin one.
//
// A too-short description is a softer failure — Google just rewrites it — so
// those are warnings, not errors.
//
// Pages whose meta comes from the private wavekat-voice sync (/docs/** and the
// changelog frontmatter) can't be fixed from this repo — `npm run sync:docs`
// would overwrite the edit. Those are reported as UPSTREAM warnings so they
// stay visible, and fixed in wavekat-voice's docs/site/*.md instead. Same
// convention check-links.js uses for un-synced voice docs.
//
//   npm run build && npm run check:meta
//
// Exit code is non-zero if any page busts a budget. Wire it into CI right
// after the build, next to check:links.

import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";
import { fileURLToPath } from "url";

const root = join(fileURLToPath(import.meta.url), "../..");
const dist = join(root, "dist");

if (!existsSync(dist)) {
  console.error("✗ no dist/ — run `npm run build` first.");
  process.exit(1);
}

const CJK = /^(zh|ja|ko)/;
const budget = (lang) =>
  CJK.test(lang) ? { title: 28, desc: 85, descMin: 40 } : { title: 50, desc: 160, descMin: 110 };

// Post.astro appends this to blog titles; the author only controls the rest.
const BRAND_SUFFIX = " — WaveKat";

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

// Minimal entity decode — enough for what Astro emits into <title>/<meta>.
const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");

// Meta this repo can't author: synced from the private wavekat-voice upstream.
const isUpstream = (url) => url.startsWith("/docs/") || /\/voice\/changelog\/$/.test(url);

const errors = [];
const warnings = [];
const upstream = [];

for (const file of walk(dist)) {
  const html = readFileSync(file, "utf8");
  const url = "/" + relative(dist, file).replace(/index\.html$/, "").replace(/\\/g, "/");

  // 404 pages have no SERP presence worth budgeting.
  if (url.startsWith("/404")) continue;
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) continue;

  const lang = (html.match(/<html[^>]*\blang="([^"]+)"/) || [])[1] || "en";
  const b = budget(lang);
  const over = isUpstream(url) ? upstream : errors;

  let title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
  let desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];

  if (!title) {
    over.push(`${url}  — no <title>`);
  } else {
    title = decode(title).trim();
    if (title.endsWith(BRAND_SUFFIX)) title = title.slice(0, -BRAND_SUFFIX.length);
    const n = [...title].length;
    if (n > b.title) over.push(`${url}  title ${n}/${b.title} [${lang}]  ${title}`);
  }

  if (desc === undefined) {
    over.push(`${url}  — no meta description`);
  } else {
    desc = decode(desc).trim();
    const n = [...desc].length;
    if (n > b.desc) over.push(`${url}  desc ${n}/${b.desc} [${lang}]  ${desc.slice(0, 60)}…`);
    else if (n < b.descMin) warnings.push(`${url}  desc only ${n} (aim ${b.descMin}–${b.desc}) [${lang}]`);
  }
}

for (const w of warnings) console.warn(`⚠ ${w}`);

if (upstream.length) {
  console.warn(`\n⚠ ${upstream.length} page(s) over budget in synced upstream meta —`);
  console.warn("  fix in wavekat-voice/docs/site/*.md, not here (sync:docs overwrites it):");
  for (const u of upstream) console.warn(`    ${u}`);
  console.warn("");
}

if (errors.length) {
  console.error(`\n✗ ${errors.length} page(s) over the SERP snippet budget:\n`);
  for (const e of errors) console.error(`  ${e}`);
  console.error("\nSee CLAUDE.md § SEO & GEO — length budgets are hard limits.");
  process.exit(1);
}

console.log(
  `✓ meta OK — titles and descriptions within budget` +
    (warnings.length ? ` (${warnings.length} short-description warning(s))` : "")
);
