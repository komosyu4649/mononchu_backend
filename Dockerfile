FROM node:16.14.2
RUN npm i -g @nestjs/cli
USER node
ADD --chown=node:node . /usr/src/app/
WORKDIR /usr/src/app
RUN yarn && \ 
    yarn cache clean && \
    yarn run build
CMD ["yarn", "run", "start:prod"]