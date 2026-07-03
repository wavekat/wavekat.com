---
title: "Hello, World — WaveKat Is Here"
description: "Introducing WaveKat: open-source, AI-powered voice tools built for small businesses. Here's what we're building and why."
date: 2026-04-01
updated: 2026-07-04
author: Eason Guo
tags: [announcement, open-source, voice-ai]
---

We started WaveKat with a simple belief:

> Every small business deserves the voice of a big one.

Small businesses miss calls. They can't afford a front desk or a 24/7 answering service. Meanwhile, enterprise companies deploy sophisticated voice AI that handles thousands of calls a day. That gap shouldn't exist.

## What we're building

WaveKat is building tools for real-time voice AI. We're starting with a set of open-source libraries:

- **wavekat-core** — shared audio primitives like `AudioFrame` and sample format conversion
- **wavekat-vad** — voice activity detection with multiple backends (WebRTC, Silero, and more)
- **wavekat-turn** — turn detection that knows when a speaker is done talking
- **wavekat-lab** — an interactive dashboard for testing and comparing audio backends

On top of these libraries, we've built **WaveKat Voice** — a desktop softphone for Mac and Linux that turns your computer into your business phone. It answers and places calls through the SIP provider you already have, records every call, and writes down what was said as it happens. An [AI assistant can work the dialpad for you](/blog/place-calls-from-the-command-line/) — you do the talking; an assistant that holds the conversation itself is where we're headed.

## Why start with open source?

We believe the foundational technology — VAD, turn detection, audio processing — should be open, auditable, and free to build on. These building blocks shouldn't be locked behind enterprise contracts.

## What's next

We're heads-down building. Follow along on [GitHub](https://github.com/wavekat) or check back here — we'll be writing about the engineering behind real-time voice, the tradeoffs we're making, and what we learn along the way.

**WaveKat Voice** is in free public beta today — [download it](/voice/download/) for your Mac or Linux computer.
