// WaveKat Voice — download links and release metadata.
//
// Two facts about the current release reach this site, and both come from
// platform.wavekat.com rather than from a YAML parser in here.
//
//   * The DOWNLOAD LINK names a target, not a file:
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
// A TARGET is one downloadable file, which is finer-grained than a
// platform: Windows and Linux each ship an x64 and an arm64 build, they are
// different sizes, and handing one to the other's machine is a file that
// will not run. See docs/05.
//
// dl.wavekat.com is not read from this repo. The feeds are still ground
// truth — the platform parses them now, so one parser serves both the
// site and the download counter and the two can never disagree about
// which file is current. See docs/04, docs/05, and wavekat-platform
// docs/37 §3.6.
//
// Nothing here is user-visible prose: button labels and the hardware/OS
// requirement are localised chrome and live in the UI strings (i18n.ts
// `dlMac` / `dlLinux` / `dlWindows` / `dlArch*`), so every locale gets
// them in its own language.

export const DOWNLOAD_BASE =
  'https://platform.wavekat.com/api/voice/download/latest';
export const RELEASES_URL =
  'https://platform.wavekat.com/api/voice/releases/latest';

// The Mac App Store listing, and deliberately NOT a PlatformKey. Everything
// below this line is about a file we publish, version, size and count; the
// App Store is a handoff. Apple resolves the storefront, installs the app
// and updates it, and reports none of that back here — so this target has
// no release to read, nothing for the browser-side refresh to correct, and
// no download for the platform to log. It is one constant URL that is
// either offered or it isn't, which is why it stays out of getDownload().
//
// No country segment: Apple's own /nz/ link pins every visitor to the New
// Zealand storefront, while a bare apps.apple.com link redirects each one
// to their own. `mt=12` asks for the Mac App Store rather than iOS.
export const MAC_APP_STORE_URL =
  'https://apps.apple.com/app/wavekat-voice/id6804325185?mt=12';

// The same listing, tagged so App Store Connect attributes what follows
// the click. This is the ONE number nobody else can give us: Apple counts
// the product page view and the install, we cannot, and a click on our
// side is intent rather than a download (see the comment above).
//
// Both halves of the pair matter and neither is invented here: `pt` names
// the provider the campaign belongs to and `ct` names the campaign, and a
// `ct` arriving without its `pt` is read and discarded. They come from
// App Store Connect → Analytics → Acquisition → Campaigns.
//
// The pair is appended to OUR url rather than pasted from Apple's
// generator, which emits `/app/apple-store/id…?…&mt=8` — the iOS default
// on a Mac-only app. `mt` is a media-type hint that plays no part in
// attribution (that keys on `pt`/`ct` against the app id), so taking the
// generated link whole would trade away the `mt=12` chosen above for
// nothing. Same reasoning keeps the readable slug: the id governs, the
// slug is cosmetic.
//
// ONE campaign for the whole site, not one per surface. App Store Connect
// suppresses a campaign until at least five distinct Apple Accounts have
// installed from it, so splitting the home page from /voice/download/
// today would put every split under that floor and report nothing at all.
// Split when the total comfortably clears five per surface.
//
// Deliberately NOT the canonical URL. MAC_APP_STORE_URL stays untagged for
// `installUrl` / `sameAs` in the /voice/ structured data: schema should
// name the listing, not our attribution of it.
export const MAC_APP_STORE_CAMPAIGN_URL =
  `${MAC_APP_STORE_URL}&pt=128951683&ct=wavekat-com`;

// The Microsoft Store listing, and a handoff for every reason the Mac App
// Store one is: Microsoft resolves the storefront, signs the package,
// installs it and updates it, and reports none of that back here. So this
// target has no release to read a version or a size from, nothing for the
// browser-side refresh to correct, and no download for the platform to
// log — which is why it stays out of getDownload() and off PlatformKey.
//
// It is also the only Windows target that names no architecture. The
// listing carries both the x64 and the arm64 package and the Store hands
// each machine its own, so one URL serves every Windows PC we support.
// The two direct installers below cannot do that, which is why they
// remain two separate targets.
//
// No locale segment, for the reason the Apple link has none: an /en-us/
// path pins every visitor to the US storefront, while a bare
// apps.microsoft.com link redirects each one to their own.
export const MS_STORE_URL = 'https://apps.microsoft.com/detail/9N7F4FSRVNZB';

// The same listing, tagged so Partner Center can attribute the installs
// that started here — the Windows half of the one number nobody else can
// give us, since Microsoft counts the product page view and the install
// and we cannot.
//
// Simpler than Apple's pair: the Microsoft Store reads one custom campaign
// ID from `cid`, so there is no provider half that a missing value would
// invalidate. `?` and not `&` — unlike the App Store link, this URL
// carries no query of its own.
//
// Deliberately NOT the canonical URL, exactly as with the Mac pair:
// MS_STORE_URL stays untagged for `sameAs` in the /voice/ structured data,
// because schema should name the listing and not our attribution of it.
export const MS_STORE_CAMPAIGN_URL = `${MS_STORE_URL}?cid=wavekat-com`;

