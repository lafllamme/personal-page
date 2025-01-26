import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetRadix } from 'unocss-preset-radix'

export default defineConfig({
  shortcuts: [
    // ...
  ],
  extendTheme: (theme) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        pureBlack: '#000000', // Add pure black
        pureWhite: '#FFFFFF', // Add pure white
      },
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
    // @ts-expect-error presetRadix is not defined
    presetRadix({
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
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
