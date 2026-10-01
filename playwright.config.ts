import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  outputDir: '.superpowers/sdd/2026-09-30-mrmarketing-refinement/test-results',
  testMatch: '**/*.spec.ts',
  timeout: 45_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  workers: 1,
  use: { baseURL: 'http://localhost:3108', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { browserName: 'chromium', viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { browserName: 'chromium', viewport: { width: 390, height: 844 } } }
  ],
  webServer: {
    command: 'pnpm build && pnpm exec next start --port 3108',
    url: 'http://localhost:3108',
    reuseExistingServer: !process.env.CI
  }
})
