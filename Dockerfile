FROM mcr.microsoft.com/playwright:v1.57.0-jammy

WORKDIR /app

# Copia apenas dependências primeiro (cache)
COPY package.json package-lock.json ./

# Instala dependências
RUN npm ci

# Copia código
COPY . .

# Instala os browsers necessários
RUN npx playwright install --with-deps

# Comando padrão: rodar testes
CMD ["tail", "-f", "/dev/null"]
