type ModeColor = string | { light: string, dark?: string }

type Scale = Record<number, ModeColor>
type TokenSet = Record<string, ModeColor>

export const PURE_BLACK = '#000000'
export const PURE_WHITE = '#f2efe6'

const coreTokens: TokenSet = {
  'pure-black': PURE_BLACK,
  'pure-white': PURE_WHITE,
}

const colorTokens: TokenSet = {
  'color-primary': { light: 'var(--pure-black)', dark: 'var(--pure-white)' },
  'color-inverse': { light: 'var(--pure-white)', dark: 'var(--pure-black)' },
  'color-on-accent': { light: '#ffffff', dark: '#0d1514' },
  'color-disabled': { light: '#888681', dark: '#6a6965' },
  'color-disabled-soft': { light: 'rgba(0, 0, 0, 0.44)', dark: 'rgba(242, 239, 230, 0.44)' },
  'color-disabled-subtle': { light: 'rgba(0, 0, 0, 0.42)', dark: 'rgba(242, 239, 230, 0.42)' },
  'color-outline-disabled': { light: 'rgba(0, 0, 0, 0.52)', dark: 'rgba(242, 239, 230, 0.52)' },
  'color-accent': { light: 'var(--toxic-12)', dark: 'var(--toxic-11)' },
  'color-accent-ui': { light: 'var(--toxic-11)', dark: 'var(--toxic-11)' },
  'color-accent-hover': 'var(--toxic-10)',
  'color-accent-strong': 'var(--toxic-12)',
  'color-accent-soft': 'var(--toxic-7)',
  'color-accent-soft-hover': 'var(--toxic-8)',
  'color-accent-solid-disabled': { light: '#edf7f5', dark: '#9ac8bf' },
  'color-accent-outline-disabled': { light: '#7ea9a3', dark: '#2e5e58' },
  'color-accent-ghost-disabled': { light: '#7ea9a3', dark: '#2e5e58' },
  'color-accent-soft-disabled': { light: '#90a19e', dark: 'rgba(173, 240, 221, 0.45)' },
  'color-link-hover': { light: 'var(--un-preset-radix-sand10)', dark: 'var(--un-preset-radix-sand10)' },
  'color-link-accent': { light: 'var(--toxic-11)', dark: 'var(--toxic-11)' },
  'color-link-accent-hover': { light: 'var(--toxic-12)', dark: 'var(--toxic-9)' },
  'color-link-arrow-default-idle': { light: 'var(--un-preset-radix-sand12)', dark: 'var(--pure-white)' },
  'color-link-arrow-accent-idle': { light: 'var(--toxic-10)', dark: 'var(--toxic-10)' },
  'color-field-placeholder': { light: 'rgba(0, 0, 0, 0.46)', dark: 'rgba(242, 239, 230, 0.46)' },
  'color-field-meta-subtle': { light: 'var(--un-preset-radix-sand12)', dark: 'var(--un-preset-radix-sand11)' },
  'color-field-floating-label': { light: 'var(--color-accent-ui)', dark: 'var(--color-accent)' },
  'color-field-readonly-idle-text': { light: 'var(--un-preset-radix-sand11)', dark: 'var(--un-preset-radix-sand10)' },
  'color-field-readonly-hover-text': { light: 'var(--un-preset-radix-sand12)', dark: 'var(--un-preset-radix-sand11)' },
  'color-error-text': { light: 'var(--un-preset-radix-crimson11)', dark: 'var(--un-preset-radix-crimson11)' },
  'color-select-shadow': { light: 'rgba(0, 0, 0, 0.16)', dark: 'rgba(0, 0, 0, 0.45)' },
}

