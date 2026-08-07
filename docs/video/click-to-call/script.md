# Video — “How Click-to-Call Actually Works”

Companion to [/blog/how-click-to-call-works/](https://wavekat.com/blog/how-click-to-call-works/).
Target length **9:00**. Narrated screen recording, no face cam required.

**Everything visual is already built.** `deck.html` in this folder is the whole
presentation; the only things it can't show are the four app recordings in the
shot list at the bottom. Record the deck fullscreen, record those four clips,
cut them together against this script.

---

## Recording setup

| | |
|---|---|
| **Deck** | `docs/video/click-to-call/deck.html` — open in a browser, press <kbd>F</kbd> for fullscreen, <kbd>H</kbd> to hide the slide counter before you roll |
| **Keys** | <kbd>→</kbd> advance one build step (then next slide) · <kbd>←</kbd> back · <kbd>R</kbd> replay the current slide's animation · <kbd>G</kbd> then a number then <kbd>Enter</kbd> to jump |
| **Capture** | 1920×1080, 60 fps. The deck renders into a fixed 1920×1080 box scaled to the window, so a maximized browser at any size gives an identical frame |
| **App clips** | Record the real app at 1920×1080 too, so cuts don't rescale. Light theme (matches the blog screenshots) |
| **Audio** | Narrate after picture-lock — the deck animations have fixed durations and it's easier to pace voice to them than the reverse |

Slide numbers below are the deck's own (visible bottom-right until you press
<kbd>H</kbd>).

---

## Script

### 0:00 — Cold open  ·  **SHOT A** (browser → app)

> **[No deck yet. Open on SHOT A: a contact page in a browser. Cursor clicks a
> phone number. WaveKat Voice comes to the front, number already in the field.]**

Click a phone number on a web page, and your softphone opens with the number in
it. That's the whole feature. It looks like nothing.

Underneath, that one click crosses four trust boundaries, arrives by one of
three completely different operating-system mechanisms, and races a React app
that hasn't mounted yet.

I want to show you all of it — including the bug that made this feature
completely dead on Linux for a reason you will not guess.

> **[Cut to deck — SLIDE 1. Let the title sit for a beat.]**

### 0:35 — A phone link is a URI, not an action  ·  **SLIDE 2**

Here's the thing that explains everything else. A phone link is a URI, not an
action. Your browser has no idea how to place a phone call. What it knows is
that `tel:` isn't a scheme it handles — so it hands the string to the operating
system and asks someone else to deal with it.

> **[→ reveals the `<a href>` code block]**

Which means the string arriving at your app came from a web page. Anyone can put
a phone link on a page.

> **[→ reveals the "untrusted party" line. Pause on it.]**

A clicked phone link is a request from an untrusted party, delivered to your app
as a string. Every design decision in the rest of this video follows from taking
that sentence literally.

### 1:15 — `tel:` is messier than it looks  ·  **SLIDE 3**

It's also dirtier input than you'd expect.

> **[The URI highlight animation runs on its own — pace the four points to it.]**

RFC 3966 allows visual separators, so dashes, spaces, parens and dots are all
legal and all mean the same number. It allows parameters after a semicolon. And
because the thing travelled through URL machinery, the plus may arrive
percent-encoded as `%2B`.

Anything that dials a `tel:` link has to normalize all of that before the string
means anything at all.

### 1:50 — Declaring is not claiming  ·  **SLIDE 4**

There are two different things an app can say about a URL scheme, and conflating
them is the first mistake.

> **[→ reveals the left card]**

"I can handle this" is a static declaration, baked into the package at build
time. In Electron that's six lines of `electron-builder.yml`, and it expands
into `CFBundleURLTypes` on macOS, a registry association on Windows, and
`x-scheme-handler/tel` in the Linux `.desktop` file. It's free, and it changes
nothing the user can see.

> **[→ reveals the right card]**

