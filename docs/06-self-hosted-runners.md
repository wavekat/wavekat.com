# 06 — Self-hosted runners: adding the Mac mini

Every workflow in this repo runs on `runs-on: [self-hosted, wavekat-ci]`. Until
now that label existed on exactly one machine — a Linux x86-64 box set up by
`scripts/setup-gha-runners.sh`. This doc adds a Mac mini (Apple Silicon,
arm64) to the same pool, and records the one rule that keeps a mixed-OS pool
from breaking CI at random.

## 1. How the pool actually works

`runs-on` is a **label set**, not a machine. A job runs on any idle runner that
carries *all* the listed labels. So the whole of "how do we run on the Mac too"
is: register the Mac with the `wavekat-ci` label. Nothing in
`.github/workflows/` changes.

Each runner also gets automatic labels it never asked for, which is how you
pin work to one host when you need to:

| Host | Automatic labels | Labels we add |
|------|------------------|---------------|
| Linux workstation | `self-hosted`, `Linux`, `X64` | `wavekat-ci`, `<hostname>` |
| Mac mini | `self-hosted`, `macOS`, `ARM64` | `wavekat-ci`, `<hostname>` |

Both scripts default `RUNNER_LABELS` to `wavekat-ci,<hostname>`, so after setup
you can force a job onto one machine with `runs-on: [self-hosted, wavekat-ci, macOS]`
without disturbing anything else.

Jobs are **not** load-balanced by cost or speed. GitHub hands a queued job to
the first idle matching runner, so with both hosts registered a given PR's CI
may land on Linux one run and macOS the next. That is the point — and it is
also why section 3 matters.

## 2. Setting up the Mac mini

`scripts/setup-gha-runners-macos.sh` is the macOS twin of the Linux script and
takes the same environment variables (`RUNNER_ORG`, `RUNNER_COUNT`,
`RUNNER_PREFIX`, `RUNNER_BASE_DIR`, `RUNNER_LABELS`, `RUNNER_VERSION`,
`RUNNER_TOKEN`). On the Mac:

```sh
xcode-select --install                 # git — actions/checkout shells out to it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install gh && gh auth login       # an account with wavekat org admin

git clone git@github.com-wavekat:wavekat/wavekat.com.git
cd wavekat.com
RUNNER_KEEP_AWAKE=1 ./scripts/setup-gha-runners-macos.sh
```

Tear down with `./scripts/uninstall-gha-runners-macos.sh` (same variables).

What the script does differently from the Linux one, and why:

- **`actions-runner-osx-arm64`**, resolved to the latest release. There is a
  native Apple Silicon build; do not run the x64 one under Rosetta.
- **launchd, not systemd.** `svc.sh install` on macOS writes a *LaunchAgent*
  to `~/Library/LaunchAgents/` and runs as your user — no `sudo`, and runners
  therefore live under `$HOME/actions-runners` instead of `/opt`.
- **A `.path` file per runner.** launchd does not source `~/.zprofile`, so
  `/opt/homebrew/bin` is invisible to the runner process unless we write it
  into the runner's `.path`. (`actions/setup-node` prepends its own Node ahead
  of this, so this is about `git`, `gh`, `jq` and anything a job shells out to.)
- **Quarantine clearing.** A curl-fetched tarball carries no
  `com.apple.quarantine`, but a browser-downloaded one does and Gatekeeper
  then kills the runner binaries. The `xattr -dr` is a no-op in the normal path.

### The headless-Mac gotcha

A LaunchAgent needs a GUI login session. On a Mac mini with no one logged in,
`launchctl` will refuse to load the agent and the runner shows offline after
every reboot. Two settings fix it permanently:

1. **System Settings → Users & Groups → Automatic login** → the runner user.
   Without this, runners do not come back after a power cut or an OS update.
2. **No sleep.** `RUNNER_KEEP_AWAKE=1` runs
   `systemsetup -setcomputersleep Never` and `pmset -a disksleep 0 womp 1` for
   you. A sleeping Mac does not pick up queued jobs; the job just sits there
   until the Linux box frees up, which hides the problem instead of failing.

Run the setup script the first time from a Screen Sharing session, not a bare
SSH session. If it prints the "could not start via launchctl" warning, that is
what happened — log in and run `./svc.sh start` in the runner dir.

### How many runners

`RUNNER_COUNT` defaults to 4, matching the Linux host. A full `npm run cf:build`
of this site is a real Astro/Rolldown build; four in parallel on a 16 GB Mac
mini is the practical ceiling. Drop to `RUNNER_COUNT=2` if builds start
swapping.

## 3. The rule: every `run:` block must be portable

This is the part that bites. A mixed pool means **any** job can land on either
OS, so a shell script that only works on GNU userland fails roughly half the
time, non-deterministically, on PRs that changed nothing.

macOS ships BSD userland, not GNU. The traps that apply to this repo:

| Don't | Do | Why |
|-------|----|-----|
| `grep -oP '(?<=x)y'` | `sed -nE 's/.*x(y).*/\1/p'` | BSD grep has no `-P` (PCRE) |
| `sed -i 's/a/b/' f` | `sed -i.bak` then `rm f.bak` | BSD `sed -i` requires a suffix arg |
| `readlink -f p` | `cd "$(dirname p)" && pwd -P` | BSD `readlink` has no `-f` |
| `date -d '1 day ago'` | `date -u +%s` and do maths | BSD `date` uses `-v-1d` |
| `sha256sum f` | `shasum -a 256 f` | `sha256sum` is GNU coreutils |
| `xargs -r` | guard with `[ -s file ]` | BSD `xargs` has no `-r` |
| bash 4+ syntax (`${v,,}`, `declare -A`, `mapfile`) | bash 3.2 equivalents | macOS `/bin/bash` is 3.2 |

Fixing `grep -oP` in `preview.yml` was the only change this migration needed —
it extracted the Cloudflare preview URL from `wrangler` output and would have
failed every time the deploy job landed on the Mac.

Two more constraints worth knowing before you add a step:

- **Docker-based actions cannot run on macOS runners.** Every action we use
  today (`actions/checkout`, `actions/setup-node`, `googleapis/release-please-action`,
  `marocchino/sticky-pull-request-comment`) is a JavaScript action, so we are
  fine — but a container action added later would fail only on the Mac.
- **`npm ci` needs the darwin-arm64 optional deps in the lockfile.** They are
  there (`@esbuild/darwin-arm64`, `@rolldown/binding-darwin-arm64`,
  `@tailwindcss/oxide-darwin-arm64`, `@resvg/resvg-js-darwin-arm64`,
  `@img/sharp-darwin-arm64`, `@cloudflare/workerd-darwin-arm64`,
  `@astrojs/compiler-binding-darwin-arm64`). If a dependency bump is ever made
  with `--no-optional` or on a platform-filtered install, the lockfile loses
  those entries and the Mac builds break while Linux stays green.

## 4. Operating it

```sh
# status of one runner
cd ~/actions-runners/<prefix>-1 && ./svc.sh status

# live logs
tail -f ~/actions-runners/<prefix>-1/_diag/Runner_*.log

# what the org thinks is online
open https://github.com/organizations/wavekat/settings/actions/runners
```

Self-hosted runners do **not** get a clean machine per job. `_work` persists
between runs; `actions/checkout` cleans the repo but the npm cache, the
`actions/setup-node` tool cache, and anything a job wrote outside the workspace
do not. That is a feature (fast builds) with one sharp edge: a job that fails
only on one host is usually stale state, not the code. `rm -rf _work` in the
runner dir, with the runner stopped, is the reset.
