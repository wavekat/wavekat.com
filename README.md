# wavekat.com

> Give every small business the voice of a big one.

WaveKat builds open-source, AI-powered solutions that put enterprise-grade capabilities in the hands of everyone. We start with voice — answering phones, handling conversations, being present 24/7 — the kind of thing only big companies could afford to do well. But voice is just where we begin.

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

Requires Node 22 (`nvm use 22`).

```sh
make install   # install dependencies
make dev       # sync brand assets + start dev server
```

## Build

```sh
make build     # sync brand assets + build → dist/
```

## Brand assets

Logo and wordmark files are sourced from the `wavekat-brand` submodule — never edited here.

```sh
# After cloning, initialise the submodule:
git submodule update --init

# Pull brand updates:
git submodule update --remote vendor/wavekat-brand

# Re-sync assets into public/logos/:
make sync
```

## License

Apache 2.0
