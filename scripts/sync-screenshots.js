#!/usr/bin/env node
// Pulls marketing screenshots from the WaveKat product repos into
// public/screenshots/, a shared, reusable namespace keyed by scene (so
// `in-call` is one file every page can reference, not a copy per post).
//
// Two sources, because a screenshot's home is its product:
//   - voice    — the desktop app (wavekat-voice). Ubuntu/GNOME-*framed* PNGs
//                from its screenshot pipeline (its docs/41 — `make screenshots`
//                + `make screenshots-frames`), named `<code>-<theme>.png`.
//   - platform — the web app (wavekat-platform). Plain browser-page PNGs from
//                its Playwright pipeline, named `<code>.png` (no frame, no
//                theme suffix — a web page, not a desktop window).
//
// Why committed, not built on the fly
// -----------------------------------
// The PNGs are git-ignored build artifacts in their source repos, and the site
// builds on Cloudflare Pages without those private renderers. So the chosen,
// localized shots are committed here as WebP and referenced by a plain public
// path (/screenshots/<scene>/<code>.webp) — from the blog today, anywhere later.
//
// Single theme on purpose: these go in a single page read in one language, and
// a baked-in window frame can't follow the page's light/dark toggle — so we
// pick the light frame and keep it consistent. Per *language*, though — each
// localized surface shows the app in its own language.
//
// Sources (first that exists):
//   voice:
//     WAVEKAT_FRAMES_DIR=<dir>        — a framed/ubuntu dir directly
//     WAVEKAT_LOCAL_REPOS=<base>      — <base>/wavekat-voice/apps/desktop/screenshots/framed/ubuntu
//     ../wavekat-voice/apps/desktop/screenshots/framed/ubuntu  (default sibling)
//   platform:
//     WAVEKAT_PLATFORM_SHOTS_DIR=<dir> — a screenshots dir directly
//     WAVEKAT_LOCAL_REPOS=<base>      — <base>/wavekat-platform/apps/web/screenshots
//     ../wavekat-platform/apps/web/screenshots  (default sibling)
//
// To regenerate the sources first:
//   wavekat-voice:    make screenshots && make screenshots-frames
//   wavekat-platform: pnpm --filter web screenshots:share
// then here:
//   npm run sync:screenshots
//
// Usage:
//   node scripts/sync-screenshots.js          # refresh committed WebPs
//   node scripts/sync-screenshots.js --check  # verify all present, no write

