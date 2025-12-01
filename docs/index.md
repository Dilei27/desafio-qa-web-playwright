# Automação Web – Blog Agibank

## Visão geral do projeto
- Automação web com Playwright para validar disponibilidade e busca do Blog Agibank.
- Estrutura em JavaScript com Page Object, testes isolados e configuração centralizada via `playwright.config.js`.
- Execução suportada localmente (Node.js), em contêiner Docker e em pipeline GitHub Actions.

## Objetivo da automação
- Garantir que a Home esteja online e apresente o título esperado do site.
- Confirmar que a busca retorna artigos quando um termo válido é informado.
- Confirmar que a busca exibe mensagem de ausência de resultados para termos inválidos.

## Cenários testados
- Home online (validação do título) — `tests/home.spec.js`.
- Busca com termo válido retornando artigos — `tests/search.spec.js`.
- Busca com termo inválido exibindo mensagem de nenhum resultado — `tests/search.spec.js`.

## Arquitetura real do projeto
- `pages/search.page.js`: Page Object com URL base, seletores da busca, métodos de navegação, interação (abrir caixa de busca, preencher, submeter) e validações (`hasResults`, `noResults`).
- `tests/home.spec.js`: Valida carregamento da Home e título da página usando o Page Object.
- `tests/search.spec.js`: Suíte de busca cobrindo caminhos de sucesso e falha com reuso do Page Object.
- `playwright.config.js`: Configuração do Playwright Test (testes em `./tests`, timeout, execução headless com viewport desktop, trace on-first-retry e reporter HTML).
- `package.json`: Scripts `test`, `test:home`, `test:search` para execução segmentada.
- `Dockerfile`: Imagem baseada em `mcr.microsoft.com/playwright:v1.57.0-jammy`, instala dependências via `npm ci`, copia código e instala browsers (`npx playwright install --with-deps`).
- `docker-compose.yml`: Serviço `web` que monta o repositório em `/app`, expõe porta 9323 e mantém TTY interativo para rodar comandos.
- GitHub Actions: Workflow com checkout, setup Node 18, instalação de dependências e browsers, execução dos testes e upload do relatório como artefato.

## Tecnologias utilizadas
- Node.js 18.x
- Playwright Test 1.57 (JavaScript / CommonJS)
- Docker e Docker Compose
- GitHub Actions para CI
- Relatório HTML do Playwright (`playwright-report`)

## Como interpretar o relatório HTML
- Geração: o reporter HTML é configurado em `playwright.config.js`; ao rodar `npx playwright test`, o relatório é salvo em `playwright-report/`.
- Abertura local: `npx playwright show-report` inicia um servidor temporário para visualizar `playwright-report/index.html`.
- Conteúdo: cada teste mostra status, duração, anexos de trace (quando gerados on-first-retry) e logs. Falhas exibem stack trace e screenshot/trace quando disponíveis.
- Armazenamento em CI: no GitHub Actions o diretório `playwright-report` é empacotado como artefato para download após a execução.