const bgTokens: TokenSet = {
  'bg-solid': { light: 'var(--pure-black)', dark: 'var(--pure-white)' },
  'bg-inverse': { light: 'var(--pure-white)', dark: 'var(--pure-black)' },
  'bg-solid-hover': { light: 'var(--un-preset-radix-sand11)', dark: 'var(--un-preset-radix-sand11)' },
  'bg-solid-active': { light: '#353533', dark: '#bdbab3' },
  'bg-solid-disabled': { light: '#3f3e3c', dark: '#b3b1aa' },

  'bg-overlay-hover': { light: 'rgba(0, 0, 0, 0.08)', dark: 'rgba(242, 239, 230, 0.08)' },
  'bg-overlay-active': { light: 'rgba(0, 0, 0, 0.14)', dark: 'rgba(242, 239, 230, 0.14)' },

  'bg-soft': { light: 'rgba(0, 0, 0, 0.06)', dark: 'rgba(242, 239, 230, 0.06)' },
  'bg-soft-hover': { light: 'rgba(0, 0, 0, 0.12)', dark: 'rgba(242, 239, 230, 0.12)' },
  'bg-soft-active': { light: 'rgba(0, 0, 0, 0.18)', dark: 'rgba(242, 239, 230, 0.18)' },
  'bg-soft-disabled': { light: 'rgba(0, 0, 0, 0.04)', dark: 'rgba(242, 239, 230, 0.04)' },
  'bg-quaternary-ribbon-fill': { light: 'var(--un-preset-radix-sand7)', dark: 'var(--un-preset-radix-sand6)' },
  'bg-quaternary-ribbon-sweep': { light: 'var(--un-preset-radix-sand8)', dark: 'var(--un-preset-radix-sand7)' },
  'bg-quaternary-ribbon-accent-fill': { light: 'var(--toxic-6)', dark: 'var(--toxic-6)' },
  'bg-quaternary-ribbon-accent-sweep': { light: 'var(--toxic-8)', dark: 'var(--toxic-7)' },
  'bg-quaternary-focus': 'var(--bg-quaternary-ribbon-fill)',

  'bg-accent': { light: 'var(--toxic-11)', dark: 'var(--toxic-11)' },
  'bg-accent-hover': { light: 'var(--toxic-9)', dark: 'var(--toxic-10)' },
  'bg-accent-active': { light: 'var(--toxic-12)', dark: 'var(--toxic-9)' },
  'bg-accent-outline-fill': { light: 'var(--toxic-7)', dark: 'var(--toxic-7)' },
  'bg-accent-soft': 'var(--toxic-3)',
  'bg-accent-soft-hover': 'var(--toxic-4)',
  'bg-accent-soft-active': 'var(--toxic-5)',
  'bg-accent-soft-disabled': { light: '#f2f6f5', dark: '#0f1f1d' },
  'bg-ghost-morph-fill': { light: 'var(--un-preset-radix-sand8)', dark: 'var(--un-preset-radix-sand8)' },
  'bg-ghost-morph-fill-active': { light: 'var(--un-preset-radix-sand9)', dark: 'var(--un-preset-radix-sand9)' },
  'bg-ghost-morph-accent-fill': { light: 'var(--toxic-6)', dark: 'var(--toxic-5)' },
  'bg-ghost-morph-accent-fill-active': { light: 'var(--toxic-7)', dark: 'var(--toxic-6)' },
  'bg-field-error-soft': { light: 'rgba(223, 52, 120, 0.025)', dark: 'var(--un-preset-radix-crimson-a3)' },
}

