import type { UserShortcuts } from 'unocss'

export const variantShortcuts: UserShortcuts = [
  [
    'v-neutral-solid',
    'bg-$background-solid border-$border-primary text-$color-inverse hover:enabled:bg-$background-solid-hover hover:enabled:border-$background-solid-hover active:enabled:bg-$background-solid-active active:enabled:border-$background-solid-active focus-visible:[box-shadow:0_0_0_3px_var(--ring-default-primary)] disabled:bg-$background-solid-disabled disabled:border-$background-solid-disabled disabled:text-$color-disabled',
  ],
  ['v-neutral-solid-hover', 'bg-$background-solid-hover border-$background-solid-hover text-$color-inverse'],
  ['v-neutral-solid-active', 'bg-$background-solid-active border-$background-solid-active text-$color-inverse'],
  ['v-neutral-solid-focus', '[box-shadow:0_0_0_3px_var(--ring-default-primary)]'],

  [
    'v-neutral-outline',
    'bg-transparent border-$border-primary text-$color-primary hover:enabled:bg-$background-overlay-hover active:enabled:bg-$background-overlay-active focus-visible:[box-shadow:0_0_0_3px_var(--ring-default-secondary)] disabled:border-$border-disabled disabled:text-$color-outline-disabled',
  ],
  ['v-neutral-outline-hover', 'bg-$background-overlay-hover'],
  ['v-neutral-outline-active', 'bg-$background-overlay-active'],
  ['v-neutral-outline-focus', '[box-shadow:0_0_0_3px_var(--ring-default-secondary)]'],

  [
    'v-neutral-ghost',
    'bg-transparent border-transparent text-$color-primary focus-visible:[box-shadow:0_0_0_3px_var(--ring-default-tertiary)] disabled:text-$color-disabled-soft before:content-[\'\'] before:absolute before:bottom-[-0.0625em] before:left-0 before:w-full before:h-[0.0625em] before:bg-current before:origin-right before:[transform:scaleX(0)_rotate(0.001deg)] before:[transition:transform_0.6s_cubic-bezier(0.625,0.05,0,1)] hover:before:origin-left hover:before:[transform:scaleX(1)_rotate(0.001deg)] active:enabled:before:origin-left active:enabled:before:[transform:scaleX(1)_rotate(0.001deg)] focus-visible:before:origin-left focus-visible:before:[transform:scaleX(1)_rotate(0.001deg)]',
  ],
  ['v-neutral-ghost-hover', 'before:origin-left before:[transform:scaleX(1)_rotate(0.001deg)]'],
  ['v-neutral-ghost-active', 'before:origin-left before:[transform:scaleX(1)_rotate(0.001deg)]'],
  ['v-neutral-ghost-focus', 'before:origin-left before:[transform:scaleX(1)_rotate(0.001deg)] [box-shadow:0_0_0_3px_var(--ring-default-tertiary)]'],

  [
    'v-neutral-soft',
    'bg-$background-quaternary border-$border-quaternary text-$color-primary hover:enabled:bg-$background-quaternary-hover active:enabled:bg-$background-quaternary-active focus-visible:[box-shadow:0_0_0_3px_var(--ring-default-quaternary)] disabled:bg-$background-quaternary-disabled disabled:border-$border-quaternary-disabled disabled:text-$color-disabled-subtle',
  ],
  ['v-neutral-soft-hover', 'bg-$background-quaternary-hover'],
  ['v-neutral-soft-active', 'bg-$background-quaternary-active'],
  ['v-neutral-soft-focus', '[box-shadow:0_0_0_3px_var(--ring-default-quaternary)]'],

  [
    'v-accent-solid',
    'bg-$color-accent border-$border-accent text-$color-on-accent hover:enabled:bg-$color-accent-hover hover:enabled:border-$border-accent-hover active:enabled:bg-$background-accent-primary-active active:enabled:border-$border-accent-active focus-visible:[box-shadow:0_0_0_3px_var(--ring-accent-primary)] disabled:bg-$border-accent-disabled disabled:border-$border-accent-disabled disabled:text-$color-accent-primary-disabled',
  ],
  ['v-accent-solid-hover', 'bg-$color-accent-hover border-$border-accent-hover text-$color-on-accent'],
  ['v-accent-solid-active', 'bg-$background-accent-primary-active border-$border-accent-active text-$color-on-accent'],
  ['v-accent-solid-focus', '[box-shadow:0_0_0_3px_var(--ring-accent-primary)]'],

  [
    'v-accent-outline',
    'bg-transparent border-$border-accent text-$color-accent hover:enabled:border-$border-accent-hover hover:enabled:text-$color-accent-hover hover:enabled:bg-$background-accent-secondary-hover active:enabled:bg-$background-accent-secondary-active focus-visible:[box-shadow:0_0_0_3px_var(--ring-accent-secondary)] disabled:border-$border-accent-disabled disabled:text-$color-accent-secondary-disabled',
  ],
  ['v-accent-outline-hover', 'border-$border-accent-hover text-$color-accent-hover bg-$background-accent-secondary-hover'],
  ['v-accent-outline-active', 'bg-$background-accent-secondary-active'],
  ['v-accent-outline-focus', '[box-shadow:0_0_0_3px_var(--ring-accent-secondary)]'],

  [
    'v-accent-ghost',
    'bg-transparent border-transparent text-$color-accent focus-visible:[box-shadow:0_0_0_3px_var(--ring-accent-tertiary)] disabled:text-$color-accent-tertiary-disabled before:content-[\'\'] before:absolute before:bottom-[-0.0625em] before:left-0 before:w-full before:h-[0.0625em] before:bg-current before:origin-right before:[transform:scaleX(0)_rotate(0.001deg)] before:[transition:transform_0.6s_cubic-bezier(0.625,0.05,0,1)] hover:before:origin-left hover:before:[transform:scaleX(1)_rotate(0.001deg)] active:enabled:before:origin-left active:enabled:before:[transform:scaleX(1)_rotate(0.001deg)] focus-visible:before:origin-left focus-visible:before:[transform:scaleX(1)_rotate(0.001deg)]',
  ],
  ['v-accent-ghost-hover', 'before:origin-left before:[transform:scaleX(1)_rotate(0.001deg)]'],
  ['v-accent-ghost-active', 'before:origin-left before:[transform:scaleX(1)_rotate(0.001deg)]'],
  ['v-accent-ghost-focus', 'before:origin-left before:[transform:scaleX(1)_rotate(0.001deg)] [box-shadow:0_0_0_3px_var(--ring-accent-tertiary)]'],

  [
    'v-accent-soft',
    'bg-$background-accent-quaternary border-$border-accent-soft text-$color-accent-strong hover:enabled:bg-$background-accent-quaternary-hover hover:enabled:border-$border-accent-soft-hover active:enabled:bg-$background-accent-quaternary-active active:enabled:border-$border-accent-soft-hover focus-visible:[box-shadow:0_0_0_3px_var(--ring-accent-quaternary)] disabled:bg-$background-accent-quaternary-disabled disabled:border-$border-accent-soft-disabled disabled:text-$color-accent-quaternary-disabled',
  ],
  ['v-accent-soft-hover', 'bg-$background-accent-quaternary-hover border-$border-accent-soft-hover'],
  ['v-accent-soft-active', 'bg-$background-accent-quaternary-active border-$border-accent-soft-hover'],
  ['v-accent-soft-focus', '[box-shadow:0_0_0_3px_var(--ring-accent-quaternary)]'],
]
