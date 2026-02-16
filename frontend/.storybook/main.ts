import type { StorybookConfig } from '@storybook/vue3-vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ['../app/components/**/*.stories.@(ts|js|mjs)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal(config) {
    config.plugins = [
      ...(config.plugins ?? []),
      vue(),
      Unocss({
        include: [
          /\.vue(?:\?.*)?$/,
          /\.([jt]sx?|mdx?)(?:\?.*)?$/,
        ],
      }),
    ]
    config.resolve = config.resolve ?? {}
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '~': path.resolve(dirname, '../app'),
      '@': path.resolve(dirname, '../app'),
      '~~': path.resolve(dirname, '..'),
    }
    return config
  },
}

export default config
