FROM node:alpine as development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

ARG SERVICE_NAME=payments
ENV SERVICE_NAME=${SERVICE_NAME}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install -g pnpm
RUN pnpm install

COPY apps/payments apps/payments
COPY libs libs

RUN cd apps/payments && pnpm install

RUN pnpm run build payments

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG SERVICE_NAME=payments
ENV SERVICE_NAME=${SERVICE_NAME}

WORKDIR /user/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --production

COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "dist/apps/payments/main" ]

