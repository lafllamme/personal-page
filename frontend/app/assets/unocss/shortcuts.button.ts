import type { UserShortcuts } from 'unocss'

export const buttonShortcuts: UserShortcuts = [
  [
    'ui-button-base',
    'relative inline-flex w-auto items-center justify-center whitespace-nowrap [border-width:var(--control-border-width)] border-solid border-transparent [text-decoration:none] transition-[background-color,color,border-color,box-shadow,transform] duration-[160ms] ease-out disabled:cursor-not-allowed focus-visible:outline-none',
  ],
  [
    'ui-button-shape-pill',
    'rounded-$radius-pill',
  ],
  [
    'ui-button-shape-rounded',
    'rounded-$radius-xs',
  ],
  [
    'ui-button-sm',
    'h-$button-height-sm px-$button-px-sm pt-0 pb-$button-pb-sm [--motion-primary-rotate-origin-y:var(--motion-primary-rotate-origin-y-sm)]',
  ],
  [
    'ui-button-md',
    'h-$button-height-md px-$button-px-md pt-0 pb-$button-pb-md [--motion-primary-rotate-origin-y:var(--motion-primary-rotate-origin-y-md)]',
  ],
  [
    'ui-button-lg',
    'h-$button-height-lg px-$button-px-lg pt-0 pb-$button-pb-lg [--motion-primary-rotate-origin-y:var(--motion-primary-rotate-origin-y-lg)]',
  ],
  [
    'ui-button-label',
    'relative z-1 inline-flex items-center leading-none [letter-spacing:-0.02em]',
  ],
  [
    'ui-button-icon-base',
    'relative z-1 block shrink-0 color-current',
  ],
  [
    'ui-button-icon-sm',
    'size-5',
  ],
  [
    'ui-button-icon-md',
    'size-5',
  ],
  [
    'ui-button-icon-lg',
    'size-6',
  ],
  [
    'ui-button-icon-only-sm',
    '[inline-size:var(--button-height-sm)] [block-size:var(--button-height-sm)] p-0',
  ],
  [
    'ui-button-icon-only-md',
    '[inline-size:var(--button-height-md)] [block-size:var(--button-height-md)] p-0',
  ],
  [
    'ui-button-icon-only-lg',
    '[inline-size:var(--button-height-lg)] [block-size:var(--button-height-lg)] p-0',
  ],
  [
    'ui-primary-rotate-wrap',
    'relative inline-grid place-items-center',
  ],
  [
    'ui-primary-rotate-label',
    'relative inline-flex items-center justify-start [grid-area:1/1] [transform-origin:50%_var(--motion-primary-rotate-origin-y)] [will-change:transform] whitespace-nowrap',
  ],
  [
    'ui-primary-rotate-label-l1',
    '[transform:rotate(0deg)]',
  ],
  [
    'ui-primary-rotate-label-l2',
    'absolute [transform:rotate(calc(var(--motion-primary-rotate-angle)*-1))]',
  ],
  [
    'ui-primary-rotate-typo',
    '[line-height:1] [letter-spacing:var(--motion-primary-rotate-letter-spacing)]',
  ],
  [
    'ui-primary-rotate-neutral-fix',
    'hover:enabled:bg-$bg-solid-hover hover:enabled:[box-shadow:inset_0_0_0_var(--focus-ring-inner-width)_var(--un-preset-radix-sand11)]',
  ],
  [
    'ui-primary-rotate-accent-fix',
    'hover:enabled:bg-$bg-accent-hover hover:enabled:color-$color-on-accent hover:enabled:[box-shadow:inset_0_0_0_var(--focus-ring-inner-width)_var(--bg-accent-hover)] active:enabled:bg-$bg-accent-active active:enabled:[box-shadow:inset_0_0_0_var(--focus-ring-inner-width)_var(--bg-accent-active)]',
  ],
  [
    'ui-primary-rotate-mixed-fix',
    'hover:enabled:bg-$bg-accent-hover hover:enabled:color-$color-on-accent hover:enabled:[box-shadow:inset_0_0_0_var(--focus-ring-inner-width)_var(--bg-accent-hover)] active:enabled:bg-$bg-accent-active active:enabled:[box-shadow:inset_0_0_0_var(--focus-ring-inner-width)_var(--bg-accent-active)]',
  ],
  [
    'ui-ghost-button',
    'relative overflow-hidden isolate',
  ],
  [
    'ui-ghost-label',
    'relative inline-flex z-1 items-center [transition:color_240ms_cubic-bezier(0.22,1,0.36,1)]',
  ],
  [
    'ui-ghost-morph-clip',
    'after:content-[\'\'] after:absolute after:z-0 after:[border-radius:inherit] after:bg-[var(--ghost-morph-line)] after:left-[var(--ghost-morph-line-inset-x,1rem)] after:right-[var(--ghost-morph-line-inset-x,1rem)] after:top-[calc(100%-var(--motion-underline-thickness)-var(--ghost-morph-line-inset-y,0.36rem))] after:bottom-[var(--ghost-morph-line-inset-y,0.36rem)] after:opacity-100 after:[transition:left_320ms_cubic-bezier(0.22,1,0.36,1),right_320ms_cubic-bezier(0.22,1,0.36,1),top_320ms_cubic-bezier(0.22,1,0.36,1),bottom_320ms_cubic-bezier(0.22,1,0.36,1),border-radius_320ms_cubic-bezier(0.22,1,0.36,1),background-color_120ms_ease-out] hover:enabled:after:left-0 hover:enabled:after:right-0 hover:enabled:after:top-0 hover:enabled:after:bottom-0 hover:enabled:after:[border-radius:inherit] hover:enabled:after:bg-[var(--ghost-morph-fill)] active:enabled:after:left-0 active:enabled:after:right-0 active:enabled:after:top-0 active:enabled:after:bottom-0 active:enabled:after:[border-radius:inherit] active:enabled:after:bg-[var(--ghost-morph-fill-active)] focus-visible:after:left-0 focus-visible:after:right-0 focus-visible:after:top-0 focus-visible:after:bottom-0 focus-visible:after:[border-radius:inherit] focus-visible:after:bg-[var(--ghost-morph-fill)]',
  ],
  [
    'is-ghost-morph-on',
    '[color:var(--ghost-morph-text)] before:opacity-0 after:left-0 after:right-0 after:top-0 after:bottom-0 after:[border-radius:inherit] after:bg-[var(--ghost-morph-fill)]',
  ],
  [
    'is-ghost-morph-on-active',
    '[color:var(--ghost-morph-text)] before:opacity-0 after:left-0 after:right-0 after:top-0 after:bottom-0 after:[border-radius:inherit] after:bg-[var(--ghost-morph-fill-active)]',
  ],
]
