# star-tracker (stars.wavekat.com)

A small multi-tenant Cloudflare Worker that listens for GitHub `star` webhook
events, stores them in D1, and renders a cumulative star-history chart as SVG
or PNG for any GitHub org or user.

It's self-serve: anyone can sign in with GitHub, register an org (with
admin/owner verification), install a webhook, and embed the resulting chart
anywhere — `<img src="https://stars.wavekat.com/<slug>/chart.svg">`.

## Layout

```
src/
  index.ts      Hono app — auth, dashboard, webhook, chart routes
  auth.ts       OAuth state cookie + signed session cookie helpers
  github.ts     GitHub REST + HMAC webhook signature verification
  db.ts         D1 queries
  chart.ts     SVG renderer + PNG rasterisation via resvg-wasm
  pages.ts      Server-rendered HTML pages
migrations/
  0001_init.sql
wrangler.toml
```

## One-time setup

### 1. Create the D1 database

```sh
cd tools/star-tracker
npm install
npx wrangler d1 create wavekat-stars
```

Copy the `database_id` from the output into `wrangler.toml`.

### 2. Apply migrations

```sh
npm run db:migrate           # remote
npm run db:migrate:local     # for local `wrangler dev`
```

### 3. Create a GitHub OAuth App

At <https://github.com/settings/applications/new>:

- Homepage URL: `https://stars.wavekat.com`
- Authorization callback URL: `https://stars.wavekat.com/auth/callback`

Save the client ID and secret, then push them and a fresh JWT secret to the
Worker:

```sh
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
npx wrangler secret put JWT_SECRET          # any random 32+ byte string
```

OAuth scope requested: `read:org` — used to verify the signed-in user is an
admin of any org they try to register. No `repo` scope is requested because we
only read public stargazers.

### 4. Deploy

```sh
npm run deploy
```

### 5. Point the domain

Add a Worker route in `wrangler.toml` (or via the Cloudflare dashboard) for
`stars.wavekat.com/*`, then create the DNS record.

## User flow

1. User visits `stars.wavekat.com`, clicks **Sign in with GitHub**.
2. From the dashboard, they enter an org slug (e.g. `wavekat`). We call
   `GET /user/memberships/orgs/{org}` with their OAuth token; only `admin` role
   succeeds. For a personal account, the slug must match their login.
3. We mint a `webhook_secret` and show it once. They install an org-level
   webhook on the **Stars** event with content type `application/json`.
4. New star/unstar events flow into D1 immediately. They can backfill
   historical stars from the tenant page (uses the same OAuth token).
5. Embed the chart anywhere: `https://stars.wavekat.com/<slug>/chart.svg`
   (also `.png`, `?theme=dark`, `?title=...`).

## Security notes

- Webhook signatures (`X-Hub-Signature-256`) are verified with HMAC SHA-256
  against the per-tenant secret. Squatting a slug doesn't let an attacker
  poison data — they don't have the secret.
- The user's GitHub OAuth access token is stored in D1 to enable backfill and
  nightly reconciliation. Document this if you ever take outside users; the
  scope is `read:org` only.
- Slug squatting is possible (first user to register wins). Squatted slugs can
  be released manually with a D1 `DELETE FROM tenants WHERE slug = ?`.

## Schedule

A daily cron (`13 7 * * *` UTC) reconciles every tenant against the GitHub API
to repair any missed webhook deliveries.
