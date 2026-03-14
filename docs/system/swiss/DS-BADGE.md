# DS Badge

Stand: 2026-03-15  
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
- `type?: 'solid' | 'outline' | 'soft' | 'crisp'` (Default: `solid`)
- `size?: 'sm' | 'md' | 'lg' | 'xl'` (Default: `md`)
- `animation?: 'none' | 'shimmer' | 'beam'` (Default: `none`, optional/experimental)
- `dot?: boolean` (Default: `false`)
- `icon?: string` (optional, ein einzelnes Icon)
- `disabled?: boolean` (Default: `false`)

### States
- `default`
- `disabled`

Hinweis:
- Hover/active/focus-visible sind fuer v1 nicht Teil des Badge-Contracts, da die Komponente read-only ist.
- Falls spaeter Interaktion benoetigt wird, entsteht eine eigene Komponente (`Chip`/`Tag`) statt Badge-v1 aufzuweiten.
- `animation` ist rein dekorativ und darf die Badge-Semantik nicht aendern.
- `animation='beam'` ist immer ein externer 1px Overlay-Ring und bleibt type-preserving (`solid|outline|soft|crisp` werden nicht umcodiert).

## Variant-Matrix (verbindlich)

### Semantik
- `default`: neutral idle
- `accent`: toxic-family idle
- `mixed`: neutrale Basis + accent Signalanteil

### Type-Verhalten
- `solid`: gefuellte Badge-Flaeche
- `outline`: transparente Flaeche mit Border
- `soft`: sehr leichte Flaechenfaerbung, ruhiger als `solid`
- `crisp`: kontraststarker Soft-Ableger fuer editorial Stamps (vorrangig `accent`)

### Matrix-Regeln
- `default + solid`:
  - neutral surface + neutral text
- `default + outline`:
  - transparent surface + neutral border + neutral text
- `default + soft`:
  - subtile neutrale surface + neutral text
- `default + crisp`:
  - kontraststarkes neutrales Inverse-Schema (Sand-Familie, kein Accent)

- `accent + solid`:
  - accent surface + on-accent text
- `accent + outline`:
  - transparent surface + accent border + accent text
- `accent + soft`:
  - subtile accent surface + accent-nahe textfarbe
- `accent + crisp`:
  - mode-adaptiver Kontrast-Look (Light dichter/invers, Dark crisp/hell)

- `mixed + solid`:
  - neutrale surface + accent signal element (dot oder icon)
- `mixed + outline`:
  - neutral border + accent signal element
- `mixed + soft`:
  - neutrale soft surface + accent signal element
- `mixed + crisp`:
  - gleiche Basis wie `default + crisp` + Accent nur als Signal (dot/icon)

### Disabled-Regel (alle Varianten/Types)
- Kontrast reduziert ueber bestehende disabled token family.
- Kein neuer Farbpfad, keine neuen disabled Sondertokens nur fuer Badge.
- Bei `disabled` laufen keine Badge-Animationen (`shimmer`/`beam` deaktiviert).

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
- Badge-Animationen laufen ueber Tokenfamilien:
  - Motion: `--motion-badge-shimmer-*`, `--motion-badge-beam-*`
  - Farbe: `--color-badge-shimmer-highlight`, `--color-badge-beam-*`
  - Beam-Ring: `--size-badge-beam-ring-width` (+ optionaler inner-offset radius token)
- Keine ad-hoc Typografie-Werte.
- Keine neue Status-Farbwelt (`success/warning/error/info`) in Badge-v1.

### Size-Ratio Ladder (tokenisiert)
- `sm`:
  - `height: --size-badge-height-sm`
  - `dot: --size-badge-dot-sm`
  - `text: meta/2xs`
  - `icon: xs`
- `md`:
  - `height: --size-badge-height-md`
  - `dot: --size-badge-dot-md`
  - `text: meta/xs`
  - `icon: sm`
- `lg`:
  - `height: --size-badge-height-lg`
  - `dot: --size-badge-dot-lg`
  - `text: meta/sm`
  - `icon: md`
- `xl`:
  - `height: --size-badge-height-xl`
  - `dot: --size-badge-dot-xl`
  - `text: meta/md`
  - `icon: lg`

## Accessibility + Usage Guardrails
- Default-Element ist semantisch neutral (`span`-basiert) fuer read-only labeling.
- Badge-v1 hat keinen eigenen Keyboard-/Focus-Contract.
- Text sollte kurz bleiben (kurze Marker, keine langen Saetze).
- Maximal ein visuelles Signal neben Text:
  - entweder Dot
  - oder ein Icon
- Kein Ersatz fuer Buttons, Tabs oder Filterchips.

## Runtime-Stand
- Komponente:
  - `/Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsBadge.vue`
- Uno-Shortcuts:
  - `/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/shortcuts.badge.ts`
  - namespace: `ui-badge-*`
- Storybook:
  - `/Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsBadge.stories.ts`
  - Abdeckung:
    - `variant x type` Matrix (default/accent/mixed x solid/outline/soft/crisp)
    - `size` (`sm|md|lg|xl`)
    - `shape` (`pill|rounded`)
    - `states` (`disabled`, dot/icon helper)
    - `animation` (`none|shimmer|beam`, inkl. disabled animation-off)

## Tokenisierung (Stand)
- Badge-Farben/Motion/Radius/Spacing laufen ueber DS-Tokenpfad (`palette.ts` + `ui-badge-*` Shortcuts).
- Keine komponentenlokalen Stylebloecke in `DsBadge.vue`.
- Verbleibende feste Werte in Shortcut-Gradients (z. B. Prozent-Stops) sind bewusst Effektparameter und keine Layout-/Spacing-Token.

## Abgrenzung zu Tag/Chip
- Es gibt aktuell keine aktive `DsTag`-Komponente.
- `DsBadge` bleibt absichtlich read-only.
- Interaktive Tag/Chip-Szenarien werden spaeter als eigener Contract beschrieben und implementiert.
