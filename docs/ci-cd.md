# CI/CD – GitHub Actions

Workflow (conforme README) executa testes Playwright e publica o relatório HTML como artefato.

## Etapas do pipeline
```yaml
name: Playwright Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Install browsers
        run: npx playwright install --with-deps

      - name: Run tests
        run: npx playwright test

      - name: Upload report
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report
```
- **Instalar Node:** `actions/setup-node@v3` com Node 18.
- **Instalar dependências:** `npm install`.
- **Instalar browsers:** `npx playwright install --with-deps`.
- **Rodar testes:** `npx playwright test`.
- **Upload do relatório:** publica `playwright-report` como artefato.

## Artefatos
- Após a execução, o artefato `playwright-report` fica disponível na aba "Actions" da execução.
- Baixe e abra o `index.html` ou use `npx playwright show-report` apontando para o diretório baixado.
