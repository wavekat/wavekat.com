# 06 — Self-hosted runners: adding the Mac mini

Every workflow in this repo runs on `runs-on: [self-hosted, wavekat-ci]`. Until
now that label existed on one machine — a Linux x86-64 workstation. This doc
adds a Mac mini (Apple Silicon) to the same pool, running the runners as Docker
Desktop containers rather than natively.

It also records the part that turned out to matter more than the setup itself:
**`wavekat-ci` is an org-wide label, and seven repos ride on it.** Changing what
that label points at is not a wavekat.com decision.

## 1. Why containers and not a native macOS runner

The first instinct — install the runner natively with `svc.sh` and launchd — is
wrong here, for a reason that only shows up when you read the other repos'
workflows. `wavekat-voice/.github/workflows/ci.yml` does this, three times:

```yaml
run: sudo apt-get update && sudo apt-get install -y --no-install-recommends libasound2-dev cmake
```

A native macOS runner has no `apt-get`. Every `wavekat-ci` job in the org's most
important repo would have failed the moment it landed on the Mac — not subtly,
immediately. The same jobs also assume GNU userland throughout, and macOS ships
BSD (`grep -oP`, `sed -i`, `readlink -f`, `date -d`, `sha256sum`, `xargs -r`,
and bash 3.2 all differ).

So the choice isn't "Docker vs raw shell on macOS". It's:

> Should the Mac mini be an **ARM Linux** CI host, or a **macOS** CI host?

macOS cannot run macOS containers — Docker Desktop runs Linux containers in a
VM — so containers mean the Mac contributes *Linux/arm64* capacity. That is what
we want: nothing in the pool's workload needs macOS, and a uniform Ubuntu 24.04
userland everywhere means a `run:` block can never work on one host and fail on
the other.

The runner image (`scripts/docker/`) was already arch-portable —
`dpkg --print-architecture` selects the runner tarball, and the `gh` apt line is
arch-templated — so it builds natively on Apple Silicon with **no changes and no
Rosetta**.

## 2. Setting up the Mac mini

Requires Docker Desktop installed and running.

```sh
brew install gh && gh auth login       # an account with wavekat org admin

git clone git@github.com-wavekat:wavekat/wavekat.com.git
cd wavekat.com
./scripts/setup-gha-runners-macos.sh
```

Tear down with `./scripts/uninstall-gha-runners-macos.sh`. Both take the same
env vars as the Linux scripts (`RUNNER_ORG`, `RUNNER_COUNT`, `RUNNER_PREFIX`,
`RUNNER_LABELS`, `RUNNER_IMAGE`, `RUNNER_TOKEN`).

Differences from `setup-gha-runners-docker.sh` (the Linux container script):

- **Supervision is Docker's own `--restart unless-stopped`**, not systemd.
  Docker Desktop restarts containers with a restart policy when it starts, so
  there is no launchd plist to write.
- **Two manual settings, or the runners die at the next reboot:**
  Docker Desktop → Settings → General → *Start Docker Desktop when you sign in*,
  and System Settings → Users & Groups → *Automatic login*. Docker Desktop is a
  GUI app; without a login session there is no daemon and no runners.
- **The script checks VM memory against `RUNNER_COUNT`** and warns under ~2 GB
  per runner. Docker Desktop's default allocation is thin for four parallel
  Rust/Astro builds, and the failure mode is an OOM-killed build rather than a
  clear error. Raise it in Settings → Resources, or lower `RUNNER_COUNT`.
- **Keep `_work` on the named volume** (the script does). A host bind mount
  would put every `npm ci` and `cargo build` through virtiofs — this is the
  usual reason people conclude Docker on Mac is slow.

Docker Desktop's disk image is also a fixed size. Four runners with warm cargo
targets, pnpm stores and Playwright browsers will grow into it; if builds start
failing on "no space left on device", raise the disk limit in Settings →
Resources before blaming anything else.

## 3. Who else uses `wavekat-ci` — check before you flip the label

The label is org-wide. As of this change, **7 of the org's 27 repos** run jobs
on it:

| Repo | Workflows on `wavekat-ci` | What those jobs do | Arch-sensitive? |
|------|---------------------------|--------------------|-----------------|
| `wavekat.com` | 4 (6 jobs) | Astro build, link/meta checks, CF Pages deploy | No |
| `wavekat-voice` | 6 of 7 | Rust check/clippy/test, `make sidecar` (sherpa-onnx via CMake), pnpm + Playwright | **Yes** |
| `wavekat-platform` | 3 | ci, release, db-migrate | Unverified |
| `wavekat-asr` | 2 of 2 | `cargo test --features sherpa-onnx` | **Yes** |
| `wavekat-cli` | 3 | release-plz tail + publish (the cross-target build matrix uses GitHub-hosted runners) | No |
| `wavekat-lab` | 6 of 7 | ci, Common Voice sync/deploy, ONNX publish | Some |
| `wavekat-platform-client` | 2 | ci, release-plz | No |

Not on the label (they use GitHub-hosted runners): `wavekat-core`,
`wavekat-vad`, `wavekat-turn`, `wavekat-tts`, `wavekat-flow`, `wavekat-brand`.

