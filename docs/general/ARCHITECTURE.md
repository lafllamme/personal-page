# Architecture

This repository is a Turborepo monorepo managed with pnpm workspaces. It contains two deployable apps and a shared package that holds types and Payload collection configs.

## Repository layout

- `frontend/`: Nuxt 4 (Vue 3) application.
- `cms/`: Next.js application with Payload CMS (admin + API).
- `shared/`: shared types, utilities, and Payload collection configs consumed by both apps.
- `docs/`: documentation (architecture, dependencies).

## Tooling & orchestration

- **Monorepo**: pnpm workspaces with catalog versioning (`pnpm-workspace.yaml`).
- **Task runner**: Turbo (`turbo.json`) for `dev`, `build`, `lint`, `type-check`, and `generate:types`.
- **Dependency upgrades**: taze scripts in root `package.json` (safe/minor/major/latest).
- **Overrides**: pnpm overrides pin `rolldown-vite` and `rolldown`.

## Frontend (Nuxt 4)

Location: `frontend/`

Core stack
- Nuxt 4 + Vue 3, SSR enabled.
- Rolldown-Vite (Rust-based Vite engine) via pnpm override.
- Nitro preset: `node-server` with server output and asset compression.

Nuxt modules
- `@nuxt/image`, `@nuxt/icon`
- `@unocss/nuxt` (UnoCSS)
- `lenis/nuxt` (smooth scrolling)
- `@nuxtjs/color-mode`
- `@nuxtjs/i18n`
- `@tresjs/nuxt` (3D)
- `@vueuse/nuxt`
- `reka-ui/nuxt`
- `@pinia/nuxt`
- `@nuxtjs/sitemap`
- `@nuxt/fonts`

Lenis reference
- See `docs/LENIS-REFERENCE.md` for approved options and presets.

Runtime config (see `frontend/nuxt.config.ts`)
- Public CMS URLs: `NUXT_PAYLOAD_PUBLIC_SERVER_URL` (builds `payloadApiUrl` and `payloadUrl`).
- Frontend site URL: `FRONTEND_URL`.
- API keys: `NUXT_FINNHUB_API_KEY`, `NUXT_BUTTONDOWN_API_KEY`.
- Server-side secrets: `NUXT_DATABASE_URI`, `NUXT_PAYLOAD_SECRET`.

Performance & bundling
- Manual chunking for large libs (Three.js, Monaco, Tres, UI libs).
- `renderJsonPayloads` + `payloadExtraction` experimental flags.
- `nitro` build copies Sharp runtime assets into server bundle.

i18n
- Multiple locales with `prefix_except_default`.
- Cookie-based language detection.

## CMS (Next.js + Payload)

Location: `cms/`

Core stack
- Next.js 16 with Payload CMS.
- Rspack bundler enabled via `next-rspack`.
- Payload integration via `@payloadcms/next/withPayload`.

Payload configuration (see `cms/src/payload.config.ts`)
- DB: Postgres (`@payloadcms/db-postgres`).
- Storage: Vercel Blob (`@payloadcms/storage-vercel-blob`).
- Editor: Lexical (`@payloadcms/richtext-lexical`).
- Collections imported from `@tec/types/payload/collections/*`.
- `serverURL` from `PAYLOAD_PUBLIC_SERVER_URL` (fallback `http://localhost:3001`).
- Optional Payload Cloud plugin in production.

Testing
- Unit/Integration: Vitest.
- E2E: Playwright.

## Shared package (`@tec/types`)

Location: `shared/`

Purpose
- Shared types and utilities.
- Payload collection definitions for Users, Media, Pages, Posts, Categories.

Usage
- Imported by `cms` (Payload config) and `frontend` (shared types/utilities).

## Styling system

Location: `frontend/uno.config.ts`, `frontend/app/assets/unocss/*`

- UnoCSS with multiple presets: `presetUno`, `presetMini`, `presetWind`, `presetAttributify`, `presetIcons`, `presetTypography`, `animatedUno`, `presetWebFonts`, `presetRadix`, `presetAnimations`.
- Custom theme extension with CSS variable-based colors and utility shortcuts.
- Tailwind-style utilities are used across the frontend.

## VueUse usage

- Prefer VueUse composables whenever a suitable helper exists, instead of hand-rolled browser logic.
- Use VueUse to reduce direct `window`/`document` access and keep SSR-safe patterns.

## Build outputs

- `frontend`: `.nuxt/`, `.output/`
- `cms`: `.next/`
- `shared`: `dist/`

## Deployment & hosting

- Apps are deployed independently but live in one repo.
- `frontend` and `cms` are separate deploy targets.
- Hosting (per repository guidance): `frontend` on Cloudflare, `cms` on Netlify.

## Environment variables

Used by Turbo tasks (`turbo.json`) and app configs:
- `DATABASE_URI` (CMS DB)
- `PAYLOAD_SECRET`
- `PAYLOAD_PUBLIC_SERVER_URL`
- `NUXT_DATABASE_URI`
- `NUXT_PAYLOAD_SECRET`
- `NUXT_BUTTONDOWN_API_KEY`
- `NUXT_FINNHUB_API_KEY`
- `FRONTEND_URL`
- `NODE_ENV`

## Constraints

- No direct imports between `frontend` and `cms`.
- Shared code must live in `shared/`.