"I am the default for this" is a runtime claim that changes system state and
takes the association away from whatever had it before. That is emphatically not
free — so it ships behind a toggle that's off until the user asks for it. Same
reasoning as launch-on-login: claiming something system-wide is the user's
decision, not a housewarming gift from an app they just installed.

> **[→ reveals the YAML. Then cut to SHOT B — the Settings toggle.]**

### 2:35 — The same call, three different behaviours  ·  **SLIDE 5**

And here's where it gets awkward: that one API call does three genuinely
different things depending on where you're running.

> **[→ ×3, one row at a time]**

On macOS it sets the default handler immediately — including taking `tel:` away
from FaceTime. On Windows 10 and up it deliberately ignores programmatic
default-setting; it registers you as *capable*, and the user confirms in the OS
chooser. On Linux it shells out to `xdg-settings`, which needs an installed
`.desktop` file to point at — so it works on the deb and fails on a bare
AppImage.

> **[→ reveals the closing line]**

So the boolean it hands back is really capability detection. Remember that.
On one platform, it lies.

### 3:20 — Three delivery paths  ·  **SLIDE 6**

Now the part nobody warns you about.

There is no single "you got a URL" callback. There are three delivery paths.
They're mutually exclusive, and they differ both by platform *and* by whether
your app is already running.

> **[The lane animation runs automatically — narrate along with it.]**

On macOS, always the `open-url` event, never argv. And that listener has to be
attached synchronously at module top, before `whenReady`, because on a cold
start it can fire during launch and nothing will replay it for you.

On Linux and Windows with the app already running, the OS launches a *second
copy* of your app with the URL in its argv. The single-instance lock denies it,
the newcomer forwards its argv to the original process, and exits. That's also
what covers "app is sitting in the tray and the user clicks a link" — which in
real use is the most common case of all.

And on a cold start, the URL is just sitting in `process.argv`.

> **[→ reveals the closing line]**

Implement only the one you happened to test with, and the feature is perfect on
your machine and broken for half your users.

### 4:25 — The parser is a security boundary  ·  **SLIDE 7**

All three paths end at the same function. It is the only thing standing between
a web page and your dialer.

So it isn't a convenience normalizer. It's a gate. And it runs
cheapest-rejection-first: length, then control characters, then the scheme
allowlist, and only then does anything look at what the string *means*.

> **[The stage animation resolves top to bottom. Let it play.]**

That input is an injection attempt — `tel:` one semicolon `rm -rf /`. Watch what
kills it. It isn't a blocklist. Everything after the first semicolon is an RFC
3966 parameter, so cutting there is simply *correct* — and it happens to disarm
the injection before anything else in the system looks at the string.

There's a live version of this in the blog post. Paste anything you like into
it; it's the same code path, and it'll show you exactly which stage kills it.

### 5:20 — Four decisions worth stealing  ·  **SLIDE 8**

> **[→ ×4, one point at a time. Keep this section brisk.]**

Strip control characters, don't reject on them — a stray carriage return from a
shell relay shouldn't kill a valid link, but it has no business surviving
downstream either.

The parameter cut is also an injection cut. Correctness and safety pointing the
same direction is the good kind of design.

Validate shape; never sanitize toward validity. The last check is a regex plus
"must contain at least one digit", and anything else is *rejected* — not
cleaned up. A vanity number like `+1415CALLNOW` returns null. A parser that
tries to rescue malformed input eventually rescues something it shouldn't.

And the off-switch is your own preference, not the OS association. Deregistration
is best-effort on Linux, so a stale association can keep launching you after the
user turned the feature off. If deregistration is your off-switch, "off" means
"mostly off".

### 6:10 — Guardrails  ·  **SHOT C** (auto-dial settings)

> **[Cut to SHOT C: Settings → General, both toggles.]**

Worth saying plainly: by default a click never places a call. It pre-fills the
number and a human presses Call. There's an opt-in for dialing immediately, and
even with that on it declines to fire when there's more than one account it
could call from, or when you're already on a call — and the window always comes
to the front, so a page can never place a call you can't see and hang up.

