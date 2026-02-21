import type { UserShortcuts } from 'unocss'

export const layoutShortcuts: UserShortcuts = [
  ['ui-l-shell-sm', 'py-$layout-shell-y-sm-base md:py-$layout-shell-y-sm-md'],
  ['ui-l-shell-md', 'py-$layout-shell-y-md-base md:py-$layout-shell-y-md-md'],
  ['ui-l-shell-lg', 'py-$layout-shell-y-lg-base md:py-$layout-shell-y-lg-md'],
  ['ui-l-shell-xl', 'py-$layout-shell-y-xl-base md:py-$layout-shell-y-xl-md'],

  ['ui-l-body-5xl', 'max-w-$layout-body-max-5xl'],
  ['ui-l-body-6xl', 'max-w-$layout-body-max-6xl'],
  ['ui-l-body-7xl', 'max-w-$layout-body-max-7xl'],
  ['ui-l-body-full', 'max-w-$layout-body-max-full'],

  ['ui-l-gx-0', 'px-$layout-body-gutter-0'],
  [
    'ui-l-gx-sm',
    'px-$layout-body-gutter-sm-base sm:px-$layout-body-gutter-sm-sm',
  ],
  [
    'ui-l-gx-md',
    'px-$layout-body-gutter-md-base md:px-$layout-body-gutter-md-md',
  ],
  [
    'ui-l-gx-lg',
    'px-$layout-body-gutter-lg-base sm:px-$layout-body-gutter-lg-sm md:px-$layout-body-gutter-lg-md',
  ],

  ['ui-l-mode-contained', 'mx-auto'],
  ['ui-l-mode-fluid', 'w-full'],
  ['ui-l-mode-bleed-0', 'relative max-w-none'],
  [
    'ui-l-mode-bleed-sm',
    'relative max-w-none -mx-[var(--layout-body-gutter-sm-base)] w-[calc(100%+var(--layout-body-gutter-sm-base)*2)] sm:-mx-[var(--layout-body-gutter-sm-sm)] sm:w-[calc(100%+var(--layout-body-gutter-sm-sm)*2)]',
  ],
  [
    'ui-l-mode-bleed-md',
    'relative max-w-none -mx-[var(--layout-body-gutter-md-base)] w-[calc(100%+var(--layout-body-gutter-md-base)*2)] md:-mx-[var(--layout-body-gutter-md-md)] md:w-[calc(100%+var(--layout-body-gutter-md-md)*2)]',
  ],
  [
    'ui-l-mode-bleed-lg',
    'relative max-w-none -mx-[var(--layout-body-gutter-lg-base)] w-[calc(100%+var(--layout-body-gutter-lg-base)*2)] sm:-mx-[var(--layout-body-gutter-lg-sm)] sm:w-[calc(100%+var(--layout-body-gutter-lg-sm)*2)] md:-mx-[var(--layout-body-gutter-lg-md)] md:w-[calc(100%+var(--layout-body-gutter-lg-md)*2)]',
  ],
]
