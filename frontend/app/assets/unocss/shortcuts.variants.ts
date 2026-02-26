import type { UserShortcuts } from 'unocss'

export const variantShortcuts: UserShortcuts = [
  [
    'v-neutral-solid',
    'bg-$bg-solid border-transparent color-$color-inverse [box-shadow:inset_0_0_0_var(--focus-ring-inner-width)_var(--border-primary)] hover:enabled:bg-$bg-solid-hover hover:enabled:[box-shadow:inset_0_0_0_var(--focus-ring-inner-width)_var(--un-preset-radix-sand11)] focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-inner-width)_var(--un-preset-radix-sand11),0_0_0_var(--focus-ring-inner-width)_var(--ring-primary-offset-inner),0_0_0_var(--focus-ring-outer-width)_var(--un-preset-radix-sand11)] active:enabled:translate-y-[1px] active:enabled:bg-$bg-solid-active disabled:bg-$bg-solid-disabled disabled:[box-shadow:inset_0_0_0_var(--focus-ring-inner-width)_var(--border-primary)] disabled:color-$color-disabled',
  ],

  [
    'v-neutral-outline',
    'relative isolate overflow-hidden bg-transparent border-transparent color-$color-primary transform-gpu [transition-property:color,box-shadow] [transition-duration:var(--motion-secondary-sweep-duration)] [transition-timing-function:var(--motion-secondary-sweep-ease)] [box-shadow:inset_0_0_0_2px_var(--border-primary)] before:content-[\'\'] before:absolute before:inset-0 before:rounded-[inherit] before:bg-sand-10 before:translate-y-full before:[transition:transform_var(--motion-secondary-sweep-duration)_var(--motion-secondary-sweep-ease),background-color_240ms_ease-out] before:z-0 hover:enabled:before:translate-y-0 hover:enabled:color-pureWhite hover:enabled:[box-shadow:inset_0_0_0_2px_var(--un-preset-radix-sand10)] active:enabled:translate-y-[1px] active:enabled:before:translate-y-0 active:enabled:before:bg-sand-11 dark:active:enabled:before:bg-sand-9 active:enabled:color-pureWhite active:enabled:[box-shadow:inset_0_0_0_2px_var(--un-preset-radix-sand11)] dark:active:enabled:[box-shadow:inset_0_0_0_2px_var(--un-preset-radix-sand9)] focus-visible:before:translate-y-0 focus-visible:color-pureWhite focus-visible:[box-shadow:0_0_0_2px_var(--pure-white),0_0_0_4px_var(--un-preset-radix-sand10)] dark:focus-visible:[box-shadow:0_0_0_2px_var(--pure-black),0_0_0_4px_var(--un-preset-radix-sand10)] disabled:before:translate-y-full disabled:[box-shadow:inset_0_0_0_2px_var(--border-disabled)] disabled:color-$color-outline-disabled',
  ],

  [
    'v-neutral-ghost',
    'bg-transparent border-transparent color-$color-primary [--ghost-morph-line:var(--color-primary)] [--ghost-morph-line-inset-y:0.36rem] [--ghost-morph-line-inset-x:0.95rem] [--ghost-morph-fill:var(--bg-ghost-morph-fill)] [--ghost-morph-fill-active:var(--bg-ghost-morph-fill-active)] [--ghost-morph-text:var(--color-primary)] active:enabled:translate-y-[1px] focus-visible:[color:var(--ghost-morph-text)] focus-visible:before:opacity-0 focus-visible:after:left-0 focus-visible:after:right-0 focus-visible:after:top-0 focus-visible:after:bottom-0 focus-visible:after:[border-radius:inherit] focus-visible:after:bg-[var(--ghost-morph-fill)] focus-visible:[box-shadow:0_0_0_2px_var(--ring-primary-offset-inner),0_0_0_4px_var(--bg-ghost-morph-fill)] disabled:color-$color-disabled-soft',
  ],

  [
    'v-neutral-soft',
    'bg-transparent border-transparent color-$color-primary [isolation:isolate] relative overflow-hidden after:absolute before:absolute after:inset-0 after:z-0 before:z-0 before:h-32 before:w-12 before:rotate-[18deg] after:rounded-[inherit] after:bg-$bg-quaternary-ribbon-fill before:bg-$bg-quaternary-ribbon-sweep after:opacity-0 after:transition-opacity before:transition-transform after:duration-320 before:duration-760 after:content-[\'\'] before:content-[\'\'] before:-left-8 before:-top-8 before:-translate-x-full hover:enabled:before:translate-x-[560%] hover:enabled:after:opacity-38 active:enabled:after:opacity-52 focus-visible:before:translate-x-[560%] focus-visible:after:opacity-100 focus-visible:[box-shadow:0_0_0_2px_var(--ring-primary-offset-inner),0_0_0_4px_var(--ring-quaternary-focus)] disabled:color-$color-disabled-subtle',
  ],

  [
    'v-accent-solid',
    'bg-$bg-accent border-transparent color-$color-on-accent [box-shadow:inset_0_0_0_var(--focus-ring-inner-width)_var(--border-accent)] hover:enabled:bg-$bg-accent-hover hover:enabled:[box-shadow:inset_0_0_0_var(--focus-ring-inner-width)_var(--bg-accent-hover)] focus-visible:[box-shadow:inset_0_0_0_var(--focus-ring-inner-width)_var(--border-accent),0_0_0_var(--focus-ring-inner-width)_var(--ring-accent-offset-inner),0_0_0_var(--focus-ring-outer-width)_var(--ring-accent-offset-outer)] active:enabled:translate-y-[1px] active:enabled:bg-$bg-accent-active active:enabled:[box-shadow:inset_0_0_0_var(--focus-ring-inner-width)_var(--bg-accent-active)] disabled:[box-shadow:inset_0_0_0_var(--focus-ring-inner-width)_var(--border-accent-disabled)] disabled:bg-$border-accent-disabled disabled:color-$color-accent-solid-disabled',
  ],

  [
    'v-accent-outline',
    'relative isolate overflow-hidden bg-transparent border-transparent color-$color-accent-ui transform-gpu [transition-property:color,box-shadow] [transition-duration:var(--motion-secondary-sweep-duration)] [transition-timing-function:var(--motion-secondary-sweep-ease)] [box-shadow:inset_0_0_0_2px_var(--border-accent-ui)] before:content-[\'\'] before:absolute before:inset-0 before:rounded-[inherit] before:bg-$bg-accent-outline-fill before:translate-y-full before:[transition:transform_var(--motion-secondary-sweep-duration)_var(--motion-secondary-sweep-ease)] before:z-0 hover:enabled:before:translate-y-0 hover:enabled:color-$color-accent-ui hover:enabled:[box-shadow:inset_0_0_0_2px_var(--border-accent-outline-fill)] active:enabled:translate-y-[1px] active:enabled:before:translate-y-0 active:enabled:color-$color-accent-ui active:enabled:[box-shadow:inset_0_0_0_2px_var(--border-accent-outline-fill)] focus-visible:before:translate-y-0 focus-visible:color-$color-accent-ui focus-visible:[box-shadow:0_0_0_2px_var(--ring-accent-offset-inner),0_0_0_4px_var(--border-accent-outline-fill)] disabled:before:translate-y-full disabled:[box-shadow:inset_0_0_0_2px_var(--border-accent-disabled)] disabled:color-$color-accent-outline-disabled',
  ],

  [
    'v-accent-ghost',
    'bg-transparent border-transparent color-$color-accent-ui [--ghost-morph-line:var(--color-accent-ui)] [--ghost-morph-line-inset-y:0.36rem] [--ghost-morph-line-inset-x:0.95rem] [--ghost-morph-fill:var(--bg-ghost-morph-accent-fill)] [--ghost-morph-fill-active:var(--bg-ghost-morph-accent-fill-active)] [--ghost-morph-text:var(--color-accent-ui)] hover:enabled:[color:var(--ghost-morph-text)] active:enabled:translate-y-[1px] active:enabled:[color:var(--ghost-morph-text)] focus-visible:[color:var(--ghost-morph-text)] focus-visible:before:opacity-0 focus-visible:after:left-0 focus-visible:after:right-0 focus-visible:after:top-0 focus-visible:after:bottom-0 focus-visible:after:[border-radius:inherit] focus-visible:after:bg-[var(--ghost-morph-fill)] focus-visible:[box-shadow:0_0_0_2px_var(--ring-accent-offset-inner),0_0_0_4px_var(--bg-ghost-morph-accent-fill)] disabled:color-$color-accent-ghost-disabled',
  ],

  [
    'v-accent-soft',
    'bg-transparent border-transparent color-$color-accent-ui [isolation:isolate] relative overflow-hidden after:absolute before:absolute after:inset-0 after:z-0 before:z-0 before:h-32 before:w-12 before:rotate-[18deg] after:rounded-[inherit] after:bg-$bg-quaternary-ribbon-accent-fill before:bg-$bg-quaternary-ribbon-accent-sweep after:opacity-0 after:transition-opacity before:transition-transform after:duration-320 before:duration-760 after:content-[\'\'] before:content-[\'\'] before:-left-8 before:-top-8 before:-translate-x-full hover:enabled:before:translate-x-[560%] hover:enabled:after:opacity-32 hover:enabled:color-$color-accent-ui active:enabled:after:opacity-48 active:enabled:color-$color-accent-ui focus-visible:before:translate-x-[560%] focus-visible:after:opacity-100 focus-visible:color-$color-accent-ui focus-visible:[box-shadow:0_0_0_2px_var(--ring-accent-offset-inner),0_0_0_4px_var(--ring-accent-quaternary-focus)] disabled:color-$color-accent-soft-disabled',
  ],
]
