#!/usr/bin/env bash
#
# Tear down the Docker Desktop self-hosted GitHub Actions runners
# installed by setup-gha-runners-macos.sh. Stops and removes the
# containers, de-registers each runner from the `wavekat` org, and drops
# the persistent volumes.
#
# Usage:
#   ./uninstall-gha-runners-macos.sh
#   RUNNER_TOKEN=AAAA... ./uninstall-gha-runners-macos.sh   # uses a remove-token
#
# A *remove* token can be fetched via:
#   gh api -X POST /orgs/wavekat/actions/runners/remove-token --jq .token
#
# Set RUNNER_KEEP_VOLUMES=1 to leave the volumes in place (keeps the
# warm npm/cargo caches for a later re-register).

set -euo pipefail

ORG="${RUNNER_ORG:-wavekat}"
COUNT="${RUNNER_COUNT:-4}"
KEEP_VOLUMES="${RUNNER_KEEP_VOLUMES:-0}"

log()  { printf '\033[1;36m==>\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m!!\033[0m %s\n' "$*" >&2; }
die()  { printf '\033[1;31mxx\033[0m %s\n' "$*" >&2; exit 1; }

[[ "$(uname -s)" == "Darwin" ]] || die "this script targets macOS (got $(uname -s))"

DOCKER=""
for candidate in docker /usr/local/bin/docker "${HOME}/.docker/bin/docker" /opt/homebrew/bin/docker; do
  if command -v "${candidate}" >/dev/null 2>&1; then DOCKER="${candidate}"; break; fi
done
[[ -n "${DOCKER}" ]] || die "docker CLI not found"
"${DOCKER}" info >/dev/null 2>&1 || die "Docker Desktop is not running — launch it and re-run"

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
  CONTAINER="gha-runner-${i}"
  log "removing ${CONTAINER}"

  if "${DOCKER}" ps -a --format '{{.Names}}' | grep -qx "${CONTAINER}"; then
    # De-register from inside the container while its volume is still
    # mounted, so the org isn't left holding an offline ghost runner.
    # `docker stop` first would kill run.sh; config.sh remove needs the
    # runner idle, so stop it, then run config.sh in a one-shot exec.
    "${DOCKER}" stop --time=120 "${CONTAINER}" >/dev/null 2>&1 || true
    "${DOCKER}" run --rm \
      -v "${CONTAINER}:/home/runner/runner" \
      -w /home/runner/runner \
      --entrypoint /bin/bash \
      "$("${DOCKER}" inspect --format '{{.Config.Image}}' "${CONTAINER}" 2>/dev/null || echo wavekat/gha-runner:latest)" \
      -c "./config.sh remove --token '${TOKEN}' || true" >/dev/null 2>&1 || \
      warn "could not de-register ${CONTAINER} cleanly — remove it in the org runner settings"
    "${DOCKER}" rm -f "${CONTAINER}" >/dev/null 2>&1 || true
  else
    warn "no container named ${CONTAINER} — skipping"
  fi

  if [[ "${KEEP_VOLUMES}" != "1" ]]; then
    "${DOCKER}" volume rm "${CONTAINER}" >/dev/null 2>&1 || true
  fi
done

log "done"
[[ "${KEEP_VOLUMES}" == "1" ]] && log "volumes kept (RUNNER_KEEP_VOLUMES=1)"
log "verify: https://github.com/organizations/${ORG}/settings/actions/runners"
