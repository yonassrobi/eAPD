FROM node:16.16.0-alpine3.15 as builder
RUN apk add --no-cache python3 g++ make curl

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY babel.config.js . 
COPY yarn.lock .
COPY common ./common
COPY api/package.json ./api/package.json

RUN yarn install --pure-lockfile

COPY api ./api

# ---

FROM node:16.16-alpine

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /app/package*.json ./
COPY --from=builder --chown=node:node /app/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /app/common/ ./common/
COPY --from=builder --chown=node:node /app/api/node_modules/ ./api/node_modules/
COPY --from=builder --chown=node:node /app/api/dist/ ./api/dist/

WORKDIR /home/node

CMD ["node", "api/dist/main.js"]