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

const root = join(fileURLToPath(import.meta.url), "../..");
const brandDir = join(root, "vendor/wavekat-brand/assets");
const logoSrc = join(brandDir, "logos");
const logoDest = join(root, "public/logos");

const logos = [
  "wavekat-tight-light.svg",
  "wavekat-tight-dark.svg",
  "wavekat-icon-light.svg",
];

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

for (const file of logos) {
  cpSync(join(logoSrc, file), join(logoDest, file));
  console.log(`synced ${file}`);
}

// Convert og.svg → og.png (social platforms require raster images)
const ogSvg = readFileSync(join(brandDir, "og.svg"), "utf8");
const resvg = new Resvg(ogSvg, { fitTo: { mode: "width", value: 1200 } });
writeFileSync(join(root, "public/og.png"), resvg.render().asPng());
console.log("synced og.svg → og.png");
