import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 60 * 1000, // timeout per test




  testDir: './tests',

  /* Allow tests in different files to run in parallel */
  fullyParallel: false,

  /* Fail CI if test.only is left */
  forbidOnly: !!process.env.CI,

  /* Retry strategy */
  retries: process.env.CI ? 1 : 0,

  /* Parallelism control */
  workers: process.env.CI ? 1 : undefined,

  /* ✅ Use Allure as the only reporter */
  reporter: [['allure-playwright']],

  /* Shared settings for all tests (API + UI) */
  use: {
    /* Base URL for UI tests (API tests can ignore it) */
    baseURL: 'https://thinking-tester-contact-list.herokuapp.com',

    /* Collect trace on first retry */
    trace: 'on-first-retry',

    video: 'retain-on-failure',

    actionTimeout: 15 * 1000, // single action timeout（click / fill / etc.）
    navigationTimeout: 30 * 1000, // page.goto / waitForURL

    launchOptions: {
      slowMo: 100, // delay each action by 100ms, as PW is too fast ! 
    },

  },

  /* Browser projects (UI tests will use this, API tests are browser-agnostic) */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});