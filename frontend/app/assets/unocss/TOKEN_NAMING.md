# Uno Token Naming

## Goal

- Keep token names readable, predictable, and reusable.
- Use semantic domains first, component-specific tokens only when needed.

## Naming Format

- Global token format: `domain-role-state`
- Component token format: `component-variant-type-role-state`
- Variant shortcut format: `v-{intent}-{style}`
- Structure shortcut format: `ui-{component}-{role}`

## Domains

- `color-*` for text/icon color
- `bg-*` for surfaces/fills
- `border-*` for outlines/strokes
- `ring-*` for focus rings
- `toxic-*` for palette scale (`1..12`)

## Examples

- `color-primary`
- `color-inverse`
- `bg-solid-hover`
- `border-accent-soft`
- `ring-accent-secondary`
- `toxic-11`
- `v-neutral-solid`
- `v-accent-ghost`
- `ui-button-base`

## Usage in Uno

- Use `$` syntax in shortcuts/components:
  - `color-$color-primary`
  - `bg-$bg-solid`
  - `border-$border-accent`
  - `bg-$toxic-4`

## Rules

- No abbreviations like `btn-def-pri`.
- Prefer semantic names over visual names.
- Keep state suffixes explicit:
  - `hover`
  - `active`
  - `disabled`
  - `focus`
- If a token is shared across components, keep it global.
- If a token is truly component-specific, prefix with component name.
- Keep component structure shortcuts in dedicated files (`shortcuts.button.ts`), and shared interaction variants in `shortcuts.variants.ts`.
