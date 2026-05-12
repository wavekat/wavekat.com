// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// Rewrites relative `*.md` links inside synced docs so they resolve to clean
// URLs at /docs/<product>/<page>/. Product repos link with `getting-started.md`
// so the docs are readable on GitHub too; on the site we want `getting-started/`.
function rehypeRewriteDocLinks() {
  const isExternal = (href) => /^([a-z]+:|\/\/|#|\/)/i.test(href);
  const rewrite = (node) => {
    if (node.tagName === 'a' && node.properties && typeof node.properties.href === 'string') {
      const href = node.properties.href;
      if (!isExternal(href) && /\.md(#|\?|$)/i.test(href)) {
        node.properties.href = href
          .replace(/\.md(?=#|\?|$)/i, '/')
          .replace(/(^|\/)index\/(?=#|\?|$)/, '$1');
      }
    }
    if (Array.isArray(node.children)) node.children.forEach(rewrite);
  };
  return () => (tree) => rewrite(tree);
}

// https://astro.build/config
export default defineConfig({
  site: 'https://wavekat.com',
  output: 'static',
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [rehypeRewriteDocLinks()],
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
