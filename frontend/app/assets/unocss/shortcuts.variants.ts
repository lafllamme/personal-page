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
    'bg-transparent border-transparent color-$color-primary [--ghost-morph-line:var(--color-primary)] [--ghost-morph-line-inset-y:0.36rem] [--ghost-morph-line-inset-x:0.95rem] [--ghost-morph-fill:var(--bg-ghost-morph-fill)] [--ghost-morph-fill-active:var(--bg-ghost-morph-fill-active)] [--ghost-morph-text:var(--color-primary)] active:enabled:translate-y-[1px] focus-visible:[box-shadow:0_0_0_2px_var(--ring-primary-offset-inner),0_0_0_4px_var(--bg-ghost-morph-fill)] disabled:color-$color-disabled-soft',
  ],

  [
    'v-neutral-soft',
    'bg-transparent border-transparent color-$color-primary hover:enabled:bg-$bg-quaternary-hover active:enabled:bg-$bg-quaternary-active focus-visible:bg-$bg-quaternary-focus focus-visible:[box-shadow:0_0_0_2px_var(--ring-primary-offset-inner),0_0_0_4px_var(--ring-quaternary-focus)] disabled:color-$color-disabled-subtle',
  ],

  [
    'v-accent-solid',
    'bg-$bg-accent border-transparent color-$color-on-accent [box-shadow:inset_0_0_0_2px_var(--border-accent)] hover:enabled:[box-shadow:inset_0_0_0_2px_var(--border-accent),0_0_0_2px_var(--ring-accent-offset-inner),0_0_0_4px_var(--ring-accent-offset-outer)] focus-visible:[box-shadow:inset_0_0_0_2px_var(--border-accent),0_0_0_2px_var(--ring-accent-offset-inner),0_0_0_4px_var(--ring-accent-offset-outer)] active:enabled:translate-y-[1px] active:enabled:[box-shadow:inset_0_0_0_2px_var(--border-accent),0_0_0_1px_var(--ring-accent-offset-inner),0_0_0_2px_var(--ring-accent-offset-outer)] disabled:[box-shadow:inset_0_0_0_2px_var(--border-accent-disabled)] disabled:bg-$border-accent-disabled disabled:color-$color-accent-solid-disabled',
  ],

  [
    'v-accent-outline',
    'bg-transparent border-transparent color-$color-accent [box-shadow:inset_0_0_0_2px_var(--border-accent)] hover:enabled:bg-$bg-accent-outline-fill hover:enabled:color-$color-primary hover:enabled:[box-shadow:inset_0_0_0_2px_var(--border-accent-outline-fill)] active:enabled:translate-y-[1px] active:enabled:bg-$bg-accent-outline-fill active:enabled:color-$color-primary active:enabled:[box-shadow:inset_0_0_0_2px_var(--border-accent-outline-fill)] focus-visible:bg-$bg-accent-outline-fill focus-visible:color-$color-primary focus-visible:[box-shadow:0_0_0_2px_var(--ring-accent-offset-inner),0_0_0_4px_var(--border-accent-outline-fill)] disabled:[box-shadow:inset_0_0_0_2px_var(--border-accent-disabled)] disabled:color-$color-accent-outline-disabled',
  ],

  [
    'v-accent-ghost',
    'bg-transparent border-transparent color-$color-accent [--ghost-morph-line:var(--color-accent)] [--ghost-morph-line-inset-y:0.36rem] [--ghost-morph-line-inset-x:0.95rem] [--ghost-morph-fill:var(--bg-ghost-morph-accent-fill)] [--ghost-morph-fill-active:var(--bg-ghost-morph-accent-fill-active)] [--ghost-morph-text:var(--color-primary)] active:enabled:translate-y-[1px] focus-visible:[box-shadow:0_0_0_2px_var(--ring-accent-offset-inner),0_0_0_4px_var(--bg-ghost-morph-accent-fill)] disabled:color-$color-accent-ghost-disabled',
  ],

  [
    'v-accent-soft',
    'bg-transparent border-transparent color-$color-accent hover:enabled:bg-$bg-accent-quaternary-hover active:enabled:bg-$bg-accent-quaternary-active focus-visible:bg-$bg-accent-quaternary-focus focus-visible:[box-shadow:0_0_0_2px_var(--ring-accent-offset-inner),0_0_0_4px_var(--ring-accent-quaternary-focus)] disabled:color-$color-accent-soft-disabled',
  ],
]
