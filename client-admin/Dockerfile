FROM node:16-alpine

RUN mkdir /usr/src/admin

WORKDIR /usr/src/admin

ADD package*.json ./
RUN yarn

ADD . .

RUN yarn build

EXPOSE 3060

CMD serve -l 3060 -s build