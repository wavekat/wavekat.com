// GitHub helpers: webhook signature verification + REST API client.

const API = 'https://api.github.com';
const UA = 'wavekat-star-tracker';

// Per-repo backfill mode threshold. Repos with <= this many stars are
// fully enumerated (≤ 50 subrequests at per_page=100). Bigger repos are
// curve-sampled to stay under the Worker subrequest cap and GitHub's
// 40k-stargazer hard cap.
export const EXACT_THRESHOLD = 5000;

// GitHub returns at most 40,000 stargazers via the REST API regardless of
// the real total — page numbers past 400 just 422.
export const STARGAZER_HARD_CAP = 40_000;

const PER_PAGE = 100;
const SAMPLE_PAGES = 15;

// Cap on repos a backfill-all run will sync, sorted by stargazers_count desc.
// Keeps runtime/subrequest cost bounded for huge orgs like microsoft/google.
export const BACKFILL_ALL_REPO_CAP = 100;

export async function verifySignature(
  body: string,
  signatureHeader: string | null,
  secret: string,
): Promise<boolean> {
  if (!signatureHeader || !signatureHeader.startsWith('sha256=')) return false;
  const expected = signatureHeader.slice('sha256='.length);
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body));
  const actual = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, '0')).join('');
  if (actual.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < actual.length; i++) diff |= actual.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

type FetchOpts = { token?: string; accept?: string };

async function ghFetch(url: string, opts: FetchOpts = {}): Promise<Response> {
  const headers: Record<string, string> = {
    'User-Agent': UA,
    Accept: opts.accept ?? 'application/vnd.github+json',
  };
  if (opts.token) headers.Authorization = `Bearer ${opts.token}`;
  const res = await fetch(url, { headers });
  if (res.status === 403 && res.headers.get('x-ratelimit-remaining') === '0') {
    const reset = res.headers.get('x-ratelimit-reset');
    throw new Error(`GitHub rate limit exhausted (resets at ${reset})`);
  }
  return res;
}

function parseNextLink(linkHeader: string | null): string | null {
  if (!linkHeader) return null;
  const m = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
  return m ? m[1] : null;
}

export type RepoSummary = { full_name: string; stargazers_count: number };

// Lists public, non-archived, non-fork repos owned by `slug`, with star
// counts (the /users/{slug}/repos endpoint returns them inline, so this
// costs no extra requests). Works for both orgs and user accounts.
export async function listOwnerPublicRepos(slug: string, token?: string): Promise<RepoSummary[]> {
  const out: RepoSummary[] = [];
  let next: string | null = `${API}/users/${slug}/repos?type=owner&per_page=100&sort=full_name`;
  while (next) {
    const res = await ghFetch(next, { token });
    if (!res.ok) throw new Error(`listOwnerPublicRepos: ${res.status} ${await res.text()}`);
    const page = (await res.json()) as Array<{
      full_name: string; archived: boolean; fork: boolean; private: boolean; stargazers_count: number;
    }>;
    for (const r of page) {
      if (!r.private && !r.archived && !r.fork) {
        out.push({ full_name: r.full_name, stargazers_count: r.stargazers_count ?? 0 });
      }
    }
    next = parseNextLink(res.headers.get('link'));
  }
  return out;
}

export async function fetchRepoMetadata(
  fullName: string,
  token?: string,
): Promise<{ stargazers_count: number; private: boolean }> {
  const res = await ghFetch(`${API}/repos/${fullName}`, { token });
  if (!res.ok) throw new Error(`fetchRepoMetadata(${fullName}): ${res.status} ${await res.text()}`);
  const data = (await res.json()) as { stargazers_count: number; private?: boolean };
  return { stargazers_count: data.stargazers_count ?? 0, private: data.private === true };
}

export type GithubUser = { id: number; login: string; avatar_url: string };

export async function exchangeOAuthCode(
  clientId: string,
  clientSecret: string,
  code: string,
  redirectUri: string,
): Promise<string> {
  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code, redirect_uri: redirectUri }),
  });
  const data = (await res.json()) as { access_token?: string; error?: string };
  if (!data.access_token) throw new Error(`oauth exchange failed: ${data.error ?? 'unknown'}`);
  return data.access_token;
}

