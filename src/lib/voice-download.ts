// WaveKat Voice — macOS download metadata, read live from the release feed.
//
// The installers live on Cloudflare R2, served at https://dl.wavekat.com/voice/
// (the same origin the app polls for updates). Rather than hard-code a version
// that goes stale every release, we read the current one from the macOS release
// feed at BUILD TIME and derive the download link from it. Bump a release in
// wavekat-voice and the next site build picks it up automatically — nothing to
// edit here.
//
// `latest-mac.yml` looks like:
//   version: 0.0.21
//   files:
//     - url: WaveKat Voice-0.0.21-arm64-mac.zip   (the in-app update payload)
//       size: 120567410
//     - url: WaveKat Voice-0.0.21-arm64.dmg        (the human download)
//       size: 125294046
// We want the .dmg entry — the .zip is what the app uses to update itself.
//
// macOS only for now — that's the only platform the site surfaces.

const FEED = 'https://dl.wavekat.com/voice/latest-mac.yml';
const DL_BASE = 'https://dl.wavekat.com/voice';

// Used only if the feed can't be reached during a build, so a network blip
// never breaks the site. Reflects the last known-good release.
const FALLBACK = {
  version: '0.0.21',
  fileName: 'WaveKat Voice-0.0.21-arm64.dmg',
  sizeBytes: 125294046,
};

export interface MacDownload {
  /** Button label. */
  label: string;
  /** Human-friendly hardware requirement. */
  arch: string;
  /** Current version, e.g. "0.0.21". */
  version: string;
  /** Human-friendly size, e.g. "120 MB". */
  size: string;
  /** Full download URL (spaces percent-encoded). */
  url: string;
}

function mb(bytes: number): string {
  return `${Math.round(bytes / 1024 / 1024)} MB`;
}

// Memoize across pages so a single build does one fetch, not one per page.
let cache: Promise<MacDownload> | null = null;

export function getMacDownload(): Promise<MacDownload> {
  if (!cache) cache = load();
  return cache;
}

async function load(): Promise<MacDownload> {
  let { version, fileName, sizeBytes } = FALLBACK;

  try {
    const res = await fetch(FEED, { signal: AbortSignal.timeout(8000) });
    if (res.ok) {
      const yml = await res.text();
      const v = yml.match(/^version:\s*(.+)$/m);
      if (v) version = v[1].trim();
      // The .dmg file entry, plus the `size:` line that follows it.
      const dmg = yml.match(/url:\s*(.+\.dmg)\s*\n\s*sha512:[^\n]*\n\s*size:\s*(\d+)/);
      if (dmg) {
        fileName = dmg[1].trim();
        sizeBytes = parseInt(dmg[2], 10);
      }
    }
  } catch {
    // Network unavailable at build time — fall back to the constants above.
  }

  return {
    label: 'Download for Mac',
    arch: 'Macs with Apple chip (M1 or newer)',
    version,
    size: mb(sizeBytes),
    url: `${DL_BASE}/${encodeURIComponent(fileName)}`,
  };
}
