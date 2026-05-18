#!/usr/bin/env bash
#
# Install N self-hosted GitHub Actions runners on a single Linux host
# and register them with the `wavekat` org.
#
# Designed for the `aoc-m3l` workstation but works on any Linux x64/arm64.
# Each runner lives in its own directory and runs as its own systemd service,
# so they execute jobs in parallel.
#
# Usage (run on the target machine, as a user with sudo):
#
#   # Easiest: let the script fetch a registration token via gh CLI.
#   #   (`gh auth login` once with an account that has wavekat org admin)
#   ./setup-gha-runners.sh
#
#   # Or pass a token explicitly (valid 1h, can register multiple runners):
#   RUNNER_TOKEN=AAAA... ./setup-gha-runners.sh
#
#   # Override defaults:
#   RUNNER_COUNT=6 RUNNER_PREFIX=aoc-m3l RUNNER_LABELS=aoc-m3l,gpu \
#     ./setup-gha-runners.sh
#
# Re-running is safe: existing runners with the same name are removed and
# re-registered.

set -euo pipefail

ORG="${RUNNER_ORG:-wavekat}"
COUNT="${RUNNER_COUNT:-4}"
PREFIX="${RUNNER_PREFIX:-$(hostname -s)}"
BASE_DIR="${RUNNER_BASE_DIR:-/opt/actions-runners}"
RUNNER_USER="${RUNNER_USER:-$(id -un)}"
EXTRA_LABELS="${RUNNER_LABELS:-${PREFIX}}"
RUNNER_VERSION="${RUNNER_VERSION:-}" # empty = latest

log()  { printf '\033[1;36m==>\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m!!\033[0m %s\n' "$*" >&2; }
die()  { printf '\033[1;31mxx\033[0m %s\n' "$*" >&2; exit 1; }

[[ "$(uname -s)" == "Linux" ]] || die "this script targets Linux (got $(uname -s))"

case "$(uname -m)" in
  x86_64)  ARCH=x64 ;;
  aarch64|arm64) ARCH=arm64 ;;
  *) die "unsupported arch $(uname -m)" ;;
esac

if [[ -z "${RUNNER_VERSION}" ]]; then
  log "resolving latest runner version from github.com/actions/runner"
  RUNNER_VERSION="$(curl -fsSL https://api.github.com/repos/actions/runner/releases/latest \
    | grep -oE '"tag_name": *"v[^"]+"' \
    | head -n1 \
    | sed -E 's/.*"v([^"]+)".*/\1/')"
  [[ -n "${RUNNER_VERSION}" ]] || die "could not resolve latest runner version"
fi
log "runner version: ${RUNNER_VERSION}  arch: ${ARCH}"

missing_gh_help() {
  cat >&2 <<'EOF'

No RUNNER_TOKEN set, and `gh` CLI is not installed.

Pick one:

  A) Install gh on Ubuntu 24.04 (official apt repo), then re-run:

     sudo apt-get update
     sudo apt-get install -y curl ca-certificates
     curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
       | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
     sudo chmod a+r /usr/share/keyrings/githubcli-archive-keyring.gpg
     echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
       | sudo tee /etc/apt/sources.list.d/github-cli.list >/dev/null
     sudo apt-get update
     sudo apt-get install -y gh
     gh auth login        # use an account with wavekat org admin

  B) Fetch a registration token elsewhere and export it (valid 1h, can
     register multiple runners during that window):

     # on any machine with gh authed as a wavekat admin:
     gh api -X POST /orgs/wavekat/actions/runners/registration-token --jq .token

     # then on this host:
     RUNNER_TOKEN=<token> ./setup-gha-runners.sh
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

# Install OS packages the runner needs.
log "installing prerequisites"
sudo apt-get update -y
sudo apt-get install -y --no-install-recommends \
  curl ca-certificates tar jq libicu-dev git

# Create a shared cache dir for the tarball.
sudo mkdir -p "${BASE_DIR}"
sudo chown "${RUNNER_USER}:${RUNNER_USER}" "${BASE_DIR}"

TARBALL="actions-runner-linux-${ARCH}-${RUNNER_VERSION}.tar.gz"
TARBALL_URL="https://github.com/actions/runner/releases/download/v${RUNNER_VERSION}/${TARBALL}"
CACHE_TARBALL="${BASE_DIR}/.cache/${TARBALL}"

if [[ ! -f "${CACHE_TARBALL}" ]]; then
  log "downloading ${TARBALL}"
  mkdir -p "${BASE_DIR}/.cache"
  curl -fsSL -o "${CACHE_TARBALL}" "${TARBALL_URL}"
fi

TOKEN="$(get_token)"
[[ -n "${TOKEN}" ]] || die "got empty registration token"

for i in $(seq 1 "${COUNT}"); do
  NAME="${PREFIX}-${i}"
  DIR="${BASE_DIR}/${NAME}"
  log "configuring runner ${NAME} at ${DIR}"

  # If a service already exists for this name, uninstall it first so we can
  # cleanly re-register.
  if systemctl list-unit-files | grep -q "actions.runner.${ORG}.${NAME}.service"; then
    warn "existing service for ${NAME} found — removing"
    if [[ -d "${DIR}" ]]; then
      ( cd "${DIR}" && sudo ./svc.sh stop  || true )
      ( cd "${DIR}" && sudo ./svc.sh uninstall || true )
      ( cd "${DIR}" && ./config.sh remove --token "${TOKEN}" || true )
    fi
  fi

  rm -rf "${DIR}"
  mkdir -p "${DIR}"
  tar -xzf "${CACHE_TARBALL}" -C "${DIR}"

  ( cd "${DIR}" && ./config.sh \
      --unattended \
      --replace \
      --url "https://github.com/${ORG}" \
      --token "${TOKEN}" \
      --name "${NAME}" \
      --runnergroup "Default" \
      --labels "${EXTRA_LABELS}" \
      --work "_work" )

  log "installing systemd service for ${NAME}"
  ( cd "${DIR}" && sudo ./svc.sh install "${RUNNER_USER}" )
  ( cd "${DIR}" && sudo ./svc.sh start )
done

log "done — ${COUNT} runner(s) registered to ${ORG}"
log "check status:  systemctl list-units 'actions.runner.${ORG}.*'"
log "live logs:     journalctl -u 'actions.runner.${ORG}.${PREFIX}-1.service' -f"