const borderTokens: TokenSet = {
  'border-primary': { light: 'var(--pure-black)', dark: 'var(--pure-white)' },
  'border-inverse': { light: 'var(--pure-white)', dark: 'var(--pure-black)' },
  'border-disabled': { light: 'rgba(0, 0, 0, 0.52)', dark: 'rgba(242, 239, 230, 0.52)' },
  'border-quaternary': { light: 'rgba(0, 0, 0, 0.22)', dark: 'rgba(242, 239, 230, 0.22)' },
  'border-quaternary-disabled': { light: 'rgba(0, 0, 0, 0.14)', dark: 'rgba(242, 239, 230, 0.14)' },

  'border-accent': { light: 'var(--toxic-11)', dark: 'var(--toxic-11)' },
  'border-accent-ui': { light: 'var(--toxic-11)', dark: 'var(--toxic-11)' },
  'border-accent-hover': { light: 'var(--toxic-10)', dark: 'var(--toxic-10)' },
  'border-accent-active': { light: 'var(--toxic-9)', dark: 'var(--toxic-9)' },
  'border-accent-outline-fill': 'var(--toxic-7)',
  'border-accent-disabled': { light: '#7ea9a3', dark: '#2e5e58' },
  'border-accent-soft': 'var(--toxic-7)',
  'border-accent-soft-hover': 'var(--toxic-8)',
  'border-accent-soft-disabled': { light: '#dbe5e3', dark: 'rgba(28, 105, 97, 0.48)' },
  'border-field-idle': { light: 'var(--un-preset-radix-sand11)', dark: 'var(--un-preset-radix-sand11)' },
  'border-error': { light: 'var(--un-preset-radix-crimson10)', dark: 'var(--un-preset-radix-crimson10)' },
}

const ringTokens: TokenSet = {
  'ring-default-primary': { light: 'rgba(242, 239, 230, 0.24)', dark: 'rgba(0, 0, 0, 0.24)' },
  'ring-default-secondary': { light: 'rgba(0, 0, 0, 0.22)', dark: 'rgba(242, 239, 230, 0.22)' },
  'ring-default-tertiary': { light: 'rgba(0, 0, 0, 0.20)', dark: 'rgba(242, 239, 230, 0.20)' },
  'ring-ghost-focus': { light: 'var(--un-preset-radix-sand8)', dark: 'var(--un-preset-radix-sand8)' },
  'ring-quaternary-focus': 'var(--bg-quaternary-ribbon-fill)',
  'ring-default-quaternary': { light: 'rgba(0, 0, 0, 0.20)', dark: 'rgba(242, 239, 230, 0.20)' },
  'ring-primary-offset-inner': { light: 'var(--pure-white)', dark: 'var(--pure-black)' },
  'ring-primary-offset-outer': { light: 'var(--pure-black)', dark: 'var(--pure-white)' },
  'ring-accent-offset-inner': { light: 'var(--pure-white)', dark: 'var(--pure-black)' },
  'ring-accent-offset-outer': { light: 'var(--toxic-11)', dark: 'var(--toxic-10)' },
  'ring-accent-quaternary-focus': { light: 'var(--toxic-9)', dark: 'var(--toxic-9)' },

  'ring-accent-primary': { light: 'rgba(0, 133, 115, 0.30)', dark: 'rgba(11, 216, 182, 0.30)' },
  'ring-accent-secondary': { light: 'rgba(0, 133, 115, 0.30)', dark: 'rgba(11, 216, 182, 0.32)' },
  'ring-accent-tertiary': { light: 'rgba(0, 133, 115, 0.22)', dark: 'rgba(11, 216, 182, 0.22)' },
  'ring-accent-quaternary': { light: 'rgba(13, 155, 138, 0.28)', dark: 'rgba(14, 179, 158, 0.28)' },
}

