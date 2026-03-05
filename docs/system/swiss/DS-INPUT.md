# DS Input

Stand: 2026-03-05  
Status: aktiv

## Ist-Zustand
- Komponente: `/Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsInput.vue`
- Uno-Shortcuts: `/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/shortcuts.input.ts`
- Keyframes: `/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/theme.ts`
- Tokenquelle: `/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/palette.ts`

### Contract
- Varianten: `default`, `floating`
- Props: `label`, `placeholder`, `fillText`, `hint`, `error`, `invalid`, `required`, `disabled`, `previewState`
- States: `default`, `hover`, `focus-visible`, `invalid`, `disabled`
- Error: Icon + Shake-In

## Input-relevante Tokens/Variablen

### Color/BG/Border
- `--color-input-placeholder`
- `--color-input-floating-label`
- `--bg-input-error-soft`
- `--border-input-idle`
- `--border-error`

### Motion
- `--motion-input-floating-duration`
- `--motion-input-floating-ease`
- `--motion-input-shell-duration`
- `--motion-input-shell-ease`
- `--motion-input-error-shake-duration`
- `--motion-input-error-shake-ease`

### Keyframe
- `dsInputErrorShakeIn`

### Input-Shortcuts
- `ui-input-shell-base`
- `ui-input-shell-default`
- `ui-input-shell-floating`
- `ui-input-shell-hover`
- `ui-input-shell-focus`
- `ui-input-shell-invalid`
- `ui-input-shell-disabled`
- `ui-input-control-base`
- `ui-input-control-default`
- `ui-input-control-floating`
- `ui-input-control-placeholder`
- `ui-input-control-floating-placeholder-hidden`
- `ui-input-control-floating-placeholder-visible`
- `ui-input-floating-label-base`
- `ui-input-floating-label-active`
- `ui-input-error-row`
- `ui-input-error-icon`

## Bewusst literal (Stabilitaet)
- `padding-top: 1.125rem`
- `padding-bottom: 0.4375rem`
- `1px` Offsets (floating top/left)
- `scale(0.82)` (floating label)
