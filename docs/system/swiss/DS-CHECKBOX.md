# DS Checkbox

Stand: 2026-03-11  
Status: aktiv

## Ist-Zustand
- Komponente: `/Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsCheckbox.vue`
- Uno-Shortcuts: `/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/shortcuts.input.ts`
- Tokenquelle: `/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/palette.ts`
- Debug-View: `/Users/flame/Developer/Projects/personal-page/frontend/app/pages/design-system-debug.vue`

### Contract
- Varianten: `default`, `accent`, `mixed`
- Groessen: `sm`, `md`, `lg`
- Props: `label`, `hint`, `error`, `invalid`, `required`, `disabled`
- Value-Typ: `boolean`
- States: `default`, `checked`, `hover`, `active`, `focus-visible`, `invalid`, `required-error`, `disabled`
- Error: Icon + Message + Shake-In (gleiches Pattern wie `DsInput`)
- Styling-Engine: Uno-Shortcuts + Motion (`motion-v`) fuer Shell- und Checkmark-Animation

## Checkbox-relevante Tokens/Variablen

### Color/BG/Border
- `--bg-inverse`
- `--bg-soft-disabled`
- `--bg-accent-soft`
- `--bg-field-error-soft`
- `--color-primary`
- `--color-inverse`
- `--color-accent-ui`
- `--color-accent-strong`
- `--color-on-accent`
- `--color-error-text`
- `--color-disabled`
- `--border-field-idle`
- `--border-accent-hover`
- `--border-error`
- `--border-disabled`

### Motion
- `--motion-checkbox-shell-duration`
- `--motion-checkbox-shell-ease`
- `--motion-checkbox-check-duration`
- `--motion-checkbox-check-delay`
- Hover/Tap: `scale 1.05 / 0.95`

### Sizing / Control
- `--control-border-width`
- `--focus-ring-inner-width`
- `--focus-ring-active-width`
- `--ds-checkbox-control-size` (je groesse gesetzt)
- `--size-checkbox-control-sm`
- `--size-checkbox-control-md`
- `--size-checkbox-control-lg`
- `--radius-checkbox-sm`
- `--radius-checkbox-md`
- `--radius-checkbox-lg`
- `--size-checkbox-indicator`
- `--size-checkbox-check-stroke`

### Checkbox-Shortcuts
- `ui-checkbox-root`
- `ui-checkbox-hit`
- `ui-checkbox-main-row`
- `ui-checkbox-meta-wrap`
- `ui-checkbox-control-base`
- `ui-checkbox-control-sm`
- `ui-checkbox-control-md`
- `ui-checkbox-control-lg`
- `ui-checkbox-control-variant-default`
- `ui-checkbox-control-variant-accent`
- `ui-checkbox-control-variant-mixed`
- `ui-checkbox-control-invalid`
- `ui-checkbox-control-disabled`
- `ui-checkbox-indicator`
- `ui-checkbox-check-path`
- `ui-checkbox-label`
- `ui-checkbox-label-disabled`
- `ui-field-error-row`
- `ui-field-error-icon`

## State-Prioritaet (komponente)
- `disabled` > `invalid` > `focus-visible` > `hover` > `default`
- `required-error` ist Teil von `invalid` (wenn kein expliziter `error`-Text gesetzt ist, wird fallback genutzt)
- Checkbox-Interaktionsring skaliert ueber `--focus-ring-active-width` (1.5px), damit kleine Control-Flaechen visuell zu Input/Select passen.
- Spezialfall `accent + checked + focus-visible` nutzt Single-Ring in `--border-accent-hover` (kein Double-Ring).

## JS vs CSS Verantwortung
- In CSS/Uno:
  - Geometrie (size/radius)
  - Variant-Idle-Styles
  - Focus/Invalid/Disabled-Ring und Border
- In JS:
  - Variant-/State-Aufloesung ueber statische Object-Maps (`sizeClassMap`, `variantClassMap`, `variantColorMap`, `stateOverrideMap`)
  - Interaction-Resolver ueber Keymap (`interactionStateKey`, `interactionMotionMap`, `stateOverrideKey`)
  - Toggle-Logik (`boolean` only)
  - Required-on-blur Validation (`missingRequiredValue`)
  - Resolved Error-Text (`error` hat Vorrang, sonst fallback)
  - Error-Shake Trigger bei neuem/veraendertem Fehler
  - Motion-Animation fuer Shell + Checkmark

## Validation-Verhalten
- `hasError = Boolean(error) || invalid || missingRequiredValue`
- `missingRequiredValue = touched && required && !checked`
- Fallback-Text bei required:
  - `Please confirm this field.`

## Accessibility
- `role="checkbox"`
- `aria-checked` (`true`/`false`)
- `aria-invalid`
- `aria-describedby` auf hint/error
- `disabled` setzt `tabindex=-1`
- SVG/Path sind nicht fokusierbar (`focusable="false"`, `tabindex="-1"`)

## Scope-Entscheidungen
- Kein `readonly`-State fuer Checkbox.
- Kein `indeterminate`-UI (nur Checkmark als visueller Indicator).
- Mixed bleibt als eigene Farbvariante aktiv, ohne eigenen Indicator-Typ.
- Error-Row folgt dem gemeinsamen Field-Pattern (`ui-field-error-row` + `ui-field-error-icon`) ohne Legacy-Sonderpfad.
