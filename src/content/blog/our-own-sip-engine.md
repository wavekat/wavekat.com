---
title: "Why WaveKat Voice Runs on Its Own SIP Engine"
description: "WaveKat Voice now runs on wavekat-sip, our from-scratch, open-source SIP and RTP engine — no third-party SIP stack. Here's why we built it and what it means for your calls."
date: 2026-07-06
author: Eason Guo
tags: [voice-ai, engineering, open-source, sip]
draft: true
---

WaveKat Voice — the softphone for Mac and Linux that [records and transcribes every call](/voice/) — now runs on a SIP engine we wrote from scratch: [`wavekat-sip`](https://github.com/wavekat/wavekat-sip), an open-source Rust crate that does the phone signaling and audio transport itself, with no third-party SIP stack underneath. Every call you place or answer, every hold and transfer, now goes through code we own end to end.

This is another step toward the thing we keep coming back to: [giving every small business the voice of a big one](/blog/hello-world/). A big phone system is dependable because the people who run it control every layer of it. Owning the SIP engine is us controlling the layer your call actually travels on — so when something needs to be more reliable, or a feature needs to ship, there's no black box in the way.

## What SIP is, and why it's the hard part

SIP (Session Initiation Protocol) is the language phones speak to set up a call — to register your line with your provider, ring the other side, negotiate which audio codec to use, and tear the call down cleanly at the end. RTP is what carries the actual audio once the call is up. Get SIP subtly wrong and calls drop, one-way audio happens, or a line silently stops receiving calls. It's the unglamorous, exacting core that everything else in a softphone sits on top of.

Until recently, WaveKat Voice drove its calls through a third-party SIP library. That got us on the phone quickly, which was the right call early on. But a borrowed stack decides for you how a call is modeled, how errors surface, and which features are even reachable — and the moment we started building things like call transfer and HD audio, we were working around its shape instead of with it.

## Why we built our own

We rewrote the engine from scratch, as `wavekat-sip`, for three plain reasons:

- **Control.** Features like putting a caller on hold, [transferring a call](/blog/hold-switch-and-transfer-calls/), and keeping a long call alive with session timers all live at the SIP layer. Owning that layer means we add them directly, instead of bending someone else's model to fit.
- **Footprint.** WaveKat Voice is a lightweight desktop app that's meant to sit quietly out of your way. A focused, purpose-built engine keeps it small — it carries only the SIP and RTP it actually uses, not a general-purpose stack's worth of everything else.
- **No black box.** When a call misbehaves, we can read and fix every line between the button you pressed and the packet on the wire. Nothing about how your calls work is off-limits to us.

## What the engine handles

`wavekat-sip` owns the wire-level concerns and stays out of the audio-device and call-orchestration layers, so it remains small and embeddable:

| Area | What it does |
|------|-------------|
| **Registration** | Registers your line with your provider (digest auth), and keeps it alive so incoming calls always reach you. |
| **Calls** | Places outbound calls and answers inbound ones, and alerts callers with a proper ringing signal before you pick up. |
| **In-call control** | Hold and resume, blind and attended transfer, and DTMF (keypad tones) for phone menus. |
| **Audio quality** | Negotiates the [Opus codec](/voice/) for wideband "HD" voice, with automatic fallback to standard G.711 when the other side doesn't support it. |
| **Reliability** | RFC 4028 session timers keep long calls from being silently dropped by the network in the middle. |

## It's open source — like the rest of WaveKat

`wavekat-sip` isn't a private internal component. It's published on [crates.io](https://crates.io/crates/wavekat-sip) under the Apache-2.0 license, with docs on [docs.rs](https://docs.rs/wavekat-sip), the same way our [voice-activity detection](https://github.com/wavekat/wavekat-vad) and [turn detection](https://github.com/wavekat/wavekat-turn) crates are. Anyone building a softphone, a voice bot, or a call-recording bridge in Rust can use the exact engine WaveKat Voice runs on. Building in the open is how we work — the tools underneath our product are yours to inspect and reuse, not a moat.

It's honest to say it's early: the crate is in active development and its API still changes between versions. But it's the real engine behind a real product, not a demo.

## What this means for your calls

Mostly, you won't notice — and that's the point. Your calls connect and sound the way they should. What changes is behind the scenes: the features that make WaveKat Voice feel like a real front desk — hold, call waiting, transfer, HD audio — now ship on our timeline instead of a dependency's, and when something needs to be steadier, we can go straight to the code that runs it.

WaveKat Voice is [free during the public beta](/voice/download/) on Mac and Linux. Connect the phone provider you already have, and your next call runs on an engine we built ourselves — and gave away.
