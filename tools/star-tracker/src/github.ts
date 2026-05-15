// GitHub helpers: webhook signature verification + REST API client.

const API = 'https://api.github.com';
const UA = 'wavekat-star-tracker';

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

// Lists public, non-archived, non-fork repos owned by `slug` — works for both
// orgs and personal accounts, because GitHub treats both as "users".
export async function listOwnerPublicRepos(slug: string, token?: string): Promise<string[]> {
  const out: string[] = [];
  let next: string | null = `${API}/users/${slug}/repos?type=owner&per_page=100&sort=full_name`;
  while (next) {
    const res = await ghFetch(next, { token });
    if (!res.ok) throw new Error(`listOwnerPublicRepos: ${res.status} ${await res.text()}`);
    const page = (await res.json()) as Array<{
      full_name: string; archived: boolean; fork: boolean; private: boolean;
    }>;
    for (const r of page) {
      if (!r.private && !r.archived && !r.fork) out.push(r.full_name);
    }
    next = parseNextLink(res.headers.get('link'));
  }
  return out;
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

export async function fetchStargazers(fullName: string, token?: string): Promise<Stargazer[]> {
  const out: Stargazer[] = [];
  let next: string | null = `${API}/repos/${fullName}/stargazers?per_page=100`;
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
