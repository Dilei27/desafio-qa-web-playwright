<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18.x-43853D?style=flat-square&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Playwright-1.57-blueviolet?style=flat-square&logo=playwright" />
  <img src="https://img.shields.io/badge/CI-GitHub%20Actions-success?style=flat-square&logo=githubactions" />
</p>

# Automação de Testes Web – Playwright  
Validação de busca do **Blog Agibank**

---

## 🧭 Objetivo

Este projeto implementa a automação Web utilizando **Playwright**, cobrindo três cenários essenciais do Blog Agibank:

- Verificação do carregamento da Home  
- Busca com termo válido  
- Busca com termo inválido  

A automação segue o padrão **Page Object**, mantendo o código organizado, reutilizável e fácil de evoluir.

---

## 📁 Estrutura do Projeto

desafio-qa-web/
├─ pages/
│ └─ search.page.js
├─ tests/
│ ├─ home.spec.js
│ └─ search.spec.js
├─ .gitignore
├─ Dockerfile
├─ docker-compose.yml
├─ package.json
├─ package-lock.json
├─ playwright.config.js
└─ README.md

yaml
Copiar código

---

## ▶️ Como executar localmente

### **1. Instalar dependências**
```bash
npm install
2. Executar os testes
bash
Copiar código
npx playwright test
3. Abrir relatório HTML
bash
Copiar código
npx playwright show-report
🐳 Execução via Docker (ambiente já configurado)
O container utiliza a imagem oficial do Playwright, incluindo todos os browsers.

Build da imagem
bash
Copiar código
docker compose build --no-cache
Subir o container
bash
Copiar código
docker compose up -d
Executar os testes dentro do container
bash
Copiar código
docker exec -it desafioqa_web bash
npx playwright test
🔧 Pipeline de CI – GitHub Actions
O workflow executa:

Instalação das dependências

Instalação dos browsers

Execução dos testes

Upload do relatório como artefato

Workflow completo
yaml
Copiar código
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
🧪 Cenários Implementados
Home online: valida carregamento e título.

Busca válida: termo conhecido retorna lista de artigos.

Busca inválida: exibe mensagem de “nenhum resultado encontrado”.

🧹 Arquivo .gitignore
bash
Copiar código
node_modules/
test-results/
playwright-report/
playwright/.cache/
blob-report/
.failures/
.vscode/
.idea/
.DS_Store
Thumbs.db
*.log
*.tmp
*.pid
✔ Considerações Finais
O projeto foi desenvolvido com foco em clareza, boas práticas e compatibilidade com qualquer ambiente.
A estrutura facilita manutenção, reaproveitamento e expansão para novos cenários.

Pronto para avaliação e execução em pipeline.
