#!/usr/bin/env node
// The terms page is one agreement said nine times, and a clause that quietly
// exists in English but not in Korean is the kind of drift nobody sees until
// somebody relies on it. English is the source of truth; every other locale
// must mirror its structure exactly.
//
// This is the same "enforced, not trusted" discipline the desktop app's
// src/locales/completeness.test.ts applies to its translations — the copy
// itself can't be checked by a machine, but its shape can.
//
// Run: node scripts/test/terms-completeness.test.js
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Each locale's data file is imported directly rather than through
// src/lib/terms.ts. Node runs this with type stripping, and its ESM resolver
// wants a real extension — terms.ts imports its nine siblings the
// extensionless way Vite resolves, which Node will not. Importing the leaves
// works because they carry nothing but an erasable `import type`. The registry
// in terms.ts is checked separately, as text, at the bottom of this file.
import { terms as en } from '../../src/lib/terms/en.ts';
import { terms as zhHans } from '../../src/lib/terms/zh.ts';
import { terms as zhHant } from '../../src/lib/terms/zh-hant.ts';
import { terms as ja } from '../../src/lib/terms/ja.ts';
import { terms as ko } from '../../src/lib/terms/ko.ts';
import { terms as de } from '../../src/lib/terms/de.ts';
import { terms as es } from '../../src/lib/terms/es.ts';
import { terms as fr } from '../../src/lib/terms/fr.ts';
import { terms as it } from '../../src/lib/terms/it.ts';

// Keyed by the locale codes in src/lib/i18n.ts. Written out rather than
// derived so that a locale dropped from the registry by accident fails here
// instead of quietly shrinking the set this test covers.
const DOCS = {
  en,
  'zh-Hans': zhHans,
  'zh-Hant': zhHant,
  ja,
  ko,
  de,
  es,
  fr,
  it,
};
const LOCALES = Object.keys(DOCS);
const getTerms = (code) => DOCS[code];

let passed = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  ok   ${name}`);
    passed++;
  } catch (err) {
    console.error(`  FAIL ${name}\n       ${err.message}`);
    process.exitCode = 1;
  }
}


// A locale that isn't registered falls back to English, which would make every
// assertion below pass for a file that doesn't exist. Prove each one is real by
// checking it differs from English somewhere — the headings are the cheapest
// place to look, and "translated" is exactly what we're claiming.
test('every locale has its own copy, not the English fallback', () => {
  for (const code of LOCALES.filter((c) => c !== 'en')) {
    const doc = getTerms(code);
    assert.notEqual(doc.h1, en.h1, `${code}: h1 is still the English string`);
    assert.notEqual(
      doc.sections[0].heading,
      en.sections[0].heading,
      `${code}: first section heading is still English`,
    );
  }
});

test('every locale has the same sections, in the same order', () => {
  const expected = en.sections.map((s) => s.id);
  for (const code of LOCALES) {
    const actual = getTerms(code).sections.map((s) => s.id);
    assert.deepEqual(actual, expected, `${code}: section ids differ from en`);
  }
});

// The block kinds are the document's shape: a list that became a paragraph in
// translation has lost the enumeration a reader scans for.
test('every section has the same block shape as en', () => {
  for (const code of LOCALES) {
    const doc = getTerms(code);
    for (const [i, section] of doc.sections.entries()) {
      const expected = en.sections[i].body.map((b) => b.kind);
      const actual = section.body.map((b) => b.kind);
      assert.deepEqual(actual, expected, `${code}/${section.id}: block kinds differ from en`);
      for (const [j, block] of section.body.entries()) {
        if (block.kind !== 'list') continue;
        assert.equal(
          block.items.length,
          en.sections[i].body[j].items.length,
          `${code}/${section.id}: list has a different number of items than en`,
        );
      }
    }
  }
});

test('every locale has the same number of highlights, lead paragraphs and FAQs', () => {
  for (const code of LOCALES) {
    const doc = getTerms(code);
    assert.equal(doc.lead.length, en.lead.length, `${code}: lead paragraph count differs`);
    assert.equal(doc.highlights.length, en.highlights.length, `${code}: highlight count differs`);
    assert.equal(doc.faqs.length, en.faqs.length, `${code}: FAQ count differs`);
  }
});

// A link dropped in translation is invisible on the page — the sentence still
// reads fine, it just no longer points at the privacy policy. Count them.
const LINK = /\[[^\]]+\]\(([^)]+)\)/g;
function linkTargets(doc) {
  const texts = [
    ...doc.lead,
    ...doc.highlights,
    doc.contactIntro,
    ...doc.sections.flatMap((s) =>
      s.body.flatMap((b) => (b.kind === 'p' ? [b.text] : b.items)),
    ),
  ];
  return texts.flatMap((t) => [...t.matchAll(LINK)].map((m) => m[1])).sort();
}

test('every locale links to the same destinations as en', () => {
  const expected = linkTargets(en);
  for (const code of LOCALES) {
    assert.deepEqual(linkTargets(getTerms(code)), expected, `${code}: link targets differ from en`);
  }
});

// The date is rendered from one Date in src/lib/terms.ts, so `updatedPrefix`
// must not smuggle a second one in — that is how two pages end up claiming
// different last-updated days for the same agreement.
test('no locale hardcodes a date in its updated prefix', () => {
  for (const code of LOCALES) {
    const prefix = getTerms(code).updatedPrefix;
    assert.ok(!/\d/.test(prefix), `${code}: updatedPrefix contains a digit — "${prefix}"`);
  }
});

// The imports above prove the files exist and agree with each other; this
// proves src/lib/terms.ts actually wires them up, which is what the pages read.
test('terms.ts registers every locale', () => {
  const source = readFileSync(
    fileURLToPath(new URL('../../src/lib/terms.ts', import.meta.url)),
    'utf8',
  );
  const map = source.slice(source.indexOf('const byLocale'), source.indexOf('export function getTerms'));
  for (const code of LOCALES) {
    assert.ok(
      map.includes(`'${code}'`) || new RegExp(`\\b${code}:`).test(map),
      `terms.ts byLocale is missing ${code}`,
    );
  }
});

console.log(`\n${passed} passing`);
