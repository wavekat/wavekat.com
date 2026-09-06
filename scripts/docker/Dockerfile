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

# GitHub CLI (`gh`) — required by actions that shell out to the GitHub
# API (e.g. release-plz/git-config calls `gh api graphql` to derive the
# commit identity). Not in the default Ubuntu archive, so we add the
# official cli.github.com apt repo.
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
      -o /usr/share/keyrings/githubcli-archive-keyring.gpg \
    && chmod a+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
      > /etc/apt/sources.list.d/github-cli.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends gh \
    && rm -rf /var/lib/apt/lists/*

# AWS CLI v2 — used to publish build artifacts and auto-update feeds to
# Cloudflare R2 over its S3-compatible endpoint (wavekat-voice's
# release.yml). GitHub's own macOS and Windows images ship it, so a
# workflow that ran green on hosted runners fails here with a bare
# `aws: command not found` the moment a job moves to this image — which
# is exactly what happened to wavekat-voice's Linux release legs, after a
# complete and otherwise successful build, on the very last step.
#
# v2 from the official installer rather than Ubuntu's `awscli` (v1):
# every other runner in the fleet is on v2, and holding one major version
# across all of them keeps a signature or endpoint quirk from appearing
# on exactly one platform.
#
# `dpkg --print-architecture` maps to the two names AWS publishes:
# amd64 -> x86_64, arm64 -> aarch64. Both are built, so this image works
# on either half of the fleet.
RUN set -eux; \
    case "$(dpkg --print-architecture)" in \
      amd64) awsarch=x86_64 ;; \
      arm64) awsarch=aarch64 ;; \
      *) echo "no AWS CLI build for $(dpkg --print-architecture)" >&2; exit 1 ;; \
    esac; \
    curl -fsSL "https://awscli.amazonaws.com/awscli-exe-linux-${awsarch}.zip" -o /tmp/awscliv2.zip; \
    unzip -q /tmp/awscliv2.zip -d /tmp; \
    /tmp/aws/install; \
    rm -rf /tmp/aws /tmp/awscliv2.zip; \
    aws --version

# Rust toolchain (stable) via rustup. Required by Rust-based workflows
# and by actions like release-plz that shell out to `cargo`. Installed
# system-wide under /usr/local so both root and the `runner` user can
# use it without PATH gymnastics.
ENV RUSTUP_HOME=/usr/local/rustup \
    CARGO_HOME=/usr/local/cargo \
    PATH=/usr/local/cargo/bin:$PATH
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs \
      | sh -s -- -y --no-modify-path --profile minimal --default-toolchain stable \
    && chmod -R a+rwX "$RUSTUP_HOME" "$CARGO_HOME" \
    && rustc --version \
    && cargo --version

# Relocate cargo's caches onto the runner's persistent volume (mounted at
# /home/runner/runner) for runtime. The toolchain binaries stay baked in
# the image at /usr/local/cargo/bin (still first on PATH, set above) and
# rustup resolves toolchains via RUSTUP_HOME — only the registry/git
# cache (CARGO_HOME) and compiled artifacts (CARGO_TARGET_DIR) move.
#
# Why this matters: workflows run `actions/checkout`, which `git clean`s
# the checkout's `target/` every run. With these dirs OUTSIDE the checkout
# (siblings of `_work` on the same volume), build output survives both the
# git-clean and container recreation — so CI stays warm without uploading
# a cache to GitHub's cloud on every run.
ENV CARGO_HOME=/home/runner/runner/cargo-home \
    CARGO_TARGET_DIR=/home/runner/runner/cargo-target

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

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh \
    && mkdir -p /home/runner/runner \
    && chown runner:runner /home/runner /home/runner/runner

# Entrypoint starts as root so it can chown the named-volume mountpoint
# (Docker creates fresh named volumes as root:root regardless of the
# image's directory ownership). It then drops to the `runner` user
# before exec'ing the GitHub Actions runner.
WORKDIR /home/runner/runner

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
