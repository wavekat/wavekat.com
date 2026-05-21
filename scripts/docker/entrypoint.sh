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

# First-boot fix: Docker creates fresh named volumes owned by root:root,
# so the `runner` user can't write into the mountpoint until we chown
# it. Do that as root, then re-exec ourselves as `runner`.
if [[ "$(id -u)" -eq 0 ]]; then
  chown -R runner:runner "${WORK_DIR}"
  exec sudo \
    --preserve-env=RUNNER_ORG,RUNNER_NAME,RUNNER_LABELS,RUNNER_TOKEN,RUNNER_GROUP \
    -u runner -H /usr/local/bin/entrypoint.sh "$@"
fi

# Restore PATH entries that sudo's `secure_path` strips on re-exec.
# The image installs Rust system-wide under /usr/local/cargo, but
# sudo replaces PATH with sudoers' `secure_path`, so the runner —
# and every workflow step it spawns — would lose `cargo`/`rustc`
# without this. Prepend so user-provided PATH still wins.
export PATH="/usr/local/cargo/bin:${PATH}"

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
