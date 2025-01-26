// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxt/icon', '@unocss/nuxt', 'radix-vue/nuxt'],
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
