# Token Layers (Active Contract)

Stand: 2026-02-20  
Status: Verbindlicher Token- und Naming-Contract fuer den UI-Build

Diese Datei ist die zentrale Quelle fuer Token-Layering, Naming und Runtime-Guardrails.

## 1) Layer Model

### Foundation
- Zweck: rohe Farb-/Skalenquellen ohne UI-Bedeutung.
- Beispiele:
  - `pure-black`, `pure-white`
  - `toxic-1 ... toxic-12`
- Regel: keine Component-Namen, keine States.

### Semantic
- Zweck: globale UI-Rollen, komponentenunabhaengig.
- Beispiele:
  - `color-primary`, `color-inverse`, `color-accent`
  - `bg-solid`, `bg-overlay-hover`
  - `border-primary`, `ring-default-primary`
- Regel: beschreibt Bedeutung/Rolle, nicht Komponente.

### Variant
- Zweck: wiederverwendbare interaktive Muster fuer Intent + Style.
- Prefix: `v-`
- Schema: `v-{intent}-{style}`
- Beispiele:
  - `v-neutral-solid`
  - `v-neutral-outline`
  - `v-neutral-ghost`
  - `v-neutral-soft`
  - `v-accent-solid`
  - `v-accent-outline`
  - `v-accent-ghost`
  - `v-accent-soft`
- Regel: komponentenuebergreifend (Button, Card, Accordion, Tabs, ...).

### Structure
- Zweck: strukturelle Shells fuer wiederkehrende UI-Huellen.
- Prefix: `ui-`
- Beispiele:
  - `ui-button-base`
  - `ui-button-label`
  - `ui-ghost-button`
  - `ui-ghost-label`
- Regel: nur fuer Struktur, nicht fuer Farb-/State-Logik.

## 2) Naming Contract

- Globales Tokenformat: `domain-role-state`
- Component-Tokenformat (nur wenn noetig): `component-variant-type-role-state`
- Variant-Shortcutformat: `v-{intent}-{style}`
- Structure-Shortcutformat: `ui-{component}-{role}`

### Domains
- `color-*` fuer Text/Icon
- `bg-*` fuer Flaechen/Fills
- `border-*` fuer Outlines/Strokes
- `ring-*` fuer Focus-Ringe
- `toxic-*` fuer Palette-Skala

### Beispiele
- `color-primary`
- `bg-solid-hover`
- `border-accent-soft`
- `ring-accent-secondary`
- `toxic-11`
- `v-neutral-solid`
- `v-accent-ghost`
- `ui-button-base`

## 3) Runtime Guardrails (UnoCSS)

- UnoCSS-Klassen muessen statisch im Source stehen.
- Keine dynamische Klassen-Generierung per Runtime-String.
- Bei Variant-Mapping immer voll ausgeschriebene Klassenstrings verwenden.
- Bei States explizite Suffixe nutzen:
  - `hover`
  - `active`
  - `disabled`
  - `focus` / `focus-visible`

## 4) Reserved vs Active

### Active
- Tokens und Varianten, die aktuell in `palette.ts` und `shortcuts.*.ts` verwendet werden.
- Design-Entscheidungen dazu liegen in:
  - [`docs/system/swiss/DESIGNSYSTEM.md`](file:///Users/flame/Developer/Projects/personal-page/docs/system/swiss/DESIGNSYSTEM.md)

### Reserved
- Tokens, die bereits benannt sind, aber noch nicht produktiv genutzt werden.
- Regel: Reserved bleibt dokumentiert, wird aber nicht als Build-Contract behandelt.

## 5) Source Intent (kompakt)

- Basiswirkung stammt aus dem Winner-Flow `P04-MPZ01`.
- Accent-System basiert auf `Radix Teal 9/11`.
- Herkunfts-/Inspirationstiefe bleibt in:
  - [`docs/inspiration/designs/TOKEN-REFERENZEN.md`](file:///Users/flame/Developer/Projects/personal-page/docs/inspiration/designs/TOKEN-REFERENZEN.md)
- Finale Build-Regeln bleiben in:
  - [`docs/system/swiss/DESIGNSYSTEM.md`](file:///Users/flame/Developer/Projects/personal-page/docs/system/swiss/DESIGNSYSTEM.md)

## 6) Change Rules

- Keine neuen `button-*` Farb-Tokens in `palette.ts`.
- Neue interaktive Muster zuerst als `v-*` definieren.
- Erst Contract-Doku updaten, dann Runtime-Code.
- Komponentenspezifische Struktur-Shortcuts getrennt von Variant-Shortcuts halten.