### 6:40 — The race nobody sees  ·  **SLIDE 9**

Cold start is where this gets interesting, because the URL exists before the app
does.

> **[The timeline blips animate in sequence.]**

Main has the URL within milliseconds. React mounts hundreds of milliseconds
later. Push too early and it lands on nothing.

The instinct is to wait for a ready signal, and the instinct is wrong, because
`did-finish-load` is not "React ran". The page can finish loading before your
component tree has mounted and subscribed. Main fundamentally cannot observe
when the renderer's effect actually attached a listener — so any "push when
ready" scheme is a race you'll lose on a slow machine and win on yours.

> **[→ reveals the closing line]**

So stop trying to know. Do both. Push when the renderer is known to be
listening; buffer when it isn't. The renderer pulls exactly once on mount, and
that pull is also what flips the flag. Whichever side is late drives. Delivered
exactly once, with no timing assumption anywhere.

### 7:30 — The war story  ·  **SLIDE 10**

Okay. The bug.

> **[→ ×3, one chain link at a time. Slow down here — this is the payoff.]**

On the Debian package, click-to-call was completely dead. Not flaky — dead. And
the Settings toggle agreed: it refused to turn on, and showed "couldn't set up
phone links".

Except the operating system had been routing `tel:` links to the app correctly
the entire time. Since install. The `.desktop` file carries the MIME type,
`update-desktop-database` runs at install, the association was right there.
Clicking a link *did* launch the app. It just did nothing when it got there.

Here's the chain. `setAsDefaultProtocolClient` on Linux shells out to
`xdg-settings`. To verify the result, `xdg-settings` resolves the desktop *name*
back to a binary — and its GNOME backend does that with a naive first-word split
of the `Exec` line.

> **[→ reveals the Exec line with the split highlighted]**

That's our `Exec` line. A quoted path with a space in it. First-word doesn't
honor the quote, so it splits right there, hands `"/opt/WaveKat` to `which`,
`which` fails, `xdg-settings` exits 2, and Electron reports false.

> **[→ reveals the consequence paragraph]**

And it was *totally* dead rather than just mislabeled because of a decision two
layers away that was individually correct: the preference is only saved when the
OS accepts the claim — otherwise the toggle would say "on" while links went
nowhere. So false meant the preference never saved, which meant the dispatch
gate saw "off", which meant every clicked link was silently dropped. An honest
failure mode, faithfully propagating a wrong answer.

> **[→ reveals the punchline. Hold it.]**

A space in a product name broke click-to-call on an entire platform.

### 8:25 — The fix  ·  **SLIDE 11**

`isDefaultProtocolClient` is no help either — it calls `xdg-settings check`,
same defect.

What *is* immune is the query side of xdg, because it reports the current
handler's name instead of resolving a name back to a binary.

> **[→ reveals the code]**

So on Linux a false from `setAsDefaultProtocolClient` isn't taken at face value.
It gets confirmed against `xdg-mime query`, and a match counts as success. Less
a workaround than asking a question the tool can actually answer.

### 8:50 — Takeaways  ·  **SLIDE 12**

> **[→ ×4, brisk.]**

Four things generalize to any desktop app handling a URL scheme. Declaring and
claiming are different operations with different consent requirements. There are
three delivery paths, not one — and the one you'll forget is the most common one
in real use. The handler entry point is an untrusted-input boundary. And never
let the OS association be your off-switch.

### 9:10 — Outro  ·  **SLIDE 13** → **SHOT D**

The full write-up is on the blog, with a live version of that parser you can
throw hostile input at.

> **[Cut to SHOT D — a last click-to-dial, end on the pre-filled sheet.]**

WaveKat Voice is the SIP softphone for Mac and Linux that records and
transcribes every call, running on a SIP engine we wrote from scratch. Link's
below.

Click a number. It just calls. That's the whole point.

---

## Shot list — the four app recordings

Record at 1920×1080, light theme, on Ubuntu (matches the blog screenshots).
Everything else in the video comes from `deck.html`.

