import { defineConfig, transformerDirectives, transformerVariantGroup } from 'unocss'
import { extendTheme, presets, shortcuts, theme } from './app/assets/unocss/index'
import { colorTokensPreflightCss } from './app/assets/unocss/palette'

export default defineConfig({
  shortcuts,
  theme,
  extendTheme,
  presets,
  preflights: [
    {
      getCSS: colorTokensPreflightCss,
    },
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
