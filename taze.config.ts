import { defineConfig } from 'taze'

export default defineConfig({
  // Write changes to package.json when running via CLI
  write: true,
  // We install separately via pnpm scripts
  install: false,
  // Respect monorepo, but skip generated and build outputs
  ignorePaths: [
    '**/node_modules/**',
    '**/dist/**',
    '**/.nuxt/**',
    '**/.output/**',
    '**/coverage/**',
    '**/playwright/**',
  ],
  // Don’t consider overrides field for bumps unless explicitly needed
  depFields: {
    overrides: false,
  },
})


