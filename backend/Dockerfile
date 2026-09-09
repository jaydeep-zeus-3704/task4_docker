FROM docker-registry-002.zeuslearning.com/zeuslearning/node:20-bookworm-slim 
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN --mount=type=secret,id=auth_token \
    TOKEN=$(cat /run/secrets/auth_token) && \
    npm config set registry=https://zeuslearning-824100177805.d.codeartifact.ap-south-1.amazonaws.com/npm/training-npm-store/ &&\
    npm config set //zeuslearning-824100177805.d.codeartifact.ap-south-1.amazonaws.com/npm/training-npm-store/:_authToken=${TOKEN} &&\
    npm install

COPY . .
CMD [ "npm","start" ]

