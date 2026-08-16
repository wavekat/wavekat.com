#!/usr/bin/env bash
#
# Install N self-hosted GitHub Actions runners on a single macOS host
# (Apple Silicon or Intel) and register them with the `wavekat` org.
#
# This is the macOS twin of setup-gha-runners.sh. It registers with the
# SAME `wavekat-ci` label, so a Mac mini joins the existing pool and
# `runs-on: [self-hosted, wavekat-ci]` jobs land on whichever host is
# free — no workflow changes needed.
#
# Differences from the Linux script, all forced by the platform:
#   * runner package is actions-runner-osx-{arm64,x64}
#   * the service is a launchd LaunchAgent (svc.sh, no sudo), not systemd
#   * runners live under $HOME by default, since a LaunchAgent runs as you
#   * a `.path` file is written so Homebrew binaries are visible to the
#     runner (launchd does not source your shell profile)
#
# Usage (run on the Mac, in a logged-in session — see NOTE below):
#
#   # Easiest: let the script fetch a registration token via gh CLI.
#   #   (`gh auth login` once with an account that has wavekat org admin)
#   ./setup-gha-runners-macos.sh
#
#   # Or pass a token explicitly (valid 1h, can register multiple runners):
#   RUNNER_TOKEN=AAAA... ./setup-gha-runners-macos.sh
#
#   # Override defaults:
#   RUNNER_COUNT=6 RUNNER_PREFIX=mac-mini RUNNER_LABELS=wavekat-ci,macos \
#     ./setup-gha-runners-macos.sh
#
#   # Also stop the Mac from sleeping (recommended for a dedicated host):
#   RUNNER_KEEP_AWAKE=1 ./setup-gha-runners-macos.sh
#
# NOTE: a LaunchAgent needs a GUI login session. On a headless Mac mini,
# enable automatic login (System Settings -> Users & Groups -> Automatic
# login) so the agents come back after a reboot, and run this script from
# a Screen Sharing session the first time. Over a bare SSH session
# `launchctl` can refuse to load the agent; the script tells you if that
# happens.
#
# Re-running is safe: existing runners with the same name are stopped,
# de-registered and re-registered.

set -euo pipefail

ORG="${RUNNER_ORG:-wavekat}"
COUNT="${RUNNER_COUNT:-4}"
PREFIX="${RUNNER_PREFIX:-$(hostname -s)}"
BASE_DIR="${RUNNER_BASE_DIR:-${HOME}/actions-runners}"
EXTRA_LABELS="${RUNNER_LABELS:-wavekat-ci,${PREFIX}}"
RUNNER_VERSION="${RUNNER_VERSION:-}" # empty = latest
KEEP_AWAKE="${RUNNER_KEEP_AWAKE:-0}"

log()  { printf '\033[1;36m==>\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m!!\033[0m %s\n' "$*" >&2; }
die()  { printf '\033[1;31mxx\033[0m %s\n' "$*" >&2; exit 1; }

[[ "$(uname -s)" == "Darwin" ]] || die "this script targets macOS (got $(uname -s)) — use setup-gha-runners.sh on Linux"

case "$(uname -m)" in
  arm64)  ARCH=arm64 ;;
  x86_64) ARCH=x64 ;;
  *) die "unsupported arch $(uname -m)" ;;
esac

# `git` on a fresh Mac is a stub that prompts for the Command Line Tools.
# actions/checkout shells out to it, so fail loudly here rather than in CI.
if ! /usr/bin/git --version >/dev/null 2>&1; then
  die "git is not usable — run: xcode-select --install"
fi

if [[ -z "${RUNNER_VERSION}" ]]; then
  log "resolving latest runner version from github.com/actions/runner"
  RUNNER_VERSION="$(curl -fsSL https://api.github.com/repos/actions/runner/releases/latest \
    | grep -oE '"tag_name": *"v[^"]+"' \
    | head -n1 \
    | sed -E 's/.*"v([^"]+)".*/\1/')"
  [[ -n "${RUNNER_VERSION}" ]] || die "could not resolve latest runner version"
fi
log "runner version: ${RUNNER_VERSION}  arch: osx-${ARCH}"

missing_gh_help() {
  cat >&2 <<'EOF'

No RUNNER_TOKEN set, and `gh` CLI is not installed.

Pick one:

  A) Install gh with Homebrew, then re-run:

     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     brew install gh
     gh auth login        # use an account with wavekat org admin

  B) Fetch a registration token elsewhere and export it (valid 1h, can
     register multiple runners during that window):

     # on any machine with gh authed as a wavekat admin:
     gh api -X POST /orgs/wavekat/actions/runners/registration-token --jq .token

     # then on this host:
     RUNNER_TOKEN=<token> ./setup-gha-runners-macos.sh
