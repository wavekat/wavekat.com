import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string().default('WaveKat'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    ogImage: z.string().optional(),
  }),
});

const docs = defineCollection({
  // README.md files in each product repo are contributor-facing, not published.
  // changelog.md is synced from each product's docs/site/ too, but it isn't a
  // doc — it gets its own product page (e.g. /voice/changelog), rendered from
  // the synced markdown directly. Excluding it here keeps it out of the /docs
  // routes and the docs sidebar so it isn't published twice.
  loader: glob({
    pattern: ['**/*.md', '!**/README.md', '!**/changelog.md'],
    base: './src/content/docs',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const collections = { blog, docs };
