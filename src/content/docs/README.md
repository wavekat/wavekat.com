# src/content/docs/

**This folder is sync output. Do not edit by hand.**

Contents are populated by `scripts/sync-docs.js`, which pulls the `/docs/` folder from each WaveKat product repo (wavekat-voice, wavekat-cli, …) and writes them into subdirectories here. The result becomes the source for the unified docs site at `docs.wavekat.com`.

To edit a Voice doc, change it in [`wavekat/wavekat-voice`](https://github.com/wavekat/wavekat-voice) under `docs/`. The next build of this site picks it up.

See [`docs/03-unified-docs-plan.md`](../../../docs/03-unified-docs-plan.md) for the full plan.

## Why this folder is committed (mostly empty)

So Astro Content Collections has a stable directory to point at, and so the sync script has a target. Synced content itself is gitignored — only this README and `.gitkeep` are tracked.
