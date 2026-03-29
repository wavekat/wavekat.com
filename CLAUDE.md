# Claude Code Context

## What this repo is

This is the source for `wavekat.com` — the homepage for the WaveKat ecosystem. It replaces the previous `wavekat.com` (a resume builder) which still exists as a separate private repo (`wavekat`) but is no longer what this domain points to.

## Mission

> Give every small business the voice of a big one.

WaveKat builds open-source, AI-powered solutions. Voice is where we start, but not all we'll do.

## The WaveKat ecosystem

All repos live under the `wavekat` GitHub org. SSH access uses the `github.com-wavekat` host alias (i.e. `git@github.com-wavekat:wavekat/<repo>.git`).

### Solutions
| Repo | What it does | Status |
|------|-------------|--------|
| `wavekat-voice` | AI phone answering for small businesses (SIP/RTP) | Private, in development |

### Libraries
| Repo | What it does | Brand color |
|------|-------------|-------------|
| `wavekat-core` | Shared audio primitives (`AudioFrame`, sample conversion) | Green `#00e676` |
| `wavekat-vad` | Voice Activity Detection — WebRTC, Silero, TEN-VAD, FireRedVAD | Cyan `#00bcd4` |
| `wavekat-turn` | Turn detection — end-of-utterance for voice pipelines | Purple `#7c4dff` |
| `wavekat-lab` | Interactive dashboard for testing audio backends | Amber `#ffd740` |

### Other
| Repo | What it does |
|------|-------------|
| `wavekat-brand` | All brand assets — banners, wordmarks, logos, icons, SVG sources |

## Tech decisions

- **Framework**: Astro (static output) — chosen for speed, simplicity, GitHub Pages / Cloudflare Pages compatibility
- **Styles**: Tailwind CSS
- **Deployment**: Cloudflare Pages (consistent with rest of org)
- **Domain**: `wavekat.com` — DNS to be pointed at Cloudflare Pages once site is ready

## Brand assets

Logo SVGs come from `vendor/wavekat-brand` (git submodule — source of truth, never edit here).
`make sync` copies the needed files into `public/logos/` which is gitignored.
`make dev` and `make build` both run sync automatically.

To pull brand updates:
```sh
git submodule update --remote vendor/wavekat-brand
make sync
```

## Current state

- Working branch: `feat/astro-scaffold`
- Phase 1 (scaffold) and Phase 2 (homepage) are complete
- Node ≥ 22 required — use `nvm use 22`, or just use `make` (it handles this)
- Dark/light mode toggle with localStorage + OS preference fallback
- `wavekat-brand` is a git submodule at `vendor/wavekat-brand`

## What to do next

Phase 3 in `docs/dev-plan.md`:
- Pull remaining banners/assets from `wavekat-brand` as needed
- Optimise any additional SVGs for web

Phase 4:
- Connect repo to Cloudflare Pages (build command: `make build`, Node version: 22)
- Point `wavekat.com` DNS
