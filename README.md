# wavekat.com

[![CI](https://github.com/wavekat/wavekat.com/actions/workflows/ci.yml/badge.svg)](https://github.com/wavekat/wavekat.com/actions/workflows/ci.yml)
[![Release](https://github.com/wavekat/wavekat.com/actions/workflows/release.yml/badge.svg)](https://github.com/wavekat/wavekat.com/actions/workflows/release.yml)

> Give every small business the voice of a big one.

[wavekat.com](https://wavekat.com)

WaveKat builds open-source, AI-powered solutions that put enterprise-grade capabilities in the hands of everyone. We start with voice — answering phones, handling conversations, being present 24/7 — the kind of thing only big companies could afford to do well. But voice is just where we begin.

### Solutions

| Repo | What it does |
|------|-------------|
| [wavekat-voice](https://github.com/wavekat/wavekat-voice) | AI phone answering for small businesses — SIP/RTP, voice-to-voice conversations |

### Tools

| Name | What it does |
|------|-------------|
| [Common Voice Explorer](https://github.com/wavekat/wavekat-lab/tree/main/tools/cv-explorer) | Browse, filter, and review Mozilla Common Voice dataset clips<br>**Try it:** [https://commonvoice-explorer.wavekat.com](https://commonvoice-explorer.wavekat.com/) |

### Libraries

| Repo | What it does | Stars |
|------|-------------|-------|
| [wavekat-core](https://github.com/wavekat/wavekat-core) | Shared audio primitives (`AudioFrame`, sample format conversion) | [![GitHub stars](https://img.shields.io/github/stars/wavekat/wavekat-core?style=flat-square)](https://github.com/wavekat/wavekat-core) |
| [wavekat-vad](https://github.com/wavekat/wavekat-vad) | Voice Activity Detection — WebRTC, Silero, TEN-VAD, FireRedVAD | [![GitHub stars](https://img.shields.io/github/stars/wavekat/wavekat-vad?style=flat-square)](https://github.com/wavekat/wavekat-vad) |
| [wavekat-turn](https://github.com/wavekat/wavekat-turn) | Turn detection — knows when a speaker is done talking | [![GitHub stars](https://img.shields.io/github/stars/wavekat/wavekat-turn?style=flat-square)](https://github.com/wavekat/wavekat-turn) |
| [wavekat-lab](https://github.com/wavekat/wavekat-lab) | Interactive dashboard for testing and comparing audio backends | [![GitHub stars](https://img.shields.io/github/stars/wavekat/wavekat-lab?style=flat-square)](https://github.com/wavekat/wavekat-lab) |
| [wavekat-tts](https://github.com/wavekat/wavekat-tts) | Text-to-speech synthesis — unified Rust interface for multiple TTS backends | [![GitHub stars](https://img.shields.io/github/stars/wavekat/wavekat-tts?style=flat-square)](https://github.com/wavekat/wavekat-tts) |

## Tech Stack

- **Framework**: [Astro](https://astro.build) (static output)
- **Icons**: [Lucide](https://lucide.dev) via `@lucide/astro`
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
