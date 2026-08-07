---
title: "How Click-to-Call Works in a Desktop App"
description: "How a desktop app claims tel: and sip: links, the three ways an OS delivers a clicked URL, and why the URL parser is the security boundary that matters."
date: 2026-08-07
author: Eason Guo
tags: [voice-ai, engineering, calls]
---

Click-to-call looks like nothing: you click a phone number on a web page, and your softphone opens with the number in it. Underneath, that one click crosses four trust boundaries, arrives by one of three completely different operating-system mechanisms, and races a React app that hasn't mounted yet. This is how we built it in [WaveKat Voice](/voice/) — the SIP softphone for Mac and Linux that records and transcribes every call — and what broke along the way.

If you want the user-facing version, that's [Click-to-Call: Dial Phone Links From Any Website](/blog/click-to-call-phone-links/). This post is the plumbing.

<link rel="stylesheet" href="/blog/click-to-call/widget.css" />

## What a tel: link actually is

A phone link is a URI, not an action. `tel:+14155550123` is defined by [RFC 3966](https://www.rfc-editor.org/rfc/rfc3966), `sip:alice@example.com` by [RFC 3261](https://www.rfc-editor.org/rfc/rfc3261), and neither of them does anything on its own. The browser doesn't know how to place a phone call. What it knows is that `tel:` isn't a scheme it handles, so it hands the string to the operating system and asks *someone else* to deal with it.

That is the whole mechanism, and the whole security model. **A clicked phone link is a request from an untrusted party, delivered to your app as a string.** Everything below follows from taking that sentence literally.

A `tel:` URI is also messier than it looks. RFC 3966 allows visual separators, so `tel:+1-415-555-0123` and `tel:+1 (415) 555-01.23` are both legal and both mean the same number. It allows parameters after a semicolon — `tel:+14155550123;phone-context=example.com`. And because it travels through URL machinery, the `+` may arrive percent-encoded as `%2B`. Anything that dials a `tel:` link has to normalize all of that before it means anything.

## Telling the OS you can handle phone links

There are two separate things an app can say about a URL scheme, and conflating them is the first mistake:

- **"I can handle this"** — a static declaration baked into the package at build time.
- **"I am the default for this"** — a runtime claim that changes system state and takes the association away from whatever had it before.

The first is packaging. In Electron, all three platforms come from one block in `electron-builder.yml`:

```yaml
protocols:
  - name: Phone call
    schemes:
      - tel
      - sip
```

That expands into `CFBundleURLTypes` in the macOS `Info.plist`, registry associations in the Windows installer, and `MimeType=x-scheme-handler/tel;x-scheme-handler/sip;` in the generated Linux `.desktop` file — whose default `Exec` line already carries the `%U` placeholder that passes the clicked URL through as an argument. Declaring costs nothing and changes nothing the user can see.

The second is `app.setAsDefaultProtocolClient("tel")`, and it is emphatically not free. It's consent-gated behind a **Phone links** toggle that ships off, for the same reason launch-on-login is: claiming a system-wide association is the user's decision, not an app's housewarming gift. What the call actually *does* differs enough per platform that the UI has to be honest about it:

| Platform | What `setAsDefaultProtocolClient` does |
|---|---|
| **macOS** | Sets the default handler immediately (`LSSetDefaultHandlerForURLScheme` underneath) — including taking `tel:` away from FaceTime. |
| **Windows 10+** | Deliberately ignores programmatic default-setting. It registers the app as *capable*; the user confirms in the OS "how do you want to open this?" chooser. |
| **Linux** | Shells out to `xdg-settings`, which needs an *installed* `.desktop` file to point at. Works on the `.deb`; fails on a non-integrated AppImage. |

So the boolean it returns is really capability detection. When it comes back false, the Settings row surfaces a short "couldn't set up phone links" note instead of quietly lying about being on. Hold that thought — the Linux row is where this post ends up.

## Three ways a clicked URL reaches your app

Here is the part nobody warns you about. There is no single "you got a URL" callback. There are three delivery paths, they're mutually exclusive, they differ by platform *and* by whether your app is already running, and if you implement only the one you happened to test with, the feature works perfectly on your machine and is broken for half your users.

<div class="wk-w wk-nojs" data-wk-pipeline>
  <div class="wk-w-head">
    <span class="wk-w-title">One clicked link, three delivery paths</span>
    <span class="wk-w-hint">Pick a path, then press the link.</span>
  </div>
  <div class="wk-w-body">
    <div class="wk-chips" data-wk-tracks>
      <button type="button" data-track="macos" aria-pressed="true">macOS, app running</button>
      <button type="button" data-track="running">Linux / Windows, app running</button>
      <button type="button" data-track="cold">Cold start — app not running</button>
    </div>
    <button type="button" class="wk-run" data-wk-run>Click <code>tel:+1-415-555-0123</code></button>
    <ol class="wk-steps" data-wk-steps>
      <li data-step="click" data-tracks="macos running cold" data-payload="tel:+1-415-555-0123">
        <span class="wk-dot">1</span>
        <span><span class="wk-step-name">The browser gives up and hands the URL to the OS</span><span class="wk-step-detail">It has no idea how to place a phone call</span></span>
      </li>
      <li data-step="ls" data-tracks="macos" data-payload="tel:+1-415-555-0123">
        <span class="wk-dot">2</span>
        <span><span class="wk-step-name">Launch Services resolves the handler</span><span class="wk-step-detail">CFBundleURLTypes → the WaveKat Voice bundle</span></span>
      </li>
      <li data-step="openurl" data-tracks="macos" data-payload="tel:+1-415-555-0123">
        <span class="wk-dot">3</span>
        <span><span class="wk-step-name">app.on(&quot;open-url&quot;) fires</span><span class="wk-step-detail">Never argv. Attached at module top — it can fire before whenReady()</span></span>
      </li>
      <li data-step="second" data-tracks="running" data-payload="tel:+1-415-555-0123">
        <span class="wk-dot">2</span>
        <span><span class="wk-step-name">The OS launches a second copy of the app</span><span class="wk-step-detail">Exec=… %U — the URL arrives as a command-line argument</span></span>
      </li>
      <li data-step="lock" data-tracks="running" data-payload="tel:+1-415-555-0123">
        <span class="wk-dot">3</span>
        <span><span class="wk-step-name">requestSingleInstanceLock() denies the newcomer</span><span class="wk-step-detail">It forwards its argv to the original process and exits</span></span>
      </li>
      <li data-step="secondevt" data-tracks="running" data-payload="tel:+1-415-555-0123">
        <span class="wk-dot">4</span>
        <span><span class="wk-step-name">&quot;second-instance&quot; fires in the original</span><span class="wk-step-detail">findDialUrlInArgv(argv) — one tel: string among Chromium flags</span></span>
      </li>
      <li data-step="launch" data-tracks="cold" data-payload="tel:+1-415-555-0123">
        <span class="wk-dot">2</span>
        <span><span class="wk-step-name">The OS launches the app, URL in argv</span><span class="wk-step-detail">Nothing is listening yet — there is no app to notify</span></span>
      </li>
      <li data-step="argv" data-tracks="cold" data-payload="tel:+1-415-555-0123">
        <span class="wk-dot">3</span>
        <span><span class="wk-step-name">Cold-start scan of process.argv</span><span class="wk-step-detail">findDialUrlInArgv(process.argv)</span></span>
      </li>
      <li data-step="gate" data-tracks="macos running cold" data-payload="tel:+1-415-555-0123">
        <span class="wk-dot">4</span>
        <span><span class="wk-step-name">dispatchDialUrl() — the preference gate</span><span class="wk-step-detail">Phone links off → dropped here, whatever the OS still believes</span></span>
      </li>
      <li data-step="parse" data-tracks="macos running cold" data-payload="&quot;+14155550123&quot;">
        <span class="wk-dot">5</span>
        <span><span class="wk-step-name">parseDialUrl() — the security boundary</span><span class="wk-step-detail">Allowlist, strip, cap, normalize, or return null</span></span>
      </li>
      <li data-step="debounce" data-tracks="macos running cold" data-payload="{ to: &quot;+14155550123&quot;, autoDial: false }">
        <span class="wk-dot">6</span>
        <span><span class="wk-step-name">1-second debounce, then policy is decided</span><span class="wk-step-detail">Main reads the auto-dial pref so the renderer never decides</span></span>
      </li>
      <li data-step="push" data-tracks="macos running" data-payload="{ to: &quot;+14155550123&quot;, autoDial: false }">
        <span class="wk-dot">7</span>
        <span><span class="wk-step-name">The renderer is known to be listening → push</span><span class="wk-step-detail">webContents.send(&quot;wavekat:dial-url&quot;, payload)</span></span>
      </li>
      <li data-step="buffer" data-tracks="cold" data-payload="pending = { to: &quot;+14155550123&quot;, autoDial: false }">
        <span class="wk-dot">7</span>
        <span><span class="wk-step-name">React hasn&rsquo;t mounted → buffer as the pending payload</span><span class="wk-step-detail">Main does not guess when the renderer is ready</span></span>
      </li>
      <li data-step="pull" data-tracks="cold" data-payload="{ to: &quot;+14155550123&quot;, autoDial: false }">
        <span class="wk-dot">8</span>
        <span><span class="wk-step-name">The shell mounts and pulls once</span><span class="wk-step-detail">getPendingDialUrl() returns and clears it — exactly once</span></span>
      </li>
      <li data-step="fire" data-tracks="macos running cold" data-payload="{ to: &quot;+14155550123&quot;, autoDial: false }">
        <span class="wk-dot">9</span>
        <span><span class="wk-step-name">fireNewCall({ to, autoDial })</span><span class="wk-step-detail">The same trigger the echo-test CTA already used</span></span>
      </li>
      <li data-step="sheet" data-tracks="macos running cold" data-payload="Waiting for you to press Call">
        <span class="wk-dot">10</span>
        <span><span class="wk-step-name">The New Call sheet opens, pre-filled</span><span class="wk-step-detail">A human still presses Call</span></span>
      </li>
    </ol>
    <p class="wk-payload"><span class="wk-payload-label">Payload</span><span data-wk-payload data-idle="—">—</span></p>
  </div>
</div>

The three paths, stated plainly:

- **macOS, any time.** Always the `open-url` event, never argv. The listener has to be attached synchronously at module top — *before* `whenReady()` — because on a cold start the event can fire during launch and there is nothing to replay it.
- **Linux and Windows, app already running.** The OS launches a *second copy* of the app with the URL in its argv. `requestSingleInstanceLock()` denies it, the newcomer forwards its argv to the original process through the `second-instance` event and exits. This is also what covers "app is in the tray, user clicks a link".
- **Cold start, everywhere.** The URL is sitting in `process.argv` (Linux/Windows) or arrives as a very early `open-url` (macOS).

`findDialUrlInArgv` exists because argv is not a tidy place. A real Electron argv on Linux is the executable path, a pile of Chromium flags, and — somewhere in there — one `tel:` string. It scans for the first argument matching the scheme pattern, and deliberately does *not* match schemes embedded mid-argument, so a `--url=tel:+123` flag never gets mistaken for a click.

## The parser is a security boundary

Every one of those three paths ends at the same function, and it is the only thing standing between a web page and your dialer. Not a convenience normalizer — a gate. Any page on the internet can host `<a href="tel:…">`, so the string arriving here is attacker-influenced by definition.

`parseDialUrl` runs cheapest-rejection-first, and returns either a dial string or `null`:

```ts
export const DIAL_URL_MAX_LENGTH = 512;
const SCHEME_RE = /^(tel|sip|sips):(.*)$/i;

export function parseDialUrl(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  if (raw.length === 0 || raw.length > DIAL_URL_MAX_LENGTH) return null;

  const cleaned = raw.replace(/[\u0000-\u001f\u007f]/g, "").trim();
  const m = SCHEME_RE.exec(cleaned);
  if (!m) return null;
  // … normalize, then validate shape, or return null
}
```

Try to get something past it:

<div class="wk-w wk-nojs" data-wk-parser
     data-w-none="none"
     data-w-removed="removed {n}"
     data-w-rejected="rejected"
     data-msg-pass="POST /calls/dial receives"
     data-msg-fail="Dropped — nothing reaches the dialer.">
  <div class="wk-w-head">
    <span class="wk-w-title">parseDialUrl, stage by stage</span>
    <span class="wk-w-hint">Type anything, or start from one of these:</span>
  </div>
  <div class="wk-w-body">
    <div class="wk-chips" data-wk-presets>
      <button type="button" data-v="tel:+1 (415) 555-0123">a phone-book number</button>
      <button type="button" data-v="tel:%2B14155550123">an encoded +</button>
      <button type="button" data-v="tel:+14155550123;phone-context=example.com">RFC 3966 parameters</button>
      <button type="button" data-v="tel:*21*0211234567#">a service code</button>
      <button type="button" data-v="sip:alice@example.com">a SIP address</button>
      <button type="button" data-v="tel:+1415CALLNOW">a vanity number</button>
      <button type="button" data-v="javascript:alert(1)">a hostile scheme</button>
      <button type="button" data-v="tel:1;rm -rf /">an injection attempt</button>
      <button type="button" data-v="sip:;evil=1">a malformed SIP URI</button>
    </div>
    <label class="wk-io">
      <span class="wk-sr">Phone link to parse</span>
      <input class="wk-input" type="text" data-wk-input value="tel:+1 (415) 555-0123" spellcheck="false" autocomplete="off" autocapitalize="off" />
    </label>
    <ol class="wk-stages" data-wk-stages>
      <li data-stage="length"><span class="wk-st-mark"></span><span class="wk-st-name">length ≤ 512</span><span class="wk-st-val"></span></li>
      <li data-stage="control"><span class="wk-st-mark"></span><span class="wk-st-name">strip control characters</span><span class="wk-st-val"></span></li>
      <li data-stage="scheme"><span class="wk-st-mark"></span><span class="wk-st-name">scheme allowlist</span><span class="wk-st-val"></span></li>
      <li data-stage="sipshape"><span class="wk-st-mark"></span><span class="wk-st-name">SIP user@host shape</span><span class="wk-st-val"></span></li>
      <li data-stage="params"><span class="wk-st-mark"></span><span class="wk-st-name">cut RFC 3966 parameters</span><span class="wk-st-val"></span></li>
      <li data-stage="decode"><span class="wk-st-mark"></span><span class="wk-st-name">percent-decode</span><span class="wk-st-val"></span></li>
      <li data-stage="separators"><span class="wk-st-mark"></span><span class="wk-st-name">drop visual separators</span><span class="wk-st-val"></span></li>
      <li data-stage="shape"><span class="wk-st-mark"></span><span class="wk-st-name">dialable shape</span><span class="wk-st-val"></span></li>
    </ol>
    <p class="wk-verdict" data-wk-verdict>
      <span data-wk-verdict-text></span>
      <span class="wk-verdict-value" data-wk-verdict-value></span>
    </p>
  </div>
</div>

Four decisions in there are worth pulling out:

**Strip control characters, don't reject on them.** A stray `\r` from a shell relay shouldn't kill an otherwise-valid link, but a control character has no business surviving into anything downstream. So `tel:+1415\r\n5550123` dials `+14155550123`.

**The RFC 3966 parameter cut is also an injection cut.** Everything after the first `;` is a parameter by spec, so cutting there is correct *and* it means `tel:1;rm -rf /` reduces to the number `1` before anything else looks at it. Correctness and safety pointing the same direction is the good kind of design.

**Validate shape, don't sanitize toward validity.** The last step is `/^\+?[0-9*#]+$/` plus "must contain at least one digit". Not "remove the bad characters" — *reject*. `tel:+1415CALLNOW` is a perfectly nice vanity number and it returns `null`, because a parser that tries to rescue malformed input is a parser that eventually rescues something it shouldn't.

**`sips:` is accepted but not registered.** A deliberate asymmetry: only `tel` and `sip` are claimed from the OS, but if a secure-SIP link ever reaches us through the `sip` association or a manual open, treating it like any other SIP URI beats dropping it.

Past the parser there's a 1-second debounce, because some desktop environments fire the handler twice for one click, and because a page shouldn't be able to spam the dial sheet by firing a burst of `tel:` opens. And the daemon's own dial validator still has the last word — it `400`s anything unroutable. The parser is the first gate, not the only one.

### The off-switch is the preference, not the OS

`dispatchDialUrl` checks the **Phone links** preference *before* it parses anything, and this ordering is load-bearing. Releasing an association is best-effort — Linux has no reliable `xdg` "unset" — so a stale OS association can keep launching the app with `tel:` URLs long after the user turned the feature off. If deregistration were the off-switch, "off" would mean "mostly off". The preference check is what actually makes it off.

## Why clicking never places a call by itself

The default is pre-fill-and-confirm: the number lands in the field, a human presses Call. There's an opt-in **"Dial immediately when I click a phone link"**, off by default, and even when it's on it declines to fire in the cases where an instant call would be the wrong call:

- **Only with exactly one callable account.** Zero or ambiguous → pre-fill and let the user pick the line, rather than guessing which of your numbers a stranger's link gets to call from.
- **Never over a live call.** Mid-conversation, a click pre-fills instead of barging in.
- **Always window-to-front.** Even on an instant dial the window comes up, so a page can never place a call you can't see and hang up.

Two implementation details make those guards real rather than aspirational. The decision is latched with a ref that resets only when the sheet closes — so a guard failure is *final for that open*, and an account that registers a moment later can't surprise-dial a number the user is already reading. And `autoDial` is decided in the main process from the persisted preference, then passed to the renderer as a plain boolean. Policy lives in one place; the renderer just obeys.

## The race nobody sees

Cold start is where this gets interesting. The URL exists before the app does. Main has it within milliseconds; React mounts hundreds of milliseconds later. Push it too early and it lands on nothing.

The instinct is to wait for a "ready" signal, and the instinct is wrong, because **`did-finish-load` is not "React ran"**. The page can finish loading before your component tree has mounted and subscribed. Main fundamentally cannot observe when the renderer's effect has actually attached a listener, so any "push when ready" scheme is a race you'll lose on a slow machine and win on yours.

The fix is to stop trying to know. Do both, and let whichever side is late drive:

- **Push.** When a URL arrives and the renderer is known to be listening, send it over `wavekat:dial-url`.
- **Pull.** The renderer calls `getPendingDialUrl()` exactly once on mount. Main returns the buffered payload and clears it — and that call is also what flips the "renderer is listening" flag, so every later URL takes the push path.

Delivered exactly once, no timing assumption anywhere. The buffer overwrites rather than queues, incidentally: if two links somehow arrive before mount, the most recent one is what the user meant.

There's a sharper version of the same bug hiding one layer up, and it cost us a round of debugging. The first implementation mounted the dial-URL subscriber inside the app shell. But the settings shell is a *sibling route* of the app shell, so anything owned by the app shell unmounts when the user navigates to `/settings/*`. Click a phone link while sitting in Settings and the payload went nowhere — and it wasn't even buffered, because main's "renderer is listening" flag was still true from the first mount. A subscription whose lifetime is supposed to be the session has to be mounted where the session lives: above the router, not inside a route.

## The deb that reported failure while working perfectly

Here's the one that took the longest, because every instinct pointed the wrong way.

On the Debian package, click-to-call was completely dead. Not flaky — dead. And the Settings toggle said so: it refused to turn on and showed the "couldn't set up phone links" note. `setAsDefaultProtocolClient("tel")` was returning `false`.

Except the OS was routing `tel:` links to the app correctly the entire time. It had been since install. The generated `.desktop` file carries `MimeType=x-scheme-handler/tel;x-scheme-handler/sip;`, `update-desktop-database` runs at install time, and the association was there. Clicking a link *did* launch WaveKat Voice. It just did nothing when it got there.

The chain, once we found it:

`setAsDefaultProtocolClient` on Linux shells out to `xdg-settings set default-url-scheme-handler`. To verify the result, `xdg-settings` resolves the desktop *name* back to a binary — and its GNOME backend does that with a naive `first_word()` of the `Exec` line. Our `Exec` line is:

```
Exec="/opt/WaveKat Voice/@wavekatvoice-desktop" %U
```

A quoted path containing a space. `first_word()` splits on whitespace without honoring the quote, producing `"/opt/WaveKat`, hands that to `which`, `which` fails, `xdg-settings` exits 2, Electron reports `false`.

Why is the path quoted? electron-builder quotes `Exec` when it fails a `[/0-9A-Za-z._-]` character test — and `/opt/WaveKat Voice/@wavekatvoice-desktop` fails it twice, on the space and on the `@`. The `/opt/<productName>` directory is locked to the product name, which has a space in it because "WaveKat Voice" has a space in it.

**A space in a product name broke click-to-call on an entire platform.**

And the reason it was *totally* dead rather than merely mislabeled is a decision two layers away that was individually correct. `setPhoneLinks` only persists the preference when the OS accepts the claim — otherwise the toggle would read "On" while links went nowhere, which is exactly the kind of lie we were trying to avoid. So: `false` → preference never saved → the dispatch gate saw "off" → every clicked link silently dropped. An honest failure mode, faithfully propagating a wrong answer.

`isDefaultProtocolClient` was no help, because it calls `xdg-settings check`, which has the same defect. What *is* immune is the query side of xdg, which reports the current handler's name rather than resolving a name back to a binary:

```ts
execFileSync("xdg-mime", ["query", "default", `x-scheme-handler/${scheme}`])
  .trim() === `${basename(process.execPath)}.desktop`
```

So on Linux, a `false` from `setAsDefaultProtocolClient` isn't taken at face value — it's confirmed against `xdg-mime query`, and a match is treated as success. Not a workaround so much as asking a question the tool can actually answer.

The packaging fix — a space-free `Exec` — isn't available: the `/opt/<productName>` directory follows the product name, and electron-builder doesn't allow overriding `Exec`. The runtime query is the fix.

![WaveKat Voice on Ubuntu — the New Call sheet open with a phone number already filled in, ready to dial.](/screenshots/dial-prefilled/en.webp)

## What generalizes

Strip out the specifics and four things are true of any desktop app that handles a URL scheme:

1. **Declaring and claiming are different operations** with different consent requirements. Declare at build time, claim only when the user asks.
2. **There are three delivery paths, not one.** Test all three. The one you'll forget is "app already running", and it's the most common one in real use.
3. **The handler entry point is an untrusted-input boundary.** Allowlist schemes, cap length, validate shape, reject rather than repair.
4. **Never let the OS association be your off-switch.** Gate the behavior on your own preference, because deregistration is best-effort on at least one platform you ship to.

Click-to-call landed in [0.0.43](/voice/changelog/#0.0.43). Like everything else in the call path, it sits on top of [our own from-scratch SIP engine](/blog/our-own-sip-engine/) — which is the reason we can reason about a clicked link all the way down to the packet.

## Frequently asked questions

### How does a tel: link open a desktop app?

The browser doesn't handle `tel:` itself — it hands the URL to the operating system, which looks up the registered handler for that scheme and launches or notifies it. The app declares it can handle `tel:` in its package metadata (`CFBundleURLTypes` on macOS, `x-scheme-handler/tel` in the Linux `.desktop`, registry entries on Windows), and separately claims the default association at runtime when the user opts in.

### Why does setAsDefaultProtocolClient return false on Linux?

Most often because it shells out to `xdg-settings`, which needs an installed `.desktop` file — so a non-integrated AppImage genuinely fails. But it can also be a false negative: `xdg-settings` resolves the desktop name back to a binary using a naive first-word split of the `Exec` line, which breaks on a quoted path containing a space. Confirm the real association with `xdg-mime query default x-scheme-handler/tel` instead, which has no such bug.

### How does an Electron app receive a clicked tel: URL?

Three ways, and you need all three. On macOS, the `open-url` event — never argv — with the listener attached at module top so it can fire before `whenReady()`. On Linux and Windows with the app already running, the OS starts a second process whose argv holds the URL; the single-instance lock forwards that argv through the `second-instance` event. On a cold start, the URL is in `process.argv`.

### How do you avoid the race between a cold-start URL and the renderer mounting?

Buffer plus a one-time pull. Main holds the payload instead of guessing when the UI is ready; the renderer requests it once on mount, and that request also marks the renderer as listening so later URLs are pushed. `did-finish-load` is not a safe proxy for "React has mounted and subscribed".

### Is it safe to let a web page open your softphone?

Yes, provided the link can only *request* a call rather than place one. WaveKat Voice pre-fills the number and waits for a human to press Call by default. The parser accepts only `tel:`/`sip:`/`sips:`, caps length at 512 characters, strips control characters, and validates the result's shape instead of trying to repair it. Even with the optional instant-dial setting on, it won't dial from an ambiguous account, won't interrupt a live call, and always shows the window.

### Can a phone link inject something into the dial command?

Not through this path. Everything after the first `;` is an RFC 3966 parameter and is cut before validation, so `tel:1;rm -rf /` reduces to `1`. What survives must match `/^\+?[0-9*#]+$/` and contain at least one digit; anything else is rejected outright rather than cleaned up. The daemon's dial validator then rejects anything unroutable independently.

## Try it

[Download WaveKat Voice](/voice/download/), turn on **Phone links** in Settings → General, and click a number on any web page. If you'd rather read the short version of what you get, that's [the click-to-call announcement](/blog/click-to-call-phone-links/).

<script src="/blog/click-to-call/widget.js" defer></script>
