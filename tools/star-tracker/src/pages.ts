// Server-rendered HTML pages. Inline CSS, no JS — keeps the bundle small and
// the UX dependable inside a Worker.

import type { RepoRow, Tenant, User } from './db';

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
  .icon-btn { background: transparent; color: inherit; border: 1px solid #cbd5e1; padding: 0 10px; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; }
  @media (prefers-color-scheme: dark) { .icon-btn { border-color: #334155; } }
  .eye-btn .eye-closed { display: none; }
  .eye-btn[data-revealed="true"] .eye-open { display: none; }
  .eye-btn[data-revealed="true"] .eye-closed { display: inline; }
  .copy-btn .copy-check { display: none; }
  .copy-btn[data-copied="true"] .copy-icon { display: none; }
  .copy-btn[data-copied="true"] .copy-check { display: inline; color: #16a34a; }
  @media (prefers-color-scheme: dark) { .copy-btn[data-copied="true"] .copy-check { color: #4ade80; } }
  .chart-section input[type=radio] { position: absolute; opacity: 0; pointer-events: none; }
  .chart-controls { display: flex; flex-wrap: wrap; gap: .5rem .75rem; margin-bottom: .75rem; align-items: center; }
  .seg-toggle { display: inline-flex; border: 1px solid #cbd5e1; border-radius: 6px; overflow: hidden; }
  @media (prefers-color-scheme: dark) { .seg-toggle { border-color: #334155; } }
  .seg-toggle label { padding: 6px 14px; font-size: 0.85em; cursor: pointer; user-select: none; }
  .chart-section #theme-light:checked ~ .chart-controls .seg-toggle label[for=theme-light],
  .chart-section #theme-dark:checked ~ .chart-controls .seg-toggle label[for=theme-dark],
  .chart-section #split-1:checked ~ .chart-controls .seg-toggle label[for=split-1],
  .chart-section #split-3:checked ~ .chart-controls .seg-toggle label[for=split-3],
  .chart-section #split-5:checked ~ .chart-controls .seg-toggle label[for=split-5],
  .chart-section #split-8:checked ~ .chart-controls .seg-toggle label[for=split-8] { background: #2196f3; color: white; }
  .seg-toggle .seg-label { padding: 6px 10px 6px 12px; font-size: 0.75em; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; border-right: 1px solid #cbd5e1; }
  @media (prefers-color-scheme: dark) { .seg-toggle .seg-label { border-right-color: #334155; } }
  .chart-preview img { max-width: 100%; border-radius: 6px; display: block; border: 1px solid #e2e8f0; box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04); }
  @media (prefers-color-scheme: dark) { .chart-preview img { border-color: #1e293b; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4); } }
  .chart-section .chart-preview .dark { display: none; }
  .chart-section #theme-dark:checked ~ .chart-preview .light { display: none; }
  .chart-section #theme-dark:checked ~ .chart-preview .dark { display: block; }
  .chart-preview-auto .dark { display: none; }
  @media (prefers-color-scheme: dark) {
    .chart-preview-auto .light { display: none; }
    .chart-preview-auto .dark { display: block; }
  }
  .repo-list { list-style: none; padding: 0; margin: .5rem 0; display: flex; flex-direction: column; gap: 4px; }
  .repo-list li { display: flex; align-items: center; gap: 8px; font-size: 0.9em; }
  .badge { display: inline-block; font-size: 0.75em; padding: 2px 6px; border-radius: 3px; font-weight: 600; letter-spacing: 0.02em; }
  .badge-exact { background: #dcfce7; color: #166534; }
  .badge-sampled { background: #fef3c7; color: #78350f; }
  .badge-pending { background: #e2e8f0; color: #475569; }
  @media (prefers-color-scheme: dark) {
    .badge-exact { background: #14532d; color: #bbf7d0; }
    .badge-sampled { background: #422006; color: #fde68a; }
    .badge-pending { background: #1e293b; color: #94a3b8; }
  }
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
    var eye = e.target.closest('.eye-btn');
    if (eye) {
      var eyeRow = eye.closest('.secret-row');
      var eyeSecret = eyeRow && eyeRow.querySelector('.secret');
      if (!eyeSecret) return;
      var revealed = eyeSecret.dataset.revealed === 'true';
      if (revealed) {
        eyeSecret.textContent = '•'.repeat(eyeSecret.dataset.value.length);
        eyeSecret.dataset.revealed = 'false';
        eye.dataset.revealed = 'false';
        eye.setAttribute('aria-label', 'Show secret');
      } else {
        eyeSecret.textContent = eyeSecret.dataset.value;
        eyeSecret.dataset.revealed = 'true';
        eye.dataset.revealed = 'true';
        eye.setAttribute('aria-label', 'Hide secret');
      }
      return;
    }
    var copy = e.target.closest('.copy-btn');
    if (!copy) return;
    var copyRow = copy.closest('.secret-row');
    var copySecret = copyRow && copyRow.querySelector('.secret');
    if (!copySecret) return;
    var value = copySecret.dataset.value || '';
    var done = function () {
      copy.dataset.copied = 'true';
      copy.setAttribute('aria-label', 'Copied');
      setTimeout(function () {
        copy.dataset.copied = 'false';
        copy.setAttribute('aria-label', 'Copy secret');
      }, 1500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).then(done, function () {});
    } else {
      var ta = document.createElement('textarea');
      ta.value = value;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); } catch (err) {}
      document.body.removeChild(ta);
    }
  });
  // Sync the eye button icon state to the initial render.
  document.querySelectorAll('.secret').forEach(function (s) {
    var row = s.closest('.secret-row');
    var btn = row && row.querySelector('.eye-btn');
    if (btn) btn.dataset.revealed = s.dataset.revealed || 'false';
  });

  // Chart controls: keep the preview imgs and the Markdown/HTML embed
  // snippets in sync with the selected theme and top-N split.
  var preview = document.querySelector('.chart-preview[data-base]');
  var embed = document.querySelector('[data-embed]');
  if (preview || embed) {
    function currentSplit() {
      var r = document.querySelector('input[name=chart-split]:checked');
      return r ? parseInt(r.value, 10) : 1;
    }
    function currentTheme() {
      var r = document.querySelector('input[name=chart-theme]:checked');
      return r && r.id === 'theme-dark' ? 'dark' : 'light';
    }
    function buildQuery(theme, n, extra) {
      var parts = [];
      if (theme === 'dark') parts.push('theme=dark');
      if (n > 1) parts.push('split=' + n);
      if (extra) parts.push(extra);
      return parts.length ? '?' + parts.join('&') : '';
    }
    function refreshPreview() {
      if (!preview) return;
      var base = preview.getAttribute('data-base');
      var version = preview.getAttribute('data-version');
      var n = currentSplit();
      preview.querySelectorAll('img').forEach(function (img) {
        var isDark = img.classList.contains('dark');
        img.src = base + buildQuery(isDark ? 'dark' : 'light', n, 'v=' + version);
      });
    }
    function refreshEmbed() {
      if (!embed) return;
      var base = embed.getAttribute('data-base');
      var slug = embed.getAttribute('data-slug');
      var url = base + buildQuery(currentTheme(), currentSplit(), null);
      var md = embed.querySelector('[data-embed-md]');
      var html = embed.querySelector('[data-embed-html]');
      if (md) md.textContent = '![' + slug + ' stars](' + url + ')';
      if (html) html.textContent = '<img src="' + url + '" alt="' + slug + ' stars">';
    }
    document.querySelectorAll('input[name=chart-split], input[name=chart-theme]').forEach(function (r) {
      r.addEventListener('change', function () {
        if (!r.checked) return;
        refreshPreview();
        refreshEmbed();
      });
    });
  }
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
<h2>Live example</h2>
<p>This site dogfoods the tool — here's the <a href="/wavekat">wavekat</a> org's own star history, split by top repo:</p>
<div class="chart-preview chart-preview-auto">
  <img class="light" src="/wavekat/chart.svg?split=5" alt="wavekat star history (light)"/>
  <img class="dark" src="/wavekat/chart.svg?split=5&amp;theme=dark" alt="wavekat star history (dark)"/>
</div>
<h2>How it works</h2>
<ol>
  <li>Sign in with GitHub.</li>
  <li>Register the org or user you want to track. We verify you're an admin (orgs) or that the login matches yours (personal).</li>
  <li>Install the webhook we hand you on the org. Star events flow in.</li>
  <li>Embed <code>&lt;img src="https://stars.wavekat.com/&lt;slug&gt;/chart.svg"&gt;</code> in your README.</li>
</ol>
<h2>Free, open source</h2>
<p>Source: <a href="https://github.com/wavekat/wavekat.com/tree/main/tools/star-tracker">github.com/wavekat/wavekat.com</a> · Apache-2.0.</p>`,
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

function repoBadge(mode: RepoRow['sync_mode']): string {
  if (mode === 'exact') return `<span class="badge badge-exact" title="Every star fetched per-user">exact</span>`;
  if (mode === 'sampled') return `<span class="badge badge-sampled" title="Curve sampled across ~15 pages — accurate within a few %">sampled</span>`;
  return `<span class="badge badge-pending" title="Not yet backfilled — only webhook events so far">pending</span>`;
}

export function tenantDetail(user: User, tenant: Tenant, publicUrl: string, repos: RepoRow[], totalStars: number, justCreated?: boolean, flash?: string): string {
  const webhookUrl = `${publicUrl}/webhook`;
  const chartSvg = `${publicUrl}/${tenant.slug}/chart.svg`;
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
         <button type="button" class="icon-btn eye-btn" aria-label="Show secret">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
             <path class="eye-open" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle class="eye-open" cx="12" cy="12" r="3"/>
             <path class="eye-closed" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line class="eye-closed" x1="1" y1="1" x2="23" y2="23"/>
           </svg>
         </button>
         <button type="button" class="icon-btn copy-btn" aria-label="Copy secret" data-copied="false">
           <svg class="copy-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
             <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
             <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
           </svg>
           <svg class="copy-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
             <polyline points="20 6 9 17 4 12"/>
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
  <input type="radio" id="split-1" name="chart-split" value="1" checked />
  <input type="radio" id="split-3" name="chart-split" value="3" />
  <input type="radio" id="split-5" name="chart-split" value="5" />
  <input type="radio" id="split-8" name="chart-split" value="8" />
  <div class="chart-controls">
    <div class="seg-toggle" role="group" aria-label="Preview theme">
      <span class="seg-label">Theme</span>
      <label for="theme-light">Light</label>
      <label for="theme-dark">Dark</label>
    </div>
    <div class="seg-toggle" role="group" aria-label="Top repos">
      <span class="seg-label">Top</span>
      <label for="split-1">Merged</label>
      <label for="split-3">3</label>
      <label for="split-5">5</label>
      <label for="split-8">8</label>
    </div>
  </div>
  <div class="chart-preview" data-base="${chartSvg}" data-version="${totalStars}">
    <img class="light" src="${previewLight}" alt="${esc(tenant.slug)} star history (light)"/>
    <img class="dark" src="${previewDark}" alt="${esc(tenant.slug)} star history (dark)"/>
  </div>
  <dl class="embed" data-embed data-base="${chartSvg}" data-slug="${esc(tenant.slug)}">
    <dt>Markdown</dt>
    <dd><code data-embed-md>![${esc(tenant.slug)} stars](${chartSvg})</code></dd>
    <dt>HTML</dt>
    <dd><code data-embed-html>&lt;img src="${chartSvg}" alt="${esc(tenant.slug)} stars"&gt;</code></dd>
  </dl>
  <p class="muted" style="font-size:0.85em;margin-top:-.25rem">Snippets update as you change the controls above. Params: <code>?theme=dark</code>, <code>?split=N</code> (1–8).</p>
</div>

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
${repos.length > 0 ? `<h2>Tracked repos</h2>
<ul class="repo-list">${repos.map((r) => `<li>${repoBadge(r.sync_mode)}<code>${esc(r.full_name)}</code>${r.stargazers_count != null ? ` <span class="muted">— ${r.stargazers_count.toLocaleString('en-US')} stars</span>` : ''}</li>`).join('')}</ul>` : ''}`,
  );
}

export function error(user: User | null, status: number, message: string): string {
  return shell(`Error ${status}`, user, `<h1>${status}</h1><p>${esc(message)}</p>`);
}
