---
name: hydration-fix-skill
description: Diagnose and fix Nuxt 4 hydration mismatches in a proposal-first workflow (analysis before changes).
disable-model-invocation: false
---

# Hydration Fix Skill (Nuxt 4)

This skill is exclusively for diagnosing and fixing hydration issues in Nuxt 4 (SSR/CSR DOM, JS, CSS mismatches). It is **analysis-first** and **proposal-only** until the user explicitly approves the fix.

## When to Use

- A warning/error mentions hydration mismatch, SSR/CSR mismatch, or "content does not match".
- A component or route renders differently server vs client.
- UI glitches appear only after hydration.
- The user asks to fix hydration in Nuxt 4 (even without logs).

## Mandatory behavior (proposal-first)

1) **Do not change code immediately.**
2) **Analyze first**: identify likely causes and where to inspect.
3) **Propose fixes**: provide a ranked list and ask for approval before edits.
4) If details are missing, ask **targeted questions**.
5) **Stop after the proposal** unless the user explicitly approves a fix.

## Required context checks

Before proposing a fix:
- Read `docs/ARCHITECTURE.md` for project constraints.
- Read `docs/DESIGNSYSTEM.md` for styling rules.
- Read `docs/PRODUCT.md` if UX/content decisions are involved.

## Investigation checklist (Nuxt 4)

Use this checklist and report findings:

**Common causes**
- Non-deterministic render data (Date/Time/Random/UUID).
- Locale/timezone differences.
- Client-only APIs during SSR (`window`, `document`, `matchMedia`, `localStorage`).
- CSS that depends on client state (color mode, viewport size).
- DOM from 3rd-party libs that mutates on mount.
- `v-if`/`v-for` conditions that differ between server and client.
- Async data arriving at different times server vs client.
- Dynamic class/style generation that depends on client-only values.

**Nuxt/Vue patterns to validate**
- `useAsyncData` vs `onMounted` data usage.
- `useHead` with client-only values.
- Color mode or theme class toggle timing.
- `ClientOnly` usage where needed.
- `defineNuxtPlugin` side effects that run on server.
- `watchEffect` or `computed` producing client-only output.

**Styling mismatch cases**
- SSR-generated class lists differ from client.
- `backdrop-filter`/CSS features toggled conditionally.
- CSS variables initialized in browser only.

## Preferred solutions (ranked)

When proposing fixes, prioritize:
1) **Make render deterministic** (seed, stable data, same locale/timezone).
2) **Move client-only logic behind `process.client` / `import.meta.client`**.
3) **Use `ClientOnly` / `Suspense` for truly client-only UI**.
4) **Defer client-only styling changes until mounted**.
5) **Use VueUse composables** to avoid direct browser APIs and to keep SSR-safe behavior.

## Nuxt 4-specific guidance

- Prefer `useAsyncData`/`useFetch` over `onMounted` for SSR data.
- Use `useState` for shared SSR-safe state.
- Avoid client-only `Date.now()` in templates; compute on server or after mount.
- For color mode: ensure class changes do not affect SSR HTML mismatch.
- For 3D/Canvas: gate with `ClientOnly` and lazy-load if needed.

## Output format (always use)

1) **Symptoms recap** (1-2 lines)
2) **Likely causes** (ranked list)
3) **Proposed fixes** (ranked list + file targets)
4) **Questions** (only if needed)
5) **Ask for approval** ("Want me to apply option X?")

## Do not do

- Do not edit files before approval.
- Do not introduce new libraries unless explicitly requested.
- Do not move code between apps (`frontend` ↔ `cms`).

## Invocation

This skill is **manual only** due to `disable-model-invocation: true`.
Use it by calling `/hydration-fix-skill` in chat.

## Example proposal structure

Symptoms: Hydration mismatch in `HeroHeader.vue` (text differs SSR/CSR).

Likely causes:
1) `Date.now()` used in template.
2) `useWindowSize()` in computed classes.

Proposed fixes:
1) Move time output behind `onMounted` + placeholder SSR text.
2) Replace direct `window` usage with VueUse and guard with `import.meta.client`.

Questions:
- Is the timestamp meant to be server-accurate or purely client?

Approval:
- Want me to apply fix 1 or 2?
