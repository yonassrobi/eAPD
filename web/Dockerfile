FROM node:16.16.0-alpine3.15 as builder
RUN apk add --no-cache python3 g++ make

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock ./
COPY web/package.json ./web/package.json
COPY common ./common
COPY web/src/static ./web/src/static

RUN yarn install --pure-lockfile

COPY web ./web

WORKDIR /app/web
RUN LD_CLIENT_ID="1234" TEALIUM_ENV="1234" TEALIUM_TAG="1234" OKTA_DOMAIN="https://dev-26650177.okta.com" yarn build

# ---

FROM nginx:1.23.3
COPY --from=builder /app/web/dist /usr/share/nginx/html