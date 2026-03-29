# wavekat.com

The homepage for the WaveKat audio ecosystem — built with [Astro](https://astro.build) and deployed on Cloudflare Pages.

## What is WaveKat?

WaveKat is a collection of Rust libraries for audio intelligence in voice pipelines. Each library is independently usable and designed around a common set of audio primitives.

| Repo | Purpose |
|------|---------|
| [wavekat-core](https://github.com/wavekat/wavekat-core) | Shared audio types (`AudioFrame`, sample format conversion) |
| [wavekat-vad](https://github.com/wavekat/wavekat-vad) | Voice Activity Detection — unified interface across WebRTC, Silero, TEN-VAD, FireRedVAD |
| [wavekat-turn](https://github.com/wavekat/wavekat-turn) | Turn detection — end-of-utterance for voice pipelines |
| [wavekat-lab](https://github.com/wavekat/wavekat-lab) | Interactive dashboard for testing and comparing audio backends |

## Dev Plan

### Phase 1 — Scaffold
- [ ] Init Astro project with static output mode
- [ ] Add Tailwind CSS
- [ ] Set up Cloudflare Pages config (`wrangler.toml`)
- [ ] Establish folder structure: `src/components`, `src/layouts`, `src/pages`
- [ ] Add brand tokens (colors per library) as Tailwind theme variables

### Phase 2 — Homepage
- [ ] Layout: base HTML shell, `<head>` meta, fonts
- [ ] **Hero section** — WaveKat wordmark + tagline + short description
- [ ] **Library grid** — card for each crate (core, vad, turn, lab) using its brand accent color
  - core → green `#00e676`
  - vad → cyan `#00bcd4`
  - turn → purple `#7c4dff`
  - lab → amber `#ffd740`
- [ ] **Footer** — GitHub org link, Apache 2.0 note
- [ ] Responsive layout (mobile-first)

### Phase 3 — Assets
- [ ] Pull banners and wordmarks from `wavekat-brand`
- [ ] Optimize SVGs for web (inline or `<img>`)
- [ ] Dark mode support (the brand already has dark/light logo variants)

### Phase 4 — Deploy
- [ ] Connect repo to Cloudflare Pages
- [ ] Point `wavekat.com` DNS to Cloudflare Pages
- [ ] Verify build pipeline (`npm run build` → `dist/`)

---

## Tech Stack

- **Framework**: [Astro](https://astro.build) (static output)
- **Styles**: [Tailwind CSS](https://tailwindcss.com)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com)

## Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
# output → dist/
```

## License

Apache 2.0
