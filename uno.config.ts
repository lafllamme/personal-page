import { animatedUno } from 'animated-unocss'
// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetMini,
  presetTypography,
  presetUno,
  presetWebFonts,
  presetWind,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import presetAnimations from 'unocss-preset-animations'
import { presetRadix } from 'unocss-preset-radix'

export default defineConfig({
  shortcuts: [
    // ...
  ],
  theme: {
    colors: {},
    animation: {
      keyframes: {
        keyframes: {
          enterFromRight:
                        '0%{opacity:0;transform:translateX(200px);}100%{opacity:1;transform:translateX(0);}',
          enterFromLeft:
                        '0%{opacity:0;transform:translateX(-200px);}100%{opacity:1;transform:translateX(0);}',
          exitToRight:
                        '0%{opacity:1;transform:translateX(0);}100%{opacity:0;transform:translateX(200px);}',
          exitToLeft:
                        '0%{opacity:1;transform:translateX(0);}100%{opacity:0;transform:translateX(-200px);}',
          scaleIn:
                        '0%{opacity:0;transform:rotateX(-10deg) scale(0.9);}100%{opacity:1;transform:rotateX(0deg) scale(1);}',
          scaleOut:
                        '0%{opacity:1;transform:rotateX(0deg) scale(1);}100%{opacity:0;transform:rotateX(-10deg) scale(0.95);}',
          fadeIn:
                        '0%{opacity:0;}100%{opacity:1;}',
          fadeOut:
                        '0%{opacity:1;}100%{opacity:0;}',
        },
      },
      animation: {
        scaleIn: 'scaleIn 200ms ease',
        scaleOut: 'scaleOut 200ms ease',
        fadeIn: 'fadeIn 200ms ease',
        fadeOut: 'fadeOut 200ms ease',
        enterFromLeft: 'enterFromLeft 250ms ease',
        enterFromRight: 'enterFromRight 250ms ease',
        exitToLeft: 'exitToLeft 250ms ease',
        exitToRight: 'exitToRight 250ms ease',
      },
    },
    duration: {},
    timingFns: {},
    properties: {},
    counts: {},
  },
  extendTheme: (theme) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        // Inspira UI Colors
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        pureBlack: '#000000',
        pureWhite: '#FFFFFF',
      },
    }
  },
  presets: [
    presetUno(),
    presetMini(),
    presetWind(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    animatedUno(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
    // @ts-expect-error presetRadix is not defined
    presetRadix({
      darkSelector: '.dark',
      lightSelector: '.light',
      palette: [
        'gray',
        'mauve',
        'slate',
        'sage',
        'olive',
        'sand',
        'gold',
        'bronze',
        'brown',
        'yellow',
        'amber',
        'orange',
        'tomato',
        'red',
        'ruby',
        'crimson',
        'pink',
        'plum',
        'purple',
        'violet',
        'iris',
        'indigo',
        'blue',
        'cyan',
        'teal',
        'jade',
        'green',
        'grass',
        'lime',
        'mint',
        'sky',
        'black',
        'white',
      ],
    }),
    presetAnimations(), // Aktiviert Animationen via UnoCSS
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
