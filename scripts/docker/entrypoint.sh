#!/usr/bin/env bash
#
# Container entrypoint for a self-hosted GitHub Actions runner.
#
# First start: copies the staged runner binaries from /opt/runner-template
# into the persistent work dir, registers with the org using
# RUNNER_TOKEN, then execs `./run.sh`.
#
# Subsequent starts: skips config, reconnects with the persisted
# `.runner` / `.credentials` files. RUNNER_TOKEN is only needed for the
# first start (a registration token is valid 1h and burned on use).
#
# Required env:
#   RUNNER_ORG        — GitHub org (e.g. wavekat)
#   RUNNER_NAME       — unique name for this runner
#   RUNNER_LABELS     — comma-separated labels
#   RUNNER_TOKEN      — registration token (first start only)
#
# Optional:
#   RUNNER_GROUP      — runner group (default: Default)

set -euo pipefail

: "${RUNNER_ORG:?RUNNER_ORG is required}"
: "${RUNNER_NAME:?RUNNER_NAME is required}"
: "${RUNNER_LABELS:?RUNNER_LABELS is required}"

RUNNER_GROUP="${RUNNER_GROUP:-Default}"
WORK_DIR="/home/runner/runner"

if [[ ! -f "${WORK_DIR}/config.sh" ]]; then
  cp -a /opt/runner-template/. "${WORK_DIR}/"
fi

cd "${WORK_DIR}"

if [[ ! -f .runner ]]; then
  if [[ -z "${RUNNER_TOKEN:-}" ]]; then
    echo "first start but RUNNER_TOKEN is empty — cannot register" >&2
    exit 1
  fi
  ./config.sh \
    --unattended \
    --replace \
    --url "https://github.com/${RUNNER_ORG}" \
    --token "${RUNNER_TOKEN}" \
    --name "${RUNNER_NAME}" \
    --runnergroup "${RUNNER_GROUP}" \
    --labels "${RUNNER_LABELS}" \
    --work _work
fi

# Forward SIGTERM cleanly so the runner finishes its current job before
# exiting. Do NOT call `./config.sh remove` here — we want the
# registration to persist across container restarts.
exec ./run.sh
