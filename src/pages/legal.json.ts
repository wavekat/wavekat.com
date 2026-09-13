import { PRIVACY_UPDATED } from '../lib/privacy';
import { TERMS_UPDATED } from '../lib/terms';

// The published "last updated" date of each legal document, machine-readable.
//
// wavekat-platform records which version of the terms (and privacy policy) a
// user agreed to at sign-up, as the page's own YYYY-MM-DD date. It keeps its
// own copy of those dates — sign-up must not depend on this site being up —
// and its CI compares that copy against this file, so the two repos can't
// silently drift apart. The dates here are read from the same constants that
// render the pages' "last updated" lines, so this file can't disagree with
// what a reader sees.
//
// Additive only: the platform reads these keys by name. Adding a document is
// safe; renaming or removing one breaks its check.
const day = (d: Date) => d.toISOString().slice(0, 10);

export function GET() {
  const body = {
    terms: { updated: day(TERMS_UPDATED), url: 'https://wavekat.com/terms/' },
    privacy: { updated: day(PRIVACY_UPDATED), url: 'https://wavekat.com/privacy/' },
  };
  return new Response(JSON.stringify(body, null, 2) + '\n', {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