const motionTokens: TokenSet = {
  'motion-underline-duration': '0.6s',
  'motion-underline-ease': 'cubic-bezier(0.625, 0.05, 0, 1)',
  'motion-underline-offset': '-0.01em',
  'motion-underline-thickness': '0.125em',
  'motion-link-underline-offset': '-0.0625em',
  'motion-link-underline-thickness': '0.0625em',
  'motion-link-stagger-line-duration': '0.35s',
  'motion-link-stagger-line-ease': 'cubic-bezier(0.76, 0, 0.24, 1)',
  'motion-link-stagger-arrow-duration': '0.4s',
  'motion-link-stagger-arrow-ease': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  'motion-link-stagger-arrow-delay': '0.2s',
  'motion-primary-sweep-duration': '0.4s',
  'motion-primary-sweep-ease': 'cubic-bezier(0.3, 1, 0.8, 1)',
  'motion-primary-rotate-duration': '0.5s',
  'motion-primary-rotate-stagger': '0.075',
  'motion-primary-rotate-angle': '20deg',
  'motion-primary-rotate-origin-y': '1360%',
  'motion-primary-rotate-origin-y-sm': '2400%',
  'motion-primary-rotate-origin-y-md': '2080%',
  'motion-primary-rotate-origin-y-lg': '1800%',
  'motion-primary-rotate-letter-spacing': '-0.02em',
  'motion-active-press-scale': '0.925',
  'motion-secondary-sweep-duration': '0.32s',
  'motion-secondary-sweep-ease': 'cubic-bezier(0.22, 1, 0.36, 1)',
  'motion-input-floating-duration': '160ms',
  'motion-input-floating-ease': 'ease',
  'motion-input-shell-duration': '160ms',
  'motion-input-shell-ease': 'ease',
  'motion-input-error-shake-duration': '450ms',
  'motion-input-error-shake-ease': 'cubic-bezier(0.36, 0.07, 0.19, 0.97)',
  'motion-checkbox-shell-duration': '500ms',
  'motion-checkbox-shell-ease': 'cubic-bezier(0.22, 1, 0.36, 1)',
  'motion-checkbox-check-duration': '200ms',
  'motion-checkbox-check-delay': '200ms',
  'motion-select-overlay-duration': '320ms',
  'motion-select-overlay-ease': 'cubic-bezier(0.22, 1, 0.36, 1)',
  'motion-select-option-duration': '240ms',
  'motion-select-option-ease': 'cubic-bezier(0.22, 1, 0.36, 1)',
  'motion-select-option-stagger-step': '28ms',
  'motion-select-chevron-duration': '260ms',
  'motion-select-chevron-ease': 'cubic-bezier(0.22, 1, 0.36, 1)',
  'motion-switch-track-duration': '220ms',
  'motion-switch-track-ease': 'cubic-bezier(0.22, 1, 0.36, 1)',
  'motion-switch-thumb-duration': '260ms',
  'motion-switch-thumb-ease': 'cubic-bezier(0.22, 1, 0.36, 1)',
  'motion-switch-press-duration': '160ms',
}

const spacingTokens: TokenSet = {
  'space-0_25': '0.0625rem',
  'space-0_5': '0.125rem',
  'space-1': '0.25rem',
  'space-1_5': '0.375rem',
  'space-2': '0.5rem',
  'space-2_5': '0.625rem',
  'space-3': '0.75rem',
  'space-3_5': '0.875rem',
  'space-4': '1rem',
  'space-4_75': '1.1875rem',
  'space-5': '1.25rem',
  'space-6': '1.5rem',
  'space-8': '2rem',
  'space-10': '2.5rem',
  'space-12': '3rem',
  'space-14': '3.5rem',
  'space-16': '4rem',
  'space-20': '5rem',
  'space-inline-tight': '0.18em',
}

const layoutTokens: TokenSet = {
  // Section shell rhythm
  'layout-shell-y-sm-base': 'var(--space-8)',
  'layout-shell-y-sm-md': 'var(--space-10)',
  'layout-shell-y-md-base': 'var(--space-10)',
  'layout-shell-y-md-md': 'var(--space-14)',
  'layout-shell-y-lg-base': 'var(--space-12)',
  'layout-shell-y-lg-md': 'var(--space-16)',
  'layout-shell-y-xl-base': 'var(--space-16)',
  'layout-shell-y-xl-md': 'var(--space-20)',

  // Section body max widths
  'layout-body-max-5xl': '64rem',
  'layout-body-max-6xl': '72rem',
  'layout-body-max-7xl': '80rem',
  'layout-body-max-full': '100%',

  // Section body horizontal gutter
  'layout-body-gutter-0': '0',
  'layout-body-gutter-sm-base': '1rem',
  'layout-body-gutter-sm-sm': '1.25rem',
  'layout-body-gutter-md-base': '1rem',
  'layout-body-gutter-md-md': '2rem',
  'layout-body-gutter-lg-base': '1.25rem',
  'layout-body-gutter-lg-sm': '1.5rem',
  'layout-body-gutter-lg-md': '3rem',
}

