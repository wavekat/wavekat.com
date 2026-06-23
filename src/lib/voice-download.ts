// WaveKat Voice — download metadata, read live from the release feeds.
//
// The installers live on Cloudflare R2, served at https://dl.wavekat.com/voice/
// (the same origin the app polls for updates). Rather than hard-code versions
// that go stale every release, we read the current ones from electron-builder's
// release feeds at BUILD TIME and derive the download links from them. Bump a
// release in wavekat-voice and the next site build picks it up automatically —
// nothing to edit here.
//
// macOS feed `latest-mac.yml`:
//   version: 0.0.40
//   files:
//     - url: WaveKat Voice-0.0.40-arm64-mac.zip   (the in-app update payload)
//     - url: WaveKat Voice-0.0.40-arm64.dmg       (the human download)  ← we want this
//
// Linux feed `latest-linux.yml`:
//   version: 0.0.40
//   files:
//     - url: WaveKat Voice-0.0.40.AppImage        (the in-app update payload)
//     - url: WaveKat Voice-0.0.40.deb             (the human download)  ← we want this
//
// In both feeds the installer we surface is the file entry that carries a
// `url`, `sha512`, then `size` (the .dmg / .deb). The other entry is the
// self-update payload, which we ignore.

const DL_BASE = 'https://dl.wavekat.com/voice';

export interface Download {
  /** Button label. */
  label: string;
  /** Human-friendly hardware/OS requirement. */
  arch: string;
  /** Current version, e.g. "0.0.26". */
  version: string;
  /** Human-friendly size, e.g. "120 MB". */
  size: string;
  /** Full download URL (spaces percent-encoded). */
  url: string;
}

interface Platform {
  /** electron-builder release feed for this platform. */
  feed: string;
  /** File extension of the human installer, e.g. "dmg" or "deb". */
  ext: string;
  label: string;
  arch: string;
  /** Last known-good release, used if the feed can't be reached at build. */
  fallback: { version: string; fileName: string; sizeBytes: number };
}

const MAC: Platform = {
  feed: `${DL_BASE}/latest-mac.yml`,
  ext: 'dmg',
  label: 'Download for Mac',
  arch: 'Macs with Apple chip (M1 or newer)',
  fallback: {
    version: '0.0.40',
    fileName: 'WaveKat Voice-0.0.40-arm64.dmg',
    sizeBytes: 126241228,
  },
};

const LINUX: Platform = {
  feed: `${DL_BASE}/latest-linux.yml`,
  ext: 'deb',
  label: 'Download for Linux',
  arch: 'Debian & Ubuntu (.deb, 64-bit)',
  fallback: {
    version: '0.0.40',
    fileName: 'WaveKat Voice-0.0.40.deb',
    sizeBytes: 106304532,
  },
};

function mb(bytes: number): string {
  return `${Math.round(bytes / 1024 / 1024)} MB`;
}

async function load(p: Platform): Promise<Download> {
  let { version, fileName, sizeBytes } = p.fallback;

  try {
    const res = await fetch(p.feed, { signal: AbortSignal.timeout(8000) });
    if (res.ok) {
      const yml = await res.text();
      const v = yml.match(/^version:\s*(.+)$/m);
      if (v) version = v[1].trim();
      // The installer file entry (url → sha512 → size), e.g. the .dmg / .deb.
      const re = new RegExp(`url:\\s*(.+\\.${p.ext})\\s*\\n\\s*sha512:[^\\n]*\\n\\s*size:\\s*(\\d+)`);
      const m = yml.match(re);
      if (m) {
        fileName = m[1].trim();
        sizeBytes = parseInt(m[2], 10);
      }
    }
  } catch {
    // Network unavailable at build time — fall back to the constants above.
  }

  return {
    label: p.label,
    arch: p.arch,
    version,
    size: mb(sizeBytes),
    url: `${DL_BASE}/${encodeURIComponent(fileName)}`,
  };
}

// Memoize across pages so a single build does one fetch per platform.
const cache = new Map<Platform, Promise<Download>>();

function get(p: Platform): Promise<Download> {
  let c = cache.get(p);
  if (!c) {
    c = load(p);
    cache.set(p, c);
  }
  return c;
}

export const getMacDownload = (): Promise<Download> => get(MAC);
export const getLinuxDownload = (): Promise<Download> => get(LINUX);
