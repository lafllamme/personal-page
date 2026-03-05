import type { UserShortcuts } from 'unocss'

export const inputShortcuts: UserShortcuts = [
  [
    'ui-input-shell-base',
    'relative w-full border border-solid [border-width:var(--control-border-width)] rounded-$radius-lg bg-transparent px-$space-3_5 transition-[border-color,background-color,box-shadow,color] [transition-duration:var(--motion-input-shell-duration)] [transition-timing-function:var(--motion-input-shell-ease)]',
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
    'w-full border-none bg-transparent p-0 outline-none color-$color-primary [font-family:\'Manrope\',sans-serif] [font-size:var(--type-size-md)] [line-height:var(--type-leading-md)] [font-weight:300]',
  ],
  [
    'ui-input-control-default',
    '[padding-block:0.4375rem]',
  ],
  [
    'ui-input-control-floating',
    '[padding-top:1.125rem] [padding-bottom:0.4375rem]',
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
    'pointer-events-none absolute left-$space-3_5 top-1/2 [transform:translateY(-50%)] [transform-origin:left_center] [font-family:\'Manrope\',sans-serif] [font-size:var(--type-size-sm)] [line-height:var(--type-leading-sm)] [font-weight:300] [color:var(--color-input-placeholder)] transition-[transform,top,left,color,font-size,line-height,letter-spacing,text-transform,font-family,font-weight] [transition-duration:var(--motion-input-floating-duration)] [transition-timing-function:var(--motion-input-floating-ease)]',
  ],
  [
    'ui-input-floating-label-active',
    '!left-[calc(var(--space-3_5)+1px)] !top-[calc(var(--space-1)+1px)] ![transform:translateY(0)_scale(0.82)] ![font-family:\'Space Grotesk\',sans-serif] ![font-size:var(--type-size-2xs)] ![line-height:var(--type-leading-2xs)] !tracking-$type-track-meta-2xs !font-normal !uppercase ![color:var(--color-input-floating-label)]',
  ],
  [
    'ui-input-error-row',
    'inline-flex items-center gap-$space-1_5 animate-dsInputErrorShakeIn',
  ],
  [
    'ui-input-error-icon',
    'shrink-0',
  ],
]
