// WaveKat Voice — download links and release metadata.
//
// Two facts about the current release reach this site, and both now come
// from platform.wavekat.com rather than from a YAML parser in here.
//
//   * The DOWNLOAD LINK names a platform, not a file:
//     /api/voice/download/latest/mac?src=web. The platform reads the
//     electron-builder channel feed, records the download, and 302s to
//     the installer on dl.wavekat.com. So nothing in the delivered HTML
//     resolves to a file, a link lifted out of the page is still a link
//     that gets counted, and a release is offered the moment it ships
//     instead of at the next site build.
//
//   * The VERSION AND SIZE printed beside the button are read here at
//     BUILD time and refreshed in the browser from the same endpoint
//     (see VoiceDownload.astro). The build value keeps a real number in
//     the HTML for crawlers and answer engines; the refresh keeps it
//     true for a visitor when a release lands between deploys.
//
// dl.wavekat.com is no longer read from this repo. The feeds are still
// ground truth — the platform parses them now, so one parser serves both
// the site and the download counter and the two can never disagree about
// which file is current. See docs/04, and wavekat-platform docs/37 §3.6.
//
// Nothing here is user-visible prose: button labels and the hardware/OS
// requirement are localised chrome and live in the UI strings (i18n.ts
// `dlMac` / `dlLinux` / `dlArchMac` / `dlArchLinux`), so every locale gets
// them in its own language.

export const DOWNLOAD_BASE =
  'https://platform.wavekat.com/api/voice/download/latest';
export const RELEASES_URL =
  'https://platform.wavekat.com/api/voice/releases/latest';

export type PlatformKey = 'mac' | 'linux';

export interface Download {
  /** Current version, e.g. "0.0.26". */
  version: string;
  /** Human-friendly size, e.g. "120 MB". */
  size: string;
  /** The logged, version-less download link for this platform. */
  url: string;
}

interface Release {
  version: string;
  sizeBytes: number;
}

type LatestReleases = Partial<Record<PlatformKey, Release | null>>;

// Used only when the endpoint can't be reached at build time (an offline
// `make build`). A stale number here is cosmetic — the button still
// resolves to whatever is current, because it names no version.
const FALLBACK: Record<PlatformKey, Release> = {
  mac: { version: '0.0.40', sizeBytes: 126241228 },
  linux: { version: '0.0.40', sizeBytes: 106304532 },
};

function mb(bytes: number): string {
  return `${Math.round(bytes / 1024 / 1024)} MB`;
}

// Memoized so a single build does one fetch, not one per page per locale.
let latest: Promise<LatestReleases> | undefined;

function loadLatest(): Promise<LatestReleases> {
  latest ??= fetch(RELEASES_URL, { signal: AbortSignal.timeout(8000) })
    .then((res) => (res.ok ? (res.json() as Promise<LatestReleases>) : {}))
    .catch(() => ({}));
  return latest;
}

async function get(key: PlatformKey): Promise<Download> {
  const releases = await loadLatest();
  // `??` rather than `||`: the endpoint nulls a platform it could not
  // resolve, and null must fall through to the constants.
  const { version, sizeBytes } = releases[key] ?? FALLBACK[key];

  return {
    version,
    size: mb(sizeBytes),
    url: `${DOWNLOAD_BASE}/${key}?src=web`,
  };
}

export const getMacDownload = (): Promise<Download> => get('mac');
export const getLinuxDownload = (): Promise<Download> => get('linux');
