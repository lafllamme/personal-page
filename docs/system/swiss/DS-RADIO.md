# DS Radio

Stand: 2026-03-12  
Status: aktiv

## Ist-Zustand
- Komponente: `/Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsRadio.vue`
- Uno-Shortcuts: `/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/shortcuts.input.ts`
- Tokenquelle: `/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/palette.ts`
- Debug-View: `/Users/flame/Developer/Projects/personal-page/frontend/app/pages/design-system-debug.vue`

## Konzept (v1)
- Single-choice Group mit `role="radiogroup"` und Item-Buttons `role="radio"`.
- Visuelle Basis orientiert sich an Base Radio (Animate UI / Base UI): neutraler Ring, kein gefuellter Control-Hintergrund.
- Auswahl erfolgt ueber animierten Dot (scale + opacity), nicht ueber Flaechen-Fill.
- Pro Option wird nur eine Textzeile gerendert (keine zweite Hint-Zeile direkt am Radio).
- Hover/Fokus folgt der Checkbox-/Field-Pragmatik:
  - Hover: etwas staerkerer Ring in Accent-Hover-Farbe
  - Focus-visible: klarer Ring ueber Accent-Focus-Farbe
  - Press-Feedback am Control: `whileHover { scale: 1.05 }`, `whileTap { scale: 0.95 }`
  - Indicator-Motion: Spring (`stiffness: 200`, `damping: 16`)

Referenz:
- `https://animate-ui.com/docs/primitives/base/radio`
- `https://base-ui.com/react/components/radio`

## Contract
- Varianten: `default`, `accent`, `mixed`
- Groessen: `sm`, `md`, `lg`
- Props:
  - `modelValue`
  - `options`
  - `variant`
  - `size`
  - `label`
  - `hint`
  - `error`
  - `required`
  - `disabled`
  - `invalid`
  - `name`
- Value-Typ: `string`
- States: `default`, `hover`, `focus-visible`, `checked`, `invalid`, `required-error`, `disabled`
- Error: Icon + Message + Shake-In (gleiches Pattern wie Input/Checkbox/Select)

## State-Prioritaet
- `disabled > invalid > focus-visible > hover > checked > default`

## Mixed-Variant Verhalten
- `mixed` bleibt im Idle neutral (`color-primary`).
- Im `checked` Zustand wechselt `mixed` auf Accent (`color-accent-ui`) fuer Border + Indicator.
- Ziel: weniger visuelle Haerte als ein dauerhaft accent-getoentes Idle.

## Validation-Verhalten
- `hasError = Boolean(error) || invalid || missingRequiredValue`
- `missingRequiredValue = touched && required && !hasValue`
- Required-Fallback-Text:
  - `Please choose an option.`

## A11y
- Group:
  - `role="radiogroup"`
  - `aria-invalid`
  - `aria-describedby`
- Item:
  - `role="radio"`
  - `aria-checked`
  - `aria-disabled`
- Keyboard:
  - `ArrowLeft/ArrowUp` vorherige Option
  - `ArrowRight/ArrowDown` naechste Option
  - `Home/End` erste/letzte Option
  - `Space/Enter` selektiert aktuelle Option

## Token-/Shortcut-Pfad

### Reused Tokens
- `--border-field-idle`
- `--border-accent-hover`
- `--border-accent`
- `--border-error`
- `--border-disabled`
- `--focus-ring-active-width`
- `--motion-checkbox-shell-duration`
- `--motion-checkbox-shell-ease`
- `--color-primary`
- `--color-accent-ui`
- `--color-accent-strong`
- `--color-error-text`
- `--color-disabled`
- `--size-checkbox-control-sm|md|lg` (v1-Reuse fuer Radio-Control-Groesse)

### Radio Shortcuts
- `ui-radio-root`
- `ui-radio-size-sm|md|lg`
- `ui-radio-group`
- `ui-radio-item`
- `ui-radio-main-row`
- `ui-radio-meta-wrap`
- `ui-radio-control-base`
- `ui-radio-control-variant-default|accent|mixed`
- `ui-radio-control-checked`
- `ui-radio-control-invalid`
- `ui-radio-control-disabled`
- `ui-radio-indicator`
- `ui-radio-label`
- `ui-radio-label-disabled`
- `ui-field-error-row`
- `ui-field-error-icon`
