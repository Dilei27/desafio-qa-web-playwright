class SearchPage {
  constructor(page) {
    this.page = page;

    // URL base
    this.url = 'https://blog.agibank.com.br/';

    // Selectors poderosos e reutilizáveis
    this.searchInput = page.locator('#search-field');
    this.noResultsMessage = page.getByText(/Lamentamos, mas nada foi encontrado/i);
    this.articles = page.locator('article');
  }

  /* ------------------------------
     🌐 Métodos base reutilizáveis
     ------------------------------ */

  async navigate(url = this.url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async fillForce(locator, value) {
    await locator.fill(value, { force: true });
  }

  async waitAndPressEnter() {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      this.page.keyboard.press('Enter')
    ]);
  }

  locator(selector) {
    return this.page.locator(selector);
  }

  /* ------------------------------
     🔍 Lógica específica da busca
     ------------------------------ */

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

  /* ------------------------------
     📊 Validações específicas
     ------------------------------ */

  async hasResults() {
    return (await this.articles.count()) > 0;
  }

  async noResults() {
    return await this.noResultsMessage.isVisible();
  }
}

module.exports = { SearchPage };

