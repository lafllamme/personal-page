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
  'color-ghost-hover': 'var(--un-preset-radix-sand11)',
  'color-ghost-active': 'var(--un-preset-radix-sand12)',

  'color-accent': 'var(--toxic-11)',
  'color-accent-hover': 'var(--toxic-10)',
  'color-accent-strong': 'var(--toxic-12)',
  'color-accent-soft': 'var(--toxic-7)',
  'color-accent-soft-hover': 'var(--toxic-8)',
  'color-accent-solid-disabled': { light: '#edf7f5', dark: '#9ac8bf' },
  'color-accent-outline-disabled': { light: '#7ea9a3', dark: '#2e5e58' },
  'color-accent-ghost-disabled': { light: '#7ea9a3', dark: '#2e5e58' },
  'color-accent-soft-disabled': { light: '#90a19e', dark: 'rgba(173, 240, 221, 0.45)' },
}

const bgTokens: TokenSet = {
  'bg-solid': { light: 'var(--pure-black)', dark: 'var(--pure-white)' },
  'bg-inverse': { light: 'var(--pure-white)', dark: 'var(--pure-black)' },
  'bg-solid-hover': { light: '#1d1d1c', dark: '#d5d2ca' },
  'bg-solid-active': { light: '#353533', dark: '#bdbab3' },
  'bg-solid-disabled': { light: '#3f3e3c', dark: '#b3b1aa' },

  'bg-overlay-hover': { light: 'rgba(0, 0, 0, 0.08)', dark: 'rgba(242, 239, 230, 0.08)' },
  'bg-overlay-active': { light: 'rgba(0, 0, 0, 0.14)', dark: 'rgba(242, 239, 230, 0.14)' },

  'bg-soft': { light: 'rgba(0, 0, 0, 0.06)', dark: 'rgba(242, 239, 230, 0.06)' },
  'bg-soft-hover': { light: 'rgba(0, 0, 0, 0.12)', dark: 'rgba(242, 239, 230, 0.12)' },
  'bg-soft-active': { light: 'rgba(0, 0, 0, 0.18)', dark: 'rgba(242, 239, 230, 0.18)' },
  'bg-soft-disabled': { light: 'rgba(0, 0, 0, 0.04)', dark: 'rgba(242, 239, 230, 0.04)' },
  'bg-quaternary-hover': { light: 'rgba(226, 225, 222, 0.75)', dark: 'rgba(73, 72, 68, 0.38)' },
  'bg-quaternary-active': { light: 'rgba(218, 217, 214, 0.85)', dark: 'rgba(98, 96, 91, 0.46)' },
  'bg-quaternary-focus': { light: 'var(--un-preset-radix-sand5)', dark: 'var(--un-preset-radix-sand7)' },

  'bg-accent': 'var(--toxic-11)',
  'bg-accent-hover': 'var(--toxic-10)',
  'bg-accent-solid-active': { light: 'var(--toxic-12)', dark: 'var(--toxic-8)' },

  'bg-accent-outline-hover': { light: 'rgba(18, 165, 148, 0.14)', dark: 'rgba(11, 216, 182, 0.14)' },
  'bg-accent-outline-active': { light: 'rgba(18, 165, 148, 0.20)', dark: 'rgba(11, 216, 182, 0.20)' },
  'bg-accent-outline-fill': 'var(--toxic-7)',
  'bg-accent-quaternary-hover': { light: 'rgba(18, 165, 148, 0.16)', dark: 'rgba(11, 216, 182, 0.22)' },
  'bg-accent-quaternary-active': { light: 'rgba(18, 165, 148, 0.24)', dark: 'rgba(11, 216, 182, 0.30)' },
  'bg-accent-quaternary-focus': { light: 'rgba(18, 165, 148, 0.16)', dark: 'rgba(11, 216, 182, 0.22)' },

  'bg-accent-soft': 'var(--toxic-3)',
  'bg-accent-soft-hover': 'var(--toxic-4)',
  'bg-accent-soft-active': 'var(--toxic-5)',
  'bg-accent-soft-disabled': { light: '#f2f6f5', dark: '#0f1f1d' },
}

const borderTokens: TokenSet = {
  'border-primary': { light: 'var(--pure-black)', dark: 'var(--pure-white)' },
  'border-inverse': { light: 'var(--pure-white)', dark: 'var(--pure-black)' },
  'border-disabled': { light: 'rgba(0, 0, 0, 0.52)', dark: 'rgba(242, 239, 230, 0.52)' },
  'border-quaternary': { light: 'rgba(0, 0, 0, 0.22)', dark: 'rgba(242, 239, 230, 0.22)' },
  'border-quaternary-disabled': { light: 'rgba(0, 0, 0, 0.14)', dark: 'rgba(242, 239, 230, 0.14)' },

  'border-accent': 'var(--toxic-11)',
  'border-accent-hover': 'var(--toxic-10)',
  'border-accent-active': { light: 'var(--toxic-12)', dark: 'var(--toxic-8)' },
  'border-accent-outline-fill': 'var(--toxic-7)',
  'border-accent-disabled': { light: '#7ea9a3', dark: '#2e5e58' },
  'border-accent-soft': 'var(--toxic-7)',
  'border-accent-soft-hover': 'var(--toxic-8)',
  'border-accent-soft-disabled': { light: '#dbe5e3', dark: 'rgba(28, 105, 97, 0.48)' },
}

const ringTokens: TokenSet = {
  'ring-default-primary': { light: 'rgba(242, 239, 230, 0.24)', dark: 'rgba(0, 0, 0, 0.24)' },
  'ring-default-secondary': { light: 'rgba(0, 0, 0, 0.22)', dark: 'rgba(242, 239, 230, 0.22)' },
  'ring-default-tertiary': { light: 'rgba(0, 0, 0, 0.20)', dark: 'rgba(242, 239, 230, 0.20)' },
  'ring-ghost-focus': 'var(--un-preset-radix-sand11)',
  'ring-quaternary-focus': { light: 'var(--un-preset-radix-sand5)', dark: 'var(--un-preset-radix-sand7)' },
  'ring-default-quaternary': { light: 'rgba(0, 0, 0, 0.20)', dark: 'rgba(242, 239, 230, 0.20)' },
  'ring-primary-offset-inner': { light: 'var(--pure-white)', dark: 'var(--pure-black)' },
  'ring-primary-offset-outer': { light: 'var(--pure-black)', dark: 'var(--pure-white)' },
  'ring-accent-offset-inner': { light: 'var(--pure-white)', dark: 'var(--pure-black)' },
  'ring-accent-offset-outer': { light: 'var(--toxic-11)', dark: 'var(--toxic-11)' },
  'ring-accent-quaternary-focus': { light: 'var(--toxic-10)', dark: 'var(--toxic-10)' },

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

export const themeColors = {
  color: createTokenVarMap(colorTokens),
  bg: createTokenVarMap(bgTokens),
  border: createTokenVarMap(borderTokens),
  ring: createTokenVarMap(ringTokens),
  toxic: createScaleVarMap('toxic', toxicScale),
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
@keyframes uiGhostUnderlineSweep {
  0% {
    transform: scaleX(1) rotate(0.001deg);
    transform-origin: right;
  }
  49% {
    transform: scaleX(0) rotate(0.001deg);
    transform-origin: right;
  }
  50% {
    transform: scaleX(0) rotate(0.001deg);
    transform-origin: left;
  }
  100% {
    transform: scaleX(1) rotate(0.001deg);
    transform-origin: left;
  }
}
`
}
