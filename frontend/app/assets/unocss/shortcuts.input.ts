import type { UserShortcuts } from 'unocss'

export const inputShortcuts: UserShortcuts = [
  [
    'ui-input-shell-base',
    'relative w-full border border-solid [border-width:var(--control-border-width)] rounded-$radius-lg bg-transparent px-$space-3_5 transition-[border-color,background-color,box-shadow,color] duration-[160ms] ease-out',
  ],
  [
    'ui-input-shell-default',
    'min-h-[var(--size-control-md)] border-$border-input-idle',
  ],
  [
    'ui-input-shell-floating',
    'min-h-[calc(var(--size-control-lg)+var(--space-2))] border-$border-input-idle',
  ],
  [
    'ui-input-shell-hover',
    'border-$border-accent-hover [box-shadow:0_0_0_1px_var(--border-accent-hover)]',
  ],
  [
    'ui-input-shell-focus',
    'border-$border-accent [box-shadow:0_0_0_var(--focus-ring-inner-width)_var(--border-accent)]',
  ],
  [
    'ui-input-shell-invalid',
    'border-$border-error bg-$bg-input-error-soft',
  ],
  [
    'ui-input-shell-disabled',
    'cursor-not-allowed color-$color-disabled bg-$bg-soft-disabled border-$border-disabled [box-shadow:none]',
  ],
  [
    'ui-input-control-base',
    'w-full border-none bg-transparent p-0 outline-none type-body-md color-$color-primary',
  ],
  [
    'ui-input-control-default',
    '[padding-block:calc(var(--space-2)-1px)]',
  ],
  [
    'ui-input-control-floating',
    '[padding-top:calc(var(--space-4_75)-1px)] [padding-bottom:calc(var(--space-2)-1px)]',
  ],
  [
    'ui-input-control-placeholder',
    'placeholder:[color:var(--color-input-placeholder)] placeholder:opacity-100',
  ],
  [
    'ui-input-floating-label-base',
    'pointer-events-none absolute left-$space-3_5 top-1/2 -translate-y-1/2 type-body-sm [font-weight:300] [color:var(--color-input-placeholder)] transition-[transform,top,left,color,font-size,line-height,letter-spacing,text-transform,font-family,font-weight] duration-[160ms] ease-out',
  ],
  [
    'ui-input-floating-label-active',
    'left-[calc(var(--space-3_5)+1px)] top-[calc(var(--space-1)+1px)] translate-y-0 scale-[0.82] type-meta-2xs uppercase [font-weight:400] [color:var(--color-input-floating-label)]',
  ],
]
