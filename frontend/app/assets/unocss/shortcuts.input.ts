import type { UserShortcuts } from 'unocss'

export const inputShortcuts: UserShortcuts = [
  [
    'ui-form-shape-pill',
    '![border-radius:var(--radius-form-pill)]',
  ],
  [
    'ui-form-shape-rounded',
    '![border-radius:var(--radius-form-rounded)]',
  ],
  [
    'ui-input-shell-base',
    'group relative w-full border border-solid border-transparent [border-width:var(--control-border-width)] rounded-$radius-lg bg-transparent [padding-inline:var(--form-control-inset-x)] transition-[background-color,box-shadow,color] [transition-duration:var(--motion-input-shell-duration)] [transition-timing-function:var(--motion-input-shell-ease)]',
  ],
  [
    'ui-input-shell-default',
    'min-h-[var(--size-control-md)] [box-shadow:0_0_0_var(--control-border-width)_var(--border-field-idle)]',
  ],
  [
    'ui-input-shell-floating',
    'min-h-[calc(var(--size-control-lg)+var(--space-2))] [box-shadow:0_0_0_var(--control-border-width)_var(--border-field-idle)]',
  ],
  [
    'ui-textarea-shell-floating',
    'overflow-hidden [box-shadow:0_0_0_var(--control-border-width)_var(--border-field-idle)] [transition-property:background-color,box-shadow,color] [transition-duration:var(--motion-input-shell-duration)] [transition-timing-function:var(--motion-input-shell-ease)]',
  ],
  [
    'ui-input-shell-interactive',
    '[&:hover:not(:focus-within)]:[box-shadow:0_0_0_var(--focus-ring-inner-width)_var(--border-accent-hover)] focus-within:[box-shadow:0_0_0_var(--focus-ring-inner-width)_var(--border-accent)]',
  ],
  [
    'ui-input-shell-invalid',
    '[box-shadow:0_0_0_var(--control-border-width)_var(--border-error)] bg-$bg-field-error-soft',
  ],
  [
    'ui-input-shell-readonly',
    'cursor-text bg-$bg-soft [box-shadow:0_0_0_var(--control-border-width)_var(--color-field-readonly-idle-text)] hover:bg-$bg-soft-hover hover:[box-shadow:0_0_0_var(--control-border-width)_var(--color-field-readonly-hover-text)] focus-within:[box-shadow:0_0_0_var(--control-border-width)_var(--color-field-readonly-idle-text)]',
  ],
  [
    'ui-input-shell-disabled',
    'cursor-not-allowed color-$color-disabled bg-$bg-soft-disabled [box-shadow:0_0_0_var(--control-border-width)_var(--border-disabled)]',
  ],
  [
    'ui-select-root',
    'relative w-full isolate z-0',
  ],
  [
    'ui-select-vars',
    '[--ds-select-trigger-h:calc(var(--size-control-lg)+var(--space-2))] [--ds-select-ring-w:1px] [--ds-select-ring:var(--border-field-idle,color-mix(in_oklch,var(--foreground)_28%,transparent))] [--ds-select-ring-hover:var(--border-accent-hover,color-mix(in_oklch,var(--foreground)_42%,transparent))] [--ds-select-ring-focus:var(--border-accent,color-mix(in_oklch,var(--foreground)_56%,transparent))] [--ds-select-surface:var(--bg-inverse,var(--pure-white))] [--ds-select-text:hsl(var(--foreground))] [--ds-select-muted:var(--color-field-placeholder,hsl(var(--muted-foreground)))] [--ds-select-label:var(--color-field-floating-label,hsl(var(--muted-foreground)))] [--ds-select-shadow:var(--color-select-shadow,color-mix(in_oklch,var(--foreground)_18%,transparent))] [--ds-select-indicator:var(--color-select-indicator,var(--toxic-11))] [--ds-select-indicator-column:1rem] [--ds-select-option-inline-pad:0.875rem] [--ds-select-list-inset-x:calc(var(--form-control-inset-x,var(--space-5))-var(--ds-select-option-inline-pad))] [--ds-select-divider-inset-x:var(--form-control-inset-x,var(--space-5))] [--ds-select-motion-ease:cubic-bezier(0.22,1,0.36,1)]',
  ],
  [
    'ui-select-shape-rounded',
    '![--ds-select-radius:var(--radius-form-rounded)]',
  ],
  [
    'ui-select-shape-pill',
    '![--ds-select-radius:var(--radius-form-pill)]',
  ],
  [
    'ui-select-root-layer',
    'z-80',
  ],
  [
    'ui-select-slot',
    'h-[var(--ds-select-trigger-h)]',
  ],
  [
    'ui-select-panel',
    'absolute inset-[0_auto_auto_0] z-1 w-full overflow-hidden [border-radius:var(--ds-select-radius)] [background:var(--ds-select-surface)]',
  ],
  [
    'ui-select-panel-motion',
    '[transition:max-height_360ms_var(--ds-select-motion-ease),box-shadow_180ms_ease]',
  ],
  [
    'ui-select-header',
    'relative w-full [height:var(--ds-select-trigger-h)] border-0 [background:var(--ds-select-surface)] [color:var(--ds-select-text)] [padding-inline:var(--form-control-inset-x)] m-0 text-left grid [grid-template-columns:1fr_var(--ds-select-indicator-column)] items-center gap-$space-3 cursor-pointer outline-none',
  ],
  [
    'ui-select-header-divider',
    '[&::after]:content-[\'\'] [&::after]:absolute [&::after]:left-[var(--ds-select-divider-inset-x)] [&::after]:right-[var(--ds-select-divider-inset-x)] [&::after]:bottom-0 [&::after]:h-px [&::after]:bg-$border-quaternary [&::after]:opacity-0 [&::after]:[transform:scaleX(0)] [&::after]:[transform-origin:center] [&::after]:[transition:opacity_280ms_ease,transform_420ms_var(--ds-select-motion-ease)]',
  ],
  [
    'ui-select-header-divider-open',
    '[&::after]:opacity-100 [&::after]:[transform:scaleX(1)] [&::after]:[transition-delay:120ms]',
  ],
  [
    'ui-select-header-motion',
    '[transition:transform_300ms_var(--ds-select-motion-ease)]',
  ],
  [
    'ui-select-header-disabled',
    'disabled:cursor-not-allowed',
  ],
  [
    'ui-select-content',
    'min-w-0 relative grid',
  ],
  [
    'ui-select-label',
    'absolute left-0 top-1/2 [transform:translateY(-50%)] [transform-origin:left_center] [color:var(--ds-select-muted)] pointer-events-none [transition-property:transform,top,color,font-size,line-height,letter-spacing,text-transform,font-family,font-weight] [transition-duration:var(--motion-input-floating-duration)] [transition-timing-function:var(--motion-input-floating-ease)]',
  ],
  [
    'ui-select-label-floating',
    'top-$space-1 [transform:translateY(0)_scale(0.82)] [color:var(--ds-select-label)]',
  ],
  [
    'ui-select-value',
    'min-w-0 whitespace-nowrap overflow-hidden text-ellipsis [color:var(--ds-select-text)]',
  ],
  [
    'ui-select-value-placeholder',
    '[color:var(--ds-select-muted)]',
  ],
  [
    'ui-select-value-empty',
    'opacity-0',
  ],
  [
    'ui-select-chevron',
    'inline-flex items-center justify-center self-center justify-self-center [line-height:1] [color:var(--ds-select-text)] transition-transform [transition-duration:300ms] [transition-timing-function:var(--ds-select-motion-ease)]',
  ],
  [
    'ui-select-chevron-open',
    'rotate-180',
  ],
  [
    'ui-select-content-labeled',
    '[padding-top:var(--input-control-padding-top-floating)] [padding-bottom:var(--input-control-padding-y)]',
  ],
  [
    'ui-select-list',
    'list-none m-0 pt-$space-2_5 pb-$space-2 [padding-inline:var(--ds-select-list-inset-x)] grid gap-$space-1 [background:var(--ds-select-surface)]',
  ],
  [
    'ui-select-body',
    '[background:var(--ds-select-surface)] opacity-0 [transform:translateY(-6px)] pointer-events-none [transition:opacity_220ms_ease,transform_320ms_var(--ds-select-motion-ease),background-color_180ms_ease]',
  ],
  [
    'ui-select-body-open',
    'opacity-100 [transform:translateY(0)] pointer-events-auto',
  ],
  [
    'ui-select-option',
    'w-full border-0 [background:transparent] [color:var(--ds-select-text)] min-h-[2.25rem] [border-radius:0.625rem] text-left grid [grid-template-columns:1fr_var(--ds-select-indicator-column)] items-center gap-$space-3 [padding:0.375rem_var(--ds-select-option-inline-pad)] cursor-pointer opacity-0 [transform:translateY(6px)] [transition:background-color_160ms_ease,color_160ms_ease]',
  ],
  [
    'ui-select-option-open',
    'opacity-100 [transform:translateY(0)] [transition:opacity_450ms_ease,transform_600ms_var(--ds-select-motion-ease)] [transition-delay:calc(var(--stagger-index)_*_90ms_+_120ms)]',
  ],
  [
    'ui-select-option-highlighted',
    '[background:color-mix(in_oklch,var(--color-accent-ui,hsl(var(--foreground)))_10%,transparent)] [color:var(--color-accent-ui,hsl(var(--foreground)))]',
  ],
  [
    'ui-select-option-selected',
    '[background:color-mix(in_oklch,var(--color-accent-ui,hsl(var(--foreground)))_18%,transparent)] [color:var(--ds-select-text)]',
  ],
  [
    'ui-select-option-selected-highlighted',
    '[background:color-mix(in_oklch,var(--color-accent-ui,hsl(var(--foreground)))_24%,transparent)] [color:var(--ds-select-text)]',
  ],
  [
    'ui-select-option-disabled',
    'disabled:opacity-45 disabled:cursor-not-allowed',
  ],
  [
    'ui-select-empty',
    'min-h-[2.25rem] [border-radius:0.625rem] flex items-center [padding:0.375rem_var(--ds-select-option-inline-pad)] opacity-80',
  ],
  [
    'ui-select-indicator-dot',
    'w-$space-2 h-$space-2 rounded-full [background:var(--ds-select-indicator)] justify-self-center opacity-0 [transition:opacity_140ms_ease]',
  ],
  [
    'ui-select-indicator-dot-visible',
    'opacity-100',
  ],
  [
    'ui-select-error-row',
    'flex items-center gap-$space-2_5 [color:var(--color-error-text,#ff6fa9)] animate-shake-in [animation-fill-mode:both]',
  ],
  [
    'ui-select-hint',
    'opacity-70',
  ],
  [
    'ui-checkbox-root',
    'grid gap-$space-2',
  ],
  [
    'ui-checkbox-hit',
    'inline-grid w-fit max-w-full gap-$space-1_5',
  ],
  [
    'ui-checkbox-main-row',
    'inline-flex items-center gap-$space-3',
  ],
  [
    'ui-checkbox-meta-wrap',
    '[padding-left:calc(var(--ds-checkbox-control-size)+var(--space-3))]',
  ],
  [
    'ui-checkbox-control-base',
    'relative isolate inline-flex shrink-0 items-center justify-center overflow-hidden border border-solid [border-width:var(--control-border-width)] [border-color:var(--border-field-idle)] [background-color:var(--bg-inverse)] [color:var(--color-inverse)] outline-none transition-[border-color,box-shadow,color,opacity] [transition-duration:var(--motion-checkbox-shell-duration)] [transition-timing-function:var(--motion-checkbox-shell-ease)] hover:[border-color:var(--border-accent-hover)] focus-visible:[box-shadow:0_0_0_var(--focus-ring-inner-width)_var(--border-accent)]',
  ],
  [
    'ui-checkbox-control-sm',
    '[--ds-checkbox-control-size:var(--size-checkbox-control-sm)] [width:var(--ds-checkbox-control-size)] [height:var(--ds-checkbox-control-size)] [border-radius:var(--radius-checkbox-sm)]',
  ],
  [
    'ui-checkbox-control-md',
    '[--ds-checkbox-control-size:var(--size-checkbox-control-md)] [width:var(--ds-checkbox-control-size)] [height:var(--ds-checkbox-control-size)] [border-radius:var(--radius-checkbox-md)]',
  ],
  [
    'ui-checkbox-control-lg',
    '[--ds-checkbox-control-size:var(--size-checkbox-control-lg)] [width:var(--ds-checkbox-control-size)] [height:var(--ds-checkbox-control-size)] [border-radius:var(--radius-checkbox-lg)]',
  ],
  [
    'ui-checkbox-control-variant-default',
    '[background-color:var(--bg-inverse)] [color:var(--color-inverse)]',
  ],
  [
    'ui-checkbox-control-variant-accent',
    '[background-color:var(--bg-inverse)] [border-color:var(--border-accent-hover)] [color:var(--color-accent-ui)]',
  ],
  [
    'ui-checkbox-control-variant-mixed',
    '[background-color:var(--bg-inverse)] [color:var(--color-inverse)]',
  ],
  [
    'ui-checkbox-control-invalid',
    '[border-color:var(--border-error)] focus-visible:[box-shadow:0_0_0_var(--focus-ring-inner-width)_var(--border-error)]',
  ],
  [
    'ui-checkbox-control-disabled',
    'cursor-not-allowed opacity-55 hover:[transform:none] active:[transform:none] [border-color:var(--border-disabled)] [color:var(--color-disabled)] [background-color:var(--bg-soft-disabled)]',
  ],
  [
    'ui-checkbox-indicator',
    'pointer-events-none relative z-1 [width:var(--size-checkbox-indicator)] [height:var(--size-checkbox-indicator)]',
  ],
  [
    'ui-checkbox-check-path',
    'fill-none [stroke:currentColor] [stroke-width:var(--size-checkbox-check-stroke)] [stroke-linecap:round] [stroke-linejoin:round]',
  ],
  [
    'ui-checkbox-label',
    'select-none',
  ],
  [
    'ui-checkbox-label-disabled',
    'opacity-65',
  ],
  [
    'ui-radio-root',
    'grid gap-$space-2',
  ],
  [
    'ui-radio-size-sm',
    '[--ds-radio-control-size:var(--size-checkbox-control-sm)]',
  ],
  [
    'ui-radio-size-md',
    '[--ds-radio-control-size:var(--size-checkbox-control-md)]',
  ],
  [
    'ui-radio-size-lg',
    '[--ds-radio-control-size:var(--size-checkbox-control-lg)]',
  ],
  [
    'ui-radio-group',
    'grid gap-$space-2',
  ],
  [
    'ui-radio-item',
    'inline-grid w-fit max-w-full gap-$space-1_5',
  ],
  [
    'ui-radio-main-row',
    'inline-flex items-center gap-$space-3',
  ],
  [
    'ui-radio-meta-wrap',
    '[padding-left:calc(var(--ds-radio-control-size)+var(--space-3))] grid gap-1',
  ],
  [
    'ui-radio-control-base',
    'relative isolate inline-flex shrink-0 items-center justify-center rounded-full border border-solid [border-width:var(--control-border-width)] [width:var(--ds-radio-control-size)] [height:var(--ds-radio-control-size)] [border-color:var(--ds-radio-idle-border,var(--border-field-idle))] [color:var(--ds-radio-idle-color,var(--color-primary))] [background:transparent] outline-none transition-[border-color,box-shadow,color,opacity] [transition-duration:var(--motion-checkbox-shell-duration)] [transition-timing-function:var(--motion-checkbox-shell-ease)] focus-visible:[border-color:var(--border-accent)] focus-visible:[box-shadow:0_0_0_var(--focus-ring-active-width)_var(--border-accent)]',
  ],
  [
    'ui-radio-control-hoverable',
    'hover:[border-color:var(--border-accent-hover)] hover:[box-shadow:0_0_0_var(--focus-ring-active-width)_var(--border-accent-hover)]',
  ],
  [
    'ui-radio-control-variant-default',
    '[--ds-radio-idle-border:var(--border-field-idle)] [--ds-radio-idle-color:var(--color-primary)] [--ds-radio-active-border:var(--color-primary)] [--ds-radio-active-color:var(--color-primary)]',
  ],
  [
    'ui-radio-control-variant-accent',
    '[--ds-radio-idle-border:var(--border-accent-hover)] [--ds-radio-idle-color:var(--color-accent-ui)] [--ds-radio-active-border:var(--color-accent-ui)] [--ds-radio-active-color:var(--color-accent-ui)]',
  ],
  [
    'ui-radio-control-variant-mixed',
    '[--ds-radio-idle-border:var(--border-field-idle)] [--ds-radio-idle-color:var(--color-primary)] [--ds-radio-active-border:var(--color-accent-ui)] [--ds-radio-active-color:var(--color-accent-ui)]',
  ],
  [
    'ui-radio-control-checked',
    '[border-color:var(--ds-radio-active-border)] [color:var(--ds-radio-active-color)]',
  ],
  [
    'ui-radio-control-invalid',
    '[border-color:var(--border-error)] [color:var(--color-error-text)] focus-visible:[box-shadow:0_0_0_var(--focus-ring-active-width)_var(--border-error)]',
  ],
  [
    'ui-radio-control-disabled',
    'cursor-not-allowed opacity-55 [border-color:var(--border-disabled)] [color:var(--color-disabled)] hover:[box-shadow:0_0_0_0_transparent] focus-visible:[box-shadow:0_0_0_0_transparent]',
  ],
  [
    'ui-radio-indicator',
    'pointer-events-none inline-flex rounded-full [background-color:currentColor] [width:calc(var(--ds-radio-control-size)*0.6)] [height:calc(var(--ds-radio-control-size)*0.6)]',
  ],
  [
    'ui-radio-label',
    'select-none',
  ],
  [
    'ui-radio-label-disabled',
    'opacity-65',
  ],
  [
    'ui-switch-root',
    'grid gap-$space-2',
  ],
  [
    'ui-switch-hit',
    'inline-grid w-fit max-w-full gap-$space-1_5',
  ],
  [
    'ui-switch-main-row',
    'inline-flex items-center gap-$space-3',
  ],
  [
    'ui-switch-meta-wrap',
    '[padding-left:calc(var(--ds-switch-track-w)+var(--space-3))] grid gap-1',
  ],
  [
    'ui-switch-size-sm',
    '[--ds-switch-track-h:var(--size-switch-track-sm)] [--ds-switch-track-w:var(--size-switch-width-sm)] [--ds-switch-thumb-size:var(--size-switch-thumb-sm)] [--ds-switch-thumb-size-pressed:var(--size-switch-thumb-press-sm)]',
  ],
  [
    'ui-switch-size-md',
    '[--ds-switch-track-h:var(--size-switch-track-md)] [--ds-switch-track-w:var(--size-switch-width-md)] [--ds-switch-thumb-size:var(--size-switch-thumb-md)] [--ds-switch-thumb-size-pressed:var(--size-switch-thumb-press-md)]',
  ],
  [
    'ui-switch-size-lg',
    '[--ds-switch-track-h:var(--size-switch-track-lg)] [--ds-switch-track-w:var(--size-switch-width-lg)] [--ds-switch-thumb-size:var(--size-switch-thumb-lg)] [--ds-switch-thumb-size-pressed:var(--size-switch-thumb-press-lg)]',
  ],
  [
    'ui-switch-track-base',
    'relative isolate inline-flex shrink-0 items-center justify-start [width:var(--ds-switch-track-w)] [height:var(--ds-switch-track-h)] rounded-full border border-solid [border-width:var(--control-border-width)] [padding:var(--size-switch-track-inset)] [background:transparent] [border-color:var(--border-field-idle)] outline-none transition-[background-color,border-color,box-shadow] [transition-duration:var(--motion-switch-track-duration)] [transition-timing-function:var(--motion-switch-track-ease)]',
  ],
  [
    'ui-switch-track-hoverable',
    'hover:[border-color:var(--border-accent-hover)] hover:[box-shadow:0_0_0_var(--focus-ring-active-width)_var(--border-accent-hover)]',
  ],
  [
    'ui-switch-track-focused',
    'focus-visible:[border-color:var(--border-accent)] focus-visible:[box-shadow:0_0_0_var(--focus-ring-active-width)_var(--border-accent)]',
  ],
  [
    'ui-switch-track-variant-default',
    '[--ds-switch-accent-bg:var(--color-primary)] [--ds-switch-accent-border:var(--color-primary)] [--ds-switch-thumb-on:var(--color-inverse)] [--ds-switch-thumb-off:var(--color-switch-thumb-idle)] [--ds-switch-idle-border:var(--border-field-idle)]',
  ],
  [
    'ui-switch-track-variant-accent',
    '[--ds-switch-accent-bg:var(--color-accent-ui)] [--ds-switch-accent-border:var(--color-accent-ui)] [--ds-switch-thumb-on:var(--color-on-accent)] [--ds-switch-thumb-off:var(--color-accent-ui)] [--ds-switch-idle-border:var(--border-accent-hover)]',
  ],
  [
    'ui-switch-track-variant-mixed',
    '[--ds-switch-accent-bg:var(--color-accent-ui)] [--ds-switch-accent-border:var(--color-accent-ui)] [--ds-switch-thumb-on:var(--color-on-accent)] [--ds-switch-thumb-off:var(--color-switch-thumb-idle)] [--ds-switch-idle-border:var(--border-field-idle)]',
  ],
  [
    'ui-switch-track-checked',
    '[--ds-switch-state:1] justify-end',
  ],
  [
    'ui-switch-track-unchecked-colors',
    '[background:transparent] [border-color:var(--ds-switch-idle-border)] [color:var(--ds-switch-thumb-off)]',
  ],
  [
    'ui-switch-track-checked-colors',
    '[background:var(--ds-switch-accent-bg)] [border-color:var(--ds-switch-accent-border)] [color:var(--ds-switch-thumb-on)]',
  ],
  [
    'ui-switch-track-invalid',
    '[background:var(--bg-field-error-soft)] [border-color:var(--border-error)] focus-visible:[box-shadow:0_0_0_var(--focus-ring-active-width)_var(--border-error)]',
  ],
  [
    'ui-switch-track-disabled',
    'cursor-not-allowed opacity-55 [background:var(--bg-soft-disabled)] [border-color:var(--border-disabled)] hover:[box-shadow:0_0_0_0_transparent] focus-visible:[box-shadow:0_0_0_0_transparent]',
  ],
  [
    'ui-switch-thumb',
    'pointer-events-none inline-flex rounded-full [width:var(--ds-switch-thumb-size)] [height:var(--ds-switch-thumb-size)] [background:currentColor] [transition:width_var(--motion-switch-press-duration)_ease] will-change-transform',
  ],
  [
    'ui-switch-label',
    'select-none',
  ],
  [
    'ui-switch-label-disabled',
    'opacity-65',
  ],
  [
    'ui-select-panel-idle',
    '[box-shadow:0_0_0_var(--ds-select-ring-w)_var(--ds-select-ring)]',
  ],
  [
    'ui-select-panel-hoverable',
    'hover:[box-shadow:0_0_0_var(--focus-ring-inner-width)_var(--ds-select-ring-hover)]',
  ],
  [
    'ui-select-panel-hover',
    '[box-shadow:0_0_0_var(--focus-ring-inner-width)_var(--ds-select-ring-hover)]',
  ],
  [
    'ui-select-panel-focus',
    '[box-shadow:0_0_0_var(--focus-ring-inner-width)_var(--ds-select-ring-focus)]',
  ],
  [
    'ui-select-panel-invalid',
    '[box-shadow:0_0_0_var(--ds-select-ring-w)_var(--border-error)]',
  ],
  [
    'ui-select-panel-disabled',
    '[opacity:0.65] [box-shadow:0_0_0_var(--ds-select-ring-w)_var(--border-disabled)]',
  ],
  [
    'ui-input-control-base',
    'w-full border-none bg-transparent outline-none color-$color-primary type-body-sm font-light transition-[color] [transition-duration:var(--motion-input-shell-duration)] [transition-timing-function:var(--motion-input-shell-ease)] disabled:cursor-not-allowed disabled:color-$color-disabled disabled:placeholder:[color:var(--color-disabled-subtle)] disabled:placeholder:opacity-100',
  ],
  [
    'ui-input-control-readonly',
    'read-only:cursor-text read-only:[color:var(--color-field-readonly-idle-text)] read-only:hover:[color:var(--color-field-readonly-hover-text)] read-only:placeholder:[color:var(--color-field-readonly-idle-text)] read-only:hover:placeholder:[color:var(--color-field-readonly-hover-text)] read-only:placeholder:opacity-100',
  ],
  [
    'ui-input-control-default',
    '[padding-top:var(--input-control-padding-y)] [padding-bottom:var(--input-control-padding-y)]',
  ],
  [
    'ui-input-control-floating',
    '[padding-top:var(--input-control-padding-top-floating)] [padding-bottom:var(--input-control-padding-y)]',
  ],
  [
    'ui-textarea-control-base',
    'w-full min-h-[var(--size-textarea-height-default)] h-[var(--size-textarea-height-default)] focus:h-[var(--size-textarea-height-focus)] resize-none border-none bg-transparent outline-none color-$color-primary type-body-md font-light pt-$space-6 pb-$space-8 leading-$type-leading-body-md transition-[color,height] [transition-duration:var(--motion-input-shell-duration)] [transition-timing-function:var(--motion-input-shell-ease)] disabled:cursor-not-allowed disabled:color-$color-disabled disabled:placeholder:[color:var(--color-disabled-subtle)] disabled:placeholder:opacity-100',
  ],
  [
    'ui-textarea-control-resizing',
    '[transition-property:color] [transition-duration:var(--motion-input-shell-duration)] [transition-timing-function:var(--motion-input-shell-ease)]',
  ],
  [
    'ui-textarea-meta-row',
    'absolute right-$space-2_5 bottom-$space-2 z-2 inline-flex items-center gap-$space-1_5 color-$color-field-meta-subtle',
  ],
  [
    'ui-textarea-resize-handle',
    'inline-flex items-center justify-center rounded-$radius-sm p-$space-0_5 color-$color-field-meta-subtle transition-colors [transition-duration:var(--motion-input-shell-duration)] [transition-timing-function:var(--motion-input-shell-ease)] hover:color-$color-accent-ui disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:color-$color-field-meta-subtle cursor-ns-resize',
  ],
  [
    'ui-input-control-placeholder',
    'placeholder:[color:var(--color-field-placeholder)] placeholder:opacity-100',
  ],
  [
    'ui-input-control-floating-placeholder-hidden',
    'placeholder:opacity-0',
  ],
  [
    'ui-input-control-floating-placeholder-visible',
    'placeholder:opacity-100',
  ],
  [
    'ui-input-floating-label-base',
    'pointer-events-none absolute [left:var(--form-control-inset-x)] top-1/2 [transform:translateY(-50%)] [transform-origin:left_center] [color:var(--color-field-placeholder)] transition-[transform,top,left,color,font-size,line-height,letter-spacing,text-transform,font-family,font-weight] [transition-duration:var(--motion-input-floating-duration)] [transition-timing-function:var(--motion-input-floating-ease)]',
  ],
  [
    'ui-textarea-floating-label-base',
    'pointer-events-none absolute [left:var(--form-control-inset-x)] top-$space-5 [transform:translateY(-50%)] [transform-origin:left_center] [color:var(--color-field-placeholder)] transition-[transform,top,left,color,font-size,line-height,letter-spacing,text-transform,font-family,font-weight] [transition-duration:var(--motion-input-floating-duration)] [transition-timing-function:var(--motion-input-floating-ease)]',
  ],
  [
    'ui-input-floating-label-active',
    '![left:var(--form-control-inset-x)] !top-$space-1 ![transform:translateY(0)_scale(0.82)] ![color:var(--color-field-floating-label)]',
  ],
  [
    'ui-input-floating-label-readonly',
    '![color:var(--color-field-readonly-idle-text)] group-hover:![color:var(--color-field-readonly-hover-text)]',
  ],
  [
    'ui-input-floating-label-disabled',
    '![color:var(--color-disabled)]',
  ],
  [
    'ui-field-error-row',
    'inline-flex items-center gap-$space-1_5 animate-shake-in [animation-fill-mode:both]',
  ],
  [
    'ui-field-error-icon',
    'shrink-0',
  ],
]
