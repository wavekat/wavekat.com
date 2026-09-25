---
title: "SIP over TLS: Encrypted Softphone Signaling"
description: "WaveKat Voice now connects to SIP providers over TLS on port 5061, encrypting sign-in and call details on Mac, Windows and Linux. The audio isn’t encrypted yet."
date: 2026-09-26
author: Eason Guo
tags: [voice-ai, sip, privacy]
draft: false
---

WaveKat Voice — the SIP softphone for Mac, Windows and Linux that records and transcribes every call — can now connect to your SIP provider over TLS. Set a line's **Connection** to `TLS` and the sign-in, the phone numbers, and every other detail of each call travel to your provider encrypted, instead of as plain text anyone on the network path can read. It lands in [0.0.56](/voice/changelog/#0.0.56).

The same release adds a **Technical details** page for every line, which shows what the line is *actually* doing on the wire. The two belong together: a security setting you can't verify is a setting you have to take on faith, and we'd rather you didn't have to.

## What SIP over TLS encrypts — and what it doesn't

SIP over TLS encrypts the SIP signaling between WaveKat Voice and your provider: the messages that sign your line in, ring a phone, answer, transfer, and hang up. It does not encrypt the call audio itself, which travels separately. Here is the split, plainly:

| | UDP / TCP | TLS |
|---|---|---|
| **Your SIP sign-in (username, auth exchange)** | Readable on the network | Encrypted |
| **Who called whom, and when** | Readable on the network | Encrypted |
| **Call control — hold, transfer, hang-up** | Readable on the network | Encrypted |
| **The call's audio** | Not encrypted | Not encrypted (yet) |
| **Checks it's really your provider** | No | Yes — the server's certificate is verified |
| **Usual port** | `5060` | `5061` |

In SIP terms, TLS protects the signaling channel; encrypting the audio is a separate protocol (SRTP) that WaveKat Voice doesn't speak yet. We'd rather say that in the first table on the page than have you discover it later. Your SIP password was never sent in the clear on any transport — SIP uses a challenge-and-response — but on UDP and TCP the exchange around it, and everything about your calls, is readable by anyone between you and your provider. TLS closes that.

## How to turn on TLS for a SIP line

Turning on TLS is one setting on a line you already have. Open the line in WaveKat Voice, set **Connection** to `TLS`, and use the port your provider documents for TLS — usually `5061`, which the app suggests as soon as you pick TLS. Nothing else about the line changes: same account, same number, same provider.

Your provider has to support SIP over TLS for this to work. Many business SIP providers and PBXs do, often on a separate hostname or port — check their setup guide before you switch. If they don't, leave the line on `UDP`, which is what most providers expect by default.

The line's settings back up to your WaveKat account like any other, so a TLS line stays a TLS line when you sign in on another computer.

## Why WaveKat Voice refuses a certificate it can't verify

A TLS connection is only as good as the certificate behind it, so WaveKat Voice checks your provider's certificate against your computer's own list of trusted authorities, and checks that it was issued for your account's **SIP domain** — even when you've entered a separate server address to connect through. That's the rule the SIP standard sets out for TLS (RFC 5922), and it's what stops someone in the middle from impersonating your provider.

If the check fails, the line doesn't connect, and it tells you so at once: *"Your provider's server didn't prove it is who it says it is."* It does not quietly fall back to an unencrypted connection, and it does not sit on "Connecting…" retrying forever. The **Technical details** page gives the exact reason — an untrusted issuer, or a certificate for a different domain — along with the certificate's fingerprint, which is what your provider's support team will ask for.

The most common cause is a domain that's slightly off: the certificate is checked against the account's domain, so it has to be exactly the one your provider gave you. If your provider uses a certificate of its own rather than one from a public authority, ask them how their customers connect securely.

## See what a line is really doing

Every line now has a **Technical details** page, one link under its connection details. It lists each setting with the value that's *in effect* on the live connection — not the value you typed — and points out any setting that didn't take effect. Below that are the SIP messages the line has sent and received, newest first, each expanding to the full text, with a button that copies everything for a support request.

![WaveKat Voice on Ubuntu — a line's Technical details page, showing the connection in effect is TLS and the device is reachable at transport=tls.](/screenshots/line-technical-details-tls/en.webp)

That page exists because of a bug it would have caught in a minute. Until this release, setting a line's Connection to `TCP` quietly used UDP underneath, and every screen in the app agreed the line was on TCP — because every screen read the *setting*, and none read the connection. That's fixed in 0.0.56, and it's why the page compares the two side by side: when you switch a line to TLS, you can see the messages going out over TLS instead of hoping they are.

The message log stays in memory on your computer: it's never written to disk and is gone when the app quits. Before a message reaches the page, the one value derived from your SIP password — the digest response in the authorization header — is blanked, so a copied log is safe to paste into an email.

This is all built into [our own SIP engine](/blog/our-own-sip-engine/), which is open source; its TLS support uses the Rust `rustls` library, so there's no OpenSSL to install or keep patched on any of the three platforms.

## Also in 0.0.56

- **Voicemail you notice.** When a caller leaves a message with your [call flow](/blog/answer-calls-with-a-call-flow/), you now get a notification, and History marks messages you haven't opened yet.
- **Language from the account menu.** Change the app's language from the menu under your name at the bottom of the sidebar.
- **Model download progress.** Settings → AI shows a progress bar while a transcription model downloads.

The full list is in the [changelog](/voice/changelog/#0.0.56).

## Frequently asked questions

### Does WaveKat Voice support SIP over TLS?

Yes. Since version 0.0.56, WaveKat Voice can connect any SIP line over TLS: set the line's Connection to `TLS` and use your provider's TLS port, usually 5061. It works on Mac, Windows and Linux.

### Does SIP over TLS encrypt the call audio?

No. SIP over TLS encrypts the signaling — your sign-in, the numbers, and call control — but not the audio, which travels separately. Encrypting audio takes SRTP, which WaveKat Voice doesn't support yet.

### What port does SIP over TLS use?

SIP over TLS usually uses port 5061, while unencrypted SIP uses 5060. Some providers use a different port or hostname for TLS, so check your provider's setup guide.

### Why does my TLS line say the server didn't prove who it is?

WaveKat Voice couldn't verify your provider's security certificate, so it refused to connect rather than connect insecurely. Check that the account's domain is exactly the one your provider gave you; the line's **Technical details** page shows the precise reason and the certificate's fingerprint.

### Can I use a self-signed certificate with WaveKat Voice?

Not from inside the app. WaveKat Voice trusts the certificate authorities your computer already trusts, so a provider or PBX using its own private certificate won't connect over TLS. Ask your provider how their customers connect securely, or use UDP.

### Is SIP over TLS the same as end-to-end encryption?

No. TLS encrypts the connection between WaveKat Voice and your provider only; your provider can still see the call's details, and beyond its network the call travels however the rest of the phone system carries it. End-to-end encryption needs both ends to support it, which ordinary phone calls don't.

## Try it

[Download WaveKat Voice](/voice/download/) — or update to [0.0.56](/voice/changelog/#0.0.56) — then open a line, set Connection to `TLS`, and check **Technical details** to watch it sign in over an encrypted connection. The [SIP setup guide](/docs/voice/sip-trunks/) covers every other connection setting.
