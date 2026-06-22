#!/usr/bin/env node
// Validates every internal link in the built site (dist/) before we publish.
// Catches the two ways an internal link goes wrong here:
//
//   1. Broken  — the target page/asset doesn't exist (a 404 waiting to happen).
//   2. Leak    — a localized page (/zh/…, /ja/…) links to the *unprefixed*
//                default-locale URL of a page that DOES have a localized
//                version, bouncing the reader out of their language.
//
// Both are derived from dist/ itself, so there's no second source of truth to
// drift: a link is broken if its file isn't there, and a leak if the localized
// twin (/<slug> + target) is there but the link skipped it. Locale slugs are
// read from src/lib/i18n.ts so adding a language needs no change here.
//
// Run it against a *full* build (with the private docs synced):
//   npm run build && npm run check:links
// Without SYNC_DOCS_TOKEN the voice docs (/docs/voice/*) aren't built; those
// targets are reported as a skipped warning, not a failure, so local runs are
// still useful.
//
// Exit code is non-zero if any broken link or leak is found — wire it into CI
// right after the build.

import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const root = join(fileURLToPath(import.meta.url), "../..");
const dist = join(root, "dist");

if (!existsSync(dist)) {
  console.error("✗ no dist/ — run `npm run build` first.");
  process.exit(1);
}

// Locale slugs straight from the i18n registry (non-empty `slug:` values).
const i18n = readFileSync(join(root, "src/lib/i18n.ts"), "utf8");
const localeSlugs = [...i18n.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
const slugRe = new RegExp(`^/(${localeSlugs.join("|")})(/|$)`);

// Are the private voice docs in this build? If not, don't fail on their URLs.
const voiceDocsBuilt = existsSync(join(dist, "docs/voice"));

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (entry.endsWith(".html")) out.push(p);
  }
  return out;
}

// Does an internal URL path resolve to a built file?
const ASSET_RE = /\.[a-z0-9]+$/i;
function resolves(urlPath) {
  if (ASSET_RE.test(urlPath) && !urlPath.endsWith("/")) {
    return existsSync(join(dist, urlPath));
  }
  // A page: accept dir/index.html, with or without the trailing slash.
  const candidates = [
    join(dist, urlPath, "index.html"),
    join(dist, urlPath.replace(/\/$/, "") + ".html"),
    join(dist, urlPath), // exact file (rare)
  ];
  return candidates.some(existsSync);
}

const pages = walk(dist);
const broken = new Map(); // target -> Set(source page)
const leaks = new Map(); // "page → target" detail
const skipped = new Set(); // synced-doc targets we couldn't check locally
const linkRe = /(?:href|src)="(\/[^":]*?)"/g;

for (const file of pages) {
  const sourceUrl = "/" + file.slice(dist.length + 1).replace(/index\.html$/, "");
  const localeMatch = sourceUrl.match(slugRe);
  const localeSlug = localeMatch ? localeMatch[1] : null;
  // This page's path with the locale prefix stripped — i.e. its default-locale
  // twin. The language switcher on every localized page links to exactly this
  // (its "English" entry), which is correct, not a leak; we exclude it below.
  const ownBasePath = localeSlug ? sourceUrl.replace(slugRe, "/") : sourceUrl;
  const html = readFileSync(file, "utf8");

  let m;
  while ((m = linkRe.exec(html))) {
    const target = m[1].split("#")[0].split("?")[0];
    if (!target || target === "/") continue;

    // Broken-link check.
    if (!resolves(target)) {
      if (!voiceDocsBuilt && target.startsWith("/docs/voice")) {
        skipped.add(target);
      } else {
        if (!broken.has(target)) broken.set(target, new Set());
        broken.get(target).add(sourceUrl);
      }
    }

    // Locale-leak check: a localized page linking to an unprefixed URL whose
    // localized twin exists is a leak (the link should carry the locale). The
    // switcher's own "English" link points at this page's twin (ownBasePath) —
    // that's intentional, so skip it.
    const targetSlash = target.endsWith("/") ? target : target + "/";
    if (
      localeSlug &&
      !slugRe.test(target) &&
      !ASSET_RE.test(target) &&
      targetSlash !== (ownBasePath.endsWith("/") ? ownBasePath : ownBasePath + "/")
    ) {
      const twin = `/${localeSlug}${target}`;
      if (resolves(twin)) {
        leaks.set(`${sourceUrl} → ${target}`, `should be /${localeSlug}${target}`);
      }
    }
  }
}

let failed = false;

if (broken.size) {
  failed = true;
  console.error(`✗ ${broken.size} broken internal link target(s):`);
  for (const [target, srcs] of [...broken].sort()) {
    console.error(`   ${target}`);
    for (const s of [...srcs].sort().slice(0, 5)) console.error(`      ← ${s}`);
    if (srcs.size > 5) console.error(`      … and ${srcs.size - 5} more`);
  }
  console.error("");
}

if (leaks.size) {
  failed = true;
  console.error(`✗ ${leaks.size} locale-leaking link(s) (localized page → default-locale URL):`);
  for (const [where, fix] of [...leaks].sort()) {
    console.error(`   ${where}   (${fix})`);
  }
  console.error("");
}

if (skipped.size) {
  console.warn(
    `⚠ skipped ${skipped.size} /docs/voice/* link(s) — voice docs not synced in ` +
      `this build. Run with SYNC_DOCS_TOKEN to verify them.\n`,
  );
}

if (failed) {
  console.error("Link check failed.");
  process.exit(1);
}
console.log(`✓ links OK — ${pages.length} pages scanned, no broken or leaking internal links.`);
