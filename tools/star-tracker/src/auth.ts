// OAuth flow helpers + session cookie issuance/verification.
//
// We use a signed JWT in an HttpOnly cookie ("session") for the server-rendered
// dashboard. The JWT carries the user id; everything else is looked up from D1
// on each request. Lifetime: 30 days.

import { sign, verify } from 'hono/jwt';
import { setCookie, getCookie, deleteCookie } from 'hono/cookie';
import type { Context } from 'hono';

const COOKIE = 'session';
const TTL_SECONDS = 30 * 24 * 60 * 60;

export async function issueSession(c: Context, userId: string, jwtSecret: string): Promise<void> {
  const now = Math.floor(Date.now() / 1000);
  const token = await sign({ sub: userId, iat: now, exp: now + TTL_SECONDS }, jwtSecret);
  setCookie(c, COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
    path: '/',
    maxAge: TTL_SECONDS,
  });
}

export function clearSession(c: Context): void {
  deleteCookie(c, COOKIE, { path: '/' });
}

export async function readSession(c: Context, jwtSecret: string): Promise<string | null> {
  const token = getCookie(c, COOKIE);
  if (!token) return null;
  try {
    const payload = (await verify(token, jwtSecret, 'HS256')) as { sub: string };
    return payload.sub ?? null;
  } catch {
    return null;
  }
}

// OAuth state cookie — short-lived nonce to defend against CSRF on the OAuth callback.
const STATE_COOKIE = 'oauth_state';

export function setOAuthState(c: Context, state: string): void {
  setCookie(c, STATE_COOKIE, state, {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
    path: '/',
    maxAge: 600,
  });
}

export function takeOAuthState(c: Context): string | null {
  const v = getCookie(c, STATE_COOKIE) ?? null;
  if (v) deleteCookie(c, STATE_COOKIE, { path: '/' });
  return v;
}

// One-shot flash cookie — used to carry a message across a POST/redirect/GET
// so reloading the tenant page doesn't re-POST the action.
const FLASH_COOKIE = 'flash';

export function setFlash(c: Context, msg: string, justCreated = false): void {
  const payload = JSON.stringify({ msg, justCreated });
  setCookie(c, FLASH_COOKIE, payload, {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
    path: '/',
    maxAge: 60,
  });
}

export function takeFlash(c: Context): { msg: string; justCreated: boolean } | null {
  const raw = getCookie(c, FLASH_COOKIE);
  if (!raw) return null;
  deleteCookie(c, FLASH_COOKIE, { path: '/' });
  try {
    const parsed = JSON.parse(raw) as { msg?: string; justCreated?: boolean };
    if (typeof parsed.msg !== 'string') return null;
    return { msg: parsed.msg, justCreated: !!parsed.justCreated };
  } catch {
    return null;
  }
}

export function randomToken(bytes = 24): string {
  const buf = new Uint8Array(bytes);
  crypto.getRandomValues(buf);
  return [...buf].map((b) => b.toString(16).padStart(2, '0')).join('');
}
