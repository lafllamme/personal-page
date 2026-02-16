import type { UserShortcuts } from 'unocss'

export const variantShortcuts: UserShortcuts = [
  [
    'v-neutral-solid',
    'bg-$bg-solid border-transparent color-$color-inverse [box-shadow:inset_0_0_0_2px_var(--border-primary)] hover:enabled:[box-shadow:inset_0_0_0_2px_var(--border-primary),0_0_0_2px_var(--ring-primary-offset-inner),0_0_0_4px_var(--ring-primary-offset-outer)] focus-visible:[box-shadow:inset_0_0_0_2px_var(--border-primary),0_0_0_2px_var(--ring-primary-offset-inner),0_0_0_4px_var(--ring-primary-offset-outer)] active:enabled:translate-y-[1px] active:enabled:[box-shadow:inset_0_0_0_2px_var(--border-primary),0_0_0_1px_var(--ring-primary-offset-inner),0_0_0_2px_var(--ring-primary-offset-outer)] disabled:bg-$bg-solid-disabled disabled:[box-shadow:inset_0_0_0_2px_var(--border-primary)] disabled:color-$color-disabled',
  ],

  [
    'v-neutral-outline',
    'bg-transparent border-transparent color-$color-primary [box-shadow:inset_0_0_0_2px_var(--border-primary)] hover:enabled:bg-sand-10 hover:enabled:color-pureWhite hover:enabled:[box-shadow:inset_0_0_0_2px_var(--un-preset-radix-sand10)] active:enabled:translate-y-[1px] active:enabled:bg-sand-11 dark:active:enabled:bg-sand-9 active:enabled:color-pureWhite active:enabled:[box-shadow:inset_0_0_0_2px_var(--un-preset-radix-sand11)] dark:active:enabled:[box-shadow:inset_0_0_0_2px_var(--un-preset-radix-sand9)] focus-visible:bg-sand-10 focus-visible:color-pureWhite focus-visible:[box-shadow:0_0_0_2px_var(--pure-white),0_0_0_4px_var(--un-preset-radix-sand10)] dark:focus-visible:[box-shadow:0_0_0_2px_var(--pure-black),0_0_0_4px_var(--un-preset-radix-sand10)] disabled:[box-shadow:inset_0_0_0_2px_var(--border-disabled)] disabled:color-$color-outline-disabled',
  ],

  [
    'v-neutral-ghost',
    'bg-transparent border-transparent color-$color-primary hover:enabled:color-$color-ghost-hover active:enabled:color-$color-ghost-active focus-visible:color-$color-ghost-hover focus-visible:[box-shadow:0_0_0_3px_var(--ring-ghost-focus)] disabled:color-$color-disabled-soft',
  ],

  [
    'v-neutral-soft',
    'bg-transparent border-transparent color-$color-primary hover:enabled:bg-$bg-quaternary-hover active:enabled:bg-$bg-quaternary-active focus-visible:bg-$bg-quaternary-focus focus-visible:[box-shadow:0_0_0_2px_var(--ring-primary-offset-inner),0_0_0_4px_var(--ring-quaternary-focus)] disabled:color-$color-disabled-subtle',
  ],

  [
    'v-accent-solid',
    'bg-$bg-accent border-$border-accent color-$color-on-accent hover:enabled:bg-$bg-accent-hover hover:enabled:border-$border-accent-hover active:enabled:translate-y-[1px] active:enabled:bg-$bg-accent-solid-active active:enabled:border-$border-accent-active focus-visible:[box-shadow:0_0_0_3px_var(--ring-accent-primary)] disabled:bg-$border-accent-disabled disabled:border-$border-accent-disabled disabled:color-$color-accent-solid-disabled',
  ],

  [
    'v-accent-outline',
    'bg-transparent border-$border-accent color-$color-accent hover:enabled:border-$border-accent-hover hover:enabled:color-$color-accent-hover hover:enabled:bg-$bg-accent-outline-hover active:enabled:translate-y-[1px] active:enabled:bg-$bg-accent-outline-active focus-visible:[box-shadow:0_0_0_3px_var(--ring-accent-secondary)] disabled:border-$border-accent-disabled disabled:color-$color-accent-outline-disabled',
  ],

  [
    'v-accent-ghost',
    'bg-transparent border-transparent color-$color-accent focus-visible:[box-shadow:0_0_0_3px_var(--ring-accent-tertiary)] disabled:color-$color-accent-ghost-disabled',
  ],

  [
    'v-accent-soft',
    'bg-$bg-accent-soft border-$border-accent-soft color-$color-accent-strong hover:enabled:bg-$bg-accent-soft-hover hover:enabled:border-$border-accent-soft-hover active:enabled:bg-$bg-accent-soft-active active:enabled:border-$border-accent-soft-hover focus-visible:[box-shadow:0_0_0_3px_var(--ring-accent-quaternary)] disabled:bg-$bg-accent-soft-disabled disabled:border-$border-accent-soft-disabled disabled:color-$color-accent-soft-disabled',
  ],
]
