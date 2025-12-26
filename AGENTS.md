# AGENTS.md

Instructions for code agents (Cursor Agent / Codex) working in this repository.

## Repository context

Turborepo monorepo using pnpm workspaces.

Primary deployables:
- `frontend/`: Nuxt 4 + Vue 3 + UnoCSS (Tailwind-compatible utilities)
- `cms/`: Next.js + Payload CMS

Shared code lives in `shared/`.

Local development is monorepo-first. Deployments are split per app, but the monorepo structure must remain intact.

Important: ignore `DEPLOYMENT.md` for now. Current hosting is Cloudflare for the frontend and Netlify for the backend.

## Monorepo layout expectations

Keep clear boundaries between apps and shared code.
Treat top-level packages as independent deploy targets.
Avoid cross-app imports unless routed through `shared/`.

If a shared utility is needed across frontend and cms, create or use an existing shared package instead of duplicating code.

## Agent operating principles

### Senior-like development

Write production-ready code.
Prefer maintainability, readability, and correctness over cleverness.
Keep changes minimal and scoped to the task.
Avoid unnecessary refactors unless they directly reduce complexity or duplication.

### Ask once when something is unclear

If requirements, data shapes, environment assumptions, or folder boundaries are unclear, ask one targeted follow-up question before implementing a risky assumption.
If the task is mostly clear, proceed and document assumptions inline.

### DRY and reuse first

Before adding new helpers, composables, or utilities, search the repo and reuse what already exists.
Do not replicate similar helpers across `frontend/` and `cms/`.
If a new abstraction is needed, place it in the most appropriate shared location.

### Clean code rules

Prefer small functions with clear names.
Prefer early returns.
Avoid deep nesting.
Avoid hidden side effects.
Keep types explicit at module boundaries.

Use descriptive boolean names with auxiliary verbs: `isLoading`, `hasError`, `canSubmit`, `shouldRefetch`.

## TypeScript standards

Use TypeScript everywhere.
Prefer `interface` over `type` unless you need unions or mapped types.
Avoid enums; prefer const objects and literal unions.

At module boundaries:
export types that describe inputs and outputs,
validate external data where appropriate (especially API and CMS data).

## Nuxt 4 and Vue 3 guidelines

Use Vue 3 Composition API only. Avoid Options API.
Prefer `<script setup lang="ts">`.

Use Nuxt conventions:
- `pages/` for routing
- `components/` for UI
- `composables/` for reusable state/logic
- `server/` for server routes/utilities
- `plugins/` for global integrations

Use Nuxt primitives for data fetching: `useFetch`, `useAsyncData`.
Use `useHead` and `useSeoMeta` for SEO/metadata.
Always try to implement unoCSS/Tailwind arbitary with e.g. 'color-[]' or similar instead of using scss, whenever possible.

Prefer Nuxt auto-imports. Do not manually import common Nuxt composables unless required for clarity.

### State management

Use Pinia for shared state.
Prefer local component state unless state truly needs to be global.

### VueUse

Prefer VueUse composables for common patterns.
Do not reinvent watchers, intervals, event listeners, or storage helpers if VueUse already covers it.

## Next.js and Payload CMS guidelines

Keep Payload CMS logic contained within the `cms/` boundary.
Prefer typed Payload access patterns.
Avoid leaking CMS-specific code into the Nuxt frontend.
Expose CMS data through well-typed APIs or `shared/` packages when necessary.

## Styling and UI

Frontend uses UnoCSS with Tailwind-compatible utility patterns.
Prefer utility-first styling and consistent spacing scales.

If you use component libraries, prefer shadcn-vue and radix-vue.

Keep components responsive using mobile-first utilities.

## Performance expectations

Prefer lazy loading where appropriate:
- lazy-load routes and heavy components
- use Suspense for async components when it improves UX

Optimize images:
- prefer WebP where possible
- provide width and height to reduce CLS
- use lazy loading for below-the-fold images

Be mindful of Web Vitals: LCP, CLS, INP (or FID where referenced).

## Naming conventions

Directories use lowercase with dashes: `components/auth-wizard/`.
Vue component files use PascalCase: `AuthWizard.vue`.
Composables use camelCase starting with `use`: `useAuthState.ts`.
Helpers are named by purpose: `formatCurrency.ts`, `buildCmsUrl.ts`.

## File structure conventions

Prefer consistent ordering inside files:
imports → types → constants → helpers → composables → main export

For Vue SFCs:
`<script setup>` → types/props → state/computed → composables → methods/handlers → template → styles (if needed)

## Comments and documentation

Avoid obvious comments. For complex logic, data transforms, and non-trivial side effects, add short TSDoc-style comments.

Pattern:
/**
 * Briefly explains the purpose, inputs, outputs, and important constraints.
 */

Keep comments short and factual. Prefer documenting why, not what.

## Testing and quality gates

If tests exist, update or add tests for changed behavior.
Prefer deterministic tests. Avoid snapshot bloat.

If linting or formatting exists, follow it. Do not introduce inconsistent formatting.
Prefer repository standard tooling (eslint, prettier, etc.).

## Safety checks before finalizing a change

Before completing an edit, ensure:
- no duplicated helper was created where one already exists
- types/interfaces are correct and exported where needed
- imports respect app boundaries
- no secrets or environment values are hardcoded
- no unnecessary refactors were introduced
