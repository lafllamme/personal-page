# DS Badge

Stand: 2026-03-13  
Status: aktiv (doc-first contract)

## Zielbild
- `DsBadge` ist eine nicht-interaktive Label-Komponente fuer kurze Kategorie-, Status- und Meta-Marker.
- V1 ist bewusst read-only:
  - kein selectable chip
  - kein dismissible x-button
  - kein CTA- oder navigation-Verhalten
- Die Komponente bleibt visuell im bestehenden DS-Rahmen:
  - Grundflaechen neutral
  - Accent nur als Signal

## Ist-/Soll-Rahmen
- Doc-first: zuerst Contract, danach Runtime-Implementierung.
- Diese Spezifikation ist die Implementierungsbasis fuer:
  - Komponente `DsBadge.vue`
  - Uno namespace `ui-badge-*`
  - Storybook-Matrix `variant x type x size (+ disabled)`

## Contract (v1)

### Props
- `text: string`
- `variant?: 'default' | 'accent' | 'mixed'` (Default: `default`)
- `type?: 'solid' | 'outline' | 'soft'` (Default: `solid`)
- `size?: 'sm' | 'md'` (Default: `md`)
- `dot?: boolean` (Default: `false`)
- `icon?: string` (optional, ein einzelnes Icon)
- `disabled?: boolean` (Default: `false`)

### States
- `default`
- `disabled`

Hinweis:
- Hover/active/focus-visible sind fuer v1 nicht Teil des Badge-Contracts, da die Komponente read-only ist.
- Falls spaeter Interaktion benoetigt wird, entsteht eine eigene Komponente (`Chip`/`Tag`) statt Badge-v1 aufzuweiten.

## Variant-Matrix (verbindlich)

### Semantik
- `default`: neutral idle
- `accent`: toxic-family idle
- `mixed`: neutrale Basis + accent Signalanteil

### Type-Verhalten
- `solid`: gefuellte Badge-Flaeche
- `outline`: transparente Flaeche mit Border
- `soft`: sehr leichte Flaechenfaerbung, ruhiger als `solid`

### Matrix-Regeln
- `default + solid`:
  - neutral surface + neutral text
- `default + outline`:
  - transparent surface + neutral border + neutral text
- `default + soft`:
  - subtile neutrale surface + neutral text

- `accent + solid`:
  - accent surface + on-accent text
- `accent + outline`:
  - transparent surface + accent border + accent text
- `accent + soft`:
  - subtile accent surface + accent-nahe textfarbe

- `mixed + solid`:
  - neutrale surface + accent signal element (dot oder icon)
- `mixed + outline`:
  - neutral border + accent signal element
- `mixed + soft`:
  - neutrale soft surface + accent signal element

### Disabled-Regel (alle Varianten/Types)
- Kontrast reduziert ueber bestehende disabled token family.
- Kein neuer Farbpfad, keine neuen disabled Sondertokens nur fuer Badge.

## Typografie- und Token-Regeln

### Component Contract (verbindlich)
- Font: `Meta/UI` (`Space Grotesk`)
- Weight:
  - Default `medium`
  - Optional `semibold` fuer signal-stamps (nur wenn textlich notwendig)
- Intention:
  - kurze Kennzeichnung / Label
  - keine Handlungsausloesung
- Color:
  - neutral fuer Basis
  - accent nur als Signal

### Foundation-Anbindung
- Nur bestehende Tokenfamilien:
  - Farbe: bestehende `color-*`, `border-*`, `bg-*` (inkl. accent/disabled)
  - Typografie: bestehende `type-meta-*` Scale
  - Spacing/Radius: bestehende `space-*`, `radius-*`
- Keine ad-hoc Typografie-Werte.
- Keine neue Status-Farbwelt (`success/warning/error/info`) in Badge-v1.

## Accessibility + Usage Guardrails
- Default-Element ist semantisch neutral (`span`-basiert) fuer read-only labeling.
- Badge-v1 hat keinen eigenen Keyboard-/Focus-Contract.
- Text sollte kurz bleiben (kurze Marker, keine langen Saetze).
- Maximal ein visuelles Signal neben Text:
  - entweder Dot
  - oder ein Icon
- Kein Ersatz fuer Buttons, Tabs oder Filterchips.

## Geplanter Runtime-Rahmen
- Komponente (geplant):
  - `/Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsBadge.vue`
- Uno-Shortcuts (geplant):
  - `/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/shortcuts.badge.ts` oder bestehender Shortcut-Block
  - namespace: `ui-badge-*`
- Storybook (geplant):
  - `/Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsBadge.stories.ts`
  - Abdeckung:
    - `variant x type x size`
    - `disabled`
    - Dot/Icon Beispiele

## Abgrenzung zu Tag/Chip
- Es gibt aktuell keine aktive `DsTag`-Komponente.
- `DsBadge` bleibt absichtlich read-only.
- Interaktive Tag/Chip-Szenarien werden spaeter als eigener Contract beschrieben und implementiert.
