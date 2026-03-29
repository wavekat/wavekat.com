SHELL  := /bin/bash
NVM    := . ~/.nvm/nvm.sh && nvm use 22 &&
.PHONY: dev build preview sync install clean cf-build

# Copy needed assets from wavekat-brand submodule → public/
sync:
	$(NVM) npm run sync

# Start dev server
dev:
	$(NVM) npm run dev

# Build for production → dist/
build:
	$(NVM) npm run build

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
	rm -rf dist/ .astro/ public/logos/
