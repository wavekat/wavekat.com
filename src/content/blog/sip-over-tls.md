---
title: "SIP over TLS: Encrypted Softphone Signaling"
description: "WaveKat Voice now connects to SIP providers over TLS on port 5061, encrypting SIP signaling (registration, calls, transfers) on Mac, Windows and Linux."
date: 2026-09-26
author: Eason Guo
tags: [voice-ai, sip, privacy]
draft: false
---

WaveKat Voice supports SIP over TLS as of [0.0.56](/voice/changelog/#0.0.56). Set a line's **Connection** to `TLS` and the port to `5061`, and all SIP signaling between the softphone and your provider — REGISTER, INVITE, REFER, BYE — goes over an encrypted connection. It works on Mac, Windows and Linux.

## Why we built it

We tell people WaveKat protects their data. Our [privacy policy](/privacy/) says everything moving between you and WaveKat — the website, cloud sync, downloads — travels over encrypted connections, and that your SIP password never leaves your computer.

That's true, and it left out the part that matters most. On every call, WaveKat Voice exchanges signaling with your SIP provider: who's calling whom, when, your SIP account, and the authentication handshake. That leg went out as plain-text UDP. The privacy policy filed it under "between you and your provider", which was only half right. The provider has to support TLS, yes — but whether the client can use it is on us, and WaveKat Voice had no option for it.

We said we protect your data and didn't, on the link that carries the most about your calls. This closes that gap.

## What's encrypted

| | UDP / TCP | TLS |
|---|---|---|
| REGISTER authentication exchange | Plain text | Encrypted |
| Caller, callee, time (INVITE etc.) | Plain text | Encrypted |
| Hold, transfer, hang-up | Plain text | Encrypted |
| Audio (RTP) | Plain text | Plain text |
| Server identity verified | No | Yes, by certificate |
| Usual port | 5060 | 5061 |

The authentication row is the one people underestimate. SIP uses Digest authentication ([RFC 3261](https://www.rfc-editor.org/rfc/rfc3261)), so the password itself never crosses the wire — but the `response` in the `Authorization` header is a hash derived from it. Anyone on the same network who captures that packet over UDP can run a dictionary against it offline, and a weak password won't last. Over TLS, there's no packet to capture.

## How certificates are checked

TLS only stops a man-in-the-middle if certificate checking is strict. Ours:

- **System roots only.** Certificates are checked against your operating system's trusted CA list. Nothing is bundled and there are no exceptions.
- **Checked against the SIP domain, not the server address.** Even if you've set a separate outbound server, the certificate must be issued for the account's SIP domain, as [RFC 5922](https://www.rfc-editor.org/rfc/rfc5922) requires.
- **A failure stops the line.** No fallback to plain text, no endless retry on "Connecting…". The line fails, and Technical details shows the reason and the certificate's SHA-256 fingerprint:

```
security certificate not trusted: not signed by a trusted issuer (sha256:5941fb2b…)
```

The TLS implementation is Rust's `rustls`, so there's no OpenSSL dependency on any platform.

Self-signed certificates and private CAs aren't supported, and there's no "trust this certificate" switch. If your provider uses a private certificate, that line has to stay on UDP or TCP.

## Setting it up

1. Find your provider's TLS hostname and port in their documentation. Most use `5061`; some use a separate hostname for TLS. The New Zealand provider 2talk, for example, documents `5061`.
2. Open the line and set **Connection** to `TLS`. The port field suggests `5061`.
3. Check that the account's SIP domain matches exactly what your provider gave you — that's the name the certificate is checked against.
4. Save. The line re-registers over TLS.

A common trap: **Connection** `TCP` with port `5061` is not TLS. It sends plain-text SIP to a port waiting for a TLS handshake, and registration fails. Our own 2talk setup guide once got this wrong; it's been corrected.

Line settings sync to your WaveKat account, so the line is still TLS when you sign in on another computer.

## Checking that it's really TLS

Under a line's connection details there's a **Technical details** link. That page shows the values in effect on the running connection, not the ones you typed:

- **Connection** is `TLS`;
- **Reachable at** ends in `;transport=tls`;
- in **SIP messages**, every `Via` is `SIP/2.0/TLS`.

![WaveKat Voice on Ubuntu — a line's Technical details page, showing the connection in effect is TLS and the device is reachable at transport=tls.](/screenshots/line-technical-details-tls/en.webp)

A REGISTER from that line looks roughly like this (an example, from the same demo line as the screenshot):

```
Via: SIP/2.0/TLS 192.0.2.24:5066;branch=z9hG4bK…
Contact: <sip:1001@192.0.2.24:5066;transport=tls>
```

A bug forced this page into existence. Lines set to `TCP` were quietly running on UDP, and every screen in the app said TCP, because every screen read the configuration and none looked at the actual connection. We spent a full day guessing at that one. So TLS had to ship with a way to see the transport actually in use — otherwise "encrypted" is something you'd have to take on faith.

The SIP message log lives in memory only: never written to disk, gone when the app quits. The `response` in `Authorization` and `Proxy-Authorization` headers is blanked at capture, so a copied log doesn't leak the password hash to whoever you send it to.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| "Your provider's server didn't prove it is who it says it is" | SIP domain doesn't match the certificate, or the provider uses a private certificate | Check the SIP domain; for a private certificate, ask the provider for an endpoint with a publicly trusted one |
| "The secure connection to your provider couldn't be set up" | Wrong port (often 5060), or TLS isn't offered on that hostname | Use the port and hostname from the provider's docs |
| Won't register at all after switching | `TCP` + `5061`, or a firewall blocking outbound 5061 | Set Connection to `TLS`; allow outbound TCP 5061 |
| Worked, then stayed unregistered | The TLS connection dropped (provider restart, router reaping idle connections) and wasn't re-established | Press **Sign in again** on the line |

## How we tested it

Before shipping, we ran Asterisk 22 in Docker with pjsip on 5061 and a certificate from a throwaway CA:

| Case | Result |
|---|---|
| CA trusted, correct domain | Registered (200); Asterisk shows the contact as `transport=TLS` |
| Outgoing call | Answered, remote hangup after 3.07 s; every `Via` is `SIP/2.0/TLS` |
| Incoming call | Rang over the same TLS connection and was answered |
| CA not trusted | Failed immediately: not signed by a trusted issuer, with fingerprint; no retry |
| CA trusted, wrong domain | Failed immediately: not valid for this SIP domain |

## Known limitation: no automatic reconnect after a TLS drop

UDP has no connection to lose, so a network blip goes unnoticed. TLS is one long-lived connection: if the provider restarts or a router reaps it, the line stays unregistered until you press **Sign in again**. If a line needs to take calls unattended — say, one a [call flow](/blog/answer-calls-with-a-call-flow/) answers overnight — factor that in before switching.

## FAQ

### Is TCP on port 5061 the same as TLS?

No. That sends plain-text SIP to a TLS port, and registration fails. Set Connection to `TLS`.

### How do I confirm a line is actually encrypted?

Open the line's Technical details: Connection is `TLS`, Reachable at ends in `;transport=tls`, and SIP messages show `Via: SIP/2.0/TLS`.

### Are self-signed certificates supported?

No. WaveKat Voice trusts only the system's root CAs, so a server with a certificate from a private CA can't connect over TLS.

## Try it

[Download WaveKat Voice](/voice/download/) or update to [0.0.56](/voice/changelog/#0.0.56), switch a line to `TLS`, and open Technical details to check. Other connection settings are in the [SIP setup guide](/docs/voice/sip-trunks/).
