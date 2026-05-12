// Reads sync-docs.js output. Returns {} before the first sync run.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const path = fileURLToPath(new URL('../content/docs/versions.json', import.meta.url));

export function getDocsVersions(): Record<string, string> {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return {};
  }
}
