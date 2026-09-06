// A `fetch` that survives a blip.
//
// Why this exists: every network step in a CI job on the `wavekat-ci` pool
// already retries — `actions/checkout` makes three attempts, `npm ci` has
// npm's own retry logic — and the sync scripts were the only ones that did
// not. So a single transient DNS answer took a whole build down while the
// steps around it, resolving other hostnames in the same seconds, passed:
//
//   TypeError: fetch failed
//     at async fetchFace (scripts/sync-fonts.js:56:15)
//     [cause]: Error: getaddrinfo EAI_AGAIN fonts.googleapis.com
//
// That is the failure mode docs/06-self-hosted-runners.md §6 describes: the
// containers share one resolver hop, and it answers with an error rather than
// timing out, in bursts. The Mac's containers now pin their own resolvers,
// but the Linux host deliberately inherits the machine's — so a blip stays
// possible by design, and a build-time download has to expect one.
//
// What this is NOT: a way to make a missing asset non-fatal. The last attempt
// still throws, because a build that ships without its CJK faces renders
// tofu on every card and a build without the store badges renders a broken
// image where the only download control should be. Retrying buys time for a
// transient answer; it never converts a real failure into a pass.

/** DNS and connection-reset errors — the ones that mean "ask again", not "no". */
const TRANSIENT_CODES = new Set([
  'EAI_AGAIN', // DNS temporary failure — the one that killed run 34019955031
  'ENOTFOUND', // the same hop answering NXDOMAIN for a name that does exist
  'ECONNRESET',
  'ECONNREFUSED',
  'ETIMEDOUT',
  'EPIPE',
  'UND_ERR_CONNECT_TIMEOUT',
  'UND_ERR_SOCKET',
  'UND_ERR_HEADERS_TIMEOUT',
  'UND_ERR_BODY_TIMEOUT',
]);

/** 5xx is the server having a moment; 429 is it asking us to wait. */
function retriableStatus(status) {
  return status === 408 || status === 425 || status === 429 || status >= 500;
}

function retriableError(err) {
  // A caller-cancelled request is a decision, not a blip.
  if (err?.name === 'AbortError') return false;
  for (let e = err; e; e = e.cause) {
    if (TRANSIENT_CODES.has(e.code)) return true;
    if (e.name === 'TimeoutError') return true;
  }
  // `fetch` wraps every transport failure in a bare `TypeError: fetch failed`,
  // so treat that as transient even when the cause carries no code we know.
  return err instanceof TypeError && /fetch failed/i.test(err.message ?? '');
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * `fetch`, retried on transient network errors and retriable status codes.
 *
 * @param {string} url
 * @param {object} [opts] — `fetch` init, plus:
 *   `attempts` (default 4), `baseDelayMs` (default 500, doubling per attempt),
 *   `timeoutMs` (default 30000, per attempt), `label` for log lines,
 *   `impl` to substitute the fetch implementation in tests.
 */
export async function fetchRetry(url, opts = {}) {
  const {
    attempts = 4,
    baseDelayMs = 500,
    timeoutMs = 30_000,
    label = url,
    impl = fetch,
    signal,
    ...init
  } = opts;

  let last;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    // A per-attempt deadline, so a hung socket cannot outlive the retry budget.
    // Composed with the caller's signal so an abort still cancels everything.
    const perAttempt = AbortSignal.timeout(timeoutMs);
    const composed = signal ? AbortSignal.any([signal, perAttempt]) : perAttempt;

    try {
      const res = await impl(url, { ...init, signal: composed });
      if (attempt === attempts || !retriableStatus(res.status)) return res;
      last = new Error(`HTTP ${res.status}`);
    } catch (err) {
      if (signal?.aborted || !retriableError(err) || attempt === attempts) throw err;
      last = err;
    }

    const delay = baseDelayMs * 2 ** (attempt - 1);
    console.warn(
      `  retrying ${label} in ${delay}ms — attempt ${attempt}/${attempts} failed ` +
        `(${last.cause?.code ?? last.cause?.message ?? last.message})`,
    );
    await sleep(delay);
  }

  /* c8 ignore next */
  throw last;
}
