FROM node:alpine as development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

ARG SERVICE_NAME=notifications
ENV SERVICE_NAME=${SERVICE_NAME}

WORKDIR /usr/src/app

COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install -g pnpm
RUN pnpm install

COPY apps/notifications apps/notifications
COPY libs libs

RUN cd apps/notifications && pnpm install

RUN pnpm run build notifications

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG SERVICE_NAME=notifications
ENV SERVICE_NAME=${SERVICE_NAME}

WORKDIR /usr/src/app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --production

COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "dist/apps/notifications/main.js" ]

