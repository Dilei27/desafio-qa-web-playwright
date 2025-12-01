const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    headless: true,
    viewport: { width: 1920, height: 1080 }, // 🔥 obrigando modo desktop
    deviceScaleFactor: 1,
    isMobile: false,       // 🔥 garante DOM desktop
    hasTouch: false,
    trace: 'on-first-retry'
  },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]]
});
