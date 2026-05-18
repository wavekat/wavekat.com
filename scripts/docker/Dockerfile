# syntax=docker/dockerfile:1.7

# Self-hosted GitHub Actions runner image for the `wavekat` org.
#
# Build (resolves the latest runner release if RUNNER_VERSION is empty):
#   docker build -t wavekat/gha-runner:latest scripts/docker
#
# Or pin a version:
#   docker build --build-arg RUNNER_VERSION=2.334.0 \
#     -t wavekat/gha-runner:2.334.0 scripts/docker

FROM ubuntu:24.04

ARG RUNNER_VERSION=2.334.0
ARG DEBIAN_FRONTEND=noninteractive

# Base OS + common build deps used across wavekat workflows.
# Per-job `apt-get install` still works inside the container (no host
# lock contention) so workflows can add packages as needed.
RUN apt-get update && apt-get install -y --no-install-recommends \
      ca-certificates curl wget git jq sudo gnupg unzip xz-utils zstd \
      build-essential pkg-config libssl-dev libicu-dev \
      librsvg2-bin libasound2-dev \
      python3 python3-pip \
      tzdata locales \
    && locale-gen en_US.UTF-8 \
    && rm -rf /var/lib/apt/lists/*

ENV LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8

# Node 22 (matches CLAUDE.md project requirement) + corepack/pnpm.
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && corepack enable \
    && rm -rf /var/lib/apt/lists/*

# Non-root runner user. Passwordless sudo so workflows can still do
# `sudo apt-get install ...` for one-off deps — safe inside the
# container's isolated rootfs.
RUN useradd -m -s /bin/bash runner \
    && echo 'runner ALL=(ALL) NOPASSWD: ALL' > /etc/sudoers.d/runner \
    && chmod 0440 /etc/sudoers.d/runner

# Stage the actions/runner tarball into /opt/runner-template. The
# entrypoint copies this into the runtime work dir on first start so
# image rebuilds don't clobber persisted registration state.
RUN set -eux; \
    ARCH="$(dpkg --print-architecture)"; \
    case "$ARCH" in \
      amd64) RARCH=x64 ;; \
      arm64) RARCH=arm64 ;; \
      *) echo "unsupported arch: $ARCH" >&2; exit 1 ;; \
    esac; \
    mkdir -p /opt/runner-template; \
    curl -fsSL -o /tmp/runner.tar.gz \
      "https://github.com/actions/runner/releases/download/v${RUNNER_VERSION}/actions-runner-linux-${RARCH}-${RUNNER_VERSION}.tar.gz"; \
    tar -xzf /tmp/runner.tar.gz -C /opt/runner-template; \
    rm /tmp/runner.tar.gz; \
    /opt/runner-template/bin/installdependencies.sh; \
    chown -R runner:runner /opt/runner-template

COPY --chown=runner:runner entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

USER runner
WORKDIR /home/runner/runner

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
