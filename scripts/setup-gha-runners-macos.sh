#!/usr/bin/env bash
#
# Install N self-hosted GitHub Actions runners on a macOS host (Apple
# Silicon or Intel) as Docker Desktop containers, and register them with
# the `wavekat` org.
#
# This is the macOS twin of setup-gha-runners-docker.sh. It reuses the
# SAME image (scripts/docker), which is already arch-portable, and
# registers with the SAME `wavekat-ci` label — so the Mac joins the
# existing pool and `runs-on: [self-hosted, wavekat-ci]` jobs land on
# whichever host is idle. No workflow changes needed.
#
# Note what this means: macOS cannot run macOS containers, so Docker
# Desktop runs these on Linux/arm64 inside its VM. The Mac contributes
# *Linux* CI capacity. That is the point — nothing this repo builds
# needs macOS, and a uniform Ubuntu userland everywhere means a `run:`
# block can never work on one host and fail on the other.
#
# Supervision is Docker's own `--restart unless-stopped`, not launchd:
# Docker Desktop restarts the containers when it starts, so as long as
# Docker Desktop launches at login the runners come back after a reboot.
#
# Usage (run on the Mac, with Docker Desktop running):
#
#   # Easiest: let the script fetch a registration token via gh CLI.
#   #   (`brew install gh && gh auth login` as a wavekat org admin)
#   ./setup-gha-runners-macos.sh
#
#   # Or pass a token explicitly (valid 1h, can register multiple runners):
#   RUNNER_TOKEN=AAAA... ./setup-gha-runners-macos.sh
#
#   # Override defaults:
#   RUNNER_COUNT=2 RUNNER_PREFIX=mac-mini RUNNER_LABELS=wavekat-ci,mac-mini \
#     ./setup-gha-runners-macos.sh
#
# Re-running is safe: existing containers are torn down, their volumes
# wiped, and the runners re-registered with a fresh token.

set -euo pipefail

ORG="${RUNNER_ORG:-wavekat}"
COUNT="${RUNNER_COUNT:-4}"
PREFIX="${RUNNER_PREFIX:-$(hostname -s)}"
RUNNER_LABELS="${RUNNER_LABELS:-wavekat-ci,${PREFIX}}"
IMAGE="${RUNNER_IMAGE:-wavekat/gha-runner:latest}"
RUNNER_VERSION="${RUNNER_VERSION:-}" # empty = the Dockerfile's default
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOCKER_CONTEXT="${SCRIPT_DIR}/docker"

log()  { printf '\033[1;36m==>\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m!!\033[0m %s\n' "$*" >&2; }
die()  { printf '\033[1;31mxx\033[0m %s\n' "$*" >&2; exit 1; }

[[ "$(uname -s)" == "Darwin" ]] || die "this script targets macOS (got $(uname -s)) — use setup-gha-runners-docker.sh on Linux"
[[ -d "${DOCKER_CONTEXT}" ]] || die "missing docker context at ${DOCKER_CONTEXT}"

# 1. Find the Docker CLI. Docker Desktop symlinks into /usr/local/bin,
#    but a non-login shell may not have its own bin dir on PATH.
DOCKER=""
for candidate in docker /usr/local/bin/docker "${HOME}/.docker/bin/docker" /opt/homebrew/bin/docker; do
  if command -v "${candidate}" >/dev/null 2>&1; then DOCKER="${candidate}"; break; fi
done
[[ -n "${DOCKER}" ]] || die "docker CLI not found — install Docker Desktop from https://docker.com/products/docker-desktop"

if ! "${DOCKER}" info >/dev/null 2>&1; then
  die "Docker Desktop is not running (or the daemon is unreachable). Launch Docker Desktop and re-run."
fi

# 2. Sanity-check the VM's memory against the runner count. Docker
#    Desktop's default (often 8 GB) is thin for four parallel Astro
#    builds; the failure mode is an OOM-killed build, not a clear error.
MEM_BYTES="$("${DOCKER}" info --format '{{.MemTotal}}' 2>/dev/null || echo 0)"
if [[ "${MEM_BYTES}" -gt 0 ]]; then
  MEM_GB=$(( MEM_BYTES / 1024 / 1024 / 1024 ))
  log "Docker Desktop VM memory: ${MEM_GB} GB for ${COUNT} runner(s)"
  if [[ $(( MEM_GB / COUNT )) -lt 2 ]]; then
    warn "under ~2 GB per runner — builds may be OOM-killed."
    warn "Raise it in Docker Desktop → Settings → Resources → Memory,"
    warn "or lower RUNNER_COUNT (RUNNER_COUNT=2 ./setup-gha-runners-macos.sh)."
  fi
