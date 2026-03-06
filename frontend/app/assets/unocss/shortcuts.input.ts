import type { UserShortcuts } from 'unocss'

export const inputShortcuts: UserShortcuts = [
  [
    'ui-input-shell-base',
    'group relative w-full border border-solid border-transparent [border-width:var(--control-border-width)] rounded-$radius-lg bg-transparent px-$space-3_5 transition-[background-color,box-shadow,color] [transition-duration:var(--motion-input-shell-duration)] [transition-timing-function:var(--motion-input-shell-ease)]',
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
    'w-full min-h-[calc(var(--size-control-xl)*3.35)] h-[calc(var(--size-control-xl)*3.35)] focus:h-[calc(var(--size-control-xl)*4)] resize-none border-none bg-transparent outline-none color-$color-primary type-body-md font-light [padding-left:var(--space-3_5)] [padding-right:var(--space-3_5)] [padding-top:var(--space-6)] [padding-bottom:var(--space-8)] leading-$type-leading-body-md transition-[color,height] [transition-duration:var(--motion-input-shell-duration)] [transition-timing-function:var(--motion-input-shell-ease)] disabled:cursor-not-allowed disabled:color-$color-disabled disabled:placeholder:[color:var(--color-disabled-subtle)] disabled:placeholder:opacity-100',
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
    'pointer-events-none absolute left-$space-3_5 top-1/2 [transform:translateY(-50%)] [transform-origin:left_center] [color:var(--color-input-placeholder)] transition-[transform,top,left,color,font-size,line-height,letter-spacing,text-transform,font-family,font-weight] [transition-duration:var(--motion-input-floating-duration)] [transition-timing-function:var(--motion-input-floating-ease)]',
  ],
  [
    'ui-textarea-floating-label-base',
    'pointer-events-none absolute left-$space-3_5 top-$space-5 [transform:translateY(-50%)] [transform-origin:left_center] [color:var(--color-input-placeholder)] transition-[transform,top,left,color,font-size,line-height,letter-spacing,text-transform,font-family,font-weight] [transition-duration:var(--motion-input-floating-duration)] [transition-timing-function:var(--motion-input-floating-ease)]',
  ],
  [
    'ui-input-floating-label-active',
    '!left-$space-3_5 !top-$space-1 ![transform:translateY(0)_scale(0.82)] ![color:var(--color-input-floating-label)]',
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
