# Uno Token Naming

## Goal

- Keep token names readable, predictable, and reusable.
- Use semantic domains first, component-specific tokens only when needed.

## Naming Format

- Global token format: `domain-role-state`
- Component token format: `component-variant-type-role-state`

## Domains

- `color-*` for text/icon color
- `background-*` for surfaces/fills
- `border-*` for outlines/strokes
- `ring-*` for focus rings
- `toxic-*` for palette scale (`1..12`)

## Examples

- `color-primary`
- `color-inverse`
- `background-solid-hover`
- `border-accent-soft`
- `ring-accent-secondary`
- `toxic-11`

## Usage in Uno

- Use `$` syntax in shortcuts/components:
  - `text-$color-primary`
  - `bg-$background-solid`
  - `border-$border-accent`
  - `bg-$toxic-4`

## Rules

- No abbreviations like `btn-def-pri`.
- Prefer semantic names over visual names.
- Keep state suffixes explicit:
  - `hover`
  - `active`
  - `disabled`
  - `focus-visible`
- If a token is shared across components, keep it global.
- If a token is truly component-specific, prefix with component name.
