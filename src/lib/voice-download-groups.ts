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
 *
 * `menu` is listed beside the promotable rows but is never promoted — the
 * one combination the other three can't express. See `inMenu` below for why
 * it had to exist.
 */
export type ArchKey = 'default' | 'arm64' | 'direct' | 'direct-arm64' | 'menu';

/**
 * May the promotion script put this row on the primary button?
 *
 * Arch is the whole question: `default` is what a platform's visitor gets
 * before anything is known about the chip, `arm64` what they get once the
 * browser confirms one.
 */
export const isPromotable = (archKey: ArchKey) => archKey === 'default' || archKey === 'arm64';

/**
 * Does the compact menu list this row?
 *
 * Until the Snap Store this was the same question as `isPromotable`, and one
 * predicate answered both — the menu listed exactly the rows that could be
 * the button, which is the "arch mechanism read one way round" the rest of
 * this file turns on.
 *
 * The snap row is the first place the two come apart, and the reason is not
 * arch. It is a store handoff, so it belongs in a menu whose job is to show
 * the one recommended control per system; but the button it would displace
 * offers a stable .deb, and the snap cannot be promoted over that while it
 * is the less conservative choice of the two. So "in the menu" and "can be
 * the button" became two questions, and this is the second one.
 *
 * Deliberately a superset of `isPromotable`, not an independent list: a row
 * that CAN be the button must always be in the menu, or the menu would hide
 * a choice the script can still promote.
 */
export const inMenu = (archKey: ArchKey) => isPromotable(archKey) || archKey === 'menu';

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
  /**
   * The footnote under this column on the grid, or `null` for a column that
   * needs none.
   *
   * A name rather than a boolean because there are now two different notes
   * and they say unrelated things: `windows` warns that the two direct .exe
   * rows above it are unsigned, `linux` prints the terminal install for the
   * snap. Both are about specific rows in their own column, which is why
   * each sits at the foot of that column rather than anywhere near a button
   * on a page whose visitor may well be on a third platform.
   */
  note: 'windows' | 'linux' | null;
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
  snapStore: string;
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
      note: null,
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
      note: 'windows',
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
      note: 'linux',
      rows: [
        {
          // The Snap Store — the third store handoff, and the first one that
          // is NOT its platform's primary.
          //
          // It carries an `href` and no `dl` for the reason the other two
          // store rows do: Canonical resolves the channel, installs the snap
          // and updates it, and reports no version or size back here.
          //
          // `menu` rather than `default`: it is listed beside the .deb rows,
          // but the promotion script may never put it on the button. The .deb
          // below stays the promoted Linux control because it is the more
          // conservative of the two — it is the package Debian can take as
          // well as Ubuntu, and the snap's recommendation rests on a channel
          // we don't resolve here. See `inMenu`.
          //
          // Like the Microsoft Store row and unlike the .deb pair, it names
          // no architecture: one snap name carries both amd64 and arm64
          // revisions and `snap install` hands each machine its own. That is
          // why it has no ARM counterpart and why it does not make the Linux
          // arch probe below redundant — the probe is still the only thing
          // choosing between two .deb files that are not interchangeable.
          key: 'snap-store',
          archKey: 'menu',
          conversion: 'download_snap_store',
          label: ui.dlSnapStore,
          arch: ui.dlArchSnapStore,
          // Untagged, and the only store row for which that is not a
          // deliberate split between a tagged link and a canonical one: the
          // Snap Store reads no attribution parameter at all. See
          // SNAP_STORE_URL in voice-download.ts.
          href: urls.snapStore,
          dl: null,
        },
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
          // Linux is the one platform left whose PROMOTED control has to work
          // the architecture out for itself, and the Snap Store above does
          // not change that. A store only settles the arch question for the
          // row it is on: the snap picks its own revision, but it is not
          // promotable, so the button still offers one of two .deb files that
          // are not interchangeable — and something has to choose. Hence this
          // row stays promotable, and stays in the menu.
          //
          // Contrast Windows, where the store row IS the primary and the arch
          // probe therefore has nothing left to do.
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
