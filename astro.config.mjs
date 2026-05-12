// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import path from 'node:path';

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
