const { test, expect } = require('@playwright/test');
const { SearchPage } = require('../pages/search.page');

test('Home do Blog Agibank está online', async ({ page }) => {
  const home = new SearchPage(page);

  await home.navigate();

  await page.waitForSelector('header', { timeout: 15000 });

  await expect(page).toHaveTitle(/Agi Blog/i);
});
