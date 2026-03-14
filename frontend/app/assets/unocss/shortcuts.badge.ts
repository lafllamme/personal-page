import type { UserShortcuts } from 'unocss'

export const badgeShortcuts: UserShortcuts = [
  [
    'ui-badge-base',
    'inline-flex w-fit max-w-full items-center [border-radius:var(--ds-badge-radius)] border border-solid [border-width:var(--control-border-width)] [background:var(--ds-badge-bg)] [border-color:var(--ds-badge-border)] [color:var(--ds-badge-text)] [column-gap:var(--ds-badge-gap)]',
  ],
  [
    'ui-badge-shape-pill',
    '[--ds-badge-radius:var(--radius-pill)]',
  ],
  [
    'ui-badge-shape-rounded',
    '[--ds-badge-radius:var(--radius-form-rounded)]',
  ],
  [
    'ui-badge-size-sm',
    '[--ds-badge-h:var(--size-badge-height-sm)] [--ds-badge-px:var(--space-3)] [--ds-badge-gap:var(--space-1_5)] [--ds-badge-dot-size:var(--size-badge-dot-sm)] min-h-[var(--ds-badge-h)] px-[var(--ds-badge-px)]',
  ],
  [
    'ui-badge-size-md',
    '[--ds-badge-h:var(--size-badge-height-md)] [--ds-badge-px:var(--space-3)] [--ds-badge-gap:var(--space-2)] [--ds-badge-dot-size:var(--size-badge-dot-md)] min-h-[var(--ds-badge-h)] px-[var(--ds-badge-px)]',
  ],
  [
    'ui-badge-variant-default',
    '[--ds-badge-solid-bg:var(--color-primary)] [--ds-badge-solid-border:var(--color-primary)] [--ds-badge-solid-text:var(--color-inverse)] [--ds-badge-outline-bg:transparent] [--ds-badge-outline-border:var(--border-field-idle)] [--ds-badge-outline-text:var(--color-primary)] [--ds-badge-soft-bg:var(--un-preset-radix-sand4)] [--ds-badge-soft-border:var(--un-preset-radix-sand6)] [--ds-badge-soft-text:var(--un-preset-radix-sand12)] [--ds-badge-crisp-bg:var(--bg-badge-default-crisp)] [--ds-badge-crisp-border:var(--border-badge-default-crisp)] [--ds-badge-crisp-text:var(--color-badge-default-crisp-text)] [--ds-badge-dot:var(--color-primary)]',
  ],
  [
    'ui-badge-variant-accent',
    '[--ds-badge-solid-bg:var(--color-accent-ui)] [--ds-badge-solid-border:var(--color-accent-ui)] [--ds-badge-solid-text:var(--color-on-accent)] [--ds-badge-outline-bg:transparent] [--ds-badge-outline-border:var(--border-accent-hover)] [--ds-badge-outline-text:var(--color-accent-ui)] [--ds-badge-soft-bg:var(--bg-badge-accent-soft)] [--ds-badge-soft-border:var(--border-badge-accent-soft)] [--ds-badge-soft-text:var(--color-badge-accent-soft-text)] [--ds-badge-crisp-bg:var(--bg-badge-accent-crisp)] [--ds-badge-crisp-border:var(--border-badge-accent-crisp)] [--ds-badge-crisp-text:var(--color-badge-accent-crisp-text)] [--ds-badge-dot:var(--color-badge-accent-soft-text)]',
  ],
  [
    'ui-badge-variant-mixed',
    '[--ds-badge-solid-bg:var(--color-primary)] [--ds-badge-solid-border:var(--color-primary)] [--ds-badge-solid-text:var(--color-inverse)] [--ds-badge-outline-bg:transparent] [--ds-badge-outline-border:var(--border-field-idle)] [--ds-badge-outline-text:var(--color-primary)] [--ds-badge-soft-bg:var(--un-preset-radix-sand4)] [--ds-badge-soft-border:var(--un-preset-radix-sand6)] [--ds-badge-soft-text:var(--un-preset-radix-sand12)] [--ds-badge-crisp-bg:var(--bg-badge-mixed-crisp)] [--ds-badge-crisp-border:var(--border-badge-mixed-crisp)] [--ds-badge-crisp-text:var(--color-badge-mixed-crisp-text)] [--ds-badge-dot:var(--color-accent-ui)]',
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
    'ui-badge-type-crisp',
    '[--ds-badge-bg:var(--ds-badge-crisp-bg)] [--ds-badge-border:var(--ds-badge-crisp-border)] [--ds-badge-text:var(--ds-badge-crisp-text)]',
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
  [
    'ui-badge-anim-shimmer',
    'relative overflow-hidden [isolation:isolate] after:content-[\'\'] after:absolute after:inset-0 after:pointer-events-none after:[background:linear-gradient(120deg,transparent_40%,var(--color-badge-shimmer-highlight)_50%,transparent_60%)] after:[background-size:200%_100%] after:[background-position:100%_0] after:[mix-blend-mode:multiply] dark:after:[mix-blend-mode:screen] after:animate-ds-badge-shimmer motion-reduce:after:animate-none',
  ],
  [
    'ui-badge-anim-beam-wrap',
    'relative inline-flex items-center justify-center w-fit max-w-full overflow-hidden [isolation:isolate] [padding:var(--size-badge-beam-ring-width)] [border-radius:var(--ds-badge-radius)]',
  ],
  [
    'ui-badge-anim-beam-orbit',
    'absolute pointer-events-none z-0 [inset:calc(var(--size-badge-beam-orbit-overscan)*-1)] [background:conic-gradient(from_90deg_at_50%_50%,var(--color-badge-beam-start)_0%,var(--color-badge-beam-mid)_50%,var(--color-badge-beam-end)_100%)] animate-ds-badge-beam motion-reduce:animate-none',
  ],
  [
    'ui-badge-anim-beam-inner',
    'relative z-10',
  ],
  [
    'ui-badge-anim-beam-mask-outline',
    'absolute z-[1] pointer-events-none [inset:var(--size-badge-beam-ring-width)] [border-radius:calc(var(--ds-badge-radius)-var(--radius-badge-beam-inner-offset))] [background:var(--bg-badge-beam-outline-inner)]',
  ],
]
