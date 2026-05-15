// Server-rendered HTML pages. Inline CSS, no JS — keeps the bundle small and
// the UX dependable inside a Worker.

import type { Tenant, User } from './db';

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function shell(title: string, user: User | null, body: string): string {
  const nav = user
    ? `<a href="/dashboard">${esc(user.username)}</a> · <form method="POST" action="/auth/logout" style="display:inline"><button class="link" type="submit">Sign out</button></form>`
    : `<a href="/auth/login">Sign in with GitHub</a>`;

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${esc(title)}</title>
<style>
  :root { color-scheme: light dark; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 760px; margin: 0 auto; padding: 1.5rem 1.25rem 3rem; line-height: 1.55; color: #0f172a; background: #ffffff; }
  @media (prefers-color-scheme: dark) { body { background: #0b0f17; color: #e2e8f0; } a { color: #38bdf8; } code, pre { background: #111827 !important; color: #e2e8f0 !important; } .warn { background: #422006 !important; color: #fde68a !important; } header { border-color: #1e293b !important; } .card { background: #111827 !important; border-color: #1e293b !important; } }
  header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 1rem; border-bottom: 1px solid #e2e8f0; margin-bottom: 1.5rem; font-size: 0.95rem; }
  header a, header form { color: inherit; text-decoration: none; }
  header strong { font-weight: 700; }
  h1 { font-size: 1.5rem; margin: 0 0 1rem; }
  h2 { font-size: 1.1rem; margin: 2rem 0 .5rem; }
  code, pre { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
  pre { padding: 12px 14px; overflow-x: auto; white-space: pre-wrap; word-break: break-all; }
  input[type=text] { padding: 8px 10px; font: inherit; width: 100%; max-width: 320px; border: 1px solid #cbd5e1; border-radius: 4px; background: transparent; color: inherit; }
  button { padding: 8px 16px; font: inherit; background: #2196f3; color: white; border: 0; border-radius: 4px; cursor: pointer; }
  button.link { background: transparent; color: inherit; padding: 0; cursor: pointer; text-decoration: underline; }
  .muted { color: #64748b; }
  .warn { background: #fef3c7; color: #78350f; padding: 10px 14px; border-radius: 4px; }
  .card { border: 1px solid #e2e8f0; border-radius: 6px; padding: 1rem 1.25rem; margin-bottom: 1rem; background: #ffffff; }
  ul.tenants { list-style: none; padding: 0; }
  ul.tenants li { display: flex; justify-content: space-between; align-items: center; }
  .btn-github { display: inline-block; padding: 10px 18px; background: #24292f; color: white; border-radius: 4px; text-decoration: none; }
  dl.embed { display: grid; grid-template-columns: 110px 1fr; gap: 6px 12px; align-items: start; margin: .75rem 0; }
  dl.embed dt { color: #64748b; font-size: 0.85em; padding-top: 4px; }
  dl.embed dd { margin: 0; }
  dl.embed code { display: inline-block; max-width: 100%; }
  .secret-row { display: flex; align-items: stretch; gap: 8px; margin: .5rem 0 1rem; }
  .secret-row .secret { flex: 1; margin: 0; padding: 10px 12px; }
  .eye-btn { background: transparent; color: inherit; border: 1px solid #cbd5e1; padding: 0 10px; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; }
  @media (prefers-color-scheme: dark) { .eye-btn { border-color: #334155; } }
  .eye-btn .eye-closed { display: none; }
  .eye-btn[data-revealed="true"] .eye-open { display: none; }
  .eye-btn[data-revealed="true"] .eye-closed { display: inline; }
  .chart-section input[type=radio] { position: absolute; opacity: 0; pointer-events: none; }
  .theme-toggle { display: inline-flex; border: 1px solid #cbd5e1; border-radius: 6px; overflow: hidden; margin-bottom: .75rem; }
  @media (prefers-color-scheme: dark) { .theme-toggle { border-color: #334155; } }
  .theme-toggle label { padding: 6px 14px; font-size: 0.85em; cursor: pointer; user-select: none; }
  .chart-section #theme-light:checked ~ .theme-toggle label[for=theme-light],
  .chart-section #theme-dark:checked ~ .theme-toggle label[for=theme-dark] { background: #2196f3; color: white; }
  .chart-preview img { max-width: 100%; border-radius: 4px; display: block; }
  .chart-section .chart-preview .dark { display: none; }
  .chart-section #theme-dark:checked ~ .chart-preview .light { display: none; }
  .chart-section #theme-dark:checked ~ .chart-preview .dark { display: block; }
</style></head>
<body>
<header>
  <span><strong><a href="/">stars.wavekat.com</a></strong> <span class="muted">— cumulative star history for any GitHub org</span></span>
  <span>${nav}</span>
</header>
${body}
<script>
(function () {
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.eye-btn');
    if (!btn) return;
    var row = btn.closest('.secret-row');
    if (!row) return;
    var secret = row.querySelector('.secret');
    if (!secret) return;
    var revealed = secret.dataset.revealed === 'true';
    if (revealed) {
      secret.textContent = '•'.repeat(secret.dataset.value.length);
      secret.dataset.revealed = 'false';
      btn.dataset.revealed = 'false';
      btn.setAttribute('aria-label', 'Show secret');
    } else {
      secret.textContent = secret.dataset.value;
      secret.dataset.revealed = 'true';
      btn.dataset.revealed = 'true';
      btn.setAttribute('aria-label', 'Hide secret');
    }
  });
  // Sync the button icon state to the initial render.
  document.querySelectorAll('.secret').forEach(function (s) {
    var row = s.closest('.secret-row');
    var btn = row && row.querySelector('.eye-btn');
    if (btn) btn.dataset.revealed = s.dataset.revealed || 'false';
  });
})();
</script>
</body></html>`;
}

export function landing(user: User | null): string {
  return shell(
    'stars.wavekat.com',
    user,
    `<h1>Cumulative GitHub star history, served as an image.</h1>
<p>Track stars across all repos in your GitHub org or personal account. Install one org-level webhook and embed the chart anywhere.</p>
<p>${user ? `<a class="btn-github" href="/dashboard">Go to dashboard →</a>` : `<a class="btn-github" href="/auth/login">Sign in with GitHub</a>`}</p>
<h2>How it works</h2>
<ol>
  <li>Sign in with GitHub.</li>
  <li>Register the org or user you want to track. We verify you're an admin (orgs) or that the login matches yours (personal).</li>
  <li>Install the webhook we hand you on the org. Star events flow in.</li>
  <li>Embed <code>&lt;img src="https://stars.wavekat.com/&lt;slug&gt;/chart.svg"&gt;</code> in your README.</li>
</ol>
<h2>Free, open source</h2>
<p>Source: <a href="https://github.com/wavekat/wavekat.com/tree/main/tools/star-tracker">github.com/wavekat/wavekat.com</a> · MIT.</p>`,
  );
}

export function dashboard(user: User, tenants: Tenant[], _publicUrl: string, flash?: string): string {
  const list = tenants.length === 0
    ? `<p class="muted">No tenants yet. Register your first below.</p>`
    : `<ul class="tenants">${tenants.map((t) => `<li class="card">
        <span><strong>${esc(t.slug)}</strong>${t.display_name && t.display_name !== t.slug ? ` <span class="muted">— ${esc(t.display_name)}</span>` : ''}</span>
        <span><a href="/${esc(t.slug)}">manage →</a></span>
      </li>`).join('')}</ul>`;

  return shell(
    'Dashboard',
    user,
    `${flash ? `<p class="warn">${esc(flash)}</p>` : ''}
<h1>Your trackers</h1>
${list}
<h2>Register a new tracker</h2>
<form method="POST" action="/tenants">
  <p><input type="text" name="slug" placeholder="github org or user login" required pattern="[A-Za-z0-9][A-Za-z0-9-]{0,38}"/></p>
  <p><button type="submit">Register</button></p>
</form>
<p class="muted">We'll verify you're an admin of the org (or that the login matches your GitHub username) before creating it.</p>`,
  );
}

export function tenantDetail(user: User, tenant: Tenant, publicUrl: string, repos: string[], totalStars: number, justCreated?: boolean, flash?: string): string {
  const webhookUrl = `${publicUrl}/webhook`;
  const chartSvg = `${publicUrl}/${tenant.slug}/chart.svg`;
  const chartPng = `${publicUrl}/${tenant.slug}/chart.png`;
  // Cache-bust the on-page preview when the star count changes — the chart
  // route sends a max-age=60 cache header so READMEs etc. benefit from it,
  // but our own dashboard should never show stale data after a backfill.
  const previewLight = `${chartSvg}?v=${totalStars}`;
  const previewDark = `${chartSvg}?v=${totalStars}&theme=dark`;

  const secretLen = tenant.webhook_secret.length;
  const secretBlock = `${justCreated ? `<p class="warn">Tenant registered. Install the webhook below to start collecting events.</p>` : ''}
       <p>Webhook secret:</p>
       <div class="secret-row">
         <pre class="secret" data-value="${esc(tenant.webhook_secret)}" data-revealed="${justCreated ? 'true' : 'false'}">${justCreated ? esc(tenant.webhook_secret) : '•'.repeat(secretLen)}</pre>
         <button type="button" class="eye-btn" aria-label="Toggle visibility" data-target-secret>
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
             <path class="eye-open" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle class="eye-open" cx="12" cy="12" r="3"/>
             <path class="eye-closed" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line class="eye-closed" x1="1" y1="1" x2="23" y2="23"/>
           </svg>
         </button>
       </div>`;

  return shell(
    `${tenant.slug} · stars.wavekat.com`,
    user,
    `<p><a href="/dashboard">← Dashboard</a></p>
<h1>${esc(tenant.slug)}</h1>
<p class="muted">${repos.length} ${repos.length === 1 ? 'repo' : 'repos'} tracked · ${totalStars} total stars recorded.</p>

<h2>Live chart</h2>
<div class="chart-section">
  <input type="radio" id="theme-light" name="chart-theme" checked />
  <input type="radio" id="theme-dark" name="chart-theme" />
  <div class="theme-toggle" role="group" aria-label="Preview theme">
    <label for="theme-light">Light</label>
    <label for="theme-dark">Dark</label>
  </div>
  <div class="chart-preview">
    <img class="light" src="${previewLight}" alt="${esc(tenant.slug)} star history (light)"/>
    <img class="dark" src="${previewDark}" alt="${esc(tenant.slug)} star history (dark)"/>
  </div>
</div>
<dl class="embed">
  <dt>Markdown</dt>
  <dd><code>![${esc(tenant.slug)} stars](${chartSvg})</code></dd>
  <dt>HTML</dt>
  <dd><code>&lt;img src="${chartSvg}" alt="${esc(tenant.slug)} stars"&gt;</code></dd>
  <dt>PNG</dt>
  <dd><code>${chartPng}</code></dd>
  <dt>Dark theme</dt>
  <dd>append <code>?theme=dark</code> to any chart URL</dd>
</dl>

<h2>1. GitHub webhook</h2>
${secretBlock}
<p>Add at <code>https://github.com/organizations/${esc(tenant.slug)}/settings/hooks</code> (or per-repo settings for a personal account):</p>
<ul>
  <li>Payload URL: <code>${esc(webhookUrl)}</code></li>
  <li>Content type: <code>application/json</code></li>
  <li>Events: just <strong>Stars</strong></li>
</ul>

<h2>2. Backfill historical stars</h2>
<p>The webhook only sees new events. Backfill seeds the chart with existing stars (uses your GitHub OAuth token, no extra setup).</p>
${flash ? `<p class="warn">${esc(flash)}</p>` : ''}
<form method="POST" action="/${esc(tenant.slug)}/backfill-all" style="margin-bottom: 1.25rem">
  <p><button type="submit">Backfill all public repos in ${esc(tenant.slug)}</button></p>
  <p class="muted">Scans every public, non-archived, non-fork repo owned by <code>${esc(tenant.slug)}</code> and syncs stargazers. Safe to re-run; existing rows are replaced.</p>
</form>
<details>
  <summary class="muted">Or backfill a single repo</summary>
  <form method="POST" action="/${esc(tenant.slug)}/backfill" style="margin-top: .75rem">
    <p><input type="text" name="repo" placeholder="${esc(tenant.slug)}/repo-name" required/></p>
    <p><button type="submit">Backfill repo</button></p>
  </form>
</details>
${repos.length > 0 ? `<p class="muted" style="margin-top: 1rem">Already tracking: ${repos.map((r) => `<code>${esc(r)}</code>`).join(', ')}</p>` : ''}`,
  );
}

export function error(user: User | null, status: number, message: string): string {
  return shell(`Error ${status}`, user, `<h1>${status}</h1><p>${esc(message)}</p>`);
}
