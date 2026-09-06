#!/usr/bin/env bash
#
# Install N self-hosted GitHub Actions runners on a single Linux host
# as Docker containers, one runner per container, managed by systemd.
#
# Each container has its own rootfs, so apt locks / port conflicts / tmp
# clashes between parallel jobs are no longer possible. Registration
# state is persisted in a per-container Docker volume so host reboots
# don't require re-registration.
#
# Usage (run on the target machine, as a user with sudo):
#
#   # Easiest: let the script fetch a registration token via gh CLI.
#   #   (`gh auth login` once with an account that has wavekat org admin)
#   ./setup-gha-runners-docker.sh
#
#   # Or pass a token explicitly (valid 1h, can register multiple runners):
#   RUNNER_TOKEN=AAAA... ./setup-gha-runners-docker.sh
#
#   # Override defaults:
#   RUNNER_COUNT=6 RUNNER_PREFIX=aoc-m3l RUNNER_LABELS=aoc-m3l,gpu \
#     ./setup-gha-runners-docker.sh
#
# Re-running is safe: existing containers/services are torn down and
# re-registered. The registration token is only consumed on the first
# start of a runner — subsequent restarts use the cached credentials.

set -euo pipefail

ORG="${RUNNER_ORG:-wavekat}"
COUNT="${RUNNER_COUNT:-4}"
PREFIX="${RUNNER_PREFIX:-$(hostname -s)}"
RUNNER_LABELS="${RUNNER_LABELS:-wavekat-ci,${PREFIX}}"
IMAGE="${RUNNER_IMAGE:-wavekat/gha-runner:latest}"
# Resolvers to write into each container's /etc/resolv.conf. Empty by
# default: on this host containers inherit the machine's own resolvers
# and have never lost DNS, and pinning public servers would break any
# LAN-internal name. The macOS twin defaults these ON — see
# docs/06-self-hosted-runners.md §6 for why the two differ.
RUNNER_DNS="${RUNNER_DNS:-}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOCKER_CONTEXT="${SCRIPT_DIR}/docker"

log()  { printf '\033[1;36m==>\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m!!\033[0m %s\n' "$*" >&2; }
die()  { printf '\033[1;31mxx\033[0m %s\n' "$*" >&2; exit 1; }

[[ "$(uname -s)" == "Linux" ]] || die "this script targets Linux (got $(uname -s))"
[[ -d "${DOCKER_CONTEXT}" ]] || die "missing docker context at ${DOCKER_CONTEXT}"

# 1. Ensure Docker is installed.
if ! command -v docker >/dev/null 2>&1; then
  log "installing docker (docker.io from Ubuntu archive)"
  sudo apt-get update -y
  sudo apt-get install -y --no-install-recommends docker.io
  sudo systemctl enable --now docker
fi

# 2. Build the runner image.
log "building runner image ${IMAGE}"
sudo docker build -t "${IMAGE}" "${DOCKER_CONTEXT}"

# 3. Fetch a registration token (one token can register multiple runners
#    within its 1h validity window).
get_token() {
  if [[ -n "${RUNNER_TOKEN:-}" ]]; then
    printf '%s' "${RUNNER_TOKEN}"
    return
  fi
  if ! command -v gh >/dev/null 2>&1; then
    cat >&2 <<'EOF'

No RUNNER_TOKEN set, and `gh` CLI is not installed.

Install gh on Ubuntu and re-run, or fetch a token elsewhere:

  sudo apt-get install -y gh
  gh auth login        # use an account with wavekat org admin

  # or, from any machine with gh authed as a wavekat admin:
  gh api -X POST /orgs/wavekat/actions/runners/registration-token --jq .token
  RUNNER_TOKEN=<token> ./setup-gha-runners-docker.sh
EOF
    exit 1
  fi
  gh api -X POST "/orgs/${ORG}/actions/runners/registration-token" --jq .token \
    || die "failed to fetch registration token (is gh authed as a wavekat admin?)"
}

