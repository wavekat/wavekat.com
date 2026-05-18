#!/usr/bin/env bash
#
# Tear down Docker-based self-hosted GitHub Actions runners installed
# by setup-gha-runners-docker.sh. Stops the systemd services, removes
# the containers and volumes, and de-registers each runner from the
# `wavekat` org.
#
# Usage:
#   ./uninstall-gha-runners-docker.sh
#   RUNNER_TOKEN=AAAA... ./uninstall-gha-runners-docker.sh   # remove-token
#
# A *remove* token can be fetched via:
#   gh api -X POST /orgs/wavekat/actions/runners/remove-token --jq .token

set -euo pipefail

ORG="${RUNNER_ORG:-wavekat}"
COUNT="${RUNNER_COUNT:-4}"
PREFIX="${RUNNER_PREFIX:-$(hostname -s)}"

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

Install gh on Ubuntu and re-run, or fetch a remove-token elsewhere:

  sudo apt-get install -y gh
  gh auth login

  # or, from any machine with gh authed as a wavekat admin:
  gh api -X POST /orgs/wavekat/actions/runners/remove-token --jq .token
  RUNNER_TOKEN=<token> ./uninstall-gha-runners-docker.sh
EOF
    exit 1
  fi
  gh api -X POST "/orgs/${ORG}/actions/runners/remove-token" --jq .token
}

TOKEN="$(get_token)"
[[ -n "${TOKEN}" ]] || die "got empty remove token"

for i in $(seq 1 "${COUNT}"); do
  NAME="${PREFIX}-${i}"
  log "removing runner ${NAME}"

  # De-register inside the container before tearing it down (best effort —
  # if the volume is already gone the runner is effectively orphaned and
  # will need to be removed from the GitHub UI manually).
  if sudo docker ps -a --format '{{.Names}}' | grep -q "^gha-runner-${i}$"; then
    sudo docker exec "gha-runner-${i}" \
      bash -c "cd /home/runner/runner && ./config.sh remove --token '${TOKEN}'" \
      || warn "in-container de-register failed for ${NAME} (will be removed locally regardless)"
  fi

  sudo systemctl disable --now "gha-runner@${i}.service" 2>/dev/null || true
  sudo docker rm -f "gha-runner-${i}" >/dev/null 2>&1 || true
  sudo docker volume rm "gha-runner-${i}" >/dev/null 2>&1 || true
  sudo rm -f "/etc/gha-runner/${i}.env"
done

# Remove the template unit only if no instances remain enabled.
if ! systemctl list-units --all 'gha-runner@*.service' --no-legend | grep -q .; then
  log "removing systemd template unit"
  sudo rm -f /etc/systemd/system/gha-runner@.service
  sudo rmdir /etc/gha-runner 2>/dev/null || true
  sudo systemctl daemon-reload
fi

log "done"
