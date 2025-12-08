import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for SAUWA E2E Tests
 *
 * Tests the complete booking integration:
 * - Partner dynamic routes
 * - Session detail pages (single, private, voucher)
 * - Booking widget flows
 * - Multi-locale support (es, ca, en, fr)
 */
export default defineConfig({
  testDir: './tests',

  // Test execution settings
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'test-results/html' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['list']
  ],

  // Global test settings
  use: {
    baseURL: 'https://sauwasauna.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // Timeouts
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  // Test timeout
  timeout: 60000,

  // Projects for different browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile testing
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },

    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  // Output folders
  outputDir: 'test-results/artifacts',
});
