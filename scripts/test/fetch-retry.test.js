#!/usr/bin/env node
// Proves fetchRetry survives the transient DNS failures this CI pool has, and
// still fails loudly when the failure is real. Run: node scripts/test/fetch-retry.test.js
import assert from 'node:assert/strict';
import { fetchRetry } from '../lib/fetch-retry.js';

let passed = 0;
async function test(name, fn) {
  try {
    await fn();
    console.log(`  ok   ${name}`);
    passed++;
  } catch (err) {
    console.error(`  FAIL ${name}\n       ${err.message}`);
    process.exitCode = 1;
  }
}

/** A DNS failure shaped exactly like the one that killed run 34019955031. */
function eaiAgain() {
  const cause = Object.assign(new Error('getaddrinfo EAI_AGAIN fonts.googleapis.com'), {
    code: 'EAI_AGAIN',
    errno: -3001,
    syscall: 'getaddrinfo',
    hostname: 'fonts.googleapis.com',
  });
  return Object.assign(new TypeError('fetch failed'), { cause });
}

const ok = (body = 'hi') => new Response(body, { status: 200 });

console.log('fetch-retry');

await test('retries a transient EAI_AGAIN and returns the eventual success', async () => {
  let calls = 0;
  const impl = async () => {
    calls++;
    if (calls < 3) throw eaiAgain();
    return ok();
  };
  const res = await fetchRetry('https://fonts.googleapis.com/css2', {
    attempts: 4,
    baseDelayMs: 1,
    impl,
  });
  assert.equal(calls, 3, `expected 3 attempts, made ${calls}`);
  assert.equal(res.status, 200);
});

await test('gives up after the last attempt and rethrows the network error', async () => {
  let calls = 0;
  const impl = async () => {
    calls++;
    throw eaiAgain();
  };
  await assert.rejects(
    () => fetchRetry('https://fonts.googleapis.com/css2', { attempts: 3, baseDelayMs: 1, impl }),
    /EAI_AGAIN|fetch failed/,
  );
  assert.equal(calls, 3, `expected 3 attempts, made ${calls}`);
});

await test('retries a 503 but returns a 404 immediately', async () => {
  let calls = 0;
  const impl = async () => {
    calls++;
    return new Response('', { status: calls < 2 ? 503 : 200 });
  };
  const res = await fetchRetry('https://x.test', { attempts: 3, baseDelayMs: 1, impl });
  assert.equal(calls, 2);
  assert.equal(res.status, 200);

  let notFound = 0;
  const res2 = await fetchRetry('https://x.test', {
    attempts: 3,
    baseDelayMs: 1,
    impl: async () => {
      notFound++;
      return new Response('', { status: 404 });
    },
  });
  assert.equal(notFound, 1, 'a 404 is an answer, not a blip — must not retry');
  assert.equal(res2.status, 404);
});

await test('does not retry when the caller aborts', async () => {
  let calls = 0;
  const impl = async () => {
    calls++;
    throw Object.assign(new Error('This operation was aborted'), { name: 'AbortError' });
  };
  await assert.rejects(() =>
    fetchRetry('https://x.test', { attempts: 3, baseDelayMs: 1, impl, signal: AbortSignal.abort() }),
  );
  assert.equal(calls, 1, 'a caller-cancelled request must not be retried');
});

await test('succeeds on the first attempt without sleeping', async () => {
  let calls = 0;
  const started = Date.now();
  const res = await fetchRetry('https://x.test', {
    attempts: 3,
    baseDelayMs: 5000,
    impl: async () => {
      calls++;
      return ok();
    },
  });
  assert.equal(calls, 1);
  assert.equal(res.status, 200);
  assert.ok(Date.now() - started < 1000, 'happy path must not back off');
});

console.log(`\n${passed} passed${process.exitCode ? ', failures above' : ''}`);
