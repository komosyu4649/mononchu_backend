FROM node:16.14.2
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn add
RUN yarn --pure-lockfile
COPY --chown=node:node . .
RUN yarn build
USER node
CMD ["node", "dist/src/main"]
