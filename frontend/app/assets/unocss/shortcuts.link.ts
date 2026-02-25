import type { UserShortcuts } from 'unocss'

export const linkShortcuts: UserShortcuts = [
  [
    'ui-link-base',
    'relative inline-flex w-fit items-center color-$color-primary [text-decoration:none] [transition:color_var(--motion-underline-duration)_var(--motion-underline-ease)] focus-visible:outline-none focus-visible:[box-shadow:0_0_0_2px_var(--ring-primary-offset-inner),0_0_0_4px_var(--ring-primary-offset-outer)]',
  ],
  [
    'ui-link-underline-hover',
    'after:content-[\'\'] after:absolute after:left-0 after:bottom-[var(--motion-link-underline-offset)] after:h-[var(--motion-link-underline-thickness)] after:w-full after:rounded-full after:bg-current after:origin-right after:scale-x-0 after:[transition:transform_var(--motion-underline-duration)_var(--motion-underline-ease)] hover:after:origin-left hover:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100',
  ],
  [
    'ui-link-underline-always',
    'before:content-[\'\'] before:absolute before:left-0 before:bottom-[var(--motion-link-underline-offset)] before:h-[var(--motion-link-underline-thickness)] before:w-full before:rounded-full before:bg-current before:origin-left before:scale-x-100 before:[transition:transform_var(--motion-underline-duration)_var(--motion-underline-ease)] before:[transition-delay:var(--motion-link-underline-swap-delay)] after:content-[\'\'] after:absolute after:left-0 after:bottom-[var(--motion-link-underline-offset)] after:h-[var(--motion-link-underline-thickness)] after:w-full after:rounded-full after:bg-current after:origin-right after:scale-x-0 after:[transition:transform_var(--motion-underline-duration)_var(--motion-underline-ease)] after:[transition-delay:0s] hover:before:origin-right hover:before:scale-x-0 hover:before:[transition-delay:0s] hover:after:origin-left hover:after:scale-x-100 hover:after:[transition-delay:var(--motion-link-underline-swap-delay)] focus-visible:before:origin-right focus-visible:before:scale-x-0 focus-visible:before:[transition-delay:0s] focus-visible:after:origin-left focus-visible:after:scale-x-100 focus-visible:after:[transition-delay:var(--motion-link-underline-swap-delay)]',
  ],
]

