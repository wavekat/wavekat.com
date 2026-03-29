# wavekat.com

The homepage for the WaveKat audio ecosystem — built with [Astro](https://astro.build) and deployed on Cloudflare Pages.

## What is WaveKat?

For too long, powerful technology has been locked inside big companies — enterprise phone systems, intelligent automation, capabilities that only organizations with large engineering teams and big budgets could afford.

We believe AI changes that. With AI, the same power is now available to everyone: normal people, small businesses, independent builders.

WaveKat is building open-source, AI-powered solutions to make that real. We start with audio and voice — because it's one of the most natural human interfaces, and one of the most underserved outside of the enterprise. But voice is just where we begin.

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
