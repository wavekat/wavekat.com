# wavekat.com

The homepage for the WaveKat audio ecosystem — built with [Astro](https://astro.build) and deployed on Cloudflare Pages.

## What is WaveKat?

WaveKat is a collection of Rust libraries for audio intelligence in voice pipelines. Each library is independently usable and designed around a common set of audio primitives.

| Repo | Purpose |
|------|---------|
| [wavekat-core](https://github.com/wavekat/wavekat-core) | Shared audio types (`AudioFrame`, sample format conversion) |
| [wavekat-vad](https://github.com/wavekat/wavekat-vad) | Voice Activity Detection — unified interface across WebRTC, Silero, TEN-VAD, FireRedVAD |
| [wavekat-turn](https://github.com/wavekat/wavekat-turn) | Turn detection — end-of-utterance for voice pipelines |
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
