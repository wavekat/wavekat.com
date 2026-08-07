# Video — “A Space Broke Our App”

Companion to [/blog/the-space-that-broke-our-app/](https://wavekat.com/blog/the-space-that-broke-our-app/).
Target length **4:00**. One story, told once.

`deck.html` in this folder is the whole presentation. The only things it can't
show are two short app recordings (shot list at the bottom).

**Tone:** you're telling a friend about a bug that made you laugh. Not a
lecture. The audience does not need to know what a desktop entry is — every
technical term gets replaced or explained in the same breath.

---

## Recording setup

| | |
|---|---|
| **Deck** | `docs/video/the-space/deck.html` — open it, <kbd>F</kbd> for fullscreen, <kbd>H</kbd> to hide the counter before you roll |
| **Keys** | <kbd>→</kbd> advance · <kbd>←</kbd> back · <kbd>R</kbd> replay the slide-4 animation |
| **Capture** | 1920×1080, 60 fps. The deck renders into a fixed 1920×1080 box scaled to the window, so any window size gives the same frame |
| **Pacing** | Slide 4's animation runs ~6 s on its own. Let it. Don't talk over the split landing |

---

## Script

### 0:00 — Cold open  ·  **SHOT A**

> **[Open on SHOT A: browser, click a phone number, app comes up with the
> number in it. No narration over the click itself — let it land.]**

That's the feature. You click a phone number on a web page, and our phone app
opens with the number already typed in.

> **[Cut to deck — SLIDE 1]**

For about three weeks, our app told every Linux user that this feature couldn't
be set up. It had been working perfectly the entire time. The reason was a
space — and not a space in the code. A space in our own name.

### 0:25 — What it was supposed to do  ·  **SLIDE 2**

Quick setup. For that click to reach us, the app has to ask the operating
system a favour: *when somebody clicks a phone number, send it to me.*

> **[→]**

It's the same kind of request your browser makes when it asks to be your
default browser. You say yes, and the system writes it down somewhere.

### 0:50 — The contradiction  ·  **SLIDE 3**

On Ubuntu and Debian, that request came back as a failure. The switch in
Settings wouldn't stay on. It showed a little apologetic note saying we
couldn't set phone links up.

> **[→ reveals the left panel]**

Meanwhile —

> **[→ reveals the right panel. Beat.]**

— clicking a phone number on a web page *did* open our app. Linux had been
sending us those clicks correctly since the moment it was installed. The app
just sat there and ignored them.

> **[→ reveals the line underneath]**

So the system was doing the thing. And the check that asks "are you doing the
thing?" kept saying no. That took us an embarrassingly long time.

### 1:30 — The first word  ·  **SLIDE 4**  ← the payoff

Here's what's actually going on.

When an app asks to become the default for something on Linux, that request
goes through a small system tool. And after it makes the change, it double
checks its own work — it takes the app's name, works out which program that
name points at, and confirms it's the one that asked.

To find the program, it reads one line out of a little text file that tells
Linux what to run.

> **[Let the split animation land before continuing. ~2 s of nothing.]**

And it takes the first word of that line.

> **[The three consequences appear one at a time — pace to them.]**

Look at where it split. Those quotation marks are there *precisely* so that a
path can have a space in it and still hold together as one thing. The tool
splits on spaces without looking at the quotes at all.

So it goes hunting for a program called `"/opt/WaveKat` — with the quote mark
still attached. There is no such program. There is no such anything.

The lookup fails, the tool gives up with an error, and the answer that travels
all the way back to us is: no, you're not the default.

### 2:20 — Nobody chose that folder  ·  **SLIDE 5**

And here's the part I like. Nobody did anything wrong.

> **[→ ×3, one tick at a time]**

Calling the product two words — fine. Linux apps installing in a folder named
after the product — that's the convention. Wrapping a path that contains a
space in quotes — that is *exactly* what you're supposed to do.

> **[→ reveals the punchline]**

Every single step is correct, and the feature is dead on an entire operating
system.

### 2:45 — Why it failed completely  ·  **SLIDE 6**

One more layer, because this is the bit that's actually useful.

> **[→ ×4, one link at a time. Steady.]**

We only save the setting if the system confirms the change worked. That's on
purpose — otherwise the switch could sit there glowing "On" while clicked
numbers went nowhere, and a switch that lies to you is worse than one that
admits it failed.

But the check failed. So the setting never saved. So the app treated the
feature as off. So every clicked phone number got quietly dropped — while the
operating system, still perfectly configured, kept delivering them.

> **[→ reveals the punchline]**

An honest rule, faithfully passing along a wrong answer.

### 3:15 — The fix  ·  **SLIDE 7**

The fix was to stop asking that question.

> **[→ ×2]**

"Did my change work?" goes back through the same machinery that's broken. But
there's another tool that answers a different question — *who is the default
right now?* — and that one just reports the name it has on file. It never works
backwards from a name to a program. So it never reads that line. So it never
trips over the space.

> **[→]**

When it says our name back to us, we call that success, no matter what the
first tool claimed.

And no, we didn't rename the product. Renaming a product to avoid a space in a
file path is the tail wagging the dog.

### 3:40 — The lesson  ·  **SLIDE 8**

> **[→]**

If there's one thing to take away: when a check disagrees with reality, suspect
the check. We spent days assuming the setting was broken because something
authoritative told us it was. It was fine the whole time. The only broken thing
was the answer.

> **[→]**

"Did my change succeed" and "is this true right now" look like the same
question. They're not. The first one inherits every bug in the thing that made
the change. The second one just looks.

> **[→]**

When you can — look.

### 4:00 — Outro  ·  **SLIDE 9** → **SHOT B**

> **[Cut to SHOT B: one more click-to-dial, end on the pre-filled number.]**

It works now. Even on Debian. Link's below if you want the whole write-up.

---

## Shot list

Two clips. Record at 1920×1080, light theme, on Ubuntu.

| # | Shot | What's on screen | Length |
|---|---|---|---|
| **A** | Cold open | Browser on a contact page. Cursor moves to a phone number, clicks. WaveKat Voice comes forward, New Call sheet pre-filled. Don't press Call. | ~7 s |
| **B** | Outro | Same again, shorter. Click, app forward, number sitting in the field. Freeze there. | ~5 s |

Existing still at `public/screenshots/dial-prefilled/en.webp` works as a held
frame with a slow push-in if a re-record isn't practical.

---

## YouTube metadata

**Title** (under 70 chars so nothing truncates):

1. `A space in our app's name broke it on Linux` ← recommended
2. `Our app said the feature was broken. It was working fine.`
3. `The weirdest bug we've shipped: one space`

Option 1 states the whole premise and still leaves the *how* open. Option 2 is
the stronger curiosity gap but tells a viewer nothing about what they'll learn.

**Description:**

```
For about three weeks our app told Linux users a feature couldn't be set up.
It had been working perfectly since the day they installed it.

The cause: our product is called "WaveKat Voice", so the app installs into a
folder with a space in the name, so its startup line gets wrapped in quotes —
and the system tool that verifies default-app changes takes "the first word"
of that line without honouring the quotes. It went looking for a program
called "/opt/WaveKat, didn't find one, and reported failure for something that
was working the whole time.

Every individual decision along that chain was correct.

Full write-up: https://wavekat.com/blog/the-space-that-broke-our-app/
WaveKat Voice — a phone app for Mac and Linux that records and transcribes
every call: https://wavekat.com/voice/

Chapters:
0:00 The feature
0:25 What it asks the operating system for
0:50 Two things that disagreed
1:30 It takes the first word
2:20 Nobody chose that folder
2:45 Why it failed completely instead of just looking wrong
3:15 The fix: ask a different question
3:40 When a check disagrees with reality
```

**Tags:** `debugging`, `linux`, `bug`, `war story`, `software development`,
`edge case`, `desktop apps`, `electron`, `xdg`, `debian`, `ubuntu`,
`programming`, `wavekat`

**Thumbnail:**

Dark background. One line of monospace, big:

```
"/opt/WaveKat Voice/…
 └────────┘
```

with `"/opt/WaveKat` in red and the rest dimmed. Orange text top-left:
**THIS SPACE**. That's it — no face, no arrows, no shocked expression. The bug
is legible at thumbnail size because it's two words and a broken path.

**Pinned comment:**

```
The write-up has an interactive version of that split — you can flip between
our real folder name and the same path without a space, and watch the check
succeed or fail: https://wavekat.com/blog/the-space-that-broke-our-app/
```
