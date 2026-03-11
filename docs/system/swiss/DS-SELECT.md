# ds-select

Stand: 2026-03-11  
Status: aktiv

## Komponente
- Runtime: `/Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsSelect.vue`
- Storybook: `/Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsSelect.stories.ts`
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
- `--color-field-placeholder`
- `--color-field-floating-label`
- `--color-select-shadow`
- `--color-select-indicator`
- `--color-accent-ui`
- `--color-error-text`
- `--border-field-idle`
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

## Shortcut-Inventar (runtime, `ui-select-*`)

### Root / Shape / Layer
- `ui-select-root`
- `ui-select-vars`
- `ui-select-shape-rounded`
- `ui-select-shape-pill`
- `ui-select-root-layer`
- `ui-select-slot`

### Panel / Header
- `ui-select-panel`
- `ui-select-panel-motion`
- `ui-select-panel-idle`
- `ui-select-panel-hoverable`
- `ui-select-panel-hover`
- `ui-select-panel-focus`
- `ui-select-panel-invalid`
- `ui-select-panel-disabled`
- `ui-select-header`
- `ui-select-header-motion`
- `ui-select-header-disabled`
- `ui-select-header-divider`
- `ui-select-header-divider-open`

### Content / Label / Value / Chevron
- `ui-select-content`
- `ui-select-content-labeled`
- `ui-select-label`
- `ui-select-label-floating`
- `ui-select-value`
- `ui-select-value-placeholder`
- `ui-select-value-empty`
- `ui-select-chevron`
- `ui-select-chevron-open`

### Body / List / Option / Indicator
- `ui-select-body`
- `ui-select-body-open`
- `ui-select-list`
- `ui-select-option`
- `ui-select-option-open`
- `ui-select-option-highlighted`
- `ui-select-option-selected`
- `ui-select-option-selected-highlighted`
- `ui-select-option-disabled`
- `ui-select-empty`
- `ui-select-indicator-dot`
- `ui-select-indicator-dot-visible`

### Meta
- `ui-select-error-row`
- `ui-select-hint`

## JS vs CSS Verantwortung
- CSS/Uno:
  - Ring-States, Divider, Overlay-Transitions, Option-Stagger, Hover/Selected, Error-row animation
- JS:
  - Open/Close, Keyboard, Outside click, Focus-Restore, FillText/Floating-Logik, Required-on-blur error state

## Storybook-Abdeckung (Ist-Stand)
- `Playground`
- `State / Default`
- `State / Hover`
- `State / Focus visible`
- `State / Selected value`
- `State / Open interaction`
- `State / Error`
- `State / Disabled`
- `State / Empty options`
- `Shape / Rounded (default)`
- `Shape / Pill`

## Offene Punkte
- Keine offenen Naming-Cleanup-Punkte im Select-Shortcut-Bereich.
- Select ist auf finalem Shortcut-Namespace `ui-select-*` ohne Legacy-Pfade.
