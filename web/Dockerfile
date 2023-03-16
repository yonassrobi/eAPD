FROM node:16.19.1-bullseye-slim as builder
RUN apt-get update; \
    apt-get install -y python3; \
    apt-get install -y python2 make; \
    apt-get install -y g++; \
    ln -s /usr/bin/python2.7 /usr/bin/python;

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