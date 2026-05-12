// Reads sync-docs.js output. Returns {} before the first sync run.
// Resolved from process.cwd() because import.meta.url points into the Vite
// bundle (not the source tree) during the production build, which would
// break a path computed from `new URL(..., import.meta.url)`.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const versionsPath = resolve(process.cwd(), 'src/content/docs/versions.json');

export function getDocsVersions(): Record<string, string> {
  try {
    return JSON.parse(readFileSync(versionsPath, 'utf8'));
  } catch {
    return {};
  }
}
