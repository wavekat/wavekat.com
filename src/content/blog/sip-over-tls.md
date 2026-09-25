---
title: "SIP over TLS: Encrypted Softphone Signaling"
description: "WaveKat Voice now connects to SIP providers over TLS on port 5061, encrypting sign-in and call details on Mac, Windows and Linux. The audio isn’t encrypted yet."
date: 2026-09-26
author: Eason Guo
tags: [voice-ai, sip, privacy]
draft: false
---

SIP over TLS encrypts the connection between your phone and your SIP provider, so the sign-in exchange, the numbers you call, and every call-control message travel scrambled instead of as plain text. It usually runs on port 5061 instead of 5060. It does **not** encrypt the call's audio — that's a separate protocol. As of [0.0.56](/voice/changelog/#0.0.56), WaveKat Voice — the SIP softphone for Mac, Windows and Linux that records and transcribes every call — supports it on any line.

This post covers what TLS actually protects, whether it's worth switching, how to set it up, how to confirm it's working, and what goes wrong — including the parts we haven't finished.

## What SIP over TLS encrypts, and what it doesn't

SIP over TLS encrypts SIP signaling: the messages that sign a line in, ring a phone, answer, hold, transfer and hang up. Audio travels separately (as RTP) and is unaffected.

| | UDP / TCP | TLS |
|---|---|---|
| **Sign-in exchange** | Readable on the network | Encrypted |
| **Who called whom, and when** | Readable on the network | Encrypted |
| **Hold, transfer, hang-up** | Readable on the network | Encrypted |
| **The call's audio** | Not encrypted | Not encrypted |
| **Proves the server is really your provider** | No | Yes — its certificate is checked |
| **Usual port** | `5060` | `5061` |

The sign-in row is the one people underestimate. SIP never sends your password itself — it uses a challenge-and-response ([RFC 3261](https://www.rfc-editor.org/rfc/rfc3261)) — but on UDP or TCP anyone on the network path can capture that exchange and try guesses against it offline, as fast as their hardware allows. A short or reused SIP password falls to that quickly. TLS takes the exchange off the wire entirely.

Encrypting the audio takes SRTP ([RFC 3711](https://www.rfc-editor.org/rfc/rfc3711)), which WaveKat Voice doesn't support yet. If your concern is someone listening to the conversation itself, TLS alone doesn't address it.

## Should you switch a line to TLS?

Switch to TLS if your provider supports it and any of these apply:

- **You make calls from networks you don't control** — a café, a coworking space, a hotel, a client's office. Those are exactly the paths where someone can capture the sign-in exchange.
- **Your SIP password is weak or used elsewhere**, and you can't easily change it.
- **Your router has a "SIP ALG" feature that's causing sign-in trouble.** SIP ALG rewrites unencrypted SIP messages on their way through the router and is a well-known cause of lines that won't stay signed in. It can't read TLS, so it leaves it alone.
- **Someone — a client, an auditor, an IT policy — asks whether your phone traffic is encrypted.** TLS lets you say yes for signaling, and be precise that audio is a separate question.

Stay on UDP if your provider doesn't offer TLS, or if you need a line that recovers from network drops on its own (see [what we haven't finished](#what-we-tested-and-what-we-havent-finished) below).

## How to set up SIP over TLS

1. **Check that your provider offers SIP over TLS**, and note the hostname and port from their setup guide. Most use port `5061`; some use a separate hostname for TLS. For example, the NZ provider 2talk documents SIP over TLS on port `5061`.
2. **Open the line in WaveKat Voice** and set **Connection** to `TLS`. The port field suggests `5061` as soon as you pick it.
3. **Make sure the account's domain is exactly the one your provider gave you.** The certificate is checked against that domain, not against a server address you entered separately.
4. **Save.** The line signs in again over TLS; the account, number and everything else stay the same.

One mistake is common enough to call out: setting Connection to `TCP` and the port to `5061` is **not** TLS. It sends unencrypted traffic to a port that expects an encrypted handshake, and the line simply won't sign in. Pick `TLS`.

The line's settings back up to your WaveKat account like any other, so it stays a TLS line when you sign in on another computer.

## How to check that a line is really using TLS

Open the line and follow the **Technical details** link under its connection details. That page shows the settings actually *in effect* on the live connection — not the ones you typed — so it's the place to confirm TLS rather than assume it:

- **Connection** reads `TLS`.
- **Reachable at** ends in `;transport=tls`.
- In **SIP messages**, each message's `Via` header starts with `SIP/2.0/TLS`.

![WaveKat Voice on Ubuntu — a line's Technical details page, showing the connection in effect is TLS and the device is reachable at transport=tls.](/screenshots/line-technical-details-tls/en.webp)

Comparing what's in effect with what's configured is not a formality. Until 0.0.56, a line set to `TCP` quietly used UDP underneath, and every screen agreed it was on TCP because every screen read the setting. That's fixed, and this page is how we'd have caught it in a minute.

The message log is kept in memory only — never written to disk, gone when the app quits — and the password-derived digest in each authorization header is blanked before it's shown, so a copied log is safe to paste into a support email.

## Troubleshooting SIP over TLS

| What you see | Likely cause | What to do |
|---|---|---|
| *"Your provider's server didn't prove it is who it says it is"* | The account's domain doesn't match the provider's certificate, or the provider uses a private certificate | Use the exact domain your provider gave you. If they use their own certificate, ask how customers connect securely |
| *"The secure connection to your provider couldn't be set up"* | Wrong port (often `5060`), or TLS isn't offered on that hostname | Use the TLS port and hostname from your provider's guide |
| The line won't sign in at all after switching | Connection is `TCP` with port `5061`, or a firewall blocks outbound `5061` | Set Connection to `TLS`; allow outbound TCP on the TLS port |
| The line was fine, then went signed out and stayed that way | The TLS connection dropped (provider restart, router closing an idle connection) and wasn't rebuilt | Press **Sign in again** on the line |

For a certificate error, **Technical details** shows the exact reason — an untrusted issuer, or a certificate for another domain — and the certificate's SHA-256 fingerprint, which is what a provider's support team will ask for. WaveKat Voice never falls back to an unencrypted connection when a certificate fails, and doesn't sit retrying on "Connecting…"; it stops and says why. That behaviour follows [RFC 5922](https://www.rfc-editor.org/rfc/rfc5922), the standard for checking a SIP server's identity.

## What we tested, and what we haven't finished

We tested TLS against a real Asterisk 22 server with a certificate from a throwaway certificate authority, before shipping:

| Test | Result |
|---|---|
| Trusted certificate, correct domain | Signed in; the server saw the device on TLS |
| Outgoing call | Answered and hung up normally; every message went over TLS |
| Incoming call | Rang over the same TLS connection and was answered |
| Certificate from an untrusted authority | Refused at once, with the reason and fingerprint; no retry loop |
| Trusted certificate, wrong domain | Refused at once: not valid for this SIP domain |

What isn't finished: **a TLS line doesn't yet rebuild its connection on its own after it drops.** UDP has no connection to lose, so a network blip goes unnoticed; TLS keeps one connection open, and if the provider restarts or a router closes it, the line stays signed out until you press **Sign in again**. Automatic reconnection is the next piece of work on [our SIP engine](/blog/our-own-sip-engine/). If a line must keep taking calls unattended — say, one a [call flow](/blog/answer-calls-with-a-call-flow/) answers overnight — weigh that before switching.

## Frequently asked questions

### Does WaveKat Voice support SIP over TLS?

Yes. Since version 0.0.56, WaveKat Voice can connect any SIP line over TLS: set the line's Connection to `TLS` and use your provider's TLS port, usually 5061. It works on Mac, Windows and Linux.

### Does SIP over TLS encrypt the call audio?

No. SIP over TLS encrypts the signaling — your sign-in, the numbers, and call control — but not the audio, which travels separately. Encrypting audio takes SRTP, which WaveKat Voice doesn't support yet.

### What port does SIP over TLS use?

SIP over TLS usually uses port 5061, while unencrypted SIP uses 5060. Some providers use a different port or hostname for TLS, so check your provider's setup guide.

### Is setting TCP with port 5061 the same as TLS?

No. TCP on port 5061 sends unencrypted SIP to a port expecting an encrypted handshake, so the line won't sign in. In WaveKat Voice, set Connection to `TLS`.

### How do I know my SIP line is actually encrypted?

Open the line's **Technical details** page in WaveKat Voice. Connection should read `TLS`, the "Reachable at" address should end in `;transport=tls`, and the SIP messages should show `Via: SIP/2.0/TLS`.

### Can I use a self-signed certificate with WaveKat Voice?

Not from inside the app. WaveKat Voice trusts the certificate authorities your computer already trusts, so a provider or PBX using its own private certificate won't connect over TLS. Ask your provider how customers connect securely, or use UDP.

### Is SIP over TLS the same as end-to-end encryption?

No. TLS encrypts only the connection between WaveKat Voice and your provider. Your provider still sees the call's details, and beyond its network the call travels however the phone system carries it.

## Try it

[Download WaveKat Voice](/voice/download/) — or update to [0.0.56](/voice/changelog/#0.0.56) — then open a line, set Connection to `TLS`, and check **Technical details** to confirm it. The [SIP setup guide](/docs/voice/sip-trunks/) covers every other connection setting.
