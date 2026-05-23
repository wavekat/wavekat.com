#!/usr/bin/env node
// Syncs product docs from each WaveKat product repo into src/content/docs/<product>/.
// Each product repo keeps its docs source in its own /docs/ folder; this script
// pulls them into one tree so Astro can render wavekat.com/docs/.
//
// Versioning:
//   Each source is pinned to the latest semver git tag on its repo (e.g.
//   wavekat-cli@v0.0.16). If that tag has no /docs/ folder yet — common in
//   the rollout window between merging docs to main and cutting a release —
//   the script falls back to `main` and records the version as "main".
//   Resolved versions are written to src/content/docs/versions.json so the
//   site can render a per-product version chip.
//
// Modes:
//   default        — print what it would do, change nothing.
//   SYNC_DOCS=1    — clone each repo over HTTPS.
//   WAVEKAT_LOCAL_REPOS=<path>
//                  — copy from sibling working trees at <path>/<repo-name>
//                    instead of cloning (no GitHub token required). Falls
//                    through to clone if a local copy is missing.
//
// Auth note: cloning private repos on Cloudflare Pages requires GITHUB_TOKEN
// to be set in the Pages environment to a fine-grained PAT with read access
// to the relevant repos.

import { existsSync, mkdirSync, rmSync, cpSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import { join } from "path";
import { fileURLToPath } from "url";

const root = join(fileURLToPath(import.meta.url), "../..");
const contentDocsDir = join(root, "src/content/docs");
const tmpDir = join(root, ".sync-docs-tmp");

// Edit this list as new product docs come online. `docsPath` is the path
// inside each product repo where publishable docs live (relative to repo
// root). Default is "docs/site" — keeps repo /docs/ free for internal
// planning.
const sources = [
  { slug: "cli",   repo: "wavekat/wavekat-cli",   docsPath: "docs/site", private: false },
  { slug: "voice", repo: "wavekat/wavekat-voice", docsPath: "docs/site", private: true  },
  // { slug: "vad",   repo: "wavekat/wavekat-vad",   docsPath: "docs/site", private: false },
  // { slug: "turn",  repo: "wavekat/wavekat-turn",  docsPath: "docs/site", private: false },
  // { slug: "lab",   repo: "wavekat/wavekat-lab",   docsPath: "docs/site", private: false },
  // { slug: "core",  repo: "wavekat/wavekat-core",  docsPath: "docs/site", private: false },
  // { slug: "tts",   repo: "wavekat/wavekat-tts",   docsPath: "docs/site", private: false },
  // { slug: "sip",   repo: "wavekat/wavekat-sip",   docsPath: "docs/site", private: false },
  // { slug: "asr",   repo: "wavekat/wavekat-asr",   docsPath: "docs/site", private: false },
];

const enabled = process.env.SYNC_DOCS === "1";
const localBase = process.env.WAVEKAT_LOCAL_REPOS;

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

// Sort semver-ish tags ascending; return the highest. Non-numeric tags are
// ignored. Accepts "v1.2.3" or "1.2.3".
function pickLatestTag(tags) {
  const semver = tags
    .map((t) => t.trim())
    .filter((t) => /^v?\d+(\.\d+)*$/.test(t))
    .map((t) => ({
      tag: t,
      parts: t.replace(/^v/, "").split(".").map((n) => parseInt(n, 10)),
    }))
    .sort((a, b) => {
      const len = Math.max(a.parts.length, b.parts.length);
      for (let i = 0; i < len; i++) {
        const diff = (a.parts[i] ?? 0) - (b.parts[i] ?? 0);
        if (diff !== 0) return diff;
      }
      return 0;
    });
  return semver.length ? semver[semver.length - 1].tag : null;
}

function latestTagLocal(repoPath) {
  try {
    const out = execSync("git tag --list", { cwd: repoPath, encoding: "utf8" });
    return pickLatestTag(out.split("\n"));
  } catch {
    return null;
  }
}

function latestTagRemote(url) {
  try {
    const out = execSync(`git ls-remote --tags --refs ${url}`, { encoding: "utf8" });
    const tags = out
      .split("\n")
      .map((line) => line.split("\t")[1])
      .filter(Boolean)
      .map((ref) => ref.replace("refs/tags/", ""));
    return pickLatestTag(tags);
  } catch {
    return null;
  }
}

function copyDocs(docsSrc, destDir) {
  rmSync(destDir, { recursive: true, force: true });
  mkdirSync(destDir, { recursive: true });
  cpSync(docsSrc, destDir, { recursive: true });
}

// Returns { version } or null if no /docs/ found at any ref.
function tryLocal(source) {
  if (!localBase) return null;
  const repoName = source.repo.split("/")[1];
  const repoPath = join(localBase, repoName);
  if (!existsSync(repoPath)) {
    console.log(`  (no local clone at ${repoPath} — skipping local)`);
    return null;
  }

  const destDir = join(contentDocsDir, source.slug);
  const docsPath = source.docsPath ?? "docs/site";
  const tag = latestTagLocal(repoPath);

  // Try latest tag first.
  if (tag) {
    try {
      const tmp = join(tmpDir, `${source.slug}__${tag}`);
      rmSync(tmp, { recursive: true, force: true });
      mkdirSync(tmp, { recursive: true });
      execSync(`git archive --format=tar ${tag} ${docsPath} | tar -x -C ${tmp}`, {
        cwd: repoPath,
        stdio: ["ignore", "ignore", "pipe"],
      });
      if (existsSync(join(tmp, docsPath))) {
        copyDocs(join(tmp, docsPath), destDir);
        rmSync(tmp, { recursive: true, force: true });
        console.log(`  ✓ ${source.slug} @ ${tag} (local, ${docsPath})`);
        return { version: tag };
      }
      rmSync(tmp, { recursive: true, force: true });
    } catch {
      // tag exists but no docs at that ref — fall through to main
    }
  }

  // Fallback: main working tree.
  const mainDocs = join(repoPath, docsPath);
  if (existsSync(mainDocs)) {
    copyDocs(mainDocs, destDir);
    console.log(`  ✓ ${source.slug} @ main (local, ${docsPath}, no tagged docs yet)`);
    return { version: "main" };
  }

  console.log(`  (no ${docsPath} in ${repoName} at ${tag ?? "any tag"} or main)`);
  return null;
}

function tryRemote(source) {
  const { slug, repo } = source;
  const docsPath = source.docsPath ?? "docs/site";
  const url = repoUrl(source);
  const tag = latestTagRemote(url);
  const refs = [tag, "main"].filter(Boolean);

  for (const ref of refs) {
    const cloneDir = join(tmpDir, `${slug}__${ref}`);
    rmSync(cloneDir, { recursive: true, force: true });
    mkdirSync(cloneDir, { recursive: true });
    try {
      execSync(
        `git clone --depth 1 --branch ${ref} --filter=blob:none --sparse ${url} .`,
        { cwd: cloneDir, stdio: ["ignore", "ignore", "pipe"] }
      );
      execSync(`git sparse-checkout set ${docsPath}`, { cwd: cloneDir, stdio: "ignore" });
      const docsSrc = join(cloneDir, docsPath);
      if (existsSync(docsSrc)) {
        copyDocs(docsSrc, join(contentDocsDir, slug));
        rmSync(cloneDir, { recursive: true, force: true });
        console.log(`  ✓ ${slug} @ ${ref} (remote, ${docsPath})`);
        return { version: ref };
      }
    } catch {
      // try next ref
    }
    rmSync(cloneDir, { recursive: true, force: true });
  }

  console.log(`  ✗ no ${docsPath} found in ${repo} at any ref`);
  return null;
}

function syncOne(source) {
  console.log(`▶ ${source.repo} → src/content/docs/${source.slug}/`);

  const local = tryLocal(source);
  if (local) return local;

  if (!enabled) {
    console.log("  (skeleton mode — set SYNC_DOCS=1, or WAVEKAT_LOCAL_REPOS=<path>, to pull)");
    return null;
  }

  return tryRemote(source);
}

mkdirSync(contentDocsDir, { recursive: true });

const versions = {};
for (const source of sources) {
  try {
    const result = syncOne(source);
    if (result) versions[source.slug] = result.version;
  } catch (err) {
    console.error(`✗ ${source.repo}: ${err.message}`);
    process.exitCode = 1;
  }
}
rmSync(tmpDir, { recursive: true, force: true });

writeFileSync(
  join(contentDocsDir, "versions.json"),
  JSON.stringify(versions, null, 2) + "\n"
);
console.log("\nversions:", versions);