TOKEN="$(get_token)"
[[ -n "${TOKEN}" ]] || die "got empty registration token"

# 4. Install a systemd template unit. One container per instance, each
#    with its own named volume so the registration persists across
#    restarts and host reboots.
UNIT_PATH="/etc/systemd/system/gha-runner@.service"
log "writing ${UNIT_PATH}"
DNS_FLAGS=""
if [[ -n "${RUNNER_DNS}" ]]; then
  for ns in ${RUNNER_DNS}; do DNS_FLAGS+=$'\n'"  --dns ${ns} \\"; done
  DNS_FLAGS+=$'\n'"  --dns-option timeout:2 --dns-option attempts:3 \\"
  log "container resolvers: ${RUNNER_DNS}"
fi

sudo tee "${UNIT_PATH}" >/dev/null <<EOF
[Unit]
Description=GitHub Actions runner (container %i)
After=docker.service network-online.target
Requires=docker.service
Wants=network-online.target

[Service]
Type=simple
EnvironmentFile=/etc/gha-runner/%i.env
ExecStartPre=-/usr/bin/docker rm -f gha-runner-%i
ExecStart=/usr/bin/docker run --rm \\
  --name gha-runner-%i \\${DNS_FLAGS}
  --hostname gha-runner-%i \\
  -v gha-runner-%i:/home/runner/runner \\
  -e RUNNER_ORG=\${RUNNER_ORG} \\
  -e RUNNER_NAME=\${RUNNER_NAME} \\
  -e RUNNER_LABELS=\${RUNNER_LABELS} \\
  -e RUNNER_TOKEN=\${RUNNER_TOKEN} \\
  ${IMAGE}
ExecStop=/usr/bin/docker stop --time=120 gha-runner-%i
Restart=always
RestartSec=10
TimeoutStopSec=180

[Install]
WantedBy=multi-user.target
EOF

sudo mkdir -p /etc/gha-runner
sudo chmod 0750 /etc/gha-runner

# 5. (Re)create N runners.
for i in $(seq 1 "${COUNT}"); do
  NAME="${PREFIX}-${i}"
  ENV_FILE="/etc/gha-runner/${i}.env"
  log "configuring runner ${NAME}"

  # If a previous runner exists, stop it and wipe its volume so the
  # fresh registration token can be applied cleanly.
  if systemctl list-unit-files | grep -q "gha-runner@${i}.service"; then
    warn "existing service for ${i} found — stopping"
    sudo systemctl stop "gha-runner@${i}.service" || true
  fi
  sudo docker rm -f "gha-runner-${i}" >/dev/null 2>&1 || true
  sudo docker volume rm "gha-runner-${i}" >/dev/null 2>&1 || true

  sudo tee "${ENV_FILE}" >/dev/null <<EOF
RUNNER_ORG=${ORG}
RUNNER_NAME=${NAME}
RUNNER_LABELS=${RUNNER_LABELS}
RUNNER_TOKEN=${TOKEN}
EOF
  sudo chmod 0600 "${ENV_FILE}"
done

# 6. Reload systemd and start everything.
sudo systemctl daemon-reload
for i in $(seq 1 "${COUNT}"); do
  log "starting gha-runner@${i}"
  sudo systemctl enable --now "gha-runner@${i}.service"
done

# NOTE: we intentionally do NOT scrub RUNNER_TOKEN from the env files
# after start. The token is single-use and expires after 1h, so leaving
# it in a root-owned 0600 file is harmless. Scrubbing it would make
# systemd's auto-restart unable to recover if config.sh failed on the
# first attempt (no token in the env file → no way to register).

log "done — ${COUNT} runner(s) registered to ${ORG}"
log "check status:  systemctl list-units 'gha-runner@*.service'"
log "live logs:     journalctl -u 'gha-runner@1.service' -f"
log "container shells: docker exec -it gha-runner-1 bash"
