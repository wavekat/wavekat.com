// WaveKat Voice — desktop app download metadata.
//
// The installers live on Cloudflare R2, served at https://dl.wavekat.com/voice/
// (the same origin electron-updater polls). Filenames are version-stamped and
// cached `immutable`, so there is no stable "latest" filename — this module is
// the single place the marketing site records which build is current.
//
// ⚠️ Bump `version` here on every wavekat-voice release. The matching commands:
//     curl -s https://dl.wavekat.com/voice/latest-mac.yml
//   shows the live macOS version + exact artifact names. The dmg URL is derived
//   from `version` below; keep it in sync with that file.
//
// macOS only on the site for now — that's the only platform we surface or
// mention. (Other platform builds may exist on R2, but the site stays macOS-only
// until they're ready to show.)

export const VOICE_VERSION = '0.0.21';

const DL_BASE = 'https://dl.wavekat.com/voice';

// electron-builder's default dmg artifactName is
//   `${productName}-${version}-${arch}.dmg` → "WaveKat Voice-<v>-arm64.dmg".
// The space is percent-encoded for the href.
export const macDownload = {
  label: 'Download for Mac',
  // arm64-only: the bundled Rust daemon is built for Apple Silicon, so an Intel
  // Mac can't launch it. State the requirement plainly on the page.
  arch: 'Apple Silicon (M1 or later)',
  ext: '.dmg',
  size: '120 MB',
  url: `${DL_BASE}/WaveKat%20Voice-${VOICE_VERSION}-arm64.dmg`,
};
