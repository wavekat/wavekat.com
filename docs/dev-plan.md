# Dev Plan

## Phase 1 — Scaffold
- [ ] Init Astro project with static output mode
- [ ] Add Tailwind CSS
- [ ] Set up Cloudflare Pages config (`wrangler.toml`)
- [ ] Establish folder structure: `src/components`, `src/layouts`, `src/pages`
- [ ] Add brand tokens (colors per library) as Tailwind theme variables

## Phase 2 — Homepage
- [ ] Layout: base HTML shell, `<head>` meta, fonts
- [ ] **Hero section** — WaveKat wordmark + tagline + short description
- [ ] **Library grid** — card for each crate (core, vad, turn, lab) using its brand accent color
  - core → green `#00e676`
  - vad → cyan `#00bcd4`
  - turn → purple `#7c4dff`
  - lab → amber `#ffd740`
- [ ] **Footer** — GitHub org link, Apache 2.0 note
- [ ] Responsive layout (mobile-first)

## Phase 3 — Assets
- [ ] Pull banners and wordmarks from `wavekat-brand`
- [ ] Optimize SVGs for web (inline or `<img>`)
- [ ] Dark mode support (the brand already has dark/light logo variants)

## Phase 4 — Deploy
- [ ] Connect repo to Cloudflare Pages
- [ ] Point `wavekat.com` DNS to Cloudflare Pages
- [ ] Verify build pipeline (`npm run build` → `dist/`)
