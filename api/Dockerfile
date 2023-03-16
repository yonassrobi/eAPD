FROM node:16.19.1-bullseye-slim as builder

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY api ./api
COPY common ./common

RUN yarn install --frozen-lockfile --non-interactive
RUN npm rebuild

# ---

FROM node:16.19.1-bullseye-slim

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /app/package.json ./
COPY --from=builder --chown=node:node /app/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /app/common/ ./common/
COPY --from=builder --chown=node:node /app/api/node_modules/ ./api/node_modules/
COPY --from=builder --chown=node:node /app/api/dist/ ./api/dist/

WORKDIR /home/node

CMD ["node", "api/dist/main.js"]