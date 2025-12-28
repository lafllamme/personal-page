import type { ModuleOptions as NuxtFontsOptions } from '@nuxt/fonts'
// nuxt.config.ts
import { existsSync } from 'node:fs'
import { cp, mkdir } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { join, resolve } from 'node:path'
import * as process from 'node:process'
import { defineNuxtConfig } from 'nuxt/config'

const fonts: NuxtFontsOptions = {
  provider: 'google',
  defaults: {
    preload: true,
    weights: ['400'],
    styles: ['normal'],
    subsets: ['latin', 'latin-ext'],
  },
  families: [
    // Variable / multi-weight families – Range syntax uses SPACE, not '..'
    { name: 'Figtree', weights: ['300 900'], styles: ['normal', 'italic'] },
    { name: 'Space Grotesk', weights: ['300 700'], styles: ['normal'] },
    { name: 'Manrope', weights: ['200 800'], styles: ['normal'] },
    { name: 'JetBrains Mono', weights: ['100 800'], styles: ['normal', 'italic'] },
    { name: 'EB Garamond', weights: ['400 800'], styles: ['normal', 'italic'] },
    { name: 'Lora', weights: ['400 700'], styles: ['normal', 'italic'] },
    { name: 'Cormorant Garamond', weights: ['300 700'], styles: ['normal', 'italic'] },
    { name: 'Zalando Sans Expanded', weights: ['200 900'], styles: ['normal', 'italic'] },

    // Multi/static weights
    { name: 'Crimson Text', weights: ['400', '600', '700'], styles: ['normal', 'italic'] },
    { name: 'Libre Baskerville', weights: ['400 700'], styles: ['normal', 'italic'] },

    // Single-weight display families (avoid synthetic bold in CSS via font-synthesis: none)
    { name: 'Prata', weights: ['400'], styles: ['normal'] },
    { name: 'Nova Square', weights: ['400'], styles: ['normal'] },
    { name: 'Audiowide', weights: ['400'], styles: ['normal'] },
    { name: 'Zen Dots', weights: ['400'], styles: ['normal'] },
    { name: 'Bruno Ace SC', weights: ['400'], styles: ['normal'] },
    { name: 'Major Mono Display', weights: ['400'], styles: ['normal'] },
  ],
}

const require = createRequire(import.meta.url)

const resolveSharpImgDir = () => {
  try {
    const sharpEntry = require.resolve('sharp')
    const sharpPkgDir = resolve(sharpEntry, '..', '..')
    return resolve(sharpPkgDir, '..', '@img')
  } catch {
    return null
  }
}

export default defineNuxtConfig({
  // Base configuration
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  // Explicitly enable SSR for App Runner
  ssr: true,

  // Development server configuration
  devServer: {
    port: 3000,
    host: 'localhost',
  },

  // Opt into Nuxt 4 defaults
  future: {
    compatibilityVersion: 4,
  },

  runtimeConfig: {
    // Database and Payload configuration for server-side API routes
    databaseUri: process.env.NUXT_DATABASE_URI,
    payloadSecret: process.env.NUXT_PAYLOAD_SECRET,
    payloadApiKey: process.env.NUXT_PAYLOAD_SECRET,
    // Alpha Vantage API for stock data
    api: {
      finnHub: process.env.NUXT_FINNHUB_API_KEY || '',
    },
    // Newsletter
    email: {
      newsletter: {
        apiKey: process.env.NUXT_BUTTONDOWN_API_KEY || '',
      },
    },
    public: {
      // Use environment variables or fallback to localhost for development
      payloadApiUrl: process.env.NUXT_PAYLOAD_PUBLIC_SERVER_URL
        ? `${process.env.NUXT_PAYLOAD_PUBLIC_SERVER_URL}/api`
        : 'http://localhost:3001/api',
      payloadUrl: process.env.NUXT_PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
      siteUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
    },
  },

  // Experimental payload optimizations
  experimental: {
    renderJsonPayloads: true,
    payloadExtraction: true,
  },

  // Vue performance tracing
  vue: {
    config: {
      performance: true,
    },
  },

  // Disable Nuxt telemetry
  telemetry: false,

  // Vite build customization
  vite: {
    build: {
      target: 'esnext',
      modulePreload: { polyfill: false },
      chunkSizeWarningLimit: 1024,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules'))
              return

            if (id.includes('/three/'))
              return 'three'
            if (id.includes('monaco-editor'))
              return 'monaco'
            if (id.includes('motion-v'))
              return 'motion'
            if (id.includes('@tresjs'))
              return 'tres'
            if (id.includes('radix-vue') || id.includes('reka-ui'))
              return 'ui'

            return 'vendor'
          },
        },
      },
    },
  },

  // Nitro configuration for AWS App Runner
  nitro: {
    preset: 'node-server',
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
    minify: true,
    sourceMap: false,
    experimental: {
      wasm: false,
    },
    hooks: {
      async compiled(nitro) {
        if (nitro.options.preset !== 'node-server')
          return

        const imgSourceDir = resolveSharpImgDir()
        if (!imgSourceDir || !existsSync(imgSourceDir))
          return

        const targetDir = join(nitro.options.output.serverDir, 'node_modules/@img')
        if (existsSync(targetDir))
          return

        await mkdir(targetDir, { recursive: true })
        await cp(imgSourceDir, targetDir, { recursive: true })
      },
    },
    rollupConfig: {
      external: [],
      output: {
        format: 'esm',
      },
    },
    nodeModulesDirs: ['node_modules'],
    inlineDynamicImports: true,
  },

  // Environment-specific route rules
  $production: {
    routeRules: {
      '/**': { isr: true },
      // API routes should not be cached
      '/api/**': {
        isr: false,
        cache: false,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      },
    },
  },

  // Modules
  modules: [
    '@nuxt/image',
    '@nuxt/icon',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/fonts',
    '@nuxtjs/i18n',
    '@tresjs/nuxt',
    '@vueuse/nuxt',
    'reka-ui/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/sitemap',
  ],

  // Tres.js settings
  tres: {
    devtools: true,
    glsl: true,
  },

  // Internationalization
  i18n: {
    strategy: 'prefix_except_default',
    baseUrl: process.env.NUXT_FRONTEND_URL || 'http://localhost:3000',
    defaultLocale: 'en',
    bundle: {
      optimizeTranslationDirective: false,
    },
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

  // Sitemap configuration
  site: {
    url: process.env.FRONTEND_URL || 'http://localhost:3000',
    name: 'Personal Page - Portfolio & Blog',
  },

  // Color mode configuration
  colorMode: {
    preference: 'system',
    fallback: 'dark',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storage: 'cookie',
    storageKey: 'color-mode',
  },

  // Global CSS
  css: [
    '@/assets/reset/main.ts',
  ],

  // Auto-imports
  imports: {
    presets: [
      { from: 'consola', imports: ['consola'] },
    ],
  },

  fonts,
})
