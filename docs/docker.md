# Docker

## Dockerfile
Baseado em `mcr.microsoft.com/playwright:v1.57.0-jammy`, que já inclui Node e browsers suportados pelo Playwright.
```Dockerfile
FROM mcr.microsoft.com/playwright:v1.57.0-jammy

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx playwright install --with-deps
CMD ["tail", "-f", "/dev/null"]
```
- Instala dependências via `npm ci`.
- Copia o código e instala browsers do Playwright.
- Mantém o contêiner ativo para execuções manuais.

## docker-compose.yml
```yaml
version: '3.8'

services:
  web:
    build: .
    container_name: desafioqa_web
    ports:
      - "9323:9323"
    working_dir: /app
    tty: true
    stdin_open: true
    volumes:
      - .:/app
```
- Serviço único `web`, monta o código em `/app` e expõe porta 9323 (útil para servir relatórios caso necessário).
- `tty` e `stdin_open` permitem sessão interativa.

## Executar testes no contêiner
- Build e subir:
  ```bash
  docker compose build --no-cache
  docker compose up -d
  ```
- Acessar o contêiner:
  ```bash
  docker exec -it desafioqa_web bash
  ```
- Executar testes:
  ```bash
  npx playwright test
  ```
O diretório `playwright-report/` é gravado no volume montado, disponível no host.