import { existsSync, mkdirSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const root = join(fileURLToPath(import.meta.url), "../..");
const destRoot = join(root, "public/screenshots");

// The scenes we actually surface, each tagged with its source repo. Only commit
// what's referenced — each shot should earn its place on a page, not exist
// because the pipeline can make it. Keep in sync with the `![](/screenshots/…)`
// refs across the site (today: the CLI and share-recording blog posts).
//
// `frame` (voice scenes only): the desktop pipeline composites both macOS and
// Ubuntu window chrome; each scene picks which one it ships. The CLI post shots
// use the Ubuntu frame (its author runs Ubuntu); the share-recording post shows
// the Mac build. Defaults to "ubuntu" when omitted.
const SCENES = [
  { name: "in-call", source: "voice", frame: "ubuntu" }, // a placed call
  { name: "in-call-hold", source: "voice", frame: "ubuntu" }, // parked call, amber banner
  { name: "in-call-waiting", source: "voice", frame: "ubuntu" }, // switcher, two held
  { name: "in-call-transfer", source: "voice", frame: "ubuntu" }, // Complete transfer
  { name: "settings-automation", source: "voice", frame: "ubuntu" }, // enable CLI
  { name: "settings-automation-agents", source: "voice", frame: "ubuntu" }, // connect
  { name: "share-sheet", source: "voice", frame: "macos" }, // the Share panel
  { name: "share-viewer", source: "platform" }, // what the recipient opens (web)
];

// The nine shipped interface languages, by wavekat.com locale `code` — exactly
// the filename wavekat-voice writes (`<code>-<theme>.png`).
const CODES = [
  "en",
  "zh-Hans",
  "zh-Hant",
  "ja",
  "ko",
  "de",
  "es",
  "fr",
  "it",
];

const THEME = "light"; // single, consistent theme for the blog

// The framed shots are ~2080px wide (1920 content + shadow margins). A blog
// body is ~768px; 1200 is a crisp cap that keeps each WebP ~60–90 KB.
const MAX_WIDTH = 1200;
const WEBP_QUALITY = 86;

// Each source repo: where its PNGs live, and the source filename for a given
// (scene, code). Voice frames carry a theme suffix; platform web shots don't.
const SOURCES = {
  voice: {
    label: "wavekat-voice (screenshots/framed)",
    regen: "make screenshots && make screenshots-frames",
    // The `framed` root, which holds both `macos/` and `ubuntu/`. The per-scene
    // `frame` selects the subdir (see sceneDir below).
    dir: () => {
      const direct = process.env.WAVEKAT_FRAMES_DIR;
      if (direct) return direct;
      const base = process.env.WAVEKAT_LOCAL_REPOS;
      if (base) return join(base, "wavekat-voice/apps/desktop/screenshots/framed");
      return join(root, "../wavekat-voice/apps/desktop/screenshots/framed");
    },
    // <framed>/<frame>/<scene>
    sceneDir: (rootDir, scene) => join(rootDir, scene.frame ?? "ubuntu", scene.name),
    file: (code) => `${code}-${THEME}.png`,
  },
  platform: {
    label: "wavekat-platform (apps/web/screenshots)",
    regen: "pnpm --filter web screenshots:share",
    dir: () => {
      const direct = process.env.WAVEKAT_PLATFORM_SHOTS_DIR;
      if (direct) return direct;
      const base = process.env.WAVEKAT_LOCAL_REPOS;
      if (base) return join(base, "wavekat-platform/apps/web/screenshots");
      return join(root, "../wavekat-platform/apps/web/screenshots");
    },
    // <screenshots>/<scene>
    sceneDir: (rootDir, scene) => join(rootDir, scene.name),
    file: (code) => `${code}.png`,
  },
};

const check = process.argv.includes("--check");

function expected() {
  const out = [];
  for (const { name } of SCENES)
    for (const code of CODES) out.push({ scene: name, name: `${code}.webp` });
  return out;
}

if (check) {
  const missing = expected().filter(
    ({ scene, name }) => !existsSync(join(destRoot, scene, name)),
  );
  if (missing.length) {
    console.error(
      `✗ ${missing.length} committed screenshot(s) missing:\n` +
        missing.map((m) => `   ${m.scene}/${m.name}`).join("\n") +
        `\n\nRegenerate the sources, then \`npm run sync:screenshots\` here.`,
    );
    process.exit(1);
  }
  console.log(`✓ all ${expected().length} screenshots present`);
  process.exit(0);
}

// Resolve each source dir. A missing source is NOT fatal and does NOT wipe:
// these WebPs are committed artifacts, and the two source repos render
// independently (you usually have only one checked out at a time). So we
// regenerate what a present source provides and keep the committed shots for any
// source that's absent — only a scene with neither a source nor a committed copy
// is a real miss. (This is why there's no wholesale destRoot wipe.)
const srcRoots = {};
for (const key of new Set(SCENES.map((s) => s.source))) {
  const dir = SOURCES[key].dir();
  srcRoots[key] = existsSync(dir) ? dir : null;
  console.log(
    srcRoots[key]
      ? `▶ ${key}: ${dir}`
      : `▷ ${key}: not present — keeping committed shots (${dir})`,
  );
}

let written = 0;
let kept = 0;
const missing = [];
for (const scene of SCENES) {
  const src = SOURCES[scene.source];
  const root = srcRoots[scene.source];
  const srcDir = root ? src.sceneDir(root, scene) : null;
  const destDir = join(destRoot, scene.name);
  mkdirSync(destDir, { recursive: true });
  for (const code of CODES) {
    const destFile = join(destDir, `${code}.webp`);
    const srcFile = srcDir ? join(srcDir, src.file(code)) : null;
    if (srcFile && existsSync(srcFile)) {
      await sharp(srcFile)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY, effort: 6 })
        .toFile(destFile);
      written++;
    } else if (existsSync(destFile)) {
      kept++; // source absent, but the committed WebP is already here
    } else {
      missing.push(`${scene.name}/${code}.webp (no ${scene.source} source, no committed copy)`);
    }
  }
}

console.log(
  `✓ wrote ${written}, kept ${kept} committed → public/screenshots/`,
);
if (missing.length) {
  console.warn(
    `\n⚠ ${missing.length} screenshot(s) have neither a source nor a committed copy:\n` +
      missing.map((m) => `   ${m}`).join("\n"),
  );
  process.exitCode = 1;
}

const totalKb = SCENES.reduce((sum, { name }) => {
  const d = join(destRoot, name);
  if (!existsSync(d)) return sum;
  for (const f of readdirSync(d)) sum += statSync(join(d, f)).size / 1024;
  return sum;
}, 0);
console.log(`  (~${(totalKb / 1024).toFixed(1)} MB committed)`);
