// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import path from 'node:path';
import { readFileSync, existsSync } from 'node:fs';
import { imageSize } from 'image-size';

import tailwindcss from '@tailwindcss/vite';

// Rewrites relative `*.md` links inside synced docs to absolute URLs under
// /docs/<product>/<page>/. Product repos link with `getting-started.md` so
// the docs are readable on GitHub too; on the site, those links must resolve
// to the right path regardless of which page is rendering them. Relative
// hrefs like `usage/` would resolve under the current page's directory route
// (`/docs/cli/getting-started/usage/` — wrong); absolute hrefs avoid that.
function rehypeRewriteDocLinks() {
  const isExternal = (href) => /^([a-z]+:|\/\/|#|\/)/i.test(href);
  return () => (tree, file) => {
    const filePath = file?.path || file?.history?.[file?.history?.length - 1] || '';
    const match = filePath.replace(/\\/g, '/').match(/src\/content\/docs\/(.+)\.md$/);
    if (!match) return; // Not a docs file — leave links alone.
    const sourceDir = path.posix.dirname(match[1]); // e.g. "cli" or "cli/sub"

    const rewrite = (node) => {
      if (node.tagName === 'a' && node.properties && typeof node.properties.href === 'string') {
        const href = node.properties.href;
        if (!isExternal(href) && /\.md(#|\?|$)/i.test(href)) {
          const [, target, suffix = ''] = href.match(/^([^#?]+)(.*)$/);
          const resolved = path.posix.normalize(path.posix.join(sourceDir, target));
          const cleanPath = resolved.replace(/\.md$/, '').replace(/(^|\/)index$/, '$1');
          node.properties.href = `/docs/${cleanPath}${cleanPath ? '/' : ''}${suffix}`;
        }
      }
      if (Array.isArray(node.children)) node.children.forEach(rewrite);
    };
    rewrite(tree);
  };
}

// Give version-number headings (the changelog's `0.0.41`, …) a stable, lossless
// id equal to the literal version, so pages can deep-link to a release with
// `…/voice/changelog/#0.0.41`. github-slugger (Astro's default) strips the dots
// to `0041`, which is both ugly and collision-prone — `0.1.41` and `0.14.1`
// both reduce to `0141`. Scoped to headings whose text is *exactly* a
// `X.Y.Z` version, so every other heading keeps its normal slug; this runs
// after the default slug plugin and overrides the id only for those.
function rehypeVersionAnchors() {
  const VERSION = /^\d+\.\d+\.\d+$/;
  const textOf = (node) =>
    (node.children || [])
      .map((c) => (c.type === 'text' ? c.value : c.tagName ? textOf(c) : ''))
      .join('');
  return () => (tree) => {
    const visit = (node) => {
      if (typeof node.tagName === 'string' && /^h[1-6]$/.test(node.tagName)) {
        const text = textOf(node).trim();
        if (VERSION.test(text)) {
          node.properties = node.properties || {};
          node.properties.id = text;
        }
      }
      if (Array.isArray(node.children)) node.children.forEach(visit);
    };
    visit(tree);
  };
}

// Opt-in image presentation flags, written as a URL fragment in plain
// markdown: `![alt](/screenshots/voice-prompts/en.webp#shadow)`. The fragment
// is stripped from the served src and mapped to a class. Only `shadow` exists
// today (`.img-shadow` in global.css) — for screenshots that don't carry their
// own chrome (bare browser captures on a white ground) and would otherwise
// melt into the page. It's per-image on purpose: the framed desktop-app shots
// already ship a real window shadow, and stacking another would look wrong.
function rehypeImageFlags() {
  const FLAGS = { shadow: 'img-shadow' };
  return () => (tree) => {
    const visit = (node) => {
      if (node.tagName === 'img' && node.properties && typeof node.properties.src === 'string') {
        const [src, fragment] = node.properties.src.split('#');
        const className = FLAGS[fragment];
        if (className) {
          node.properties.src = src;
          node.properties.className = [
            ...(Array.isArray(node.properties.className) ? node.properties.className : []),
            className,
          ];
        }
      }
      if (Array.isArray(node.children)) node.children.forEach(visit);
    };
    visit(tree);
  };
}

// Markdown images ship with no width/height, so the browser can't reserve
// space before they load (layout shift when the ~1200px blog screenshots
// arrive) and every image loads immediately. Measure local /public assets at
// build time, stamp the real dimensions, and lazy-load everything after each
// page's first image (only that one can be above the fold in a post).
function rehypeImageDimensions() {
  return () => (tree) => {
    let imageIndex = 0;
    const visit = (node) => {
      if (node.tagName === 'img' && node.properties && typeof node.properties.src === 'string') {
        const src = node.properties.src;
        if (src.startsWith('/') && !src.startsWith('//')) {
          const file = path.join(process.cwd(), 'public', src.split(/[?#]/)[0]);
          if (existsSync(file)) {
            try {
              const { width, height } = imageSize(readFileSync(file));
              if (width && height) {
                node.properties.width ??= width;
                node.properties.height ??= height;
              }
            } catch {
              // Unmeasurable image — leave it unsized rather than fail the build.
            }
          }
        }
        node.properties.decoding ??= 'async';
        node.properties.loading ??= imageIndex === 0 ? 'eager' : 'lazy';
        imageIndex += 1;
      }
      if (Array.isArray(node.children)) node.children.forEach(visit);
    };
    visit(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://wavekat.com',
  output: 'static',
  // i18n: English is the default locale and keeps unprefixed URLs (/voice/),
  // so existing pages and their canonicals are unchanged. Localised pages live
  // under a short slug (/zh/voice/) whose hreflang stays standards-correct
  // (zh-Hans). Keep this in sync with src/lib/i18n.ts (slug ↔ code mapping).
  // prefixDefaultLocale:false = don't redirect / to /en/.
  i18n: {
    defaultLocale: 'en',
    locales: [
      'en',
      { path: 'zh', codes: ['zh-Hans', 'zh-CN'] },
      { path: 'zh-hant', codes: ['zh-Hant', 'zh-TW'] },
      { path: 'ja', codes: ['ja'] },
      { path: 'ko', codes: ['ko'] },
      { path: 'de', codes: ['de'] },
      { path: 'es', codes: ['es'] },
      { path: 'fr', codes: ['fr'] },
      { path: 'it', codes: ['it'] },
    ],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    // Emit <xhtml:link rel="alternate" hreflang> entries in the sitemap for
    // pages that exist in multiple locales. Keys are URL slugs, values are the
    // hreflang codes — so /zh/ is advertised as zh-Hans.
    sitemap({
      // Keep noindex pages out of the sitemap — advertising a URL we then tell
      // crawlers to ignore is a contradictory signal. /brand/wallpaper/ is an
      // internal brand tool, not a page we want indexed.
      filter: (page) => !page.includes('/brand/wallpaper/'),
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          zh: 'zh-Hans',
          'zh-hant': 'zh-Hant',
          ja: 'ja',
          ko: 'ko',
          de: 'de',
          es: 'es',
          fr: 'fr',
          it: 'it',
        },
      },
    }),
  ],
  markdown: {
    rehypePlugins: [
      rehypeRewriteDocLinks(),
      rehypeVersionAnchors(),
      rehypeImageFlags(),
      rehypeImageDimensions(),
    ],
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        ignored: ['**/public/logos/**']
      }
    }
  }
});