const sizingTokens: TokenSet = {
  'size-control-sm': '2rem',
  'size-control-md': '2.25rem',
  'size-control-lg': '2.625rem',
  'size-control-xl': '3rem',
  'button-height-sm': 'var(--size-control-sm)',
  'button-height-md': 'var(--size-control-md)',
  'button-height-lg': 'var(--size-control-lg)',
  'button-px-sm': 'var(--space-3)',
  'button-px-md': 'var(--space-3_5)',
  'button-px-lg': 'var(--space-4_75)',
  'button-pb-sm': 'var(--space-0_25)',
  'button-pb-md': 'var(--space-0_25)',
  'button-pb-lg': 'var(--space-0_25)',
  'button-label-track-sm': '-0.01em',
  'button-label-track-md': '-0.01em',
  'button-label-track-lg': '-0.01em',
  'radius-xs': '0.125rem',
  'radius-sm': '0.25rem',
  'radius-md': '0.375rem',
  'radius-lg': '0.5rem',
  'radius-xl': '0.75rem',
  'radius-2xl': '1rem',
  'radius-form-pill': '1rem',
  'radius-form-rounded': '0.5rem',
  'radius-3xl': '1.5rem',
  'radius-4xl': '2rem',
  'radius-pill': '9999px',
  'control-border-width': '1px',
  'focus-ring-inner-width': '2px',
  'focus-ring-outer-width': '4px',
  'focus-ring-active-width': '1.5px',
  'form-control-inset-x': 'var(--space-5)',
  'input-control-padding-y': 'calc(var(--space-2) - 1px)',
  'input-control-padding-top-floating': 'calc(var(--space-4_75) - 1px)',
  'size-textarea-height-default': 'calc(var(--size-control-xl) * 3.35)',
  'size-textarea-height-focus': 'calc(var(--size-control-xl) * 4)',
  'size-checkbox-control-sm': 'calc(var(--space-4) + var(--space-0_5))',
  'size-checkbox-control-md': 'var(--space-5)',
  'size-checkbox-control-lg': 'var(--space-6)',
  'radius-checkbox-sm': 'calc(var(--radius-sm) + var(--space-0_25))',
  'radius-checkbox-md': 'var(--radius-md)',
  'radius-checkbox-lg': 'calc(var(--radius-md) + var(--space-0_25))',
  'size-checkbox-indicator': '84%',
  'size-checkbox-check-stroke': '3.5',
  'size-switch-track-sm': 'var(--space-5)',
  'size-switch-track-md': 'var(--space-6)',
  'size-switch-track-lg': 'calc(var(--space-6) + var(--space-1))',
  'size-switch-width-sm': 'calc(var(--space-8) + var(--space-0_5))',
  'size-switch-width-md': 'var(--space-10)',
  'size-switch-width-lg': 'calc(var(--space-10) + var(--space-1_5))',
  'size-switch-thumb-sm': 'calc(var(--space-3) + var(--space-0_5))',
  'size-switch-thumb-md': 'calc(var(--space-4) + var(--space-0_5))',
  'size-switch-thumb-lg': 'var(--space-5)',
  'size-switch-thumb-press-sm': 'var(--space-4_75)',
  'size-switch-thumb-press-md': 'calc(var(--space-5) + var(--space-0_5))',
  'size-switch-thumb-press-lg': 'var(--space-6)',
}

