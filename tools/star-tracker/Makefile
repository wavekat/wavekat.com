SHELL := /bin/bash
NVM   := source $$NVM_DIR/nvm.sh && nvm use 22 --silent &&

.PHONY: help install dev typecheck deploy create-db migrate migrate-local secrets logs clean

.DEFAULT_GOAL := help

help:
	@echo "Targets:"
	@echo "  install        Install npm dependencies (Node 22 via nvm)"
	@echo "  dev            Run the worker locally (wrangler dev)"
	@echo "  typecheck      Run tsc --noEmit"
	@echo "  create-db      Create the D1 database (one-time)"
	@echo "  migrate        Apply migrations to remote D1"
	@echo "  migrate-local  Apply migrations to local D1 (for wrangler dev)"
	@echo "  secrets        Prompt for and upload all required secrets"
	@echo "  deploy         Deploy to Cloudflare"
	@echo "  logs           Tail Worker logs"
	@echo "  clean          Remove build artifacts"

install:
	$(NVM) npm install

dev:
	@test -f .dev.vars || (echo "Missing .dev.vars — copy .dev.vars.example to .dev.vars and fill in OAuth + JWT values" && exit 1)
	$(NVM) npx wrangler dev

typecheck:
	$(NVM) npx tsc --noEmit

create-db:
	$(NVM) npx wrangler d1 create wavekat-stars
	@echo ""
	@echo "Paste the database_id above into wrangler.toml, then run: make migrate"

migrate:
	$(NVM) npm run db:migrate

migrate-local:
	$(NVM) npm run db:migrate:local

secrets:
	@echo "Setting GITHUB_CLIENT_ID..."
	$(NVM) npx wrangler secret put GITHUB_CLIENT_ID
	@echo "Setting GITHUB_CLIENT_SECRET..."
	$(NVM) npx wrangler secret put GITHUB_CLIENT_SECRET
	@echo "Setting JWT_SECRET (paste a random 32+ byte string)..."
	$(NVM) npx wrangler secret put JWT_SECRET

deploy:
	$(NVM) npm run deploy

logs:
	$(NVM) npx wrangler tail

clean:
	rm -rf node_modules .tmp-build
