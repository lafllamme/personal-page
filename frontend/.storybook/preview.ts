import type { Preview } from '@storybook/vue3-vite'
import { setup } from '@storybook/vue3-vite'
import { registerStorybookStubs } from './stubbing'
import '../app/assets/reset/main.ts'
import './storybook-fonts.css'
import './storybook-docs.css'
import 'virtual:uno.css'

setup(registerStorybookStubs)

const isVisualRegressionBuild = import.meta.env.VITE_VR_TEST_MODE === '1'

function applyVisualRegressionMode(isActive: boolean): void {
  if (typeof document === 'undefined')
    return

  document.documentElement.classList.toggle('vr-test-mode', isActive)
  document.body?.classList.toggle('vr-test-mode', isActive)
  document.documentElement.dataset.vrTestMode = isActive ? 'on' : 'off'
  if (document.body)
    document.body.dataset.vrTestMode = isActive ? 'on' : 'off'

  const styleId = 'storybook-vr-test-mode-style'
  const currentStyle = document.getElementById(styleId)
  if (!isActive) {
    currentStyle?.remove()
    return
  }

  if (currentStyle)
    return

  const style = document.createElement('style')
  style.id = styleId
  style.textContent = `
    *, *::before, *::after {
      transition: none !important;
      animation: none !important;
      scroll-behavior: auto !important;
      caret-color: transparent !important;
    }
  `
  document.head.appendChild(style)
}

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
    snapshotMode: {
      name: 'Snapshot mode',
      description: 'Disables animation and transitions for visual regression testing',
      defaultValue: isVisualRegressionBuild,
      toolbar: {
        icon: 'camera',
        items: [
          { value: false, title: 'Off' },
          { value: true, title: 'On' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      const isDark = context.globals.colorMode === 'dark'
      const isSnapshotMode = context.globals.snapshotMode === true
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', isDark)
        document.documentElement.classList.toggle('light', !isDark)
        document.documentElement.dataset.colorMode = isDark ? 'dark' : 'light'
        if (document.body) {
          document.body.classList.toggle('dark', isDark)
          document.body.classList.toggle('light', !isDark)
          document.body.dataset.colorMode = isDark ? 'dark' : 'light'
        }
        applyVisualRegressionMode(isSnapshotMode)
      }
      return {
        components: { story },
        template: '<story />',
      }
    },
  ],
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
        locales: 'en-US',
        includeNames: true,
      },
    },
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
