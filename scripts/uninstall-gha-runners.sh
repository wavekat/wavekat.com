#!/usr/bin/env bash
#
# Tear down self-hosted GitHub Actions runners installed by
# setup-gha-runners.sh. Stops the systemd services, removes them, and
# de-registers each runner from the `wavekat` org.
#
# Usage:
#   ./uninstall-gha-runners.sh
#   RUNNER_TOKEN=AAAA... ./uninstall-gha-runners.sh   # uses a remove-token
#
# A *remove* token can be fetched via:
#   gh api -X POST /orgs/wavekat/actions/runners/remove-token --jq .token

set -euo pipefail

ORG="${RUNNER_ORG:-wavekat}"
COUNT="${RUNNER_COUNT:-4}"
PREFIX="${RUNNER_PREFIX:-$(hostname -s)}"
BASE_DIR="${RUNNER_BASE_DIR:-/opt/actions-runners}"

log()  { printf '\033[1;36m==>\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m!!\033[0m %s\n' "$*" >&2; }
die()  { printf '\033[1;31mxx\033[0m %s\n' "$*" >&2; exit 1; }

get_token() {
  if [[ -n "${RUNNER_TOKEN:-}" ]]; then
    printf '%s' "${RUNNER_TOKEN}"
    return
  fi
  if ! command -v gh >/dev/null 2>&1; then
    cat >&2 <<'EOF'

No RUNNER_TOKEN set, and `gh` CLI is not installed.

Install gh on Ubuntu 24.04 and re-run, or fetch a remove-token elsewhere:

  # install gh:
  sudo apt-get update && sudo apt-get install -y curl ca-certificates
  curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
    | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
  sudo chmod a+r /usr/share/keyrings/githubcli-archive-keyring.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
    | sudo tee /etc/apt/sources.list.d/github-cli.list >/dev/null
  sudo apt-get update && sudo apt-get install -y gh
  gh auth login

  # or fetch a remove-token from any machine with gh authed:
  gh api -X POST /orgs/wavekat/actions/runners/remove-token --jq .token
  RUNNER_TOKEN=<token> ./uninstall-gha-runners.sh
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
    ( cd "${DIR}" && sudo ./svc.sh stop      || true )
    ( cd "${DIR}" && sudo ./svc.sh uninstall || true )
    ( cd "${DIR}" && ./config.sh remove --token "${TOKEN}" || true )
    rm -rf "${DIR}"
  else
    warn "no directory at ${DIR} — skipping"
  fi
done

log "done"
