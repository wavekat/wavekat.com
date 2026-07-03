import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  // English only: translated posts have ids like "de/<slug>" whose URLs live
  // under /de/blog/, so including them here produced broken /blog/de/<slug>
  // links and interleaved nine languages into one feed.
  const posts = (await getCollection('blog', ({ data }) => !data.draft && data.lang === 'en'))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'WaveKat Blog',
    description: 'Engineering notes, announcements, and deep-dives from the WaveKat team.',
    site: context.site!,
    customData: '<language>en</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
    })),
  });
}
