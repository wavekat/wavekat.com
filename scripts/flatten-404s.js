#!/usr/bin/env node
// Astro special-cases only the root src/pages/404.astro into dist/404.html;
// the per-locale 404 pages build as <locale>/404/index.html like any other
// route. Cloudflare Pages resolves custom 404s by looking for a `404.html`
// file, walking up from the requested path — so flatten each locale's
// 404/index.html into <locale>/404.html for Pages to pick up.
import { readdirSync, renameSync, rmdirSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';

const dist = path.join(process.cwd(), 'dist');
let flattened = 0;

for (const entry of readdirSync(dist)) {
  const nested = path.join(dist, entry, '404', 'index.html');
  if (!existsSync(nested) || !statSync(nested).isFile()) continue;
  renameSync(nested, path.join(dist, entry, '404.html'));
  rmdirSync(path.join(dist, entry, '404'));
  flattened += 1;
}

console.log(`flatten-404s: ${flattened} locale 404 page(s) flattened to 404.html`);
