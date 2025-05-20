import { defineConfig, transformerDirectives, transformerVariantGroup } from 'unocss'
import { extendTheme, presets, shortcuts, theme } from './assets/unocss'

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
