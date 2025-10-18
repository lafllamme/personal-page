import { defineConfig, transformerDirectives, transformerVariantGroup } from 'unocss'
import { extendTheme, presets, shortcuts, theme } from './assets/unocss/index'

export default defineConfig({
  shortcuts,
  theme,
  extendTheme,
  presets,
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
