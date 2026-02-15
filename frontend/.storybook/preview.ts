import type { Preview } from '@storybook/vue3-vite'
import 'virtual:uno.css'
import './storybook-fonts.css'
import '../app/assets/reset/main.ts'

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
      default: 'canvas',
      values: [
        { name: 'canvas', value: '#f4f1eb' },
        { name: 'paper', value: '#ffffff' },
        { name: 'ink', value: '#0b0b0b' },
      ],
    },
  },
}

export default preview
