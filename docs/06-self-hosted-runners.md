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
`dpkg --print-architecture` selects the runner tarball, the `gh` apt line is
arch-templated, and the AWS CLI installer resolves `x86_64`/`aarch64` the same
way — so it builds natively on Apple Silicon with **no changes and no
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
`RUNNER_LABELS`, `RUNNER_IMAGE`, `RUNNER_TOKEN`), plus two the Mac needs:
`RUNNER_DNS` and `RUNNER_KEEP_VOLUME` — see §6.

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

### Re-creating the runners without re-registering them

Changing a `docker run` flag means re-creating the containers, and the setup
script's normal path wipes each volume and burns a fresh registration token.
For a flag change that is unnecessary and slow — the volume holds `.runner`,
`.credentials` *and* the warm cargo/pnpm/Playwright caches that make these
runners fast.

```sh
RUNNER_KEEP_VOLUME=1 ./scripts/setup-gha-runners-macos.sh   # Mac mini
RUNNER_KEEP_VOLUME=1 ./scripts/setup-gha-runners-docker.sh  # Linux workstation
```

Both scripts take these flags. The Linux one gained them late — it used to
wipe every volume unconditionally, which is why an image change there once
meant re-registering four runners and rebuilding every cache from cold.

keeps both. It needs no token (the entrypoint only calls `config.sh` when
`.runner` is absent) and stops each container with `docker stop --time=180`, so
a runner that is mid-job finishes that job before its container goes away
rather than failing it. Check `docker exec gha-runner-N bash -c 'ps -eo comm=
| grep -i "[R]unner.Worker"'` first if you want to know what is in flight.

Add `RUNNER_SKIP_BUILD=1` unless you actually changed the image. On its own,
`RUNNER_KEEP_VOLUME=1` still rebuilds first, and that is not reliably cheap: if
the `ubuntu:24.04` base has moved since the last build, every layer misses
cache and the apt/rustup/runner-tarball steps run again — ~25 minutes on Apple
Silicon, for a change that needs no new image. With both flags the whole
operation takes seconds.

**Expect `A session for this runner already exists.` right afterwards.** The
new container connects before GitHub has released the old container's session,
so each runner logs `Runner connect error: Error: Conflict. Retrying until
reconnected.` and sits there for a few minutes. Nothing is wrong and nothing
needs restarting — the registration is intact (`.runner` still carries the
right `agentName`), and each runner reaches `Listening for Jobs` on its own
once the stale session expires. Wait for that line before concluding the
re-create worked:

```sh
for n in 1 2 3 4; do docker logs --tail 15 gha-runner-$n | grep -E \
  'Connected to GitHub|Listening for Jobs'; done
```

## 6. DNS: the containers get their own resolvers

The Mac's runner containers are started with

```
--dns 1.1.1.1 --dns 8.8.8.8 --dns-option timeout:2 --dns-option attempts:3
```

(`RUNNER_DNS` in `setup-gha-runners-macos.sh`, defaulting to those two). That
is not belt-and-braces; it removes the single point of failure that was taking
jobs down.

**What the default looks like.** Docker Desktop writes exactly one nameserver
into a container — `192.168.65.7`, its own forwarder inside the VM — which
proxies to whatever the Mac's primary interface hands it. On this host that is
Wi-Fi (`en1`), and the resolver list is an IPv6 link-local RDNSS address
followed by the router at `192.168.1.1`. So every runner on the machine
resolves through one hop that they all share, and glibc has no second
nameserver to fall over to when it answers with an error.

**How it fails.** `actions/checkout` dies with

```
fatal: unable to access 'https://github.com/wavekat/wavekat-voice/':
Could not resolve host: github.com
```

on all three of its built-in retries, and the job is over before `cargo` runs.
Four details identify it:

- **The failures are instant** — 15–25 ms per attempt. That is the forwarder
  *answering* with an error, not a timeout and not packet loss. Retrying harder
  would not have helped.
