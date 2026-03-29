SHELL  := /bin/bash
NVM    := . ~/.nvm/nvm.sh && nvm use 22 &&
BRAND  := vendor/wavekat-brand/assets/logos

.PHONY: dev build preview sync install clean

# Copy needed assets from wavekat-brand submodule → public/
sync:
	@mkdir -p public/logos
	cp $(BRAND)/wavekat-tight-light.svg public/logos/
	cp $(BRAND)/wavekat-tight-dark.svg public/logos/
	cp $(BRAND)/wavekat-icon-dark.svg public/logos/

# Start dev server
dev: sync
	$(NVM) npm run dev

# Build for production → dist/
build: sync
	$(NVM) npm run build

# Preview production build locally
preview: build
	$(NVM) npm run preview

# Install dependencies
install:
	$(NVM) npm install

# Remove build artifacts and synced assets
clean:
	rm -rf dist/ .astro/ public/logos/
