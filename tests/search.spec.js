const { test, expect } = require('@playwright/test');
const { SearchPage } = require('../pages/search.page');

test.describe('🔍 Busca no Blog Agibank', () => {

  test('🟢 Busca válida retorna artigos', async ({ page }) => {
    const search = new SearchPage(page);

    await search.navigate();
    await search.search('cartão');

    expect(await search.hasResults()).toBeTruthy();
  });

  test('🔴 Busca inválida retorna mensagem de nenhum resultado', async ({ page }) => {
    const search = new SearchPage(page);

    await search.navigate();
    await search.search('gjhgjhgjhgkjhgkjhgkjh');

    expect(await search.hasResults()).toBeFalsy();
    expect(await search.noResults()).toBeTruthy();
  });

});

