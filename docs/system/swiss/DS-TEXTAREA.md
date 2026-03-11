# DS Textarea

Stand: 2026-03-11  
Status: aktiv

## Ist-Zustand
- Komponente: `/Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsTextarea.vue`
- Uno-Shortcuts: `/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/shortcuts.input.ts`
- Keyframes: `/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/theme.ts`
- Tokenquelle: `/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/palette.ts`

### Contract
- Variante: `floating` (einziger aktiver Runtime-Path)
- Props: `shape`, `label`, `placeholder`, `fillText`, `hint`, `error`, `invalid`, `required`, `disabled`, `readonly`, `rows`, `maxLength`
- States: `default`, `hover`, `focus-visible`, `invalid`, `readonly`, `readonly-hover`, `disabled`
- Resize: manuell ueber Resize-Handle (unten rechts)
- Error: Icon + Shake-In
- Styling-Engine: CSS/Pseudoklassen (`hover`, `focus-within`, `read-only`) via Uno shortcuts
- Debug-Integration: `/Users/flame/Developer/Projects/personal-page/frontend/app/pages/design-system-debug.vue`

## Textarea-relevante Tokens/Variablen

### Color/BG/Border
- `--color-field-placeholder`
- `--color-field-floating-label`
- `--color-field-meta-subtle`
- `--color-field-readonly-idle-text`
- `--color-field-readonly-hover-text`
- `--color-error-text`
- `--bg-field-error-soft`
- `--border-field-idle`
- `--border-error`
- `--border-accent-hover`
- `--border-accent`

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
- `--size-control-xl`
- `--size-textarea-height-default`
- `--size-textarea-height-focus`
- `--control-border-width`
- `--focus-ring-inner-width`
- `--form-control-inset-x` (Default: `var(--space-5)` = 20px)
- `--space-6`
- `--space-8`
- `--space-2_5`
- `--space-2`

### Textarea-Shortcuts
- `ui-input-shell-base`
- `ui-input-shell-interactive`
- `ui-input-shell-invalid`
- `ui-input-shell-readonly`
- `ui-input-shell-disabled`
- `ui-textarea-shell-floating`
- `ui-textarea-control-base`
- `ui-textarea-meta-row`
- `ui-textarea-resize-handle`
- `ui-input-control-placeholder`
- `ui-input-control-floating-placeholder-hidden`
- `ui-input-control-floating-placeholder-visible`
- `ui-textarea-floating-label-base`
- `ui-input-floating-label-active`
- `ui-input-floating-label-readonly`
- `ui-input-floating-label-disabled`
- `ui-field-error-row`
- `ui-field-error-icon`

## State-Prioritaet (komponente)
- `disabled` > `invalid` > `readonly` > `focus` > `hover` > `default`
- `readonly` blockiert Focus/Hover-Akzentzustand und nutzt eigene Sand-Tokens

## JS vs CSS Verantwortung
- In CSS/Uno:
  - Shell Hover/Focus (`hover`, `focus-within`)
  - Readonly Idle/Hover (Ring, Value, Placeholder, Floating-Label)
  - Resize-Handle Farben (idle/hover/active)
- In JS:
  - Floating Fill-Text Verhalten (`fillText` nur bei Focus + leerem Wert)
  - Error Shake Trigger (bei neuem/veraendertem Fehlertext)
  - Manuelle Hoehensteuerung beim Drag-Resize

## VueUse-Einsatz (verbindlich fuer Runtime-Glue)
- `useEventListener` fuer globale Pointer-Events (`pointermove`, `pointerup`, `pointercancel`)
- Regel: DOM-Listener in DS-Komponenten bevorzugt via VueUse, kein manuelles `addEventListener/removeEventListener` Paar.

## Notizen
- Readonly-State ist im Contract enthalten (paritaet zu `DsInput`) und kann bei Bedarf produktseitig genutzt oder ignoriert werden.
- Form Density ist mit Input/Select vereinheitlicht: horizontaler Inset ueber `--form-control-inset-x`.
- Form Shape folgt derselben Logik wie Input/Select: `rounded` (default) oder `pill`.
- Naming ist auf `field` vereinheitlicht; Legacy-Alias-Tokens werden nicht mehr verwendet.
