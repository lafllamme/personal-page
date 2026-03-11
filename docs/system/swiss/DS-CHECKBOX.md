# DS Checkbox

Stand: 2026-03-10  
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
- `--bg-input-error-soft`
- `--color-primary`
- `--color-inverse`
- `--color-accent-ui`
- `--color-accent-strong`
- `--color-on-accent`
- `--color-error-text`
- `--color-disabled`
- `--border-input-idle`
- `--border-accent-hover`
- `--border-error`
- `--border-disabled`

### Motion
- Shell-Fill: `500ms` (`cubic-bezier(0.22,1,0.36,1)`)
- Checkmark-Draw (checked): `200ms` + `200ms delay`
- Checkmark-Draw (unchecked): `200ms`
- Hover/Tap: `scale 1.05 / 0.95`

### Sizing / Control
- `--control-border-width`
- `--focus-ring-inner-width`
- `--ds-checkbox-control-size` (je groesse gesetzt)

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

## State-Prioritaet (komponente)
- `disabled` > `invalid` > `focus-visible` > `hover` > `default`
- `required-error` ist Teil von `invalid` (wenn kein expliziter `error`-Text gesetzt ist, wird fallback genutzt)

## JS vs CSS Verantwortung
- In CSS/Uno:
  - Geometrie (size/radius)
  - Variant-Idle-Styles
  - Focus/Invalid/Disabled-Ring und Border
- In JS:
  - Variant-/State-Aufloesung ueber statische Object-Maps (`sizeClassMap`, `variantClassMap`, `variantColorMap`, `stateOverrideMap`)
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
