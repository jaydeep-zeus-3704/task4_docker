FROM docker-registry-002.zeuslearning.com/zeuslearning/node:20-bookworm-slim AS builder

WORKDIR /build

COPY package.json package-lock.json ./
ARG REACT_APP_BACKEND_HOST
ENV REACT_APP_BACKEND_HOST=$REACT_APP_BACKEND_HOST
RUN echo "${REACT_APP_BACKEND_HOST}"
RUN --mount=type=secret,id=auth_token \
    TOKEN=$(cat /run/secrets/auth_token) && \
    npm config set registry=https://zeuslearning-824100177805.d.codeartifact.ap-south-1.amazonaws.com/npm/training-npm-store/ && \
    npm config set //zeuslearning-824100177805.d.codeartifact.ap-south-1.amazonaws.com/npm/training-npm-store/:_authToken=${TOKEN} && \
    npm install

COPY . .

RUN npm run build



FROM docker-registry-002.zeuslearning.com/zeuslearning/nginx:1.27-alpine AS runner

COPY --from=builder /build/build /usr/share/nginx/html
 
CMD ["nginx", "-g", "daemon off;"]