fi

# 3. Build the runner image. The Dockerfile resolves the runner tarball
#    per-arch (dpkg --print-architecture), so this builds natively on
#    Apple Silicon with no changes and no Rosetta.
log "building runner image ${IMAGE} (native $(uname -m))"
if [[ -n "${RUNNER_VERSION}" ]]; then
  "${DOCKER}" build --build-arg "RUNNER_VERSION=${RUNNER_VERSION}" -t "${IMAGE}" "${DOCKER_CONTEXT}"
else
  "${DOCKER}" build -t "${IMAGE}" "${DOCKER_CONTEXT}"
fi

# 4. Fetch a registration token (one token can register multiple runners
#    within its 1h validity window).
get_token() {
  if [[ -n "${RUNNER_TOKEN:-}" ]]; then
    printf '%s' "${RUNNER_TOKEN}"
    return
  fi
  if ! command -v gh >/dev/null 2>&1; then
    cat >&2 <<'EOF'

No RUNNER_TOKEN set, and `gh` CLI is not installed.

Install gh with Homebrew and re-run, or fetch a token elsewhere:

  brew install gh
  gh auth login        # use an account with wavekat org admin

  # or, from any machine with gh authed as a wavekat admin:
  gh api -X POST /orgs/wavekat/actions/runners/registration-token --jq .token
  RUNNER_TOKEN=<token> ./setup-gha-runners-macos.sh
EOF
    exit 1
  fi
  gh api -X POST "/orgs/${ORG}/actions/runners/registration-token" --jq .token \
    || die "failed to fetch registration token (is gh authed as a wavekat admin?)"
}

TOKEN="$(get_token)"
[[ -n "${TOKEN}" ]] || die "got empty registration token"

# 5. (Re)create N runners. One container each, with its own named volume
#    so registration survives restarts and Docker Desktop upgrades.
#
#    `--restart unless-stopped` is the whole supervision story on macOS:
#    there is no systemd, and Docker Desktop restores containers with a
#    restart policy when it starts. No launchd plist needed.
for i in $(seq 1 "${COUNT}"); do
  NAME="${PREFIX}-${i}"
  CONTAINER="gha-runner-${i}"
  log "configuring runner ${NAME} (container ${CONTAINER})"

  # Tear down any previous instance and wipe its volume, so the fresh
  # registration token is applied cleanly instead of the entrypoint
  # short-circuiting on a stale .runner file.
  "${DOCKER}" rm -f "${CONTAINER}" >/dev/null 2>&1 || true
  "${DOCKER}" volume rm "${CONTAINER}" >/dev/null 2>&1 || true

  "${DOCKER}" run -d \
    --name "${CONTAINER}" \
    --hostname "${CONTAINER}" \
    --restart unless-stopped \
    -v "${CONTAINER}:/home/runner/runner" \
    -e "RUNNER_ORG=${ORG}" \
    -e "RUNNER_NAME=${NAME}" \
    -e "RUNNER_LABELS=${RUNNER_LABELS}" \
    -e "RUNNER_TOKEN=${TOKEN}" \
    "${IMAGE}" >/dev/null
done

log "done — ${COUNT} runner(s) registered to ${ORG} with labels: ${RUNNER_LABELS}"
echo
warn "One manual step, or the runners will not survive a reboot:"
warn "  Docker Desktop → Settings → General → 'Start Docker Desktop when you sign in'"
warn "  System Settings → Users & Groups → Automatic login → the runner user"
echo
log "check status:     ${DOCKER} ps --filter name=gha-runner"
log "live logs:        ${DOCKER} logs -f gha-runner-1"
log "container shell:  ${DOCKER} exec -it gha-runner-1 bash"
log "org view:         https://github.com/organizations/${ORG}/settings/actions/runners"