const typographyFontFamilyTheme = {
  'display-hero': '\'DrukBoldTrial\', sans-serif',
  'display-compact': '\'DrukTextBoldTrial\', sans-serif',
  'headline': '\'ClashDisplay-Regular\', sans-serif',
  'body': '\'Manrope\', sans-serif',
  'meta': '\'Space Grotesk\', sans-serif',
  'quote': '\'Libre Baskerville\', serif',
  'signal': '\'Zalando Sans Expanded\', sans-serif',
} as const

const typographyTokens: TokenSet = {
  // Fluid size scale
  'type-size-2xs': 'clamp(0.625rem, calc(0.6rem + 0.08vw), 0.6875rem)',
  'type-size-xs': 'clamp(0.75rem, calc(0.68rem + 0.22vw), 0.875rem)',
  'type-size-sm': 'clamp(0.875rem, calc(0.8rem + 0.3vw), 1rem)',
  'type-size-md': 'clamp(1rem, calc(0.92rem + 0.38vw), 1.125rem)',
  'type-size-lg': 'clamp(1.1875rem, calc(1.04rem + 0.6vw), 1.5rem)',
  'type-size-xl': 'clamp(1.375rem, calc(1.12rem + 1.1vw), 2rem)',
  'type-size-2xl': 'clamp(1.75rem, calc(1.35rem + 1.9vw), 3rem)',
  'type-size-3xl': 'clamp(2.25rem, calc(1.65rem + 3vw), 4.75rem)',
  'type-size-4xl': 'clamp(2.6rem, calc(1.85rem + 4.1vw), 6.2rem)',

  // Leading scale
  'type-leading-2xs': '1.35',
  'type-leading-xs': '1.35',
  'type-leading-sm': '1.45',
  'type-leading-md': '1.55',
  'type-leading-lg': '1.35',
  'type-leading-xl': '1.12',
  'type-leading-2xl': '1.02',
  'type-leading-3xl': '0.95',
  'type-leading-4xl': '0.92',

  // Display tracking curve
  'type-track-display-2xs': '0.04em',
  'type-track-display-xs': '0.042em',
  'type-track-display-sm': '0.046em',
  'type-track-display-md': '0.05em',
  'type-track-display-lg': '0.049em',
  'type-track-display-xl': '0.048em',
  'type-track-display-2xl': '0.046em',
  'type-track-display-3xl': '0.044em',
  'type-track-display-4xl': '0.042em',
  'type-track-display-2xs-md': '0.042em',
  'type-track-display-xs-md': '0.044em',
  'type-track-display-sm-md': '0.048em',
  'type-track-display-md-md': '0.052em',
  'type-track-display-lg-md': '0.051em',
  'type-track-display-xl-md': '0.05em',
  'type-track-display-2xl-md': '0.048em',
  'type-track-display-3xl-md': '0.046em',
  'type-track-display-4xl-md': '0.044em',

  // Meta tracking curve (negative, tighter for Space Grotesk)
  'type-track-meta-2xs': '-0.011em',
  'type-track-meta-xs': '-0.012em',
  'type-track-meta-sm': '-0.013em',
  'type-track-meta-md': '-0.015em',
  'type-track-meta-lg': '-0.018em',
  'type-track-meta-xl': '-0.02em',
  'type-track-meta-2xl': '-0.022em',
  'type-track-meta-3xl': '-0.024em',
  'type-track-meta-4xl': '-0.025em',
  // Meta relaxed tracking curve (airier labels, up to ~0.12em)
  'type-track-meta-2xs-relaxed': '0.052em',
  'type-track-meta-xs-relaxed': '0.06em',
  'type-track-meta-sm-relaxed': '0.068em',
  'type-track-meta-md-relaxed': '0.076em',
  'type-track-meta-lg-relaxed': '0.084em',
  'type-track-meta-xl-relaxed': '0.092em',
  'type-track-meta-2xl-relaxed': '0.1em',
  'type-track-meta-3xl-relaxed': '0.11em',
  'type-track-meta-4xl-relaxed': '0.12em',
}

