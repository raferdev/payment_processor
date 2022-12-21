FROM node:16-alpine

RUN apk add --no-cache libc6-compat bash
RUN apk add --update --no-cache openssl1.1-compat

WORKDIR /app

COPY . .

RUN chmod +x wait-for-it.sh

RUN npm ci