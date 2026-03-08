# ds-select

Stand: 2026-03-08  
Status: aktiv

## Komponente
- Runtime: `/Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsSelect.vue`
- Uno-Shortcuts: `/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/shortcuts.input.ts`
- Tokens: `/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/palette.ts`
- Theme/Keyframes: `/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/theme.ts`
- Debug-Referenz: `/Users/flame/Developer/Projects/personal-page/frontend/app/pages/design-system-debug.vue`

## ID / Matrix / Contract
- DS-ID: `ds-select-v1`
- Matrix-Rolle: Form Controls / Choice Controls / Single Select
- Scope: `single-select` only (kein Search, kein Multi)
- Overlay-Architektur: Replace-Flow (Open-Panel ueberdeckt Trigger nahtlos)

## Props
- `modelValue?: string`
- `options?: { label: string; value: string; disabled?: boolean }[]`
- `shape?: 'pill' | 'rounded'` (Default: `rounded`)
- `label?: string`
- `hint?: string`
- `error?: string`
- `required?: boolean`
- `placeholder?: string`
- `fillText?: string` (Default: `Please choose an option`)
- `emptyText?: string` (Default: `No entries available`)
- `disabled?: boolean`
- `invalid?: boolean`
- `previewState?: 'default' | 'hover' | 'focus-visible'`

## Events
- `update:modelValue`
- `focus`
- `blur`

## State-Prioritaet
- `disabled` > `invalid` > `open/focus` > `hover` > `default`

## Verhalten
- Open nur via explizite Aktion: `click`, `Enter`, `ArrowDown`
- Keyboard: `ArrowUp/Down`, `Home/End`, `Enter/Space`, `Escape`, `Tab`
- Optionen intern alphabetisch sortiert (`label`, localeCompare)
- Required-on-blur:
  - wenn `required=true` und kein Wert: Error-Message unten
  - nur Error-Message shake't (`animate-shake-in`), nicht das Feld
  - bei Auswahl wird der interne Blur-Error zurueckgesetzt

## A11y
- Trigger: `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`, `aria-invalid`, `aria-describedby`
- List: `role="listbox"`
- Option: `role="option"`, `aria-selected`

## Token-Inventar (verwendet)

### Color / Border / Surface
- `--bg-inverse`
- `--color-input-placeholder`
- `--color-input-floating-label`
- `--color-select-shadow`
- `--color-select-indicator`
- `--color-accent-ui`
- `--color-error-text`
- `--border-input-idle`
- `--border-accent-hover`
- `--border-accent`
- `--border-error`
- `--border-disabled`
- `--border-quaternary`

### Motion
- `--motion-input-floating-duration`
- `--motion-input-floating-ease`
- `--motion-input-error-shake-duration`
- `--motion-input-error-shake-ease`
- `--ds-select-motion-ease` (lokale Select-Variable)

### Geometry / Size / Radius / Spacing
- `--size-control-lg`
- `--control-border-width`
- `--focus-ring-inner-width`
- `--form-control-inset-x`
- `--input-control-padding-y`
- `--input-control-padding-top-floating`
- `--radius-form-rounded`
- `--radius-form-pill`
- `--space-5` (ueber `form-control-inset-x`)
- `--space-2_5`
- `--space-2`
- `--space-3`
- `--space-2_5`
- `--space-2`

## Shortcut-Inventar (runtime, `ui-select-current-*`)

### Root / Shape / Layer
- `ui-select-current-root`
- `ui-select-current-vars`
- `ui-select-current-shape-rounded`
- `ui-select-current-shape-pill`
- `ui-select-current-root-layer`
- `ui-select-current-slot`

### Panel / Header
- `ui-select-current-panel`
- `ui-select-current-panel-motion`
- `ui-select-current-panel-idle`
- `ui-select-current-panel-hoverable`
- `ui-select-current-panel-hover`
- `ui-select-current-panel-focus`
- `ui-select-current-panel-invalid`
- `ui-select-current-panel-disabled`
- `ui-select-current-header`
- `ui-select-current-header-motion`
- `ui-select-current-header-disabled`
- `ui-select-current-header-divider`
- `ui-select-current-header-divider-open`

### Content / Label / Value / Chevron
- `ui-select-current-content`
- `ui-select-current-content-labeled`
- `ui-select-current-label`
- `ui-select-current-label-floating`
- `ui-select-current-value`
- `ui-select-current-value-placeholder`
- `ui-select-current-value-empty`
- `ui-select-current-chevron`
- `ui-select-current-chevron-open`

### Body / List / Option / Indicator
- `ui-select-current-body`
- `ui-select-current-body-open`
- `ui-select-current-list`
- `ui-select-current-option`
- `ui-select-current-option-open`
- `ui-select-current-option-highlighted`
- `ui-select-current-option-selected`
- `ui-select-current-option-selected-highlighted`
- `ui-select-current-option-disabled`
- `ui-select-current-empty`
- `ui-select-current-indicator-dot`
- `ui-select-current-indicator-dot-visible`

### Meta
- `ui-select-current-error-row`
- `ui-select-current-hint`

## JS vs CSS Verantwortung
- CSS/Uno:
  - Ring-States, Divider, Overlay-Transitions, Option-Stagger, Hover/Selected, Error-row animation
- JS:
  - Open/Close, Keyboard, Outside click, Focus-Restore, FillText/Floating-Logik, Required-on-blur error state

## Offene Punkte
- In `shortcuts.input.ts` existiert noch ein alter ungenutzter Select-Block `ui-select-*` (ohne `-current-`).
- Vorschlag: in separatem Cleanup-Commit entfernen, sobald keine Referenz mehr gebraucht wird.
