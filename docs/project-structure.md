# Estrutura do Projeto

Estrutura real do repositório `desafio-qa-web-playwright`:

```
pages/
  search.page.js
tests/
  home.spec.js
  search.spec.js
Dockerfile
docker-compose.yml
package.json
package-lock.json
playwright.config.js
README.md
```

## pages/
- `search.page.js`: Page Object central. Define URL base do Blog Agibank, seletores da busca, helpers de navegação (`navigate`), interação (`openSearchBox`, `search`, `fillForce`, `waitAndPressEnter`) e validações (`hasResults`, `noResults`). Exposto via `module.exports`.

## tests/
- `home.spec.js`: Teste único que garante que a Home do Blog Agibank carrega e o título contém “Agi Blog”. Usa `SearchPage` para navegar e `expect(page).toHaveTitle(...)`.
- `search.spec.js`: Suíte "Busca no Blog Agibank" com dois testes:
  - Busca válida retorna artigos usando termo "cartão" e valida `hasResults()`.
  - Busca inválida com termo randômico valida ausência de resultados (`hasResults()` falso) e mensagem de nenhum resultado (`noResults()`).

## playwright.config.js
- Define diretório `./tests`, timeout global de 30s, execução headless com viewport 1920x1080, `isMobile: false`, `hasTouch: false`, `trace: 'on-first-retry'`.
- Reporter: lista no console e HTML salvo em `playwright-report`.

## Docker e Compose
- `Dockerfile`: Base `mcr.microsoft.com/playwright:v1.57.0-jammy`, instala dependências com `npm ci`, copia código e instala browsers com `npx playwright install --with-deps`, comando padrão mantém contêiner ativo (`tail -f /dev/null`).
- `docker-compose.yml`: Serviço `web` com build local, container `desafioqa_web`, volume do código em `/app`, TTY interativo e porta 9323 exposta.

## Configuração de pacote
- `package.json`: Scripts `test` (todos), `test:home`, `test:search` usando Playwright Test 1.57 (devDependency).
