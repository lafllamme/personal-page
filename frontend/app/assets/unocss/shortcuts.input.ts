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
    'min-h-[var(--size-control-md)] [box-shadow:0_0_0_var(--control-border-width)_var(--border-input-idle)]',
  ],
  [
    'ui-input-shell-floating',
    'min-h-[calc(var(--size-control-lg)+var(--space-2))] [box-shadow:0_0_0_var(--control-border-width)_var(--border-input-idle)]',
  ],
  [
    'ui-textarea-shell-floating',
    'overflow-hidden [box-shadow:0_0_0_var(--control-border-width)_var(--border-input-idle)] [transition-property:background-color,box-shadow,color] [transition-duration:var(--motion-input-shell-duration)] [transition-timing-function:var(--motion-input-shell-ease)]',
  ],
  [
    'ui-input-shell-interactive',
    '[&:hover:not(:focus-within)]:[box-shadow:0_0_0_var(--focus-ring-inner-width)_var(--border-accent-hover)] focus-within:[box-shadow:0_0_0_var(--focus-ring-inner-width)_var(--border-accent)]',
  ],
  [
    'ui-input-shell-invalid',
    '[box-shadow:0_0_0_var(--control-border-width)_var(--border-error)] bg-$bg-input-error-soft',
  ],
  [
    'ui-input-shell-readonly',
    'cursor-text bg-$bg-soft [box-shadow:0_0_0_var(--control-border-width)_var(--color-readonly-idle-text)] hover:bg-$bg-soft-hover hover:[box-shadow:0_0_0_var(--control-border-width)_var(--color-readonly-hover-text)] focus-within:[box-shadow:0_0_0_var(--control-border-width)_var(--color-readonly-idle-text)]',
  ],
  [
    'ui-input-shell-disabled',
    'cursor-not-allowed color-$color-disabled bg-$bg-soft-disabled [box-shadow:0_0_0_var(--control-border-width)_var(--border-disabled)]',
  ],
  [
    'ui-select-root',
    'relative w-full min-h-[calc(var(--size-control-lg)+var(--space-2))]',
  ],
  [
    'ui-select-shell-base',
    'relative w-full text-left outline-none rounded-$radius-lg [padding-inline:var(--form-control-inset-x)] [box-shadow:0_0_0_var(--control-border-width)_var(--border-input-idle)] transition-[background-color,box-shadow,color] [transition-duration:var(--motion-input-shell-duration)] [transition-timing-function:var(--motion-input-shell-ease)]',
  ],
  [
    'ui-select-shell-interactive',
    'hover:[box-shadow:0_0_0_var(--focus-ring-inner-width)_var(--border-accent-hover)] focus-visible:[box-shadow:0_0_0_var(--focus-ring-inner-width)_var(--border-accent)]',
  ],
  [
    'ui-select-shell-open',
    '[box-shadow:0_0_0_var(--focus-ring-inner-width)_var(--border-accent)]',
  ],
  [
    'ui-select-shell-preview-hover',
    '[box-shadow:0_0_0_var(--focus-ring-inner-width)_var(--border-accent-hover)]',
  ],
  [
    'ui-select-shell-preview-focus-visible',
    '[box-shadow:0_0_0_var(--focus-ring-inner-width)_var(--border-accent)]',
  ],
  [
    'ui-select-shell-invalid',
    '[box-shadow:0_0_0_var(--control-border-width)_var(--border-error)] bg-$bg-input-error-soft',
  ],
  [
    'ui-select-shell-disabled',
    'cursor-not-allowed color-$color-disabled bg-$bg-soft-disabled [box-shadow:0_0_0_var(--control-border-width)_var(--border-disabled)]',
  ],
  [
    'ui-select-trigger-content',
    'flex w-full min-h-[calc(var(--size-control-lg)+var(--space-2))] items-center justify-between',
  ],
  [
    'ui-select-value-wrap',
    'relative flex min-w-0 flex-1 flex-col justify-center [padding-top:var(--input-control-padding-top-floating)] [padding-bottom:var(--input-control-padding-y)]',
  ],
  [
    'ui-select-value-wrap-no-label',
    '[padding-top:var(--input-control-padding-y)]',
  ],
  [
    'ui-select-value-text',
    'truncate type-body-md font-light color-$color-primary',
  ],
  [
    'ui-select-value-placeholder',
    '[color:var(--color-input-placeholder)]',
  ],
  [
    'ui-select-chevron',
    'shrink-0 color-$color-input-placeholder transition-transform [transition-duration:var(--motion-select-chevron-duration)] [transition-timing-function:var(--motion-select-chevron-ease)]',
  ],
  [
    'ui-select-chevron-open',
    '[transform:rotate(180deg)]',
  ],
  [
    'ui-select-overlay-base',
    'absolute left-0 top-0 z-40 w-full overflow-hidden rounded-$radius-lg bg-$bg-inverse [box-shadow:0_0_0_var(--control-border-width)_var(--border-input-idle),0_0_0_var(--color-select-shadow)] transition-[clip-path,opacity,box-shadow] [transition-duration:var(--motion-select-overlay-duration)] [transition-timing-function:var(--motion-select-overlay-ease)]',
  ],
  [
    'ui-select-overlay-open',
    'opacity-100 pointer-events-auto [clip-path:inset(0%_0%_0%_0%_round_var(--radius-lg))] [box-shadow:0_0_0_var(--control-border-width)_var(--border-input-idle),0_16px_48px_var(--color-select-shadow)]',
  ],
  [
    'ui-select-overlay-closed',
    'opacity-0 pointer-events-none [clip-path:inset(0%_0%_100%_0%_round_var(--radius-lg))] [box-shadow:0_0_0_var(--control-border-width)_var(--border-input-idle),0_0_0_var(--color-select-shadow)]',
  ],
  [
    'ui-select-divider',
    'mx-$space-3 h-px bg-$border-quaternary',
  ],
  [
    'ui-select-option-list',
    'p-$space-1_5',
  ],
  [
    'ui-select-option-base',
    'flex w-full items-center justify-between rounded-$radius-md px-$space-3 py-$space-2 text-left type-body-sm font-light color-$color-primary transition-[background-color,color,opacity,transform] [transition-duration:var(--motion-select-option-duration)] [transition-timing-function:var(--motion-select-option-ease)]',
  ],
  [
    'ui-select-value-hidden',
    'max-h-0 opacity-0 overflow-hidden pointer-events-none',
  ],
  [
    'ui-select-option-visible',
    'opacity-100 [transform:translateY(0)]',
  ],
  [
    'ui-select-option-hidden',
    'opacity-0 [transform:translateY(6px)]',
  ],
  [
    'ui-select-option-hoverable',
    'hover:bg-$bg-soft',
  ],
  [
    'ui-select-option-active',
    'bg-$bg-soft-hover',
  ],
  [
    'ui-select-option-selected',
    'bg-$bg-soft',
  ],
  [
    'ui-select-current-root',
    'relative w-full isolate z-0',
  ],
  [
    'ui-select-current-root-layer',
    'z-80',
  ],
  [
    'ui-select-current-slot',
    'h-[var(--ds-select-trigger-h)]',
  ],
  [
    'ui-select-current-panel',
    'absolute inset-[0_auto_auto_0] z-1 w-full overflow-hidden [border-radius:var(--ds-select-radius)] [background:var(--ds-select-surface)]',
  ],
  [
    'ui-select-current-panel-motion',
    '[transition:max-height_360ms_var(--ds-select-motion-ease),box-shadow_180ms_ease]',
  ],
  [
    'ui-select-current-header',
    'relative w-full [height:var(--ds-select-trigger-h)] border-0 [background:var(--ds-select-surface)] [color:var(--ds-select-text)] [padding-inline:var(--form-control-inset-x)] m-0 text-left grid [grid-template-columns:1fr_var(--ds-select-indicator-column)] items-center gap-$space-3 cursor-pointer outline-none',
  ],
  [
    'ui-select-current-content',
    'min-w-0 relative grid',
  ],
  [
    'ui-select-current-content-labeled',
    '[padding-top:var(--input-control-padding-top-floating)] [padding-bottom:var(--input-control-padding-y)]',
  ],
  [
    'ui-select-current-list',
    'list-none m-0 pt-$space-2_5 pb-$space-2 [padding-inline:var(--ds-select-list-inset-x)] grid gap-$space-1 [background:var(--ds-select-surface)]',
  ],
  [
    'ui-select-current-body',
    '[background:var(--ds-select-surface)] opacity-0 [transform:translateY(-6px)] pointer-events-none [transition:opacity_220ms_ease,transform_320ms_var(--ds-select-motion-ease),background-color_180ms_ease]',
  ],
  [
    'ui-select-current-body-open',
    'opacity-100 [transform:translateY(0)] pointer-events-auto',
  ],
  [
    'ui-select-current-option',
    'w-full border-0 [background:transparent] [color:var(--ds-select-text)] min-h-[2.25rem] [border-radius:0.625rem] text-left grid [grid-template-columns:1fr_var(--ds-select-indicator-column)] items-center gap-$space-3 [padding:0.375rem_var(--ds-select-option-inline-pad)] cursor-pointer opacity-0 [transform:translateY(6px)] [transition:background-color_160ms_ease,color_160ms_ease]',
  ],
  [
    'ui-select-current-option-open',
    'opacity-100 [transform:translateY(0)] [transition:opacity_450ms_ease,transform_600ms_var(--ds-select-motion-ease)] [transition-delay:calc(var(--stagger-index)_*_90ms_+_120ms)]',
  ],
  [
    'ui-select-current-option-highlighted',
    '[background:color-mix(in_oklch,var(--color-accent-ui,hsl(var(--foreground)))_10%,transparent)] [color:var(--color-accent-ui,hsl(var(--foreground)))]',
  ],
  [
    'ui-select-current-option-selected',
    '[background:color-mix(in_oklch,var(--color-accent-ui,hsl(var(--foreground)))_18%,transparent)] [color:var(--ds-select-text)]',
  ],
  [
    'ui-select-current-option-selected-highlighted',
    '[background:color-mix(in_oklch,var(--color-accent-ui,hsl(var(--foreground)))_24%,transparent)] [color:var(--ds-select-text)]',
  ],
  [
    'ui-select-current-option-disabled',
    'disabled:opacity-45 disabled:cursor-not-allowed',
  ],
  [
    'ui-select-current-empty',
    'min-h-[2.25rem] [border-radius:0.625rem] flex items-center [padding:0.375rem_var(--ds-select-option-inline-pad)] opacity-80',
  ],
  [
    'ui-select-current-indicator-dot',
    'w-$space-2 h-$space-2 rounded-full [background:var(--ds-select-indicator)] justify-self-center opacity-0 [transition:opacity_140ms_ease]',
  ],
  [
    'ui-select-current-indicator-dot-visible',
    'opacity-100',
  ],
  [
    'ui-select-current-panel-idle',
    '[box-shadow:0_0_0_var(--ds-select-ring-w)_var(--ds-select-ring)]',
  ],
  [
    'ui-select-current-panel-hoverable',
    'hover:[box-shadow:0_0_0_var(--focus-ring-inner-width)_var(--ds-select-ring-hover)]',
  ],
  [
    'ui-select-current-panel-hover',
    '[box-shadow:0_0_0_var(--focus-ring-inner-width)_var(--ds-select-ring-hover)]',
  ],
  [
    'ui-select-current-panel-focus',
    '[box-shadow:0_0_0_var(--focus-ring-inner-width)_var(--ds-select-ring-focus)]',
  ],
  [
    'ui-select-current-panel-invalid',
    '[box-shadow:0_0_0_var(--ds-select-ring-w)_var(--border-error)]',
  ],
  [
    'ui-select-current-panel-disabled',
    '[opacity:0.65] [box-shadow:0_0_0_var(--ds-select-ring-w)_var(--border-disabled)]',
  ],
  [
    'ui-input-control-base',
    'w-full border-none bg-transparent outline-none color-$color-primary type-body-sm font-light transition-[color] [transition-duration:var(--motion-input-shell-duration)] [transition-timing-function:var(--motion-input-shell-ease)] disabled:cursor-not-allowed disabled:color-$color-disabled disabled:placeholder:[color:var(--color-disabled-subtle)] disabled:placeholder:opacity-100',
  ],
  [
    'ui-input-control-readonly',
    'read-only:cursor-text read-only:[color:var(--color-readonly-idle-text)] read-only:hover:[color:var(--color-readonly-hover-text)] read-only:placeholder:[color:var(--color-readonly-idle-text)] read-only:hover:placeholder:[color:var(--color-readonly-hover-text)] read-only:placeholder:opacity-100',
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
    'absolute right-$space-2_5 bottom-$space-2 z-2 inline-flex items-center gap-$space-1_5 color-$color-input-meta-subtle',
  ],
  [
    'ui-textarea-resize-handle',
    'inline-flex items-center justify-center rounded-$radius-sm p-$space-0_5 color-$color-input-meta-subtle transition-colors [transition-duration:var(--motion-input-shell-duration)] [transition-timing-function:var(--motion-input-shell-ease)] hover:color-$color-accent-ui disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:color-$color-input-meta-subtle cursor-ns-resize',
  ],
  [
    'ui-input-control-placeholder',
    'placeholder:[color:var(--color-input-placeholder)] placeholder:opacity-100',
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
    'pointer-events-none absolute [left:var(--form-control-inset-x)] top-1/2 [transform:translateY(-50%)] [transform-origin:left_center] [color:var(--color-input-placeholder)] transition-[transform,top,left,color,font-size,line-height,letter-spacing,text-transform,font-family,font-weight] [transition-duration:var(--motion-input-floating-duration)] [transition-timing-function:var(--motion-input-floating-ease)]',
  ],
  [
    'ui-textarea-floating-label-base',
    'pointer-events-none absolute [left:var(--form-control-inset-x)] top-$space-5 [transform:translateY(-50%)] [transform-origin:left_center] [color:var(--color-input-placeholder)] transition-[transform,top,left,color,font-size,line-height,letter-spacing,text-transform,font-family,font-weight] [transition-duration:var(--motion-input-floating-duration)] [transition-timing-function:var(--motion-input-floating-ease)]',
  ],
  [
    'ui-input-floating-label-active',
    '![left:var(--form-control-inset-x)] !top-$space-1 ![transform:translateY(0)_scale(0.82)] ![color:var(--color-input-floating-label)]',
  ],
  [
    'ui-input-floating-label-readonly',
    '![color:var(--color-readonly-idle-text)] group-hover:![color:var(--color-readonly-hover-text)]',
  ],
  [
    'ui-input-floating-label-disabled',
    '![color:var(--color-disabled)]',
  ],
  [
    'ui-input-error-row',
    'inline-flex items-center gap-$space-1_5 animate-shake-in [animation-fill-mode:both]',
  ],
  [
    'ui-input-error-icon',
    'shrink-0',
  ],
]
