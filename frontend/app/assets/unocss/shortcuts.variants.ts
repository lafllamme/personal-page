import type { UserShortcuts } from 'unocss'

export const variantShortcuts: UserShortcuts = [
  [
    'v-neutral-solid',
    'bg-$bg-solid border-$border-primary color-$color-inverse hover:enabled:[box-shadow:0_0_0_2px_var(--ring-primary-offset-inner),0_0_0_4px_var(--ring-primary-offset-outer)] focus-visible:[box-shadow:0_0_0_2px_var(--ring-primary-offset-inner),0_0_0_4px_var(--ring-primary-offset-outer)] active:enabled:[box-shadow:0_0_0_1px_var(--ring-primary-offset-inner),0_0_0_2px_var(--ring-primary-offset-outer)] disabled:bg-$bg-solid-disabled disabled:border-$border-primary disabled:color-$color-disabled',
  ],

  [
    'v-neutral-outline',
    'bg-transparent border-$border-primary color-$color-primary hover:enabled:bg-$bg-overlay-hover active:enabled:bg-$bg-overlay-active focus-visible:[box-shadow:0_0_0_3px_var(--ring-default-secondary)] disabled:border-$border-disabled disabled:color-$color-outline-disabled',
  ],

  [
    'v-neutral-ghost',
    'bg-transparent border-transparent color-$color-primary focus-visible:[box-shadow:0_0_0_3px_var(--ring-default-tertiary)] disabled:color-$color-disabled-soft before:content-[\'\'] before:absolute before:bottom-[-0.0625em] before:left-0 before:w-full before:h-[0.0625em] before:bg-current before:origin-right before:[transform:scaleX(0)_rotate(0.001deg)] before:[transition:transform_0.6s_cubic-bezier(0.625,0.05,0,1)] hover:before:origin-left hover:before:[transform:scaleX(1)_rotate(0.001deg)] active:enabled:before:origin-left active:enabled:before:[transform:scaleX(1)_rotate(0.001deg)] focus-visible:before:origin-left focus-visible:before:[transform:scaleX(1)_rotate(0.001deg)]',
  ],

  [
    'v-neutral-soft',
    'bg-$bg-soft border-$border-quaternary color-$color-primary hover:enabled:bg-$bg-soft-hover active:enabled:bg-$bg-soft-active focus-visible:[box-shadow:0_0_0_3px_var(--ring-default-quaternary)] disabled:bg-$bg-soft-disabled disabled:border-$border-quaternary-disabled disabled:color-$color-disabled-subtle',
  ],

  [
    'v-accent-solid',
    'bg-$bg-accent border-$border-accent color-$color-on-accent hover:enabled:bg-$bg-accent-hover hover:enabled:border-$border-accent-hover active:enabled:bg-$bg-accent-solid-active active:enabled:border-$border-accent-active focus-visible:[box-shadow:0_0_0_3px_var(--ring-accent-primary)] disabled:bg-$border-accent-disabled disabled:border-$border-accent-disabled disabled:color-$color-accent-solid-disabled',
  ],

  [
    'v-accent-outline',
    'bg-transparent border-$border-accent color-$color-accent hover:enabled:border-$border-accent-hover hover:enabled:color-$color-accent-hover hover:enabled:bg-$bg-accent-outline-hover active:enabled:bg-$bg-accent-outline-active focus-visible:[box-shadow:0_0_0_3px_var(--ring-accent-secondary)] disabled:border-$border-accent-disabled disabled:color-$color-accent-outline-disabled',
  ],

  [
    'v-accent-ghost',
    'bg-transparent border-transparent color-$color-accent focus-visible:[box-shadow:0_0_0_3px_var(--ring-accent-tertiary)] disabled:color-$color-accent-ghost-disabled before:content-[\'\'] before:absolute before:bottom-[-0.0625em] before:left-0 before:w-full before:h-[0.0625em] before:bg-current before:origin-right before:[transform:scaleX(0)_rotate(0.001deg)] before:[transition:transform_0.6s_cubic-bezier(0.625,0.05,0,1)] hover:before:origin-left hover:before:[transform:scaleX(1)_rotate(0.001deg)] active:enabled:before:origin-left active:enabled:before:[transform:scaleX(1)_rotate(0.001deg)] focus-visible:before:origin-left focus-visible:before:[transform:scaleX(1)_rotate(0.001deg)]',
  ],

  [
    'v-accent-soft',
    'bg-$bg-accent-soft border-$border-accent-soft color-$color-accent-strong hover:enabled:bg-$bg-accent-soft-hover hover:enabled:border-$border-accent-soft-hover active:enabled:bg-$bg-accent-soft-active active:enabled:border-$border-accent-soft-hover focus-visible:[box-shadow:0_0_0_3px_var(--ring-accent-quaternary)] disabled:bg-$bg-accent-soft-disabled disabled:border-$border-accent-soft-disabled disabled:color-$color-accent-soft-disabled',
  ],
]
