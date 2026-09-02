SHELL  := /bin/bash
NVM    := . ~/.nvm/nvm.sh && nvm use 22 &&
.PHONY: dev dev-draft build build-draft preview sync screenshots install clean cf-build help
.DEFAULT_GOAL := help

# Copy needed assets from wavekat-brand submodule → public/
sync:
	$(NVM) npm run sync

# Refresh the Ubuntu-framed app screenshots (public/screenshots/) from a local
# wavekat-voice checkout (run `make screenshots && make screenshots-frames`
# there first). Committed assets — not part of the regular build.
screenshots:
	$(NVM) npm run sync:screenshots

# Start dev server
dev:
	$(NVM) npm run dev

# Start dev server with draft blog posts visible (local only — never deploy this)
dev-draft:
	$(NVM) DRAFTS=1 npm run dev

# Build for production → dist/
build:
	$(NVM) npm run build

# Build including draft blog posts (local preview only — drafts must NOT ship)
build-draft:
	$(NVM) DRAFTS=1 npm run build

# Preview production build locally
preview: build
	$(NVM) npm run preview

# Install dependencies
install:
	$(NVM) npm install

# Simulate Cloudflare Pages build locally (no nvm, plain npm — mirrors CI)
cf-build:
	npm run cf:build

# Remove build artifacts and synced assets
clean:
	rm -rf dist/ .astro/ public/logos/ public/og.png public/favicon.ico \
	  public/favicon-16x16.png public/favicon-32x32.png \
	  public/apple-touch-icon.png public/icon-192.png public/icon-512.png

help:
	@echo "Usage: make <target>"
	@echo ""
	@echo "  dev       Start dev server"
	@echo "  dev-draft Start dev server with draft blog posts visible"
	@echo "  build     Build for production → dist/"
	@echo "  build-draft  Build including draft posts (local preview only)"
	@echo "  preview   Build and preview locally"
	@echo "  sync      Copy assets from wavekat-brand submodule"
	@echo "  screenshots  Refresh framed app screenshots → public/screenshots/"
	@echo "  install   Install dependencies"
	@echo "  cf-build  Simulate Cloudflare Pages build (no nvm)"
	@echo "  clean     Remove dist/, .astro/, public/logos/"
