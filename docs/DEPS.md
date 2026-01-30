# Dependencies Notes

This repo intentionally uses a few pnpm overrides and peer-acceptance rules to keep the workspace on the latest toolchain while minimizing install noise. These are temporary compatibility shims and should be revisited on upgrades.

## Current exceptions

- Vite is overridden to Rolldown-Vite for Nuxt: `pnpm.overrides.vite = npm:rolldown-vite@7.3.1`
- Rolldown is pinned to `1.0.0-beta.53` to match Rolldown-Vite expectations.
- `postprocessing` is pinned to `6.38.2` to align with `three@0.182.x`.

## Peer dependency allowances

Allowed in `pnpm.peerDependencyRules.allowedVersions`:
- `vue-router@^5.0.1` (required by latest Nuxt/Vue packages)
- `focus-trap@^8` (required by latest VueUse integrations)
- `three@^0.182.0` (project uses latest Three)
- `react@^19.2.3` and `react-dom@^19.2.3` (Payload/Next stack)

## Why this exists

Upstream packages lag in their declared peer ranges even when they work with newer majors. These entries keep installs quiet and deterministic while we stay current.

## When to revisit

- After each dependency upgrade run (taze).
- When upstream updates peer ranges for:
  - Vue Router v5
  - Focus Trap v8
  - Three.js v0.182+
  - React 19
  - Rolldown/Vite integration

If upstream supports the newer peers, remove the corresponding override/allowance.