// The Snap Store listing — the third store handoff, and a handoff for every
// reason the other two are: Canonical resolves the channel, installs the
// snap and updates it in the background, and reports none of that back here.
// So it has no release to read a version or a size from, nothing for the
// browser-side refresh to correct, and no download for the platform to log,
// which is why it stays out of getDownload() and off PlatformKey.
//
// Like the Microsoft Store listing and unlike the two .deb targets, it names
// no architecture: the one snap name carries both amd64 and arm64 revisions
// and `snap install` hands each machine its own. The .deb pair cannot do
// that, which is why those remain two separate targets.
//
// No locale segment, for the reason the Apple and Microsoft links have none
// — snapcraft.io serves one URL to every visitor.
export const SNAP_STORE_URL = 'https://snapcraft.io/wavekat-voice';

// There is deliberately NO campaign-tagged twin of the URL above, and its
// absence is a fact about the Snap Store rather than an oversight here.
//
// Apple takes `pt`/`ct` and Microsoft takes `cid`, so each of those listings
// has a tagged URL for the link and an untagged one for `sameAs` in the
// structured data. Canonical publishes no install-attribution parameter at
// all — snapcraft.io accepts no referrer key, and the Snap Store metrics we
// can see (snapcraft.io/wavekat-voice/metrics) count installs by country and
// distro with no notion of where the click came from. So one constant serves
// both the link and the schema, and nobody should add a `_CAMPAIGN_URL`
// here expecting it to be read.
//
// The practical consequence is worth knowing when reading the numbers: snap
// installs cannot be attributed to this site the way App Store and Partner
// Center installs can.

/**
 * The terminal install, printed beside the Snap Store row.
 *
 * A Linux visitor who is already in a terminal does not want a web page, and
 * this line is also the single most quotable thing on the download page — an
 * answer engine asked "how do I install WaveKat Voice on Ubuntu" lifts a
 * command verbatim far more readily than it lifts a button.
 *
 * It names no channel, which is only correct once a revision is released to
 * `latest/stable`: `snap install` defaults to the stable channel, and on a
 * snap published to `beta` alone this exact command fails with "no snap
 * revision on channel 'stable'". Keep that release ahead of this string.
 */
export const SNAP_INSTALL_CMD = 'sudo snap install wavekat-voice';

export type PlatformKey =
  | 'mac'
  | 'linux-x64'
  | 'linux-arm64'
  | 'windows-x64'
  | 'windows-arm64';

export interface Download {
  /** Current version, e.g. "0.0.46". */
  version: string;
  /** Human-friendly size, e.g. "120 MB". */
  size: string;
  /** The logged, version-less download link for this target. */
  url: string;
}

interface Release {
  version: string;
  sizeBytes: number;
}

type LatestReleases = Partial<Record<PlatformKey, Release | null>>;

// Used only when the endpoint cannot be reached at build time (an offline
// `make build`). A stale number here is cosmetic — the button still
// resolves to whatever is current, because it names no version.
//
// Every target listed here has shipped at least once, which is the whole
// entry requirement: a constant for a target that has never published
// renders a button that 404s on the only build path that reads this
// table. `windows-arm64` was held out for exactly that reason until
// 0.0.46 built one.
const FALLBACK: Partial<Record<PlatformKey, Release>> = {
  mac: { version: '0.0.46', sizeBytes: 125596265 },
  'linux-x64': { version: '0.0.46', sizeBytes: 106842816 },
  // `linux-arm64` is held out under the rule above — no release has built
  // one yet. Add it with a real size once one has.
  'windows-x64': { version: '0.0.46', sizeBytes: 98710571 },
  'windows-arm64': { version: '0.0.46', sizeBytes: 104657605 },
};

function mb(bytes: number): string {
  return `${Math.round(bytes / 1024 / 1024)} MB`;
}

// Memoized so a single build does one fetch, not one per page per locale.
// `null` means the endpoint could not be read at all, which is a different
// thing from a target it reported as unpublished.
let latest: Promise<LatestReleases | null> | undefined;

function loadLatest(): Promise<LatestReleases | null> {
  latest ??= fetch(RELEASES_URL, { signal: AbortSignal.timeout(8000) })
    .then((res) => (res.ok ? (res.json() as Promise<LatestReleases>) : null))
    .catch(() => null);
  return latest;
}

/**
 * The current release for one target, or `null` when the platform says it
 * is not published.
 *
 * A null is a real answer, not a gap to paper over: the endpoint nulls a
 * target the current release did not build, and every Windows release
 * before the ARM one built exactly one installer. Falling back to a
 * constant there would put a choice on the page that resolves to a 404.
 */
export async function getDownload(key: PlatformKey): Promise<Download | null> {
  const releases = await loadLatest();
  const release = releases ? (releases[key] ?? null) : (FALLBACK[key] ?? null);
  if (!release) return null;

  return {
    version: release.version,
    size: mb(release.sizeBytes),
    url: `${DOWNLOAD_BASE}/${key}?src=web`,
  };
}
