// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  i18n: {
    strategy: 'prefix', // add prefix to all generated routes
    defaultLocale: 'en',
    locales: [
      { code: 'de', iso: 'de-DE', name: 'Deutsch' },
      { code: 'en', iso: 'en-US', name: 'English' },
      { code: 'fr', iso: 'fr-FR', name: 'Français' },
      { code: 'ja', iso: 'ja-JP', name: '日本語' },
      { code: 'zh', iso: 'zh-CN', name: '中文' },
      { code: 'pt', iso: 'pt-PT', name: 'Português' },
      { code: 'es', iso: 'es-ES', name: 'Español' },
      { code: 'pl', iso: 'pl-PL', name: 'Polski' },
      { code: 'da', iso: 'da-DK', name: 'Dansk' },
      { code: 'cs', iso: 'cs-CZ', name: 'Čeština' },
      { code: 'nl', iso: 'nl-NL', name: 'Nederlands' },
      { code: 'el', iso: 'el-GR', name: 'Ελληνικά' },
      { code: 'tr', iso: 'tr-TR', name: 'Türkçe' },
      { code: 'ko', iso: 'ko-KR', name: '한국어' },
      { code: 'uk', iso: 'uk-UA', name: 'Українська' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      fallbackLocale: 'en',
    },
    vueI18n: './i18n.config.ts',
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
    '@nuxtjs/i18n',
    '@tresjs/nuxt',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
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