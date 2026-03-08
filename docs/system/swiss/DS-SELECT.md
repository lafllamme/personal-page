# DS Select

Stand: 2026-03-08  
Status: aktiv

## Ist-Zustand
- Komponente: `/Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsSelect.vue`
- Uno-Shortcuts: `/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/shortcuts.input.ts`
- Tokenquelle: `/Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/palette.ts`

### Contract
- Variante: `floating` (einziger aktiver Runtime-Path)
- Props: `modelValue`, `options`, `shape`, `label`, `hint`, `error`, `required`, `placeholder`, `fillText`, `emptyText`, `disabled`, `invalid`, `previewState`
- Option-Shape: `{ label: string, value: string, disabled?: boolean }`
- States: `default`, `hover`, `focus-visible`, `open`, `invalid`, `disabled`
- Scope v1: `single-select`, kein Search, kein Multi-select
- Interaktion: Open nur per expliziter Aktion (`click`, `Enter`, `ArrowDown`)
- Overlay-Prinzip: Replace-Flow (Overlay liegt bei Open exakt ueber dem Trigger und klappt von dort nach unten aus)
- Styling-Engine: Uno shortcuts + component-scoped CSS (hybrid). Zielbild bleibt weitere Migration in Tokens/Shortcuts.
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
- `--form-control-inset-x` (Default: `var(--space-5)` = 20px)
- `--input-control-padding-y`
- `--input-control-padding-top-floating`
- `--radius-form-pill` (Default: `1rem` / 16px)
- `--radius-form-rounded` (`0.5rem` / 8px)

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

## Uno Migration Phase 1 (Inventory)

### Bereits sauber tokenisiert
- Shape/Radius: `--radius-form-pill`, `--radius-form-rounded`
- Form Insets/Floating Geometry: `--form-control-inset-x`, `--input-control-padding-y`, `--input-control-padding-top-floating`
- Select Motion Tokens vorhanden: `--motion-select-overlay-*`, `--motion-select-option-*`, `--motion-select-chevron-*`
- Floating Motion Parity: `--motion-input-floating-duration`, `--motion-input-floating-ease`
- Core Colors: `--color-input-placeholder`, `--color-input-floating-label`, `--color-select-shadow`, Border-Tokens

### Noch harte Werte in `DsSelect.vue` (Migration-Kandidaten)
- Layout/Geometry:
  - `z-index: 80`
  - `gap: 0.75rem`
  - `min-height: 2.75rem`
  - `border-radius: 0.625rem` (Options/Empty)
  - `padding-top: 0.375rem`, `padding-bottom: 0.5rem`
  - `padding: 0.625rem ...`
  - `translateY(-6px)` / `translateY(6px)`
  - Chevron offsets `1px` / `3px`
- Motion:
  - `max-height 360ms`, `box-shadow 180ms`
  - divider `opacity 280ms`, `transform 420ms`, `delay 120ms`
  - body `opacity 220ms`, `transform 320ms`, `background-color 180ms`
  - option `background/color 160ms`, `opacity 210ms`, `transform 280ms`, stagger base `45ms`
  - dot `opacity 140ms`
- Color fallbacks:
  - divider `var(--un-preset-radix-sand8)`
  - invalid fallback `#ff4d94`
  - error-text fallback `#ff6fa9`

### Mapping-Ziel fuer die naechsten Phasen
- Phase 2: Shell/Layout-Zahlen in neue `size/select-*` + `space/select-*` Tokens
- Phase 3: State-Ring/Opacity/Layering in `state/select-*` Tokens
- Phase 4: Motion-Hardcodes an bestehende `motion-select-*` Tokens angleichen, fehlende Motion-Tokens ergaenzen
- Phase 5: Option/Divider/Dot komplett ueber Uno-Shortcuts + Tokens

## State-Prioritaet (komponente)
- `disabled` > `invalid` > `open/focus` > `hover` > `default`

## Form Density (2026-03-08)
- Header-Content, Label-Anchor und Value-Inset folgen dem gemeinsamen Form-Token `--form-control-inset-x`.
- Defaultwert: `20px` (`var(--space-5)`).
- Ziel: X-Achsen-Paritaet mit `DsInput` und `DsTextarea`.

## Form Shape (2026-03-08)
- `shape='rounded'` ist der Default fuer `DsSelect` (8px).
- `shape='pill'` bleibt als weichere Alternative (16px), ohne Interaktion/Animation/Spacing zu aendern.

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
