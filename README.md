# wavekat.com

The homepage for the WaveKat audio ecosystem — built with [Astro](https://astro.build) and deployed on Cloudflare Pages.

## What is WaveKat?

Big companies have had intelligent phone systems, voice automation, and 24/7 call handling for years. Small businesses haven't — until now.

WaveKat builds open-source, AI-powered voice solutions so that anyone can have the same capabilities. Our first solution, **wavekat-voice**, lets small businesses answer phones intelligently using AI — no enterprise budget required.

Everything we build runs on a foundation of Rust audio libraries that handle the hard parts of voice pipelines: detecting when someone is speaking, knowing when they're done, and processing audio reliably.

### Solutions

| Repo | What it does |
|------|-------------|
| [wavekat-voice](https://github.com/wavekat/wavekat-voice) | AI phone answering for small businesses — SIP/RTP, voice-to-voice conversations |

### Libraries

| Repo | What it does |
|------|-------------|
| [wavekat-core](https://github.com/wavekat/wavekat-core) | Shared audio primitives (`AudioFrame`, sample format conversion) |
| [wavekat-vad](https://github.com/wavekat/wavekat-vad) | Voice Activity Detection — WebRTC, Silero, TEN-VAD, FireRedVAD |
| [wavekat-turn](https://github.com/wavekat/wavekat-turn) | Turn detection — knows when a speaker is done talking |
| [wavekat-lab](https://github.com/wavekat/wavekat-lab) | Interactive dashboard for testing and comparing audio backends |

## Tech Stack

- **Framework**: [Astro](https://astro.build) (static output)
- **Styles**: [Tailwind CSS](https://tailwindcss.com)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com)

## Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
# output → dist/
```

## License

Apache 2.0