export async function fetchAuthenticatedUser(token: string): Promise<GithubUser> {
  const res = await ghFetch(`${API}/user`, { token });
  if (!res.ok) throw new Error(`fetchAuthenticatedUser: ${res.status}`);
  return (await res.json()) as GithubUser;
}

// Returns the user's role in `org`, or null if they aren't a public/private member.
// Requires the user's OAuth access token to carry the `read:org` scope.
export async function fetchOrgRole(token: string, org: string): Promise<'admin' | 'member' | null> {
  const res = await ghFetch(`${API}/user/memberships/orgs/${org}`, { token });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`fetchOrgRole(${org}): ${res.status}`);
  const data = (await res.json()) as { role: 'admin' | 'member'; state: string };
  if (data.state !== 'active') return null;
  return data.role;
}

export type Stargazer = { user_id: number; user_login: string; starred_at: string };

// Full pagination — every star, every user. Use only for repos with
// stargazers_count <= EXACT_THRESHOLD or you'll burn the subrequest budget.
export async function fetchStargazers(fullName: string, token?: string): Promise<Stargazer[]> {
  const out: Stargazer[] = [];
  let next: string | null = `${API}/repos/${fullName}/stargazers?per_page=${PER_PAGE}`;
  while (next) {
    const res = await ghFetch(next, { token, accept: 'application/vnd.github.star+json' });
    if (!res.ok) throw new Error(`fetchStargazers(${fullName}): ${res.status} ${await res.text()}`);
    const page = (await res.json()) as Array<{ starred_at: string; user: { id: number; login: string } }>;
    for (const s of page) {
      out.push({ user_id: s.user.id, user_login: s.user.login, starred_at: s.starred_at });
    }
    next = parseNextLink(res.headers.get('link'));
  }
  return out;
}

export type SamplePoint = { starred_at: string; cumulative: number };

// Curve-samples a repo's stargazer history: picks ~SAMPLE_PAGES evenly
// spread pages and reads the first + last star on each. Each sample is an
// exact (timestamp, cumulative-index) pair, so the resulting curve passes
// through real points — only the spaces between are interpolated by the
// chart's step-after rendering.
//
// stargazersCount is needed up-front so we can compute total pages without
// reading any pages first. Pass the value from fetchRepoMetadata() or
// listOwnerPublicRepos().
export async function fetchSampledStargazers(
  fullName: string,
  stargazersCount: number,
  token?: string,
): Promise<SamplePoint[]> {
  const capped = Math.min(Math.max(stargazersCount, 1), STARGAZER_HARD_CAP);
  const totalPages = Math.max(1, Math.ceil(capped / PER_PAGE));

  // Evenly distribute page numbers across [1, totalPages]. With fewer pages
  // than samples we just hit every page (no point in duplicates).
  const pageSet = new Set<number>();
  const slots = Math.min(SAMPLE_PAGES, totalPages);
  for (let i = 0; i < slots; i++) {
    const t = slots === 1 ? 0 : i / (slots - 1);
    const p = Math.round(1 + t * (totalPages - 1));
    pageSet.add(Math.max(1, Math.min(totalPages, p)));
  }
  const pages = [...pageSet].sort((a, b) => a - b);

  const out: SamplePoint[] = [];
  for (const page of pages) {
    const url = `${API}/repos/${fullName}/stargazers?per_page=${PER_PAGE}&page=${page}`;
    const res = await ghFetch(url, { token, accept: 'application/vnd.github.star+json' });
    if (!res.ok) {
      // 422 means we asked past GitHub's 40k cap — skip rather than fail
      // the whole repo. Anything else is a real error.
      if (res.status === 422) continue;
      throw new Error(`fetchSampledStargazers(${fullName}) page ${page}: ${res.status} ${await res.text()}`);
    }
    const data = (await res.json()) as Array<{ starred_at: string; user: { id: number; login: string } }>;
    if (data.length === 0) continue;
    const baseCumulative = (page - 1) * PER_PAGE;
    out.push({ starred_at: data[0].starred_at, cumulative: baseCumulative + 1 });
    if (data.length > 1) {
      out.push({ starred_at: data[data.length - 1].starred_at, cumulative: baseCumulative + data.length });
    }
  }
  return out;
}
