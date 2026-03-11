# DS Input

Stand: 2026-03-06  
Status: aktiv

## Ist-Zustand
- Komponente: `/Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsInput.vue`
- Uno-Shortcuts: `/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/shortcuts.input.ts`
- Keyframes: `/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/theme.ts`
- Tokenquelle: `/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/palette.ts`

### Contract
- Varianten: `default`, `floating`
- Props: `shape`, `label`, `placeholder`, `fillText`, `hint`, `error`, `invalid`, `required`, `disabled`, `readonly`
- States: `default`, `hover`, `focus-visible`, `invalid`, `readonly`, `readonly-hover`, `disabled`
- Error: Icon + Shake-In
- Styling-Engine: CSS/Pseudoklassen (`hover`, `focus-within`, `read-only`) via Uno shortcuts
- Storybook: `/Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsInput.stories.ts`
  - States werden interaktiv/visuell in Storybook gezeigt (ohne `previewState`-Prop im Component-API)

## Input-relevante Tokens/Variablen

### Color/BG/Border
- `--color-field-placeholder`
- `--color-field-floating-label`
- `--color-field-readonly-idle-text`
- `--color-field-readonly-hover-text`
- `--bg-field-error-soft`
- `--border-field-idle`
- `--border-error`

### Motion
- `--motion-input-floating-duration`
- `--motion-input-floating-ease`
- `--motion-input-shell-duration`
- `--motion-input-shell-ease`
- `--motion-input-error-shake-duration`
- `--motion-input-error-shake-ease`

### Keyframe
- `shake-in`

### Sizing / Control
- `--radius-form-rounded` (`0.5rem` / 8px, Component-Default)
- `--radius-form-pill` (`1rem` / 16px, Option)
- `--control-border-width`
- `--focus-ring-inner-width`
- `--focus-ring-active-width`
- `--form-control-inset-x` (Default: `var(--space-5)` = 20px)
- `--input-control-padding-y`
- `--input-control-padding-top-floating`

### Input-Shortcuts
- `ui-input-shell-base`
- `ui-input-shell-default`
- `ui-input-shell-floating`
- `ui-input-shell-interactive`
- `ui-input-shell-invalid`
- `ui-input-shell-readonly`
- `ui-input-shell-disabled`
- `ui-input-control-base`
- `ui-input-control-readonly`
- `ui-input-control-default`
- `ui-input-control-floating`
- `ui-input-control-placeholder`
- `ui-input-control-floating-placeholder-hidden`
- `ui-input-control-floating-placeholder-visible`
- `ui-input-floating-label-base`
- `ui-input-floating-label-active`
- `ui-input-floating-label-readonly`
- `ui-field-error-row`
- `ui-field-error-icon`

## State-Prioritaet (komponente)
- `disabled` > `invalid` > `readonly` > `focus` > `hover` > `default`
- `readonly` blockiert Focus/Hover-Akzentzustand und verwendet eigene Sand-Tokens

## JS vs CSS Verantwortung
- In CSS/Uno:
  - Shell Hover/Focus (`hover`, `focus-within`)
  - Readonly Idle/Hover (Ring, Value, Placeholder, Floating-Label)
- In JS:
  - Floating Fill-Text Verhalten (`fillText` nur bei Focus + leerem Wert)
  - Error Shake Trigger (bei neuem/veraendertem Fehlertext)

## WCAG (Readonly Text vs Field Surface)
- Light idle: `4.61:1` (AA pass)
- Light hover: `10.79:1` (AA pass)
- Dark idle: `4.54:1` (AA pass)
- Dark hover: `8.05:1` (AA pass)

## Bewusst literal (Stabilitaet)
- `1px` Offsets (floating top/left)
- `scale(0.82)` (floating label)

## Form Density (2026-03-08)
- Horizontaler Content-Inset fuer Form-Controls ist vereinheitlicht auf `--form-control-inset-x`.
- Defaultwert: `20px` (`var(--space-5)`).
- Betrifft Shell-Padding und Floating-Label-X-Anker.

## Form Shape (2026-03-08)
- `shape='rounded'` ist der Default fuer `DsInput` (8px).
- `shape='pill'` steht als weichere Alternative zur Verfuegung (16px).
- Shape wirkt nur auf den Radius, nicht auf Padding, Hoehe oder State-Motion.
