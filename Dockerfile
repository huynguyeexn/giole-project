FROM node:20-bullseye as development

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
RUN apt-get update && apt-get install gnupg wget -y && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install google-chrome-stable -y --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app
COPY ./package*.json .
COPY ./yarn.lock .
RUN yarn global add @nestjs/cli
COPY . .
RUN yarn install
RUN cd ./node_modules/puppeteer && yarn install
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