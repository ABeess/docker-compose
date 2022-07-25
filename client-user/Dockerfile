FROM node:16-alpine

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

ADD package*.json ./
RUN yarn

ADD . .

RUN yarn build

EXPOSE 3050

CMD yarn start