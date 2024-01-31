FROM node:alpine as development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

ARG SERVICE_NAME=reservations
ENV SERVICE_NAME=${SERVICE_NAME}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN if ! command -v yarn &> /dev/null; then npm install -g yarn; fi
RUN yarn install

COPY . .

RUN yarn build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG SERVICE_NAME=reservations
ENV SERVICE_NAME=${SERVICE_NAME}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN if ! command -v yarn &> /dev/null; then npm install -g yarn; fi
RUN yarn install --production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/reservations/main"]

