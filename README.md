# 🌐 Desafio QA — Testes Web com Playwright

Automação de testes Web para o Blog **Agibank**, utilizando **Playwright**, **Docker** e **GitHub Actions**.

Link da Documentação :  https://dilei27.github.io/desafio-qa-web-playwright/

Os testes garantem o funcionamento da Home e da funcionalidade de busca, validando termos válidos e inválidos.

---
## 🚀 Como executar localmente

### 1️⃣ Instalar dependências
npm install

### 2️⃣ Executar os testes
npx playwright test

### 3️⃣ Abrir relatório HTML
npx playwright show-report

---

## 🐳 Executar com Docker

docker compose build --no-cache
docker compose up -d
docker exec -it desafioqa_web bash
npx playwright test

---

## 📊 Relatórios (Playwright Report)

Os relatórios serão gerados em:

playwright-report/

---

## 🔄 CI/CD — GitHub Actions

A pipeline executa automaticamente:

- Instalação do Node.js  
- Instalação das dependências  
- Instalação dos browsers  
- Execução dos testes  
- Upload do relatório como artefato  

Workflow:

.github/workflows/playwright.yml

---

## 📌 Tecnologias Utilizadas

- Playwright  
- Node.js  
- Docker  
- GitHub Actions  
- Page Object Model (POM)
