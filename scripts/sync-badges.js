#!/usr/bin/env node
// Downloads the official Mac App Store and Microsoft Store badges into
// public/badges/. Runs as part of `npm run sync`, so `make dev` and
// `make build` both have them.
//
// Why fetched rather than committed
// ---------------------------------
// The artwork is Apple's and Microsoft's, published by each at a stable
// public endpoint, and we are not allowed to alter it — which makes a
// checked-in copy a stale fork of someone else's asset with no upside. So
// the badges are cached in gitignored public/badges/ exactly the way the
// OG card typefaces are cached in vendor/fonts/: fetched once, skipped on
// every later build, and refreshed by deleting the directory.
//
// This is the opposite call from public/screenshots/, which IS committed —
// and the difference is the source, not the file type. Screenshots come
// from a private renderer that Cloudflare Pages cannot reach at build
// time. These endpoints are public and unauthenticated, so the build can.
//
// Why it throws instead of skipping
// ---------------------------------
// A missing badge is not a missing decoration: the badge IS the download
// control on the Mac and Windows surfaces after this change, so a page
// that renders without one has no visible way to get the app. Failing the
// build is strictly better than shipping that, and matches how the favicon
// tint step refuses to silently ship the wrong asset.
//
// Usage:
//   node scripts/sync-badges.js          # download what's missing
//   node scripts/sync-badges.js --check  # verify all present, no network

import { mkdirSync, writeFileSync, readFileSync, existsSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { badgeFiles } from './lib/store-badges.js';
import { fetchRetry } from './lib/fetch-retry.js';

const root = join(fileURLToPath(import.meta.url), '../..');
const destRoot = join(root, 'public/badges');
const check = process.argv.includes('--check');

const files = badgeFiles();

// A badge is "present" only if it is actually SVG. An endpoint that starts
// returning an HTML error page would otherwise be cached forever as a
// zero-value file that every later build happily skips — the same trap
// sync-fonts.js guards with its sfnt magic check.
function looksLikeSvg(buf) {
  const head = buf.subarray(0, 512).toString('utf8').trimStart();
  return head.startsWith('<svg') || head.startsWith('<?xml');
}

if (check) {
  const missing = [];
  for (const f of files) {
    const dest = join(destRoot, f.path);
    if (!existsSync(dest) || !looksLikeSvg(readFileSync(dest))) missing.push(f.path);
  }
  if (missing.length) {
    console.error(`✗ badges: ${missing.length} of ${files.length} missing or not SVG:`);
    for (const p of missing) console.error(`    ${p}`);
    console.error('  run `npm run sync:badges` (or `make sync`) to fetch them.');
    process.exit(1);
  }
  console.log(`✓ badges OK — ${files.length} store badges present.`);
  process.exit(0);
}

let fetched = 0;
let cached = 0;

for (const f of files) {
  const dest = join(destRoot, f.path);

  if (existsSync(dest) && looksLikeSvg(readFileSync(dest))) {
    cached++;
    continue;
  }

  const res = await fetchRetry(f.url, { timeoutMs: 15_000, label: `badges: ${f.path}` });
  if (!res.ok) {
    throw new Error(`badges: ${f.path} — download failed (${res.status}) from ${f.url}`);
  }

  const buf = Buffer.from(await res.arrayBuffer());
  if (!looksLikeSvg(buf)) {
    throw new Error(`badges: ${f.path} — response from ${f.url} is not an SVG`);
  }

  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, buf);
  fetched++;
}

const bytes = files.reduce((n, f) => n + statSync(join(destRoot, f.path)).size, 0);
console.log(
  `badges: ${files.length} present (${fetched} fetched, ${cached} cached, ` +
    `${(bytes / 1024).toFixed(0)} KB)`,
);
