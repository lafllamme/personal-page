import type { UserShortcuts } from 'unocss'

export const linkShortcuts: UserShortcuts = [
  [
    'ui-link-base',
    'relative inline-flex w-fit items-center [--link-underline-offset:var(--motion-link-underline-offset)] [--link-underline-thickness:var(--motion-link-underline-thickness)] [text-decoration:none] [transition:color_var(--motion-underline-duration)_var(--motion-underline-ease)] focus-visible:outline-none',
  ],
  [
    'ui-link-sm',
    '[--link-underline-offset:-0.05em] [--link-underline-thickness:0.055em]',
  ],
  [
    'ui-link-md',
    '[--link-underline-offset:var(--motion-link-underline-offset)] [--link-underline-thickness:var(--motion-link-underline-thickness)]',
  ],
  [
    'ui-link-lg',
    '[--link-underline-offset:-0.075em] [--link-underline-thickness:0.075em]',
  ],
  [
    'ui-link-variant-default',
    'color-$color-primary hover:color-$color-link-hover focus-visible:color-$color-link-hover focus-visible:[box-shadow:0_0_0_2px_var(--ring-primary-offset-inner),0_0_0_4px_var(--ring-primary-offset-outer)]',
  ],
  [
    'ui-link-variant-accent',
    'color-$color-link-accent hover:color-$color-link-accent-hover focus-visible:color-$color-link-accent-hover focus-visible:[box-shadow:0_0_0_2px_var(--ring-accent-offset-inner),0_0_0_4px_var(--color-link-accent-hover)]',
  ],
  [
    'ui-link-underline-hover',
    'after:content-[\'\'] after:absolute after:left-0 after:bottom-[var(--link-underline-offset)] after:h-[var(--link-underline-thickness)] after:w-full after:rounded-full after:bg-current after:origin-right after:scale-x-0 after:[transition:transform_var(--motion-underline-duration)_var(--motion-underline-ease)] hover:after:origin-left hover:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100',
  ],
  [
    'ui-link-underline-always',
    'before:content-[\'\'] before:absolute before:left-0 before:bottom-[var(--link-underline-offset)] before:h-[var(--link-underline-thickness)] before:w-full before:rounded-full before:bg-current before:origin-left before:scale-x-100 before:[transition:transform_var(--motion-underline-duration)_var(--motion-underline-ease)] hover:before:origin-right hover:before:scale-x-0 focus-visible:before:origin-left focus-visible:before:scale-x-100',
  ],
]