EOF
}

get_token() {
  if [[ -n "${RUNNER_TOKEN:-}" ]]; then
    printf '%s' "${RUNNER_TOKEN}"
    return
  fi
  if ! command -v gh >/dev/null 2>&1; then
    missing_gh_help
    exit 1
  fi
  gh api -X POST "/orgs/${ORG}/actions/runners/registration-token" --jq .token \
    || die "failed to fetch registration token (is gh authed as a wavekat admin?)"
}

mkdir -p "${BASE_DIR}/.cache"

TARBALL="actions-runner-osx-${ARCH}-${RUNNER_VERSION}.tar.gz"
TARBALL_URL="https://github.com/actions/runner/releases/download/v${RUNNER_VERSION}/${TARBALL}"
CACHE_TARBALL="${BASE_DIR}/.cache/${TARBALL}"

if [[ ! -f "${CACHE_TARBALL}" ]]; then
  log "downloading ${TARBALL}"
  curl -fsSL -o "${CACHE_TARBALL}" "${TARBALL_URL}"
fi

# launchd starts the runner with a minimal PATH — it does not source
# ~/.zprofile, so Homebrew (and anything installed through it) is invisible
# unless we say so. actions/setup-node injects its own node ahead of this,
# so this is mostly about git/gh/jq and any tool a job shells out to.
BREW_PREFIX=""
for candidate in /opt/homebrew /usr/local; do
  if [[ -x "${candidate}/bin/brew" ]]; then BREW_PREFIX="${candidate}"; break; fi
done
RUNNER_PATH="/usr/bin:/bin:/usr/sbin:/sbin"
if [[ -n "${BREW_PREFIX}" ]]; then
  RUNNER_PATH="${BREW_PREFIX}/bin:${BREW_PREFIX}/sbin:${RUNNER_PATH}"
else
  warn "Homebrew not found — the runner's PATH will be system-only"
fi

TOKEN="$(get_token)"
[[ -n "${TOKEN}" ]] || die "got empty registration token"

for i in $(seq 1 "${COUNT}"); do
  NAME="${PREFIX}-${i}"
  DIR="${BASE_DIR}/${NAME}"
  log "configuring runner ${NAME} at ${DIR}"

  # Stop and de-register any previous install of this runner before we
  # blow the directory away, otherwise the org is left holding a ghost.
  if [[ -d "${DIR}" ]]; then
    warn "existing runner dir for ${NAME} found — removing"
    ( cd "${DIR}" && ./svc.sh stop      >/dev/null 2>&1 || true )
    ( cd "${DIR}" && ./svc.sh uninstall >/dev/null 2>&1 || true )
    ( cd "${DIR}" && ./config.sh remove --token "${TOKEN}" || true )
  fi

  rm -rf "${DIR}"
  mkdir -p "${DIR}"
  tar -xzf "${CACHE_TARBALL}" -C "${DIR}"

  # The tarball is fetched with curl, which does not set the quarantine
  # attribute — but a manually downloaded one would, and Gatekeeper then
  # kills the binaries. Clearing it is a no-op in the normal path.
  xattr -dr com.apple.quarantine "${DIR}" 2>/dev/null || true

  ( cd "${DIR}" && ./config.sh \
      --unattended \
      --replace \
      --url "https://github.com/${ORG}" \
      --token "${TOKEN}" \
      --name "${NAME}" \
      --runnergroup "Default" \
      --labels "${EXTRA_LABELS}" \
      --work "_work" )

  printf '%s\n' "${RUNNER_PATH}" > "${DIR}/.path"

  log "installing launchd service for ${NAME}"
  ( cd "${DIR}" && ./svc.sh install )
  if ! ( cd "${DIR}" && ./svc.sh start ); then
    warn "could not start ${NAME} via launchctl."
    warn "This usually means there is no GUI login session. Log in (or"
    warn "connect via Screen Sharing) and run:  cd ${DIR} && ./svc.sh start"
  fi
done

if [[ "${KEEP_AWAKE}" == "1" ]]; then
  log "disabling sleep so queued jobs are picked up"
  sudo systemsetup -setcomputersleep Never >/dev/null
  sudo pmset -a disksleep 0 womp 1 >/dev/null
fi

log "done — ${COUNT} runner(s) registered to ${ORG} with labels: ${EXTRA_LABELS}"
log "check status:  cd ${BASE_DIR}/${PREFIX}-1 && ./svc.sh status"
log "live logs:     tail -f ${BASE_DIR}/${PREFIX}-1/_diag/Runner_*.log"
log "org view:      https://github.com/organizations/${ORG}/settings/actions/runners"
