# Setup e Execução

## Requisitos
- Node.js 18.x e npm.
- Browsers do Playwright instalados (`npx playwright install --with-deps`).
- Docker e Docker Compose (opcional, para execução em contêiner).
- Código fonte do repositório `desafio-qa-web-playwright`.

## Instalação local
```bash
npm install
npx playwright install --with-deps
```

## Execução local
- Todos os testes:
  ```bash
  npx playwright test
  ```
- Apenas Home:
  ```bash
  npm run test:home
  ```
- Apenas Busca:
  ```bash
  npm run test:search
  ```

Configuração aplicada: headless, viewport desktop 1920x1080, `isMobile` desativado e trace no primeiro retry (`trace: 'on-first-retry'`), conforme `playwright.config.js`.

## Abrir relatório HTML
- Após os testes, o relatório fica em `playwright-report/`.
- Para visualizar:
  ```bash
  npx playwright show-report
  ```

## Execução via Docker
Imagem baseada em `mcr.microsoft.com/playwright:v1.57.0-jammy` já inclui browsers.
```bash
docker build -t desafio-qa-web .
docker run -it --rm -v "$(pwd)":/app desafio-qa-web bash
npx playwright test
```

## Execução via Docker Compose
```bash
docker compose build --no-cache
docker compose up -d
docker exec -it desafioqa_web bash
npx playwright test
```
O volume `.:/app` mantém o código sincronizado; o relatório (`playwright-report/`) fica acessível fora do contêiner.
