import type { UserShortcuts } from 'unocss'

export const badgeShortcuts: UserShortcuts = [
  [
    'ui-badge-base',
    'inline-flex w-fit max-w-full items-center rounded-full border border-solid [border-width:var(--control-border-width)] [background:var(--ds-badge-bg)] [border-color:var(--ds-badge-border)] [color:var(--ds-badge-text)] [column-gap:var(--ds-badge-gap)]',
  ],
  [
    'ui-badge-size-sm',
    '[--ds-badge-h:1.5rem] [--ds-badge-px:var(--space-3)] [--ds-badge-gap:var(--space-1_5)] [--ds-badge-dot-size:0.375rem] min-h-[var(--ds-badge-h)] px-[var(--ds-badge-px)]',
  ],
  [
    'ui-badge-size-md',
    '[--ds-badge-h:1.625rem] [--ds-badge-px:var(--space-3)] [--ds-badge-gap:var(--space-2)] [--ds-badge-dot-size:0.4375rem] min-h-[var(--ds-badge-h)] px-[var(--ds-badge-px)]',
  ],
  [
    'ui-badge-variant-default',
    '[--ds-badge-solid-bg:var(--color-primary)] [--ds-badge-solid-border:var(--color-primary)] [--ds-badge-solid-text:var(--color-inverse)] [--ds-badge-outline-bg:transparent] [--ds-badge-outline-border:var(--border-field-idle)] [--ds-badge-outline-text:var(--color-primary)] [--ds-badge-soft-bg:var(--un-preset-radix-sand4)] [--ds-badge-soft-border:var(--un-preset-radix-sand6)] [--ds-badge-soft-text:var(--un-preset-radix-sand12)] [--ds-badge-dot:var(--color-primary)]',
  ],
  [
    'ui-badge-variant-accent',
    '[--ds-badge-solid-bg:var(--color-accent-ui)] [--ds-badge-solid-border:var(--color-accent-ui)] [--ds-badge-solid-text:var(--color-on-accent)] [--ds-badge-outline-bg:transparent] [--ds-badge-outline-border:var(--border-accent-hover)] [--ds-badge-outline-text:var(--color-accent-ui)] [--ds-badge-soft-bg:var(--color-accent-soft)] [--ds-badge-soft-border:var(--color-accent-soft-hover)] [--ds-badge-soft-text:var(--color-accent-strong)] [--ds-badge-dot:var(--color-accent-strong)]',
  ],
  [
    'ui-badge-variant-mixed',
    '[--ds-badge-solid-bg:var(--color-primary)] [--ds-badge-solid-border:var(--color-primary)] [--ds-badge-solid-text:var(--color-inverse)] [--ds-badge-outline-bg:transparent] [--ds-badge-outline-border:var(--border-field-idle)] [--ds-badge-outline-text:var(--color-primary)] [--ds-badge-soft-bg:var(--un-preset-radix-sand4)] [--ds-badge-soft-border:var(--un-preset-radix-sand6)] [--ds-badge-soft-text:var(--un-preset-radix-sand12)] [--ds-badge-dot:var(--color-accent-ui)]',
  ],
  [
    'ui-badge-type-solid',
    '[--ds-badge-bg:var(--ds-badge-solid-bg)] [--ds-badge-border:var(--ds-badge-solid-border)] [--ds-badge-text:var(--ds-badge-solid-text)]',
  ],
  [
    'ui-badge-type-outline',
    '[--ds-badge-bg:var(--ds-badge-outline-bg)] [--ds-badge-border:var(--ds-badge-outline-border)] [--ds-badge-text:var(--ds-badge-outline-text)]',
  ],
  [
    'ui-badge-type-soft',
    '[--ds-badge-bg:var(--ds-badge-soft-bg)] [--ds-badge-border:var(--ds-badge-soft-border)] [--ds-badge-text:var(--ds-badge-soft-text)]',
  ],
  [
    'ui-badge-disabled',
    'opacity-65 [background:var(--bg-soft-disabled)] [border-color:var(--border-disabled)] [color:var(--color-disabled)] [--ds-badge-dot:var(--color-disabled)]',
  ],
  [
    'ui-badge-dot',
    'inline-block rounded-full [width:var(--ds-badge-dot-size)] [height:var(--ds-badge-dot-size)] [background:var(--ds-badge-dot)] shrink-0',
  ],
  [
    'ui-badge-text',
    'leading-none select-none whitespace-nowrap',
  ],
]
