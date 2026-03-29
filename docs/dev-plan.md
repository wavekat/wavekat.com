# Dev Plan

## Phase 1 — Scaffold
- [x] Init Astro project with static output mode
- [x] Add Tailwind CSS
- [x] Set up Cloudflare Pages config (`wrangler.toml`)
- [x] Establish folder structure: `src/components`, `src/layouts`, `src/pages`
- [x] Add brand tokens (colors per library) as Tailwind theme variables

## Phase 2 — Homepage
- [x] Layout: base HTML shell, `<head>` meta, fonts
- [x] **Hero section** — WaveKat wordmark + tagline + short description
- [x] **Library grid** — card for each crate (core, vad, turn, lab) using its brand accent color
  - core → green `#00e676`
  - vad → cyan `#00bcd4`
  - turn → purple `#7c4dff`
  - lab → amber `#ffd740`
- [x] **Footer** — GitHub org link, Apache 2.0 note
- [x] Responsive layout (mobile-first)
- [x] Dark / light mode toggle with localStorage persistence

## Phase 3 — Assets
- [ ] Pull banners and wordmarks from `wavekat-brand`
- [ ] Optimize SVGs for web (inline or `<img>`)
- [ ] Dark mode support (the brand already has dark/light logo variants)

## Phase 4 — Deploy
- [ ] Connect repo to Cloudflare Pages
- [ ] Point `wavekat.com` DNS to Cloudflare Pages
- [ ] Verify build pipeline (`npm run build` → `dist/`)
