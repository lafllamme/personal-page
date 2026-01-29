# AGENTS.md

Instructions for code agents (Cursor Agent, Codex) working in this repository.

## Reference docs and source of truth

This repository contains additional markdown docs that define product intent, design direction, and operational constraints.

Rules
* Always check the relevant reference doc before making decisions that affect UX, UI, animation, content, or product behavior
* If a requested change conflicts with a reference doc, mention it very briefly and ask one targeted question

When to use which doc
* Product, UX, UI, animation, tone, content decisions → `PRODUCT.md`
* Design tokens, colors, typography, spacing, visual effects, component patterns → `DESIGNSYSTEM.md`


## Repository context

This is a Turborepo monorepo using pnpm workspaces.

Primary deployables
* `frontend/` Nuxt 4, Vue 3, UnoCSS (Tailwind compatible utility patterns)
* `cms/` Next.js, Payload CMS

Shared code lives in `shared/`.

Local development is monorepo first. Deployments are split per app, but the monorepo structure must remain intact.

Note
* Ignore `DEPLOYMENT.md` for now
* Current hosting is Cloudflare for `frontend` and Netlify for `cms`
* Payload is hosted separately from the Nuxt frontend, so integration must happen through well typed APIs and shared contracts

## Nuxt 4 and Vue 3 ecosystem emphasis

We are fully in the Nuxt 4 and Vue 3 ecosystem.

Rules
* Prefer Composition API only
* Prefer `<script setup lang="ts">`
* Prefer Nuxt primitives for data fetching and SSR safety
* Prefer VueUse whenever it makes sense to avoid direct `window`, `document`, or manual event listener handling
* Only use direct browser globals when no idiomatic Nuxt or VueUse option exists

## Monorepo boundaries

Rules
1. Treat top level apps as independent deploy targets
2. Do not import from one app into the other app directly
3. If something must be shared, it belongs in `shared/` as a package or module

Allowed dependency directions
* `frontend` may depend on `shared`
* `cms` may depend on `shared`
* `shared` must not depend on app specific code

If you need functionality in both apps, prefer creating or extending a shared package rather than duplicating logic.

## Agent operating principles

### Act as a senior engineer

You operate with senior engineer standards.

* Write production ready code
* Prefer maintainability, readability, and correctness over cleverness
* Keep changes minimal and scoped to the task
* Avoid refactors unless they directly reduce complexity, duplication, or risk
* Choose appropriate patterns for the task and apply them correctly

### Clarify when unclear, do not guess

If anything important is unclear, ask a targeted question before implementing.

Examples of ambiguity
* data shapes and API responses
* environment assumptions and SSR constraints
* package boundaries and ownership of changes
* existing conventions in this repo
* product intent and UX direction (use `PRODUCT.md`)

If you proceed with an assumption, document it inline.

### Think before you code

For complex topics, take extra time to reason through
* the cleanest approach
* edge cases
* SSR and hydration implications
* long term maintainability

Prefer a correct and robust solution over a quick patch.

### Challenge code quality, performance, and tradeoffs

Always sanity check the implementation.

* Question performance implications (CPU, memory, network, bundle size)
* Prefer best practice solutions over hacky solutions
* If a hack is required, keep it contained, explain why briefly, and add a clear TODO or follow up note
* Consider alternatives and pick the simplest reliable option

### Small improvement notes only

If you notice an error, improvement, or potential bug unrelated to the requested change
* mention it very briefly
* do not expand into long refactors
* do not change unrelated code unless it is required for correctness

### DRY and reuse first

Before adding anything new, search the repo and reuse what exists.
Do not create near duplicates across `frontend`, `cms`, and `shared`.

## TypeScript standards

* Use TypeScript everywhere
* Prefer `interface` over `type` unless you need unions or mapped types
* Avoid enums, prefer const objects with literal unions

At module boundaries
* export types describing inputs and outputs
* validate external data where appropriate, especially API and CMS data
* avoid trusting Payload responses implicitly in the frontend

Recommendation
* Use runtime validation for external data when the data can drift

## Nuxt 4 and Vue 3 guidelines

Nuxt conventions
* `pages` for routing
* `components` for UI
* `composables` for reusable state and logic
* `server` for server routes and utilities
* `plugins` for global integrations

Data fetching and SEO
* Prefer `useFetch` and `useAsyncData`
* Use `useHead` and `useSeoMeta` for metadata
* Prefer Nuxt auto imports for common composables unless a manual import improves clarity

State management
* Use Pinia for shared state
* Prefer local component state unless state truly needs to be global

VueUse policy
* Prefer VueUse composables for common patterns
* Do not reinvent watchers, intervals, event listeners, or storage helpers if VueUse already covers it
* Use VueUse to avoid direct `window` usage where possible

Styling
* Prefer UnoCSS utility first patterns
* Prefer utility based arbitrary values when needed instead of adding new SCSS

## Next.js and Payload CMS guidelines

Ownership and containment
* Keep Payload logic contained within `cms`
* Do not leak Payload specific code into the Nuxt app

Contracts between `cms` and `frontend`
1. Expose data through APIs, not direct imports
2. Define shared DTO types in `shared/` and use them on both sides
3. Add runtime validation at the edge of the consuming app when appropriate

Payload changes
* When modifying schemas or access rules, consider downstream effects on API responses
* Update shared contracts and consumers together when the shape changes

## UI and component choices

Frontend UI
* UnoCSS utility patterns with consistent spacing scale
* Keep components responsive with mobile first utilities
* Follow design tokens, colors, typography, and patterns defined in `DESIGNSYSTEM.md`

Component libraries
* Prefer shadcn vue and radix vue when a library is useful
* Avoid introducing new UI libraries unless necessary

## Performance expectations

General
* Prefer lazy loading for heavy components and non critical routes
* Use Suspense for async components when it improves UX

Images
* Prefer modern formats where possible
* Provide width and height to reduce layout shift
* Lazy load below the fold images

Web Vitals awareness
* LCP, CLS, INP

## Naming and structure conventions

Naming
* Vue component files use PascalCase
* Composables use camelCase and start with `use`
* Helpers are named by purpose

File structure ordering
* imports
* types
* constants
* helpers
* composables
* exports

Vue SFC ordering
* script setup
* props and types
* state and computed
* composables
* handlers
* template
* styles only if truly needed

## Comments and documentation

Avoid obvious comments.
For complex logic, data transforms, and non trivial side effects, add short doc comments that explain why.

Preferred pattern
/**
 * Purpose, inputs, outputs, constraints.
 */

## Testing and quality gates

If tests exist, update or add tests for changed behavior.
Prefer deterministic tests and avoid snapshot bloat.

Follow repository tooling for linting and formatting.
Do not introduce inconsistent formatting.

## Research and internet use

You may use the internet to research best practices, library APIs, and Nuxt or VueUse specific patterns.
Prefer official documentation and primary sources.
When the correct approach is uncertain, research first rather than guessing.

## Safety checks before finalizing

Before completing an edit, ensure
1. you did not create a duplicate helper when one already exists
2. types and interfaces are correct and exported where needed
3. imports respect app boundaries
4. no secrets or environment values are hardcoded
5. no unnecessary refactors were introduced
6. shared contracts are updated when API shapes change
