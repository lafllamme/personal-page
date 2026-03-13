# DS Switch

Stand: 2026-03-13  
Status: aktiv

## Ist-Zustand
- Komponente: `/Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsSwitch.vue`
- Uno-Shortcuts: `/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/shortcuts.input.ts`
- Tokenquelle: `/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/palette.ts`
- Storybook: `/Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsSwitch.stories.ts`
- Debug-View: `/Users/flame/Developer/Projects/personal-page/frontend/app/pages/design-system-debug.vue`

## Zielbild
- `DsSwitch` als klare Toggle-Primitive fuer binary settings (`on/off`).
- Visuelle Richtung nah an Animate UI Base Switch:
  - cleaner Track
  - Thumb als klarer, animierter Marker
  - Press-Feedback auf Thumb (kurzes Breiterwerden)
- Design-System-konform mit bestehendem Form-/Selection-Block (`Input`, `Select`, `Checkbox`, `Radio`).

## Referenzrichtung
- `https://animate-ui.com/docs/primitives/base/switch`
- Base-Idee:
  - Track wechselt von neutral auf accent bei `checked`
  - Thumb bewegt sich mit Spring
  - Press-Animation auf Thumb bei Tap

## Scope v1
- Nur `checked` Toggle, kein tri-state.
- Kein `readonly` in v1.
- Optionales Label rechts vom Switch (wie Demo), ohne extra komplexe Layout-Modi.
- Error/Hint/Required analog Field-Pattern.

## Props (v1 Vorschlag)
- `modelValue?: boolean`
- `variant?: 'default' | 'accent' | 'mixed'`
- `size?: 'sm' | 'md' | 'lg'`
- `label?: string`
- `hint?: string`
- `error?: string`
- `required?: boolean`
- `disabled?: boolean`
- `invalid?: boolean`

## Events
- `update:modelValue`
- `focus`
- `blur`

## States
- `default`
- `hover`
- `active` (tap/press)
- `focus-visible`
- `checked`
- `invalid`
- `required-error`
- `disabled`

## State-Prioritaet (v1)
- `disabled > invalid > focus-visible > checked > hover > default`
- Active/press ist eine kurze Motion-Schicht ueber dem aktuellen visuellen State.

## Variant Matrix (verbindlich)
- `default`: neutral idle -> primary active
- `accent`: toxic-family idle -> toxic-family active
- `mixed`: neutral idle -> toxic-family active

## Interaction Color Rule (verbindlich)
- `hover` und `focus-visible` sind globales Interaktionssignal und bleiben variant-unabhaengig toxic-basiert.
- Variant-Unterschiede liegen in `idle` und `checked`, nicht in separaten Hover-Paletten pro Variante.

## Motion-Konzept
- Root:
  - `whileTap` fuer kurze Press-Reaktion
- Thumb:
  - Spring-Transition fuer Positionswechsel (`justify-start/end` + `layout`)
  - Press-Animation (`pressedAnimation`) fuer Breite beim Tap
- Tokens (neu, v1 Vorschlag):
  - `--motion-switch-track-duration`
  - `--motion-switch-track-ease`
  - `--motion-switch-thumb-duration`
  - `--motion-switch-thumb-ease`
  - `--motion-switch-press-duration`

## Visuelles Konzept
- Track:
  - idle:
    - `default`, `mixed`: neutral border/surface
    - `accent`: toxic-getoente Border + Thumb
  - checked: accent background + accent border
- Thumb:
  - kontrastreiche Kreisflaeche
  - bei checked an rechter Position
  - bei unchecked an linker Position
- Mixed:
  - idle neutral
  - checked wie accent

## A11y
- `role="switch"`
- `aria-checked`
- `aria-invalid`
- `aria-describedby` (hint/error)
- Keyboard:
  - `Space` / `Enter` toggelt
  - `Tab` Fokus

## Runtime-Struktur (geplant)
- Komponente:
  - `frontend/app/components/ui/DesignSystem/DsSwitch.vue`
- Uno-Shortcuts:
  - `frontend/app/assets/unocss/shortcuts.input.ts`
- Contract:
  - `docs/system/swiss/DS-SWITCH.md`

## Shortcut-Namespace (geplant)
- `ui-switch-root`
- `ui-switch-main-row`
- `ui-switch-track-base`
- `ui-switch-track-variant-default|accent|mixed`
- `ui-switch-track-checked`
- `ui-switch-track-invalid`
- `ui-switch-track-disabled`
- `ui-switch-thumb`
- `ui-switch-thumb-checked`
- `ui-switch-label`
- `ui-switch-label-disabled`
- `ui-field-error-row`
- `ui-field-error-icon`

## Testing-Checkliste (v1)
1. Toggle per click/tap
2. Toggle per keyboard (`Space`, `Enter`)
3. Focus-visible Ring sichtbar und farblich konsistent
4. Disabled blockiert Interaction + Focus
5. Invalid/Required zeigt Error-Row + Shake nur auf Message
6. Varianten `default/accent/mixed`
7. Groessen `sm/md/lg`
