#!/usr/bin/env node
// /legal.json is only worth publishing if it says the same date the pages
// show. That holds as long as every page and the JSON read one constant per
// document — so this checks that nobody has put a hard-coded date back on a
// page, which is exactly how the nine privacy pages used to carry nine copies.
//
// Run: node scripts/test/legal-dates.test.js
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { PRIVACY_UPDATED } from '../../src/lib/privacy.ts';

const root = fileURLToPath(new URL('../../', import.meta.url));
const read = (p) => readFileSync(join(root, p), 'utf8');

// A real, UTC-midnight day — what `toISOString().slice(0, 10)` turns into the
// YYYY-MM-DD the platform stores.
assert.ok(!Number.isNaN(PRIVACY_UPDATED.getTime()), 'PRIVACY_UPDATED is not a valid date');
assert.match(PRIVACY_UPDATED.toISOString(), /T00:00:00\.000Z$/, 'PRIVACY_UPDATED must be a bare day');

// Every privacy page: the English one plus one per locale directory.
const pagesDir = join(root, 'src/pages');
const privacyPages = ['src/pages/privacy.astro'];
for (const entry of readdirSync(pagesDir)) {
  const candidate = join('src/pages', entry, 'privacy.astro');
  if (statSync(join(pagesDir, entry)).isDirectory()) {
    try {
      read(candidate);
      privacyPages.push(candidate);
    } catch {}
  }
}
assert.equal(privacyPages.length, 9, `expected 9 privacy pages, found ${privacyPages.length}`);

for (const page of privacyPages) {
  const src = read(page);
  assert.match(src, /import \{ PRIVACY_UPDATED \} from '[./]+lib\/privacy';/, `${page} must import PRIVACY_UPDATED`);
  assert.doesNotMatch(src, /new Date\(/, `${page} must not hard-code its date — use PRIVACY_UPDATED`);
}

// The terms pages render through one component; same rule.
assert.doesNotMatch(read('src/components/TermsContent.astro'), /new Date\(/, 'TermsContent.astro must use TERMS_UPDATED');

// The JSON reads both constants rather than restating them.
const json = read('src/pages/legal.json.ts');
assert.match(json, /TERMS_UPDATED/, 'legal.json must read TERMS_UPDATED');
assert.match(json, /PRIVACY_UPDATED/, 'legal.json must read PRIVACY_UPDATED');
assert.doesNotMatch(json, /\d{4}-\d{2}-\d{2}/, 'legal.json must not hard-code a date');

console.log(`ok — ${privacyPages.length} privacy pages and /legal.json read one date per document`);