One reassurance from that audit: **no shipped artifact is built on `wavekat-ci`.**
`wavekat-voice/release.yml` builds installers on `macos-latest`,
`ubuntu-latest`, `windows-latest` and `windows-11-arm`; its only `wavekat-ci`
job is `trigger-site-rebuild`, which is a `curl -X POST`. Likewise
`wavekat-cli/release.yml` cross-builds its targets on GitHub-hosted runners. So
an arm64 runner joining the pool cannot cause a wrong-architecture binary to
reach users — the blast radius is CI going red, not a bad release.

### The real risk: ONNX on aarch64

`wavekat-asr` runs `cargo test --workspace --features sherpa-onnx`, and
`wavekat-voice`'s `sidecar` job builds the same stack via CMake.
`wavekat-voice/release.yml` describes the daemon as linking "a prebuilt
sherpa-onnx static lib" — and prebuilt native libs are exactly the thing that is
often published for `x86_64-unknown-linux-gnu` and not for
`aarch64-unknown-linux-gnu`.

**Verify this before putting `wavekat-ci` on the Mac containers**, because a
failure here is silent-until-merge: PRs in two repos start failing about half
the time, on whichever runs happen to land on arm64.

`wavekat-lab/cv-runner-provision.yml` also hardcodes
`actions-runner-linux-x64-…` in a provisioning script. That one is provisioning
a *different* machine, so it is probably fine — but it is the same class of
assumption and worth a read.

### Recommended rollout

Register the Mac with a distinct label first and opt repos in one at a time:

```sh
RUNNER_LABELS=wavekat-ci-arm64,mac-mini ./scripts/setup-gha-runners-macos.sh
```

Point one low-risk repo at it (`wavekat.com` is the obvious candidate — pure
Node, no native deps), let it run for a few days, then either widen the label to
`wavekat-ci` or keep the split permanently and pin the ONNX repos to x86-64 with
the runner's automatic `X64` label:

```yaml
runs-on: [self-hosted, wavekat-ci, X64]
```

Both hosts carry automatic labels you can pin against:

| Host | Automatic labels | Labels we add |
|------|------------------|---------------|
| Linux workstation | `self-hosted`, `Linux`, `X64` | `wavekat-ci`, `<hostname>` |
| Mac mini (containers) | `self-hosted`, `Linux`, `ARM64` | `wavekat-ci`, `<hostname>` |

Note the Mac's containers report `Linux`, not `macOS` — the runner sees the
container, not the host.

## 4. What still has to stay portable

Userland is now uniform (Ubuntu 24.04 everywhere), so the BSD-vs-GNU trap list
no longer gates CI. Two things do:

- **Architecture.** Anything that downloads a prebuilt binary, pins a target
  triple, or compiles native code must resolve arch at runtime rather than
  assuming x86-64. `uname -m` / `dpkg --print-architecture`, not a hardcoded
  `x64` in a URL.
- **Lockfile optional deps.** `npm ci` needs both `linux-x64` and `linux-arm64`
  optional packages present. This repo's `package-lock.json` has both for every
  native dep (esbuild, rolldown, oxide, resvg, sharp, workerd, and
  `@astrojs/compiler-binding-linux-{x64,arm64}-gnu`). Regenerating the lockfile
  with `--no-optional`, or on a platform-filtered install, silently drops them
  and breaks one host while the other stays green.

The `sed` in `preview.yml` (replacing a `grep -oP`) is kept: it is correct on
GNU too, and it no longer fails the step under `set -e` when no alias URL is
found. The BSD notes only become load-bearing again if someone adds a *native*
macOS runner later.

## 5. Operating it

```sh
docker ps --filter name=gha-runner        # what's up
docker logs -f gha-runner-1               # live logs
docker exec -it gha-runner-1 bash         # shell inside a runner
open https://github.com/organizations/wavekat/settings/actions/runners
```

Self-hosted runners do **not** get a clean machine per job. The named volume
persists between runs: `actions/checkout` cleans the repo, but the cargo target
dir, pnpm store, npm cache and Playwright browsers do not — deliberately, since
that warmth is why these runners are fast. The sharp edge is that a job failing
on one host and not the other is usually stale state, not code. The reset is
`docker rm -f gha-runner-N && docker volume rm gha-runner-N`, then re-run the
setup script.

### `Name or service not known` on `Set up job` is a DNS blip, not a broken runner

A job can die before its first step with

```
Failed to download action 'https://codeload.github.com/…'.
Error: Name or service not known (codeload.github.com:443)
```

That is Docker's embedded resolver (`127.0.0.11`) briefly failing to reach its
upstream inside the Docker Desktop VM — a container-level DNS hiccup, not a
network outage and not a container that needs rebuilding. Two things make it
easy to misread:

- **It looks fatal.** The runner's own three attempts (~22 s apart) all fall
  inside the same blip, so the job fails hard at `Set up job` with nothing of
  the workflow having run.
- **It looks host-specific.** It hits one container while its siblings on the
  same Mac mini pass minutes either side, so the tempting conclusion is that
  that runner is broken. It isn't: re-running the job on the *same* container
  succeeds.

**Re-run the failed job first** (`gh run rerun <id> --failed`) and only start
tearing containers down if it fails again on a second host. Nothing in a
workflow can retry this step — downloading the action happens before any step
the workflow controls, and the retry policy is the runner's own.

The one that actually matters is `Release`: release-please never runs, so the
release PR silently stops tracking `main` at the last green push. Its "last
updated" timestamp is the tell.
