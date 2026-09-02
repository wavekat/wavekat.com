// Where this build's *assets* live, as opposed to where the site canonically
// lives.
//
// Almost everything absolute on a page — the canonical link, og:url, the
// hreflang set, the sitemap — is pinned to https://wavekat.com on every
// deploy, and must stay that way: a preview that canonicalises to itself is a
// preview that can get indexed, competing with production for its own terms.
//
// The OG card image is the one thing that can't follow that rule. It has to be
// an absolute URL (LinkedIn and X won't resolve a relative og:image), but
// pointing it at wavekat.com means a preview deploy unfurls with production's
// image — and for a card that only exists on the branch, with a 404. So the
// image, alone, resolves against the deploy it is actually served from.
//
// CI sets SITE_ASSET_ORIGIN on preview builds (see .github/workflows/
// preview.yml). It is unset for production and for local builds, where the
// canonical site is already the right answer.

const raw = process.env.SITE_ASSET_ORIGIN?.trim();

function parseOrigin(value: string | undefined): URL | undefined {
  if (!value) return undefined;
  try {
    return new URL(value);
  } catch {
    // A malformed override would otherwise throw once per page, mid-build,
    // with no hint of where it came from. Warn and fall back instead.
    console.warn(`[og] ignoring SITE_ASSET_ORIGIN — not a valid URL: ${value}`);
    return undefined;
  }
}

const override = parseOrigin(raw);

/**
 * Base for og:image / twitter:image. Falls back to the canonical site, which
 * is what production and local builds want.
 */
export function assetBase(site: URL | undefined): URL | undefined {
  return override ?? site;
}
