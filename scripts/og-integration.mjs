// Astro integration: renders the per-page Open Graph cards.
//
// Pages don't own their card image — they only declare, while rendering, what
// it should say (see src/lib/og.ts). This integration drains that manifest
// once the build has rendered everything and writes the PNGs into dist/, so a
// new page or a new locale needs no registration anywhere: if it passes a
// title to Base.astro and sits in a section we generate for, its card appears.
//
// In `astro dev` the same manifest is served on demand by a middleware, so a
// card can be previewed locally without a full build.

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import { buildCardSVG, loadBackground, loadWordmark } from './lib/og-card.js';
import { fontsForLocale } from './lib/og-fonts.js';

// The manifest is reached through a global symbol rather than by importing
// src/lib/og.ts: pages run through Astro's Vite SSR graph and this file runs in
// plain Node, so an import would be a *different* module instance (and Node
// can't resolve the extensionless TypeScript imports inside it either). This
// key is the contract — keep it identical to the one in src/lib/og.ts.
const STORE = Symbol.for('wavekat.og.cards');
const manifest = () => globalThis[STORE] ?? new Map();

export default function ogCards() {
  const root = process.cwd();
  const brandDir = join(root, 'vendor/wavekat-brand/assets');

  // The brand ground is identical on every card, so parse it once.
  let chrome = null;
  const brandChrome = () => (chrome ??= {
    background: loadBackground(brandDir),
    wordmark: loadWordmark(brandDir),
  });

  const renderCard = (card) => {
    const { fontFiles, fontStack, metrics } = fontsForLocale(root, card.locale);
    const svg = buildCardSVG({
      ...card,
      ...brandChrome(),
      fontStack,
      fonts: metrics,
    });
    return new Resvg(svg, {
      fitTo: { mode: 'width', value: 1200 },
      // loadSystemFonts is off on purpose: a card must look the same whether it
      // was built on a Mac, on the mixed-arch CI pool or on Cloudflare Pages,
      // and silently borrowing a host font is how that stops being true.
      font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Inter' },
    })
      .render()
      .asPng();
  };

  return {
    name: 'wavekat-og-cards',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const cards = [...manifest().values()];
        if (!cards.length) {
          logger.warn('no OG cards were registered — every page kept /og.png');
          return;
        }

        const started = Date.now();
        let bytes = 0;
        for (const card of cards) {
          const out = fileURLToPath(new URL(`.${card.src}`, dir));
          mkdirSync(dirname(out), { recursive: true });
          const png = renderCard(card);
          writeFileSync(out, png);
          bytes += png.length;
        }
        logger.info(
          `rendered ${cards.length} OG cards ` +
            `(${(bytes / 1048576).toFixed(1)} MB, ${((Date.now() - started) / 1000).toFixed(1)}s)`,
        );
      },

      'astro:server:setup': ({ server }) => {
        server.middlewares.use((req, res, next) => {
          const path = req.url?.split('?')[0] ?? '';
          if (!path.startsWith('/og/') || !path.endsWith('.png')) return next();

          // The manifest fills in as pages render, so a card exists here only
          // once its page has been requested — which is exactly how you get
          // here, by loading the page and then its og:image.
          const card = manifest().get(path);
          if (!card) return next();

          res.setHeader('Content-Type', 'image/png');
          res.end(renderCard(card));
        });
      },
    },
  };
}
