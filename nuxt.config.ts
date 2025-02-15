// https://nuxt.com/docs/api/configuration/nuxt-config
// eslint-disable-next-line no-undef
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  tres: {
    devtools: true,
    glsl: true,
  },
  modules: [
    '@nuxt/image',
    '@nuxt/icon',
    '@unocss/nuxt',
    'radix-vue/nuxt',
    '@nuxthub/core',
    '@nuxtjs/color-mode',
    '@tresjs/nuxt',
  ],
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'dark', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    storageKey: 'color-mode',
  },
  css: [
    '@/assets/reset/main.ts',
  ],
  imports: {
    presets: [
      {
        from: 'consola',
        imports: ['consola'],
      },
    ],
  },
})
