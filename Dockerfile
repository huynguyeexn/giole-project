# development
FROM node:20-alpine as development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY ./package*.json .
COPY ./yarn.lock .
RUN yarn global add @nestjs/cli
COPY . .
CMD [ "yarn", "install" ]

# production
# FROM node:19-alpine as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}
# WORKDIR /usr/src/app
# COPY package.json ./
# COPY yarn.lock ./
# RUN yarn install --production=true
# COPY . .
# COPY --from=development /usr/src/app/dist ./dist
# CMD [ "node", "dist/main" ]