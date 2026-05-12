# Unified Docs Plan

`wavekat.com/docs` is the single docs site for every WaveKat product (Voice, CLI, Lab, SDKs). Each product repo keeps its own `/docs/` folder; **this repo builds them into one site**, served as a path on the main site.

## Goal

```
github.com/wavekat/wavekat-voice/docs/   ─┐
github.com/wavekat/wavekat-cli/docs/     ─┤
github.com/wavekat/wavekat-lab/docs/     ─┼─▶  this repo  ─▶  wavekat.com/docs/<product>/
github.com/wavekat/wavekat-vad/docs/     ─┤
github.com/wavekat/wavekat-turn/docs/    ─┤
github.com/wavekat/wavekat-tts/docs/     ─┘
```

- Each product team edits docs in PRs **next to the code they describe**.
- Readers see one coherent docs section, with a shared sidebar (Voice / CLI / Lab / SDKs).
- One Astro project, one Cloudflare Pages deploy — no separate subdomain, no extra DNS or build pipeline.

## URL layout

```
wavekat.com/docs/
├── voice/        ← from wavekat-voice/docs/        (private repo)
├── cli/          ← from wavekat-cli/docs/          (public)
├── lab/          ← from wavekat-lab/docs/          (public)
└── sdks/
    ├── core/     ← from wavekat-core/docs/         (public)
    ├── vad/      ← from wavekat-vad/docs/          (public)
    ├── turn/     ← from wavekat-turn/docs/         (public)
    ├── tts/      ← from wavekat-tts/docs/          (public)
    └── asr/      ← from wavekat-asr/docs/ (future)
```

First product to land: **Voice** ([wavekat-voice#1](https://github.com/wavekat/wavekat-voice/pull/1)).

## Stack decision

Astro Starlight. Reasons:

- Native Astro integration — slots into the existing Astro 6 site without a parallel build chain.
- Built-in sidebar, search (pagefind), versioning conventions, dark mode, breadcrumbs.
- Content lives in Astro Content Collections — same pattern as the existing `blog` collection.
- Cloudflare Pages compatible — static output, no edge runtime requirements.

Routing: **path-based** at `wavekat.com/docs/`. Same Astro build, single Cloudflare Pages deploy, no extra DNS. Starlight mounts under `/docs/` via its `base` config.

## Sync mechanism

Build-time fetch — **not** git submodules.

```
npm run sync-docs   ──▶  scripts/sync-docs.js
                            ├─▶ shallow-clone /docs/ from each product repo
                            └─▶ copy into src/content/docs/<product>/
```

Why not submodules:

- Submodules require every contributor to `git submodule update`. Drifts silently.
- Private repos (Voice) need credentials; submodule auth is more brittle than `git clone` with a token.
- Build-time fetch is idempotent and easy to cache in CI.

The script will mirror the `sync-brand.js` pattern in this repo. On Cloudflare Pages, a `GITHUB_TOKEN` env var (fine-grained PAT scoped to `wavekat/wavekat-voice` content read) is sufficient.

## Folder layout in this repo

```
wavekat.com/
├── scripts/
│   ├── sync-brand.js         ← existing
│   └── sync-docs.js          ← new (skeleton in this branch)
├── src/
│   ├── content/
│   │   ├── blog/             ← existing
│   │   └── docs/             ← synced from product repos (gitignored after first commit)
│   │       ├── voice/
│   │       ├── cli/
│   │       └── ...
│   └── content.config.ts     ← add `docs` collection later, with Starlight
└── docs/                     ← internal planning (this folder) — unchanged
    └── 03-unified-docs-plan.md
```

Internal planning docs (this folder) stay where they are. Public docs are a different concern living in `src/content/docs/`.

## What this branch ships

A scaffold + commitment, **not** a working docs site:

- This plan doc.
- `scripts/sync-docs.js` skeleton — a runnable stub that prints what it would do, with the real `git clone` logic gated behind a feature flag until we wire it up.
- `src/content/docs/.gitkeep` so the directory exists in the tree.
- `src/content/docs/README.md` explaining that this folder is sync output.

What this branch **does not** ship:

- Astro Starlight integration (separate PR — needs `@astrojs/starlight` install, route, sidebar config).
- Live sync from product repos (separate PR — needs the GitHub token wired into Cloudflare Pages).
- Any actual published page.

## Open decisions (resolve before the Starlight PR)

- Search: built-in pagefind, or Algolia DocSearch (free for OSS)?
- Versioning: do we tag docs to product releases, or always show "latest"?
- Auth for private repo sync on Cloudflare Pages: fine-grained PAT, or GitHub App?
- How do we surface SDK READMEs (which are full docs in their own right) — sync just `/docs/` or also `README.md`?