- **Sibling containers fail in the same second.** `gha-runner-2` and
  `gha-runner-3` both died at `05:30:08Z`, which rules out a per-container
  glitch and points at the shared hop.
- **The Linux workstation, on the same LAN and the same router, stayed green**
  through the window. The break is inside the Docker Desktop VM, not on the
  network.
- **It arrives in bursts.** Six failures in three weeks of `_diag` history
  (~590 jobs), all six inside one 46-minute window. Nothing in the Docker
  Desktop host log — no restart, no network event — marks it.

**Why `--dns` is the fix and not a workaround.** Pointing the containers at two
public resolvers takes Docker Desktop's forwarder out of the path completely,
and gives glibc a second server to try. Verified on the host: a container
started with `--dns 192.0.2.1` (TEST-NET) *fails* to resolve, which proves
Docker Desktop is not quietly intercepting port 53 — the flag really decides
where the query goes.

### The Linux host had the same single point of failure

`setup-gha-runners-docker.sh` used to leave `RUNNER_DNS` **empty**, on the
reasoning that containers there inherit the machine's own resolvers and so
need no help. Both halves of that were wrong, and a wavekat.com build died
proving it on 2026-09-06 — `getaddrinfo EAI_AGAIN fonts.googleapis.com`, one
second after the same job had resolved github.com, nodejs.org and
registry.npmjs.org without trouble.

A container does not inherit the host's resolvers; it gets the subset Docker
considers usable. On a systemd-resolved box that is a strict *reduction*:

| | resolvers |
|---|---|
| host `/run/systemd/resolve/resolv.conf` | `192.168.1.1`, `fe80::…%3` |
| container `/etc/resolv.conf` | `192.168.1.1` |

The IPv6 entry is link-local, and its scope id is meaningless in another
network namespace, so Docker drops it. What is left is one server with
nothing behind it — the same shape as the Mac's forwarder, reached by a
different route.

So the knob now **derives** its default: the host's own IPv4 servers first,
then `1.1.1.1` and `8.8.8.8`. Putting the host's servers first is what the
original empty default was really protecting — LAN-internal names still
resolve through the router exactly as before, and the public servers are only
consulted when the router fails to answer. `RUNNER_DNS="…"` overrides the
list; `RUNNER_DNS=""` opts out entirely and restores Docker's own behaviour.

Note this does not change Tailscale MagicDNS: `100.100.100.100` was never in
the container's resolver list, so `*.ts.net` did not resolve from a runner
before this change and still does not.

### `Name or service not known` on `Set up job` is a DNS blip, not a broken runner

A job can die before its first step with

```
Failed to download action 'https://codeload.github.com/…'.
Error: Name or service not known (codeload.github.com:443)
```

That is the same shared DNS hop as above, hit before the workflow's first step
rather than during `actions/checkout` — not a network outage and not a
container that needs rebuilding. Pinned resolvers should have closed this off
too; if it recurs *after* the containers were re-created with `--dns`, the
cause is upstream of the Mac and this section's advice still applies. Two
things make it easy to misread:

- **It looks fatal.** The runner's own three attempts (~22 s apart) all fall
  inside the same blip, so the job fails hard at `Set up job` with nothing of
  the workflow having run.
- **It looks host-specific.** It hits one container while its siblings on the
  same Mac mini pass minutes either side, so the tempting conclusion is that
  that runner is broken. It isn't: re-running the job on the *same* container
  succeeds. (Check the sibling containers' `_diag` timestamps before believing
  it: the `checkout` variant of this looked per-container too, and turned out
  to hit two of them in the same second.)

**Re-run the failed job first** (`gh run rerun <id> --failed`) and only start
tearing containers down if it fails again on a second host. Nothing in a
workflow can retry this step — downloading the action happens before any step
the workflow controls, and the retry policy is the runner's own.

The one that actually matters is `Release`: release-please never runs, so the
release PR silently stops tracking `main` at the last green push. Its "last
updated" timestamp is the tell.
