#!/usr/bin/env bash
#
# Tear down self-hosted GitHub Actions runners installed by
# setup-gha-runners-macos.sh. Stops the launchd agents, removes them, and
# de-registers each runner from the `wavekat` org.
#
# Usage:
#   ./uninstall-gha-runners-macos.sh
#   RUNNER_TOKEN=AAAA... ./uninstall-gha-runners-macos.sh   # uses a remove-token
#
# A *remove* token can be fetched via:
#   gh api -X POST /orgs/wavekat/actions/runners/remove-token --jq .token

set -euo pipefail

ORG="${RUNNER_ORG:-wavekat}"
COUNT="${RUNNER_COUNT:-4}"
PREFIX="${RUNNER_PREFIX:-$(hostname -s)}"
BASE_DIR="${RUNNER_BASE_DIR:-${HOME}/actions-runners}"

log()  { printf '\033[1;36m==>\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m!!\033[0m %s\n' "$*" >&2; }
die()  { printf '\033[1;31mxx\033[0m %s\n' "$*" >&2; exit 1; }

[[ "$(uname -s)" == "Darwin" ]] || die "this script targets macOS (got $(uname -s))"

get_token() {
  if [[ -n "${RUNNER_TOKEN:-}" ]]; then
    printf '%s' "${RUNNER_TOKEN}"
    return
  fi
  if ! command -v gh >/dev/null 2>&1; then
    cat >&2 <<'EOF'

No RUNNER_TOKEN set, and `gh` CLI is not installed.

Install gh with Homebrew and re-run, or fetch a remove-token elsewhere:

  brew install gh
  gh auth login

  # or, from any machine with gh authed as a wavekat admin:
  gh api -X POST /orgs/wavekat/actions/runners/remove-token --jq .token
  RUNNER_TOKEN=<token> ./uninstall-gha-runners-macos.sh
EOF
    exit 1
  fi
  gh api -X POST "/orgs/${ORG}/actions/runners/remove-token" --jq .token
}

TOKEN="$(get_token)"

for i in $(seq 1 "${COUNT}"); do
  NAME="${PREFIX}-${i}"
  DIR="${BASE_DIR}/${NAME}"
  log "removing runner ${NAME}"

  if [[ -d "${DIR}" ]]; then
    ( cd "${DIR}" && ./svc.sh stop      >/dev/null 2>&1 || true )
    ( cd "${DIR}" && ./svc.sh uninstall >/dev/null 2>&1 || true )
    ( cd "${DIR}" && ./config.sh remove --token "${TOKEN}" || true )
    rm -rf "${DIR}"
  else
    warn "no directory at ${DIR} — skipping"
  fi
done

log "done"
