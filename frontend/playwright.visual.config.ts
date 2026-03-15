import { defineConfig, devices } from '@playwright/test'
import path from 'node:path'

const visualTestDir = path.resolve('tests/visual')

export default defineConfig({
  testDir: visualTestDir,
  testMatch: ['**/*.visual.spec.ts'],
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: path.join(visualTestDir, 'playwright-report'), open: 'never' }],
  ],
  outputDir: path.join(visualTestDir, 'test-results'),
  snapshotPathTemplate: `${visualTestDir}/__screenshots__/{projectName}/{arg}{ext}`,
  use: {
    ...devices['Desktop Chrome'],
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
    reducedMotion: 'reduce',
    locale: 'en-US',
    timezoneId: 'Europe/Berlin',
    animations: 'disabled',
  },
  webServer: {
    command: 'node ./tests/visual/static-server.mjs',
    cwd: path.resolve('.'),
    url: 'http://127.0.0.1:6007',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
})
