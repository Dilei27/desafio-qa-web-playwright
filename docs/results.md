# Resultados e Validação

## Resultados esperados
- Home: página carrega, header disponível e título contém "Agi Blog".
- Busca válida: termo "cartão" retorna pelo menos um `<article>`.
- Busca inválida: nenhum `<article>` encontrado e mensagem "Lamentamos, mas nada foi encontrado" visível.

## Abrir o report HTML
- Após rodar `npx playwright test`, o relatório é gerado em `playwright-report/`.
- Visualizar localmente:
  ```bash
  npx playwright show-report
  ```
- Em CI, baixe o artefato `playwright-report` e abra `index.html` ou use `npx playwright show-report` apontando para o diretório.

## Como validar os cenários
1. Execute os testes localmente ou no contêiner:
   ```bash
   npx playwright test
   ```
2. Abra o relatório e confirme:
   - Status **Passed** para os três testes.
   - Para falhas, verifique trace anexado (gerado no primeiro retry).
3. Conferir manualmente (opcional):
   - Home: `expect(page).toHaveTitle(/Agi Blog/i)`.
   - Busca válida: `await search.hasResults()` retorna `true`.
   - Busca inválida: `await search.hasResults()` retorna `false` e `await search.noResults()` retorna `true`.