| # | Shot | What's on screen | Length |
|---|---|---|---|
| **A** | Cold open | A browser on a contact page. Cursor moves to a phone number, clicks. WaveKat Voice comes to the front with the New Call sheet pre-filled. Don't press Call — the point is that it waits. | ~8 s |
| **B** | The toggle | Settings → General. Cursor flips **Phone links** on. Hold a beat on the row. | ~5 s |
| **C** | The guardrails | Settings → General with **Phone links** on, revealing the "Dial immediately when I click a phone link" row underneath. Don't turn it on. | ~6 s |
| **D** | Outro | Same as A but shorter — click, app comes forward, number sitting in the field. Freeze there. | ~5 s |

If a re-record isn't practical, the committed stills at
`public/screenshots/dial-prefilled/en.webp` and
`public/screenshots/settings-general-phone-links/en.webp` cover B and C as
held frames with a slow push-in.

---

## YouTube metadata

**Title** (pick one — all under 70 characters so nothing truncates):

1. `How Click-to-Call Actually Works (tel: links, end to end)` ← recommended
2. `A space in a product name broke our app on Linux`
3. `Three ways an OS delivers a clicked link — and why you need all three`

Option 1 is the searchable one and matches the blog post's intent. Option 2 is
the curiosity-gap version — better click-through, worse for search, and it
undersells the other 80% of the video.

**Description:**

```
Click a phone number on a web page and your softphone opens with the number in
it. That one click crosses four trust boundaries, arrives by one of three
different OS mechanisms, and races a React app that hasn't mounted yet.

A full walkthrough of how we built click-to-call in WaveKat Voice — protocol
declaration vs. claiming the default, the three delivery paths (macOS open-url,
second-instance argv, cold-start argv), why the URL parser is a security
boundary, the buffer-and-pull handoff that removes the cold-start race, and the
xdg-settings bug that made the whole feature dead on Debian because our install
path has a space in it.

Full write-up, with a live parser you can throw hostile input at:
https://wavekat.com/blog/how-click-to-call-works/

WaveKat Voice — the SIP softphone for Mac and Linux that records and transcribes
every call: https://wavekat.com/voice/

Chapters:
0:00 What click-to-call looks like
0:35 A phone link is a URI, not an action
1:15 Why tel: is dirtier input than you think
1:50 Declaring a scheme vs claiming the default
2:35 The same API call, three platform behaviours
3:20 Three delivery paths (and why you need all three)
4:25 The parser is a security boundary
5:20 Four decisions worth stealing
6:10 Why a click never places a call by itself
6:40 The cold-start race, and the fix
7:30 War story: the deb that reported failure while working
8:25 Asking a question the tool can answer
8:50 What generalizes
9:10 Outro
```

**Tags:** `electron`, `click to call`, `tel links`, `desktop app development`,
`url scheme`, `protocol handler`, `xdg`, `linux desktop`, `softphone`, `sip`,
`voip`, `security`, `input validation`, `typescript`, `wavekat`

**Thumbnail concept:**

Dark background (`#070b14`). Centered, large monospace:

```
Exec="/opt/WaveKat Voice/…
      └──────┘ ← splits here
```

with `"/opt/WaveKat` highlighted in red and the rest dimmed. Top-left kicker in
orange: **THIS SPACE BROKE EVERYTHING**. No face, no arrows, no shocked
expression — the bug *is* the hook, and it reads at thumbnail size because it's
four words and one line of code.

Second option if that tests poorly: the three-lane pipeline from slide 6 with
the heading **3 WAYS, NOT 1** — more informative, less curiosity gap.

**Pinned comment:**

```
The parser in this video is live on the blog post — paste any tel:/sip: URL
(or something hostile) and it'll show you which stage kills it and why:
https://wavekat.com/blog/how-click-to-call-works/

Ported straight from the app's own dial-url.ts and checked against all 32 of
its unit tests, so it isn't a simplified demo — it's the real gate.
```
