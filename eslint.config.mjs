import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { FlatCompat } from '@eslint/eslintrc'
import tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import antfu from '@antfu/eslint-config'
import nextPlugin from '@next/eslint-plugin-next'

const rootDir = dirname(fileURLToPath(import.meta.url))
const frontendDir = resolve(rootDir, 'frontend')
const cmsDir = resolve(rootDir, 'cms')

const scopeConfigs = (configs, files) => {
  const configList = Array.isArray(configs) ? configs : [configs]
  return configList.map((config) => {
    const cleaned = Object.fromEntries(
      Object.entries(config).filter(([key]) => !key.startsWith('_')),
    )
    return {
      ...cleaned,
      files: Array.from(new Set([...(config.files ?? []), ...files])),
    }
  })
}

const frontendConfigs = scopeConfigs(
  antfu({
    formatters: true,
    unocss: true,
    vue: true,
    typescript: true,
    eslintOptions: {
      rules: {
        'no-console': 'warn', // keep package-level overrides
        'vue/no-unused-vars': 'error',
      },
    },
  }),
  ['frontend/**/*.{js,ts,tsx,jsx,mjs,cjs,mts,cts,vue}'],
)

const sharedConfigs = scopeConfigs(
  antfu({
    formatters: true,
    vue: false,
    typescript: true,
  }),
  ['shared/**/*.{js,ts,tsx,jsx,mjs,cjs,mts,cts}'],
)

const compat = new FlatCompat({ baseDirectory: cmsDir })
const cmsNextConfig = nextPlugin.configs['core-web-vitals'] ?? {}
const cmsNextSettingsBase =
  cmsNextConfig.settings && typeof cmsNextConfig.settings === 'object'
    ? cmsNextConfig.settings
    : {}
const cmsNextSettings = {
  ...cmsNextSettingsBase,
  next: {
    ...(typeof cmsNextSettingsBase.next === 'object'
      ? cmsNextSettingsBase.next
      : {}),
    rootDir: ['cms'],
  },
}

const cmsConfigs = scopeConfigs(
  [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
      rules: {
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/no-empty-object-type': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            vars: 'all',
            args: 'after-used',
            ignoreRestSiblings: false,
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^(_|ignore)',
          },
        ],
      },
    },
    {
      ignores: ['.next/'],
    },
  ],
  [`${cmsDir}/**/*.{js,ts,tsx,jsx,mjs,cjs,mts,cts}`],
)

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/.turbo/**',
      '**/.next/**',
      '**/.nuxt/**',
      '**/.output/**',
      '**/.vercel/**',
      'shared/dist/**',
    ],
  },
  {
    files: ['frontend/**/*.{vue,js,jsx,ts,tsx,mjs,cjs,mts,cts}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  {
    files: ['shared/**/*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  {
    files: ['cms/**/*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}'],
    plugins: {
      '@next/next': nextPlugin,
    },
    ...(cmsNextConfig.rules ? { rules: cmsNextConfig.rules } : {}),
    settings: cmsNextSettings,
  },
  ...frontendConfigs,
  ...sharedConfigs,
  ...cmsConfigs,
]
