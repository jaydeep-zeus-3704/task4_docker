FROM docker-registry-002.zeuslearning.com/zeuslearning/node:20-bookworm-slim AS builder

WORKDIR /build

COPY package.json package-lock.json ./

RUN --mount=type=secret,id=auth_token \
    TOKEN=$(cat /run/secrets/auth_token) && \
    npm config set registry=https://zeuslearning-824100177805.d.codeartifact.ap-south-1.amazonaws.com/npm/training-npm-store/ && \
    npm config set //zeuslearning-824100177805.d.codeartifact.ap-south-1.amazonaws.com/npm/training-npm-store/:_authToken=${TOKEN} && \
    npm install

COPY . .

RUN npm run build



FROM docker-registry-002.zeuslearning.com/zeuslearning/node:20-bookworm-slim AS runner
WORKDIR /app

COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/package.json ./
COPY --from=builder /build/package-lock.json ./
COPY --from=builder /build/build ./build

CMD ["npx","serve","-s","build"]