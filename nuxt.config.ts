// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  i18n: {
    strategy: 'prefix', // add prefix to all generated routes
    baseUrl: 'https://tec.nuxt.dev', // ← replace with your site’s URL
    defaultLocale: 'en',
    locales: [
      { code: 'de', iso: 'de-DE', language: 'de-DE', name: 'Deutsch', dir: 'ltr' },
      { code: 'en', iso: 'en-US', language: 'en-US', name: 'English', dir: 'ltr' },
      { code: 'fr', iso: 'fr-FR', language: 'fr-FR', name: 'Français', dir: 'ltr' },
      { code: 'ja', iso: 'ja-JP', language: 'ja-JP', name: '日本語', dir: 'ltr' },
      { code: 'zh', iso: 'zh-CN', language: 'zh-CN', name: '中文', dir: 'ltr' },
      { code: 'pt', iso: 'pt-PT', language: 'pt-PT', name: 'Português', dir: 'ltr' },
      { code: 'es', iso: 'es-ES', language: 'es-ES', name: 'Español', dir: 'ltr' },
      { code: 'pl', iso: 'pl-PL', language: 'pl-PL', name: 'Polski', dir: 'ltr' },
      { code: 'da', iso: 'da-DK', language: 'da-DK', name: 'Dansk', dir: 'ltr' },
      { code: 'cs', iso: 'cs-CZ', language: 'cs-CZ', name: 'Čeština', dir: 'ltr' },
      { code: 'nl', iso: 'nl-NL', language: 'nl-NL', name: 'Nederlands', dir: 'ltr' },
      { code: 'el', iso: 'el-GR', language: 'el-GR', name: 'Ελληνικά', dir: 'ltr' },
      { code: 'tr', iso: 'tr-TR', language: 'tr-TR', name: 'Türkçe', dir: 'ltr' },
      { code: 'ko', iso: 'ko-KR', language: 'ko-KR', name: '한국어', dir: 'ltr' },
      { code: 'uk', iso: 'uk-UA', language: 'uk-UA', name: 'Українська', dir: 'ltr' },
      { code: 'ar', iso: 'ar-AR', language: 'ar-AR', name: 'العربية', dir: 'rtl' },
      { code: 'he', iso: 'he-IL', language: 'he-IL', name: 'עברית', dir: 'rtl' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      fallbackLocale: 'en',
    },
  },
  tres: {
    devtools: true,
    glsl: true,
  },
  modules: [
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/content',
    '@unocss/nuxt',
    '@nuxthub/core',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@tresjs/nuxt',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    'reka-ui/nuxt',
    '@pinia/nuxt',
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
