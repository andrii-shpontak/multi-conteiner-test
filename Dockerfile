# Stage 1: Build
FROM node:20.11.1-alpine AS builder

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

# Stage 2: Run
FROM node:20.11.1-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

RUN chown -R node:node /usr/src/app

USER node

EXPOSE 8008

CMD npm start
