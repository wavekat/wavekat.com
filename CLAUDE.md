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

## Current state

- Working branch: `feat/astro-scaffold`
- Astro project has NOT been scaffolded yet — next step is Phase 1 of `docs/dev-plan.md`
- `main` only has the README

## What to do next

Start Phase 1 in `docs/dev-plan.md`:
1. `npm create astro@latest` inside this repo (static output, minimal template)
2. Add Tailwind CSS via `npx astro add tailwind`
3. Add brand color tokens to `tailwind.config.mjs`
4. Set up `wrangler.toml` for Cloudflare Pages