export const toxicScale: Scale = {
  1: { light: '#fafefd', dark: '#0d1514' },
  2: { light: '#f3fbf9', dark: '#111c1b' },
  3: { light: '#e0f8f3', dark: '#0d2d2a' },
  4: { light: '#ccf3ea', dark: '#023b37' },
  5: { light: '#b8eae0', dark: '#084843' },
  6: { light: '#a1ded2', dark: '#145750' },
  7: { light: '#83cdc1', dark: '#1c6961' },
  8: { light: '#53b9ab', dark: '#207e73' },
  9: '#12a594',
  10: { light: '#0d9b8a', dark: '#0eb39e' },
  11: { light: '#008573', dark: '#0bd8b6' },
  12: { light: '#0d3d38', dark: '#adf0dd' },
}

function resolveModeColor(color: ModeColor) {
  if (typeof color === 'string') {
    return {
      light: color,
      dark: color,
    }
  }

  return {
    light: color.light,
    dark: color.dark ?? color.light,
  }
}

function createScaleVarMap(scaleName: string, scale: Scale) {
  const sortedSteps = Object.keys(scale)
    .map(Number)
    .sort((a, b) => a - b)

  return Object.fromEntries(sortedSteps.map(step => [step, `var(--${scaleName}-${step})`]))
}

function createTokenVarMap(tokens: TokenSet) {
  return Object.fromEntries(Object.keys(tokens).map(token => [token, `var(--${token})`]))
}

function createPrefixedTokenVarMap(tokens: TokenSet, prefix: string) {
  return Object.fromEntries(
    Object.keys(tokens)
      .filter(token => token.startsWith(prefix))
      .map(token => [token, `var(--${token})`]),
  )
}

export const themeColors = {
  color: createTokenVarMap(colorTokens),
  bg: createTokenVarMap(bgTokens),
  border: createTokenVarMap(borderTokens),
  ring: createTokenVarMap(ringTokens),
  toxic: createScaleVarMap('toxic', toxicScale),
}

export const spacingTheme = createTokenVarMap(spacingTokens)

export const radiusTheme = createPrefixedTokenVarMap(sizingTokens, 'radius-')

export const typographyTheme = {
  fontSize: createPrefixedTokenVarMap(typographyTokens, 'type-size-'),
  fontFamily: typographyFontFamilyTheme,
}

export function colorTokensPreflightCss() {
  const root: string[] = []
  const dark: string[] = []

  const appendTokens = (tokens: TokenSet) => {
    for (const [token, value] of Object.entries(tokens)) {
      const resolved = resolveModeColor(value)
      root.push(`--${token}: ${resolved.light};`)

      if (resolved.dark !== resolved.light)
        dark.push(`--${token}: ${resolved.dark};`)
    }
  }

  appendTokens(coreTokens)
  appendTokens(colorTokens)
  appendTokens(bgTokens)
  appendTokens(borderTokens)
  appendTokens(ringTokens)
  appendTokens(motionTokens)
  appendTokens(spacingTokens)
  appendTokens(layoutTokens)
  appendTokens(sizingTokens)
  appendTokens(typographyTokens)

  const sortedEntries = Object.entries(toxicScale)
    .sort(([left], [right]) => Number(left) - Number(right))

  for (const [step, value] of sortedEntries) {
    const resolved = resolveModeColor(value)
    root.push(`--toxic-${step}: ${resolved.light};`)

    if (resolved.dark !== resolved.light)
      dark.push(`--toxic-${step}: ${resolved.dark};`)
  }

  const rootLines = root.map(line => `  ${line}`).join('\n')
  const darkLines = dark.map(line => `  ${line}`).join('\n')

  return `
:root {
${rootLines}
}
.dark {
${darkLines}
}
`
}
