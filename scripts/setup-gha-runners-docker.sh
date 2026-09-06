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
# Both default off, and both mirror the macOS twin (see its header):
#   RUNNER_KEEP_VOLUME=1  re-create the containers in place, keeping each
#                         named volume — so .runner/.credentials survive and
#                         no registration token is needed, and so do the warm
#                         cargo/pnpm/Playwright caches that make these runners
#                         fast. This is what you want for a flag or image
#                         change; the default wipe is for a fresh enrolment.
#   RUNNER_SKIP_BUILD=1   reuse the image already on the host. On its own,
#                         KEEP_VOLUME still rebuilds, and that is not reliably
#                         cheap once the ubuntu:24.04 base has moved.
KEEP_VOLUME="${RUNNER_KEEP_VOLUME:-0}"
SKIP_BUILD="${RUNNER_SKIP_BUILD:-0}"
# Resolvers to write into each container's /etc/resolv.conf.
#
# Left unset, this derives them, because "inherit the host's resolvers" is
# not what actually happens. Docker copies only the *usable* entries out of
# the host's resolv.conf, and on a systemd-resolved box the IPv6 link-local
# one is not usable from another network namespace — its scope id means
# nothing there. So it is dropped, and the container is left with exactly
# one server:
#
#   host      /run/systemd/resolve/resolv.conf : 192.168.1.1, fe80::...%3
#   container /etc/resolv.conf                 : 192.168.1.1
#
# One server is one point of failure with nothing for glibc to fall over to
# when it answers with an error — the same shape as the Mac's forwarder, and
# it took a wavekat.com build down on 2026-09-06. Keeping the host's own
# IPv4 servers *first* means LAN-internal names still resolve, which is what
# leaving this empty was trying to protect; the public servers behind them
# are only ever reached when the first one fails to answer.
#
# Set it to a space-separated list to override. Set it to the empty string
# to opt out entirely and let Docker do whatever it would have done.
RUNNER_DNS_FALLBACK="${RUNNER_DNS_FALLBACK:-1.1.1.1 8.8.8.8}"
if [[ -z "${RUNNER_DNS+set}" ]]; then
  # Loopback is the host's own stub (unreachable from a container) and
  # fe80:: is link-local; both are exactly what Docker already discards.
  host_ns="$(grep -hE '^[[:space:]]*nameserver' \
      /run/systemd/resolve/resolv.conf /etc/resolv.conf 2>/dev/null \
    | awk '{print $2}' \
    | grep -vE '^(127\.|::1$|fe80:)' \
    | awk '!seen[$0]++' \
    | tr '\n' ' ')"
  RUNNER_DNS="${host_ns}${RUNNER_DNS_FALLBACK}"
fi
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
if [[ "${SKIP_BUILD}" == "1" ]]; then
  sudo docker image inspect "${IMAGE}" >/dev/null 2>&1 \
    || die "RUNNER_SKIP_BUILD=1 but ${IMAGE} is not on this host — drop the flag to build it"
  log "RUNNER_SKIP_BUILD=1 — reusing image ${IMAGE}"
else
  log "building runner image ${IMAGE}"
  sudo docker build -t "${IMAGE}" "${DOCKER_CONTEXT}"
fi

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

# Keeping the volumes means .runner and .credentials are still there, and the
# entrypoint only calls config.sh when .runner is absent — so no token is
# needed and none should be burned.
if [[ "${KEEP_VOLUME}" == "1" ]]; then
  log "RUNNER_KEEP_VOLUME=1 — re-creating containers in place, no re-registration"
  TOKEN=""
else
  TOKEN="$(get_token)"
  [[ -n "${TOKEN}" ]] || die "got empty registration token"
fi

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
ExecStop=/usr/bin/docker stop -t 120 gha-runner-%i
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

  # If a previous runner exists, stop it. The unit's TimeoutStopSec/ExecStop
  # give a runner that is mid-job time to finish it rather than failing it.
  if systemctl list-unit-files | grep -q "gha-runner@${i}.service"; then
    warn "existing service for ${i} found — stopping"
    sudo systemctl stop "gha-runner@${i}.service" || true
  fi
  sudo docker rm -f "gha-runner-${i}" >/dev/null 2>&1 || true
  if [[ "${KEEP_VOLUME}" == "1" ]]; then
    log "keeping volume gha-runner-${i} (registration + caches)"
  else
    sudo docker volume rm "gha-runner-${i}" >/dev/null 2>&1 || true
  fi

  # With the volume kept there is no new token; preserve whatever the env
  # file already carries so systemd's auto-restart still has one to fall back
  # on if the registration ever does need replaying.
  if [[ "${KEEP_VOLUME}" == "1" && -f "${ENV_FILE}" ]]; then
    TOKEN_LINE="$(sudo grep -m1 '^RUNNER_TOKEN=' "${ENV_FILE}" 2>/dev/null || echo 'RUNNER_TOKEN=')"
  else
    TOKEN_LINE="RUNNER_TOKEN=${TOKEN}"
  fi

  sudo tee "${ENV_FILE}" >/dev/null <<EOF
RUNNER_ORG=${ORG}
RUNNER_NAME=${NAME}
RUNNER_LABELS=${RUNNER_LABELS}
${TOKEN_LINE}
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
