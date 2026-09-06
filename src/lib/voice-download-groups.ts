// The one list of download choices, read by both surfaces that show them:
// the compact menu in `VoiceDownload.astro` and the full grid in
// `VoiceDownloadAll.astro`. One list, so the two can never disagree about
// what exists, what it's called, or which machine it's for.
//
// It carries no icons. A row's icon is decided by its platform and nothing
// else, so it belongs to the component that draws a row rather than to the
// data — which keeps this a plain `.ts` module with no component imports.
import type { UIStrings } from './i18n';
import type { Download } from './voice-download';

/**
 * Which machine a row is promoted for, and the reason a row is on one
 * surface or the other.
 *
 * `default` is the row a visitor on that platform gets when nothing more is
 * known; `arm64` is the one they get instead once the browser confirms an
 * ARM64 chip. Those two are promotable, which is exactly what makes a row a
 * candidate for the button — and what puts it in the menu.
 *
 * `direct` and `direct-arm64` are promoted by nothing. They are the
 * installers we hand out ourselves when a store already covers the platform
 * better, so they live on the download page, in the open, rather than in a
 * menu that should only ever offer the one recommended control per system.
 */
export type ArchKey = 'default' | 'arm64' | 'direct' | 'direct-arm64';

export const isPromotable = (archKey: ArchKey) => archKey === 'default' || archKey === 'arm64';

export interface DownloadRow {
  /** Platform target, and the key the download endpoint resolves. */
  key: string;
  archKey: ArchKey;
  conversion: string;
  label: string;
  /** The hardware requirement line under the label. */
  arch: string;
  /** Set for a store handoff, which is a link rather than a download. */
  href: string | null;
  /** Set for a file we publish, which is where a version and size come from. */
  dl: Download | null;
}

export interface DownloadGroup {
  key: PlatformGroupKey;
  /** Column heading on the grid. A product name, so it isn't translated. */
  title: string;
  /** Only Windows carries the unsigned-download note under its column. */
  windows: boolean;
  rows: DownloadRow[];
}

export type PlatformGroupKey = 'mac' | 'windows' | 'linux';

export interface GroupDownloads {
  mac: Download | null;
  linuxX64: Download | null;
  linuxArm: Download | null;
  winX64: Download | null;
  winArm: Download | null;
}

export interface GroupUrls {
  macAppStore: string;
  msStore: string;
}

/**
 * Build the three platform groups.
 *
 * Ordered Mac, Windows, Linux — the order the grid reads in, and the order
 * of the desktop market. The menu re-orders nothing; it filters.
 */
export function buildGroups(ui: UIStrings, dl: GroupDownloads, urls: GroupUrls): DownloadGroup[] {
  return [
    {
      key: 'mac',
      title: 'Mac',
      windows: false,
      rows: [
        {
          // The Mac App Store is the default Mac primary. It carries an
          // `href` and no `dl`: there is no release behind it to read a
          // version or a size from, and nothing for the browser-side
          // refresh to correct — Apple owns the whole handoff.
          key: 'mac-app-store',
          archKey: 'default',
          conversion: 'download_mac_app_store',
          label: ui.dlMacAppStore,
          arch: ui.dlArchMacAppStore,
          // The campaign-tagged listing, not the canonical one: this is the
          // link a visitor actually follows, and the tag is the only way
          // App Store Connect can tell an install that started here from
          // one that started in App Store search.
          href: urls.macAppStore,
          dl: null,
        },
        {
          key: 'mac',
          archKey: 'direct',
          conversion: 'download_mac',
          label: ui.dlMac,
          arch: ui.dlArchMac,
          href: null,
          dl: dl.mac,
        },
      ],
    },
    {
      key: 'windows',
      title: 'Windows',
      windows: true,
      rows: [
        {
          // The Microsoft Store is the Windows primary, and the only row on
          // this platform that can be. Like the Mac App Store row it carries
          // an `href` and no `dl` — there is no release behind it to read a
          // version or a size from, and nothing for the browser-side refresh
          // to correct.
          //
          // It is `default` and there is no ARM counterpart, because it needs
          // none: the listing carries both packages and the Store hands each
          // machine its own. So every Windows visitor gets this one control
          // whatever their chip, and the arch probe has nothing left to do on
          // Windows.
          key: 'ms-store',
          archKey: 'default',
          conversion: 'download_ms_store',
          label: ui.dlMsStore,
          arch: ui.dlArchMsStore,
          // Campaign-tagged, same split as the Mac row — the only way
          // Partner Center can tell an install that started here from one
          // that started in Store search.
          href: urls.msStore,
          dl: null,
        },
        {
          key: 'windows-x64',
          archKey: 'direct',
          conversion: 'download_windows_x64',
          label: ui.dlWindows,
          arch: ui.dlArchWindowsX64,
          href: null,
          dl: dl.winX64,
        },
        {
          // Published since 0.0.46. Nothing here is conditional on that: the
          // row renders hidden whenever the platform reports the target
          // unpublished, and the browser-side refresh flips it either way
          // without a rebuild.
          key: 'windows-arm64',
          archKey: 'direct-arm64',
          conversion: 'download_windows_arm64',
          label: ui.dlWindowsArm64,
          arch: ui.dlArchWindowsArm64,
          href: null,
          dl: dl.winArm,
        },
      ],
    },
    {
      key: 'linux',
      title: 'Linux',
      windows: false,
      rows: [
        {
          key: 'linux-x64',
          archKey: 'default',
          conversion: 'download_linux',
          label: ui.dlLinux,
          arch: ui.dlArchLinux,
          href: null,
          dl: dl.linuxX64,
        },
        {
          // Linux is the one platform left that has to work the architecture
          // out for itself: no store is there to choose between two packages
          // that are not interchangeable. So this one stays promotable, and
          // stays in the menu.
          key: 'linux-arm64',
          archKey: 'arm64',
          conversion: 'download_linux_arm64',
          label: ui.dlLinuxArm64,
          arch: ui.dlArchLinuxArm64,
          href: null,
          dl: dl.linuxArm,
        },
      ],
    },
  ];
}

/** A row is available when there is something to send the visitor to. */
export const rowAvailable = (row: DownloadRow) => !!(row.href || row.dl);
