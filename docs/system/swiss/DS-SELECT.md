# DS Select

Stand: 2026-03-08  
Status: aktiv

## Ist-Zustand
- Komponente: `/Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsSelect.vue`
- Uno-Shortcuts: `/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/shortcuts.input.ts`
- Tokenquelle: `/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/palette.ts`

### Contract
- Variante: `floating` (einziger aktiver Runtime-Path)
- Props: `modelValue`, `options`, `label`, `hint`, `error`, `required`, `placeholder`, `fillText`, `disabled`, `invalid`, `previewState`
- Option-Shape: `{ label: string, value: string, disabled?: boolean }`
- States: `default`, `hover`, `focus-visible`, `open`, `invalid`, `disabled`
- Scope v1: `single-select`, kein Search, kein Multi-select
- Interaktion: Open nur per expliziter Aktion (`click`, `Enter`, `ArrowDown`)
- Overlay-Prinzip: Replace-Flow (Overlay liegt bei Open exakt ueber dem Trigger und klappt von dort nach unten aus)
- Styling-Engine: Uno shortcuts + CSS/Pseudoklassen, kein lokaler `<style>`-Block
- Debug-Integration: `/Users/flame/Developer/Projects/personal-page/frontend/app/pages/design-system-debug.vue`

## Select-relevante Tokens/Variablen

### Color/BG/Border
- `--color-input-placeholder`
- `--color-input-floating-label`
- `--color-select-shadow`
- `--bg-soft`
- `--bg-soft-hover`
- `--bg-input-error-soft`
- `--border-input-idle`
- `--border-accent-hover`
- `--border-accent`
- `--border-error`
- `--border-disabled`

### Motion
- `--motion-select-overlay-duration`
- `--motion-select-overlay-ease`
- `--motion-select-option-duration`
- `--motion-select-option-ease`
- `--motion-select-option-stagger-step`
- `--motion-select-chevron-duration`
- `--motion-select-chevron-ease`
- `--motion-input-floating-duration`
- `--motion-input-floating-ease`

### Sizing / Control
- `--size-control-lg`
- `--control-border-width`
- `--focus-ring-inner-width`
- `--input-control-padding-y`
- `--input-control-padding-top-floating`
- `--radius-lg`

### Select-Shortcuts
- `ui-select-root`
- `ui-select-shell-base`
- `ui-select-shell-interactive`
- `ui-select-shell-open`
- `ui-select-shell-preview-hover`
- `ui-select-shell-preview-focus-visible`
- `ui-select-shell-invalid`
- `ui-select-shell-disabled`
- `ui-select-trigger-content`
- `ui-select-value-wrap`
- `ui-select-value-wrap-no-label`
- `ui-select-value-text`
- `ui-select-value-placeholder`
- `ui-select-chevron`
- `ui-select-chevron-open`
- `ui-select-overlay-base`
- `ui-select-overlay-open`
- `ui-select-overlay-closed`
- `ui-select-divider`
- `ui-select-option-list`
- `ui-select-option-base`
- `ui-select-option-visible`
- `ui-select-option-hidden`
- `ui-select-option-hoverable`
- `ui-select-option-active`
- `ui-select-option-selected`

## State-Prioritaet (komponente)
- `disabled` > `invalid` > `open/focus` > `hover` > `default`

## JS vs CSS Verantwortung
- In CSS/Uno:
  - Trigger Hover/Focus/Open-Ring
  - Overlay Clip-Curtain Open/Close im Replace-Flow (`top:0`, gleiche Geometrie wie Trigger)
  - Option Hover/Active/Selected + Stagger-Transition
- In JS:
  - Open/Close state + Outside-Click
  - Keyboard-Navigation (`ArrowUp/Down`, `Home/End`, `Enter/Space`, `Escape`)
  - Value-Selection und Focus-Restore
  - Floating Fill-Text Verhalten (`fillText` nur bei focus/open + leerem Wert)
  - Error Shake Trigger (bei neuem/geaendertem Fehlertext)

## A11y
- Trigger: `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`, `aria-describedby`
- Liste: `role="listbox"`
- Optionen: `role="option"`, `aria-selected`
