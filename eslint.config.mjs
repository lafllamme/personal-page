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

const prefixFiles = (files, root) =>
  files.map((pattern) => {
    if (typeof pattern !== 'string')
      return pattern
    if (pattern.startsWith(`!${root}/`) || pattern.startsWith(`${root}/`))
      return pattern
    if (pattern.startsWith('!'))
      return `!${root}/${pattern.slice(1)}`
    return `${root}/${pattern}`
  })

const scopeConfigs = async (configs, scope) => {
  const configList =
    typeof configs?.toConfigs === 'function'
      ? await configs.toConfigs()
      : Array.isArray(configs)
        ? configs
        : [configs]
  return configList.map((config) => {
    const cleaned = Object.fromEntries(
      Object.entries(config).filter(([key]) => !key.startsWith('_')),
    )
    const hasFiles = Array.isArray(cleaned.files)
    const isPluginOnly =
      !hasFiles &&
      cleaned.plugins &&
      !cleaned.rules &&
      !cleaned.languageOptions &&
      !cleaned.processor
    const scopedFiles = hasFiles
      ? prefixFiles(cleaned.files, scope.root)
      : isPluginOnly
        ? scope.allFiles
        : scope.fallbackFiles
    return {
      ...cleaned,
      ...(scopedFiles ? { files: scopedFiles } : {}),
    }
  })
}

const frontendConfigs = await scopeConfigs(
  antfu({
    formatters: true,
    unocss: true,
    vue: true,
    typescript: true,
  }),
  {
    root: 'frontend',
    fallbackFiles: ['frontend/**/*.{js,ts,tsx,jsx,mjs,cjs,mts,cts,vue}'],
    allFiles: ['frontend/**/*'],
  },
)

const sharedConfigs = await scopeConfigs(
  antfu({
    formatters: true,
    vue: false,
    typescript: true,
  }),
  {
    root: 'shared',
    fallbackFiles: ['shared/**/*.{js,ts,tsx,jsx,mjs,cjs,mts,cts}'],
    allFiles: ['shared/**/*'],
  },
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

const cmsConfigs = await scopeConfigs(
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
  {
    root: 'cms',
    fallbackFiles: [`${cmsDir}/**/*.{js,ts,tsx,jsx,mjs,cjs,mts,cts}`],
    allFiles: ['cms/**/*'],
  },
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
    settings: {
      unocss: {
        configPath: 'frontend/uno.config.ts',
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
  {
    files: ['frontend/**/*.{vue,js,jsx,ts,tsx,mjs,cjs,mts,cts}'],
    rules: {
      'no-console': 'warn',
    },
  },
  {
    files: ['frontend/**/*.vue'],
    rules: {
      'vue/no-unused-vars': 'error',
    },
  },
  ...frontendConfigs,
  ...sharedConfigs,
  ...cmsConfigs,
]
