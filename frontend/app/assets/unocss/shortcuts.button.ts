import type { UserShortcuts } from 'unocss'

export const buttonShortcuts: UserShortcuts = [
  [
    'ui-button-base',
    'group relative inline-flex w-auto items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-[11px] tracking-[0.16em] uppercase border border-solid border-transparent [text-decoration:none] transition-[background-color,color,border-color,box-shadow,transform] duration-[160ms] ease-out disabled:cursor-not-allowed focus-visible:outline-none',
  ],
  [
    'ui-button-label',
    'relative inline-flex items-center',
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
