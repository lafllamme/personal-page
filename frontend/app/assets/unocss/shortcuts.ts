import type { UserShortcuts } from 'unocss'

export const shortcuts: UserShortcuts = [
  [
    'button-base',
    'relative inline-flex w-auto items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-[11px] tracking-[0.16em] uppercase border border-solid border-transparent [text-decoration:none] transition-[background-color,color,border-color,box-shadow,transform] duration-[160ms] ease-out disabled:cursor-not-allowed active:enabled:translate-y-[1px] focus-visible:outline-none',
  ],
  ['button-label', 'relative inline-flex items-center'],

  [
    'button-default-primary',
    'bg-$background-solid border-$border-primary text-$color-inverse hover:enabled:bg-$background-solid-hover hover:enabled:border-$background-solid-hover active:enabled:bg-$background-solid-active active:enabled:border-$background-solid-active focus-visible:[box-shadow:0_0_0_3px_var(--ring-default-primary)] disabled:bg-$background-solid-disabled disabled:border-$background-solid-disabled disabled:text-$color-disabled',
  ],
  ['button-default-primary-is-hover', 'bg-$background-solid-hover border-$background-solid-hover text-$color-inverse'],
  ['button-default-primary-is-active', 'bg-$background-solid-active border-$background-solid-active text-$color-inverse'],
  ['button-default-primary-is-focus-visible', '[box-shadow:0_0_0_3px_var(--ring-default-primary)]'],

  [
    'button-default-secondary',
    'bg-transparent border-$border-primary text-$color-primary hover:enabled:bg-$background-overlay-hover active:enabled:bg-$background-overlay-active focus-visible:[box-shadow:0_0_0_3px_var(--ring-default-secondary)] disabled:border-$border-disabled disabled:text-$color-outline-disabled',
  ],
  ['button-default-secondary-is-hover', 'bg-$background-overlay-hover'],
  ['button-default-secondary-is-active', 'bg-$background-overlay-active'],
  ['button-default-secondary-is-focus-visible', '[box-shadow:0_0_0_3px_var(--ring-default-secondary)]'],

  [
    'button-default-tertiary',
    'bg-transparent border-transparent text-$color-primary focus-visible:[box-shadow:0_0_0_3px_var(--ring-default-tertiary)] disabled:text-$color-disabled-soft before:content-[\'\'] before:absolute before:bottom-[-0.0625em] before:left-0 before:w-full before:h-[0.0625em] before:bg-current before:origin-right before:[transform:scaleX(0)_rotate(0.001deg)] before:[transition:transform_0.6s_cubic-bezier(0.625,0.05,0,1)] hover:before:origin-left hover:before:[transform:scaleX(1)_rotate(0.001deg)] active:enabled:before:origin-left active:enabled:before:[transform:scaleX(1)_rotate(0.001deg)] focus-visible:before:origin-left focus-visible:before:[transform:scaleX(1)_rotate(0.001deg)]',
  ],
  ['button-default-tertiary-is-hover', 'before:origin-left before:[transform:scaleX(1)_rotate(0.001deg)]'],
  ['button-default-tertiary-is-active', 'before:origin-left before:[transform:scaleX(1)_rotate(0.001deg)]'],
  ['button-default-tertiary-is-focus-visible', 'before:origin-left before:[transform:scaleX(1)_rotate(0.001deg)] [box-shadow:0_0_0_3px_var(--ring-default-tertiary)]'],

  [
    'button-default-quaternary',
    'bg-$background-quaternary border-$border-quaternary text-$color-primary hover:enabled:bg-$background-quaternary-hover active:enabled:bg-$background-quaternary-active focus-visible:[box-shadow:0_0_0_3px_var(--ring-default-quaternary)] disabled:bg-$background-quaternary-disabled disabled:border-$border-quaternary-disabled disabled:text-$color-disabled-subtle',
  ],
  ['button-default-quaternary-is-hover', 'bg-$background-quaternary-hover'],
  ['button-default-quaternary-is-active', 'bg-$background-quaternary-active'],
  ['button-default-quaternary-is-focus-visible', '[box-shadow:0_0_0_3px_var(--ring-default-quaternary)]'],

  [
    'button-accent-primary',
    'bg-$color-accent border-$border-accent text-$color-on-accent hover:enabled:bg-$color-accent-hover hover:enabled:border-$border-accent-hover active:enabled:bg-$background-accent-primary-active active:enabled:border-$border-accent-active focus-visible:[box-shadow:0_0_0_3px_var(--ring-accent-primary)] disabled:bg-$border-accent-disabled disabled:border-$border-accent-disabled disabled:text-$color-accent-primary-disabled',
  ],
  ['button-accent-primary-is-hover', 'bg-$color-accent-hover border-$border-accent-hover text-$color-on-accent'],
  ['button-accent-primary-is-active', 'bg-$background-accent-primary-active border-$border-accent-active text-$color-on-accent'],
  ['button-accent-primary-is-focus-visible', '[box-shadow:0_0_0_3px_var(--ring-accent-primary)]'],

  [
    'button-accent-secondary',
    'bg-transparent border-$border-accent text-$color-accent hover:enabled:border-$border-accent-hover hover:enabled:text-$color-accent-hover hover:enabled:bg-$background-accent-secondary-hover active:enabled:bg-$background-accent-secondary-active focus-visible:[box-shadow:0_0_0_3px_var(--ring-accent-secondary)] disabled:border-$border-accent-disabled disabled:text-$color-accent-secondary-disabled',
  ],
  ['button-accent-secondary-is-hover', 'border-$border-accent-hover text-$color-accent-hover bg-$background-accent-secondary-hover'],
  ['button-accent-secondary-is-active', 'bg-$background-accent-secondary-active'],
  ['button-accent-secondary-is-focus-visible', '[box-shadow:0_0_0_3px_var(--ring-accent-secondary)]'],

  [
    'button-accent-tertiary',
    'bg-transparent border-transparent text-$color-accent focus-visible:[box-shadow:0_0_0_3px_var(--ring-accent-tertiary)] disabled:text-$color-accent-tertiary-disabled before:content-[\'\'] before:absolute before:bottom-[-0.0625em] before:left-0 before:w-full before:h-[0.0625em] before:bg-current before:origin-right before:[transform:scaleX(0)_rotate(0.001deg)] before:[transition:transform_0.6s_cubic-bezier(0.625,0.05,0,1)] hover:before:origin-left hover:before:[transform:scaleX(1)_rotate(0.001deg)] active:enabled:before:origin-left active:enabled:before:[transform:scaleX(1)_rotate(0.001deg)] focus-visible:before:origin-left focus-visible:before:[transform:scaleX(1)_rotate(0.001deg)]',
  ],
  ['button-accent-tertiary-is-hover', 'before:origin-left before:[transform:scaleX(1)_rotate(0.001deg)]'],
  ['button-accent-tertiary-is-active', 'before:origin-left before:[transform:scaleX(1)_rotate(0.001deg)]'],
  ['button-accent-tertiary-is-focus-visible', 'before:origin-left before:[transform:scaleX(1)_rotate(0.001deg)] [box-shadow:0_0_0_3px_var(--ring-accent-tertiary)]'],

  [
    'button-accent-quaternary',
    'bg-$background-accent-quaternary border-$border-accent-soft text-$color-accent-strong hover:enabled:bg-$background-accent-quaternary-hover hover:enabled:border-$border-accent-soft-hover active:enabled:bg-$background-accent-quaternary-active active:enabled:border-$border-accent-soft-hover focus-visible:[box-shadow:0_0_0_3px_var(--ring-accent-quaternary)] disabled:bg-$background-accent-quaternary-disabled disabled:border-$border-accent-soft-disabled disabled:text-$color-accent-quaternary-disabled',
  ],
  ['button-accent-quaternary-is-hover', 'bg-$background-accent-quaternary-hover border-$border-accent-soft-hover'],
  ['button-accent-quaternary-is-active', 'bg-$background-accent-quaternary-active border-$border-accent-soft-hover'],
  ['button-accent-quaternary-is-focus-visible', '[box-shadow:0_0_0_3px_var(--ring-accent-quaternary)]'],

  [
    'ts-contrast',
    '[text-shadow:0_0_8px_rgba(0,0,0,0.23),_0_0_16px_rgba(0,0,0,0.12)] dark:[text-shadow:0_0_8px_rgba(255,255,255,0.23),_0_0_16px_rgba(255,255,255,0.12)]',
  ],
]
