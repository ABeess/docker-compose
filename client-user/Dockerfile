FROM node:16-alpine

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

ADD package*.json ./
RUN yarn

ADD . .

RUN yarn build

EXPOSE 3000

CMD yarn start