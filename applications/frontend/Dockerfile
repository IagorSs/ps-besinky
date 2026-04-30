FROM node:24-alpine AS builder

WORKDIR /app

# Copy relevant code
COPY tsconfig.base.json package.json yarn.lock .yarnrc.yml ./
COPY ./packages/ ./packages/
COPY ./applications/frontend/app ./applications/frontend/app
COPY ./applications/frontend/public ./applications/frontend/public
COPY ./applications/frontend/next-env.d.ts ./applications/frontend/next.config.ts ./applications/frontend/package.json ./applications/frontend/postcss.config.mjs ./applications/frontend/tsconfig.json ./applications/frontend/

# Set yarn version to 4
RUN corepack enable
RUN corepack use yarn@4.12.0

# Instalar dependências
RUN yarn install --frozen-lockfile

# Build env properties
ARG BACKEND_HOST

# Build
RUN yarn frontend:build

EXPOSE 3000

CMD ["yarn", "frontend:start"]
