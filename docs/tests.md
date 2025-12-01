# Testes e Cobertura

## Page Object de Busca
Trecho real de `pages/search.page.js` que concentra navegação, interação e validações:
```javascript
class SearchPage {
  constructor(page) {
    this.page = page;

    this.url = 'https://blog.agibank.com.br/';
    this.searchInput = page.locator('#search-field');
    this.noResultsMessage = page.getByText(/Lamentamos, mas nada foi encontrado/i);
    this.articles = page.locator('article');
  }

  async navigate(url = this.url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async openSearchBox() {
    await this.page.evaluate(() => {
      document.querySelector('.ast-search-menu-icon')
        ?.classList.add('ast-dropdown-active');
    });
  }

  async search(term) {
    await this.openSearchBox();
    await this.fillForce(this.searchInput, term);
    await this.waitAndPressEnter();
  }

  async hasResults() {
    return (await this.articles.count()) > 0;
  }

  async noResults() {
    return await this.noResultsMessage.isVisible();
  }
}
```

## Teste: Home online
Arquivo `tests/home.spec.js`:
```javascript
test('Home do Blog Agibank está online', async ({ page }) => {
  const home = new SearchPage(page);

  await home.navigate();
  await page.waitForSelector('header', { timeout: 15000 });
  await expect(page).toHaveTitle(/Agi Blog/i);
});
```
Valida carregamento da página inicial e título esperado.

## Teste: Busca válida
Trecho de `tests/search.spec.js`:
```javascript
test('🟢 Busca válida retorna artigos', async ({ page }) => {
  const search = new SearchPage(page);

  await search.navigate();
  await search.search('cartão');

  expect(await search.hasResults()).toBeTruthy();
});
```
Confirma que um termo conhecido ("cartão") retorna artigos.

## Teste: Busca inválida
Trecho de `tests/search.spec.js`:
```javascript
test('🔴 Busca inválida retorna mensagem de nenhum resultado', async ({ page }) => {
  const search = new SearchPage(page);

  await search.navigate();
  await search.search('gjhgjhgjhgkjhgkjhgkjh');

  expect(await search.hasResults()).toBeFalsy();
  expect(await search.noResults()).toBeTruthy();
});
```
Valida ausência de resultados e exibição de mensagem específica.

## Configuração que controla timeout e browsers
Trecho de `playwright.config.js`:
```javascript
module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    headless: true,
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
    trace: 'on-first-retry'
  },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]]
});
```
- `timeout: 30000`: limite global por teste.
- `headless: true` e viewport desktop garantem execução sem UI e DOM desktop.
- `trace: 'on-first-retry'`: captura trace somente se houver retry.
- Reporter HTML grava saída em `playwright-report`.

## Interpretação de erros do Playwright
- Falha em asserção (`expect`): exibirá o valor esperado vs. encontrado; revisar o seletor ou estado da página.
- Timeout (`Timeout 30000ms exceeded`): indica que a ação/espera não completou no tempo configurado; checar estabilidade do site ou ajustar espera explícita.
- Seletores não encontrados: verifique se `openSearchBox` foi chamado antes de preencher o campo de busca e se o DOM é o desktop (config já força `isMobile: false`).
- Para depuração, reexecutar com `--headed` e opcionalmente `--debug`:
  ```bash
  npx playwright test tests/search.spec.js --headed
  ```
- Trace: em um retry com falha, o trace fica em `playwright-report/` e pode ser aberto via `npx playwright show-report`.
