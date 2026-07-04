// SEO/GEO helpers shared by pages and layouts.

export interface Faq {
  q: string;
  a: string;
}

// Markdown → plain text for schema fields: drop images, unwrap links,
// emphasis, and inline code.
const stripMd = (s: string): string =>
  s
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .trim();

/**
 * Extract FAQ pairs from a markdown body for FAQPage structured data.
 *
 * A FAQ is any `###` heading phrased as a question (ends with `?` or `？`,
 * which covers every locale we ship) followed by its answer paragraphs.
 * Deriving the schema from the same markdown the page renders keeps the two
 * from ever drifting apart — the site rule for FAQPage.
 */
export function extractFaqs(markdown: string): Faq[] {
  const faqs: Faq[] = [];
  let inFence = false;
  let question: string | null = null;
  let answerLines: string[] = [];

  const flush = () => {
    const a = stripMd(answerLines.join(' ').replace(/\s+/g, ' '));
    if (question && a) faqs.push({ q: question, a });
    question = null;
    answerLines = [];
  };

  for (const line of markdown.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const heading = line.match(/^(#{1,6})\s+(.*?)\s*$/);
    if (heading) {
      flush();
      const text = stripMd(heading[2]);
      if (heading[1] === '###' && /[?？]$/.test(text)) question = text;
      continue;
    }
    // Skip table rows and HTML comments; keep prose lines.
    if (question && line.trim() && !/^\s*(\||<!--)/.test(line)) {
      answerLines.push(line.trim());
    }
  }
  flush();
  return faqs;
}

/** ItemList structured data for listing/hub pages (e.g. the blog index). */
export function itemListSchema(
  name: string,
  url: string,
  items: { name: string; url: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    url,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}
