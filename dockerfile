FROM node:20-alpine

WORKDIR /app

RUN apk add --update --no-cache \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    libtool \
    autoconf \
    automake

COPY package*.json /app

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT ["npm", "start"]