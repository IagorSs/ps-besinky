FROM node:24-alpine

WORKDIR /app

# Copy relevant code
COPY tsconfig.base.json package.json yarn.lock .yarnrc.yml ./
COPY ./packages/ ./packages/
COPY ./applications/backend/src ./applications/backend/src
COPY ./applications/backend/package.json ./applications/backend/tsconfig.build.json ./applications/backend/tsconfig.json ./applications/backend/nest-cli.json ./applications/backend/

# Set yarn version to 4
RUN corepack enable
RUN corepack use yarn@4.12.0

# Instalar dependências
RUN yarn install --frozen-lockfile

# Build da aplicação
RUN yarn backend:build

# Expor porta
EXPOSE 3000

# Comando para iniciar
CMD ["yarn", "backend:start:prod"]
