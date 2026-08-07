---
title: "The Space That Broke Our App on Linux"
description: "Our app told people a feature couldn't be set up. It had been working perfectly since the day they installed it. The cause was a single space in our own name."
date: 2026-08-07
author: Eason Guo
tags: [voice-ai, engineering]
---

Our app spent weeks telling Linux users that a feature couldn't be set up. The feature had been working perfectly since the day they installed it. The cause was a space — the one in the middle of "WaveKat Voice".

<link rel="stylesheet" href="/blog/exec-split/widget.css" />

## What was supposed to happen

[WaveKat Voice](/voice/) is a phone app for your computer. One of the things it does is open phone numbers you click on a web page: you're on a supplier's contact page, you click their number, and the app comes up with it already typed in.

For that to work, the app has to ask the operating system a favour — *when someone clicks a phone number, send it to me*. It's the same kind of request a browser makes when it asks to be your default browser. You say yes, and the system writes it down.

## What actually happened

On Ubuntu and Debian, that request came back as a failure. The switch in Settings refused to stay on, and showed a small apologetic note saying we couldn't set phone links up.

Except — and this is the part that made no sense for an embarrassingly long time — clicking a phone number on a web page **did** open WaveKat Voice. Linux had been sending us those clicks correctly since the moment the app was installed. The app just sat there and ignored them, because we'd written down that the feature was off.

So the system was doing the thing. The check that asked *"are you doing the thing?"* kept answering no.

## The first word

When an app asks to become the default for something on Linux, the request goes through a small system tool. After that tool makes the change, it double-checks its own work: it takes the app's name, works out which program that name actually refers to, and confirms it's the one that asked.

To find the program, it reads one line out of the app's desktop entry — the little text file that tells Linux what to run when you launch something:

```
Exec="/opt/WaveKat Voice/@wavekatvoice-desktop" %U
```

Then it takes the first word of that line.

The quotes are there precisely so a path can contain a space and still hold together. The tool splits on spaces without looking at the quotes.

<div class="wk-split wk-nojs" data-wk-split
     data-w-notfound="no such file or directory"
     data-w-found="found"
     data-w-fail="not the default — which is wrong"
     data-w-ok="is the default — correct">
  <div class="wk-split-head">Where the app lives, and what the checker makes of it</div>
  <div class="wk-split-body">
    <div class="chips" data-wk-paths>
      <button type="button" data-path="/opt/WaveKat Voice/@wavekatvoice-desktop" aria-pressed="true">our folder (has a space)</button>
      <button type="button" data-path="/opt/wavekat-voice/wavekat-voice">the same app, no space</button>
    </div>
    <p class="line" data-wk-line></p>
    <button type="button" class="run" data-wk-run>Take the first word</button>
    <ol class="out" data-wk-out>
      <li data-out="split"><span class="mk"></span><span class="lbl">First word</span><span class="val" data-slot></span></li>
      <li data-out="which"><span class="mk"></span><span class="lbl">Look for a program by that name</span><span class="val" data-slot></span></li>
      <li data-out="verdict"><span class="mk"></span><span class="lbl">So the checker decides we're…</span><span class="val" data-slot></span></li>
    </ol>
  </div>
</div>

`"/opt/WaveKat` is not a program. Nothing by that name exists anywhere. The lookup fails, the tool gives up with an error, and the answer that travels back to us is: *no, you're not the default*.

## Nobody chose that folder

We didn't pick a path with a space in it. Linux apps install under `/opt/` followed by the product name, and our product is called WaveKat Voice. The tool that builds our installer sees a space in the path, correctly wraps it in quotes so a shell won't mangle it, and moves on.

Every individual step is right. Naming the product with two words is fine. Installing under the product name is the convention. Quoting a path with a space in it is *exactly* what you're supposed to do. And the result is a feature that doesn't work on an entire operating system.

## Why it failed completely, instead of just looking wrong

There's a second half to this, and it's the part I actually find useful.

We only save the setting when the system confirms the change worked. That rule exists on purpose: without it, the switch could sit there glowing "On" while clicked phone numbers went nowhere, and a switch that lies about what it's doing is worse than one that admits defeat.

So the failed check meant the setting never got saved. The setting never getting saved meant the app treated the feature as off. The app treating it as off meant every clicked phone number was quietly dropped — while the operating system, still perfectly configured, kept dutifully delivering them.

An honest rule, faithfully passing along a wrong answer.

## The fix was to ask a different question

There's another system tool that answers a slightly different question: not *"did my change work?"* but *"who is the default for phone links right now?"*

That one just reports the name it has on file. It never has to work backwards from a name to a program, so it never has to read that line, so it never trips over the space. We ask it instead, and when it says our name back to us, we treat that as success no matter what the first tool claimed.

We couldn't fix the path itself. The folder follows the product name, and the installer tool doesn't let you rewrite that line by hand. Renaming the product to avoid a space in a file path is — I hope obviously — the tail wagging the dog.

## What I took from it

**When a check disagrees with reality, suspect the check.** We spent far too long assuming the association was broken, because something authoritative told us it was. The association was fine the whole time. The only broken thing was the answer.

And the sharper version: *"did my change succeed?"* and *"is the thing true right now?"* look like the same question and are not. The first one goes through whatever machinery made the change, and inherits every bug in it. The second one just looks. When you can, look.

## Frequently asked questions

### Why did a space in a file path break the app?

A Linux system tool verifies its own work by taking the first word of the line that says where an app lives. Our app lives in a folder whose name contains a space, so the path is written in quotes — and the tool splits on spaces without honouring the quotes. It ends up looking for a program called `"/opt/WaveKat`, which doesn't exist, and reports failure.

### Was the feature actually broken?

Not at the system level. Linux was correctly sending clicked phone numbers to the app the entire time. The app ignored them because the failed check meant we never saved the setting that switches the feature on.

### How do you check whether your app is the default handler on Linux?

Ask which app currently holds the association, rather than asking whether your change succeeded. Querying the current default reports a name straight from the system's records, so it never has to resolve a name back to a program file — which is where the space trips things up.

## The feature works now

If you want the thing all this was in aid of: [WaveKat Voice](/voice/download/) is free, runs on Mac and Linux, and will [open phone numbers you click on any web page](/blog/click-to-call-phone-links/) — including, at long last, on Debian.

<script src="/blog/exec-split/widget.js" defer></script>
