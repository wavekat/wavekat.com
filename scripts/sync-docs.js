#!/usr/bin/env node
// Syncs product docs from each WaveKat product repo into src/content/docs/<product>/.
// Each product repo keeps its docs source in its own /docs/ folder; this script
// pulls them into one tree so Astro can render docs.wavekat.com.
//
// Status: SKELETON. Real cloning is gated behind SYNC_DOCS=1 until the
// Starlight integration PR lands. For now it just prints what it would do.
//
// Auth note: cloning private repos (e.g. wavekat-voice) on Cloudflare Pages
// requires GITHUB_TOKEN to be set in the Pages environment to a fine-grained
// PAT with read access to the relevant repos.

import { existsSync, mkdirSync, rmSync, cpSync } from "fs";
import { execSync } from "child_process";
import { join } from "path";
import { fileURLToPath } from "url";

const root = join(fileURLToPath(import.meta.url), "../..");
const contentDocsDir = join(root, "src/content/docs");
const tmpDir = join(root, ".sync-docs-tmp");

// Edit this list as new product docs come online.
const sources = [
  { slug: "voice", repo: "wavekat/wavekat-voice", branch: "main", private: true },
  // { slug: "cli",   repo: "wavekat/wavekat-cli",   branch: "main", private: false },
  // { slug: "lab",   repo: "wavekat/wavekat-lab",   branch: "main", private: false },
  // { slug: "sdks/core", repo: "wavekat/wavekat-core", branch: "main", private: false },
  // { slug: "sdks/vad",  repo: "wavekat/wavekat-vad",  branch: "main", private: false },
  // { slug: "sdks/turn", repo: "wavekat/wavekat-turn", branch: "main", private: false },
  // { slug: "sdks/tts",  repo: "wavekat/wavekat-tts",  branch: "main", private: false },
];

const enabled = process.env.SYNC_DOCS === "1";

function repoUrl({ repo, private: isPrivate }) {
  const token = process.env.GITHUB_TOKEN;
  if (isPrivate) {
    if (!token) {
      throw new Error(
        `GITHUB_TOKEN required to clone private repo ${repo}. ` +
          `Set it in the Cloudflare Pages environment (fine-grained PAT, read access).`
      );
    }
    return `https://x-access-token:${token}@github.com/${repo}.git`;
  }
  return `https://github.com/${repo}.git`;
}

function syncOne(source) {
  const { slug, repo, branch } = source;
  const cloneDir = join(tmpDir, slug.replace(/\//g, "__"));
  const destDir = join(contentDocsDir, slug);

  console.log(`▶ ${repo}@${branch} → src/content/docs/${slug}/`);

  if (!enabled) {
    console.log("  (skeleton mode — set SYNC_DOCS=1 to actually pull)");
    return;
  }

  rmSync(cloneDir, { recursive: true, force: true });
  rmSync(destDir, { recursive: true, force: true });
  mkdirSync(cloneDir, { recursive: true });

  execSync(
    `git clone --depth 1 --branch ${branch} --filter=blob:none --sparse ${repoUrl(source)} .`,
    { cwd: cloneDir, stdio: "inherit" }
  );
  execSync("git sparse-checkout set docs", { cwd: cloneDir, stdio: "inherit" });

  const docsSrc = join(cloneDir, "docs");
  if (!existsSync(docsSrc)) {
    throw new Error(`${repo} has no /docs/ folder on ${branch}`);
  }
  mkdirSync(destDir, { recursive: true });
  cpSync(docsSrc, destDir, { recursive: true });
  rmSync(cloneDir, { recursive: true, force: true });
  console.log(`  ✓ synced ${slug}`);
}

mkdirSync(contentDocsDir, { recursive: true });
for (const source of sources) {
  try {
    syncOne(source);
  } catch (err) {
    console.error(`✗ ${source.repo}: ${err.message}`);
    process.exitCode = 1;
  }
}
rmSync(tmpDir, { recursive: true, force: true });
