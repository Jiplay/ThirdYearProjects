FROM node:14-alpine

WORKDIR /Area_App

COPY package.json .
RUN npm install

COPY . .

RUN apk update && apk add bash

RUN yarn global add expo-cli
RUN expo login -u jiplay -p juju2000
RUN expo install expo-updates