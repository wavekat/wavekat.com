#!/usr/bin/env node
// Syncs brand assets from the wavekat-brand submodule into public/logos/.
// Runs automatically before build (see package.json "sync" script).
// On Cloudflare Pages the submodule must be initialised first — use:
//   npm run cf:build
// as the Pages build command.

import { cpSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import { join } from "path";
import { fileURLToPath } from "url";
import { Resvg } from "@resvg/resvg-js";
import { deployEnv } from "./lib/deploy-env.js";

const root = join(fileURLToPath(import.meta.url), "../..");
const brandDir = join(root, "vendor/wavekat-brand/assets");
const logoSrc = join(brandDir, "logos");
const logoDest = join(root, "public/logos");

const logos = [
  "wavekat-tight-light.svg",
  "wavekat-tight-dark.svg",
  "wavekat-icon-light.svg",
  "wavekat-icon-dark.svg",
];

// Which square the W sits in. Production keeps the brand mark exactly as it
// is; dev and preview tint it so a row of tabs tells you at a glance which
// build you are looking at. The hues match wavekat-platform's env badges (its
// apps/web/src/lib/env.ts), so amber means "dev" and purple means "preview"
// across the whole ecosystem — what differs between the two sites is the glyph
// inside the square, a W here and an emoji there.
const ENV_TINTS = {
  dev: "#f59e0b",
  preview: "#a855f7",
  prod: undefined, // the mark's own black
};

const env = deployEnv();
const tint = ENV_TINTS[env];

// Initialise submodule if vendor directory is empty (Cloudflare Pages shallow clone)
try {
  execSync("git submodule update --init --recursive", {
    cwd: root,
    stdio: "inherit",
  });
} catch {
  // Not a fatal error — submodule may already be present
}

mkdirSync(logoDest, { recursive: true });

// The icon is the favicon and nothing else — the visible header and footer
// wordmarks are the `tight` pair — so tinting it colours the tab and leaves
// every rendered page alone.
const isIcon = (file) => file.startsWith("wavekat-icon-");

for (const file of logos) {
  if (tint && isIcon(file)) continue; // written tinted below instead
  cpSync(join(logoSrc, file), join(logoDest, file));
  console.log(`synced ${file}`);
}

/**
 * Recolour the icon's rounded square, leaving the white W on top of it.
 *
 * The source path carries no `fill` of its own (it defaults to black), so the
 * tint goes on as an attribute. If the brand repo ever restructures the icon
 * this stops matching — and a silent no-op would quietly ship production's
 * black favicon to every preview, so it fails loudly instead.
 */
function tintIcon(svg, colour) {
  const tinted = svg.replace(
    /(<path\b[^>]*\bid="rect1")/,
    `$1\n     fill="${colour}"`,
  );
  if (tinted === svg) {
    throw new Error(
      'sync-brand: could not find the icon\'s rounded-square path (id="rect1") ' +
        "to tint — has vendor/wavekat-brand changed wavekat-icon-light.svg?",
    );
  }
  return tinted;
}

// Everything below renders from the light icon: black square, white W. The
// dark variant only exists to invert that pair for a dark tab bar, and a
// tinted square needs no such inversion — so in a non-prod build both files
// get the same tinted mark.
const brandIconSvg = readFileSync(
  join(logoSrc, "wavekat-icon-light.svg"),
  "utf8",
);
const iconSvg = tint ? tintIcon(brandIconSvg, tint) : brandIconSvg;

if (tint) {
  for (const file of logos.filter(isIcon)) {
    writeFileSync(join(logoDest, file), iconSvg);
    console.log(`synced ${file} (${env} tint ${tint})`);
  }
}

// Convert og.svg → og.png (social platforms require raster images)
const ogSvg = readFileSync(join(brandDir, "og.svg"), "utf8");
const resvg = new Resvg(ogSvg, { fitTo: { mode: "width", value: 1200 } });
writeFileSync(join(root, "public/og.png"), resvg.render().asPng());
console.log("synced og.svg → og.png");

// Convert the app icon → the raster favicon set. Browsers that render SVG
// favicons get the light/dark pair copied above; Safari, Windows and Google
// Search don't support SVG icons at all, so they need PNG/ICO fallbacks.
// Tinting the asset rather than swapping the <link> tags is what puts the env
// colour in front of those clients too.
const renderIcon = (size, background) =>
  new Resvg(iconSvg, { fitTo: { mode: "width", value: size }, background })
    .render()
    .asPng();

// Tab favicons and the manifest icons keep the SVG's transparent corners.
// The apple-touch-icon does not: iOS flattens it onto black and then applies
// its own rounded mask, so rendering on an opaque ground — the same colour the
// icon's rounded square is drawn in — keeps the tile seamless.
const rasterIcons = [
  ["favicon-16x16.png", 16, undefined],
  ["favicon-32x32.png", 32, undefined],
  ["apple-touch-icon.png", 180, tint ?? "#000000"],
  ["icon-192.png", 192, undefined],
  ["icon-512.png", 512, undefined],
];

for (const [file, size, background] of rasterIcons) {
  writeFileSync(join(root, "public", file), renderIcon(size, background));
  console.log(`synced wavekat-icon-light.svg → ${file}`);
}

// A minimal ICO container wrapping PNG frames — supported by every browser and
// by Windows Vista onward, so it needs no encoder dependency.
function encodeIco(frames) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(frames.length, 4);

  let offset = header.length + frames.length * 16;
  const entries = frames.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size % 256, 0); // width  (0 means 256)
    entry.writeUInt8(size % 256, 1); // height (0 means 256)
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([
    header,
    ...entries,
    ...frames.map((frame) => frame.data),
  ]);
}

writeFileSync(
  join(root, "public/favicon.ico"),
  encodeIco([16, 32].map((size) => ({ size, data: renderIcon(size) }))),
);
console.log("synced wavekat-icon-light.svg → favicon.ico");

console.log(`brand assets synced for ${env}`);
