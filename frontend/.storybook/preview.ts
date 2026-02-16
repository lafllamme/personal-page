import type { Preview } from '@storybook/vue3-vite'
import '../app/assets/reset/main.ts'
import './storybook-fonts.css'
import './storybook-docs.css'
import 'virtual:uno.css'

const preview: Preview = {
  globalTypes: {
    colorMode: {
      name: 'Color mode',
      description: 'Global color mode for stories',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      const isDark = context.globals.colorMode === 'dark'
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', isDark)
        document.documentElement.classList.toggle('light', !isDark)
        document.documentElement.dataset.colorMode = isDark ? 'dark' : 'light'
        if (document.body) {
          document.body.classList.toggle('dark', isDark)
          document.body.classList.toggle('light', !isDark)
          document.body.dataset.colorMode = isDark ? 'dark' : 'light'
        }
      }
      return {
        components: { story },
        template: '<story />',
      }
    },
  ],
  parameters: {
    controls: { expanded: true },
    backgrounds: {
      default: 'pureWhite',
      values: [
        { name: 'pureWhite', value: '#f2efe6' },
        { name: 'pureBlack', value: '#000000' },
      ],
    },
  },
}

export default preview
