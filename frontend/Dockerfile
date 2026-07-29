FROM docker-registry-002.zeuslearning.com/zeuslearning/node:20-bookworm-slim

ARG TOKEN

WORKDIR /app

COPY . .

RUN npm config set registry=https://zeuslearning-824100177805.d.codeartifact.ap-south-1.amazonaws.com/npm/training-npm-store/
RUN npm config set //zeuslearning-824100177805.d.codeartifact.ap-south-1.amazonaws.com/npm/training-npm-store/:_authToken=${TOKEN}
RUN npm install
CMD [ "npm","start" ]
