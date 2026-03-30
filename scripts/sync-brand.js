#!/usr/bin/env node
// Syncs brand assets from the wavekat-brand submodule into public/logos/.
// Runs automatically before build (see package.json "sync" script).
// On Cloudflare Pages the submodule must be initialised first — use:
//   npm run cf:build
// as the Pages build command.

import { cpSync, mkdirSync } from "fs";
import { execSync } from "child_process";
import { join } from "path";
import { fileURLToPath } from "url";

const root = join(fileURLToPath(import.meta.url), "../..");
const brandDir = join(root, "vendor/wavekat-brand/assets");
const logoSrc = join(brandDir, "logos");
const logoDest = join(root, "public/logos");

const logos = [
  "wavekat-tight-light.svg",
  "wavekat-tight-dark.svg",
  "wavekat-icon-light.svg",
];

const rootAssets = [
  { src: "og.png", dest: join(root, "public/og.png") },
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

for (const { src, dest } of rootAssets) {
  cpSync(join(brandDir, src), dest);
  console.log(`synced ${src}`);
}
