FROM node:slim

WORKDIR /app/api

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json .
COPY nest-cli.json .
COPY tsconfig.json .
COPY tsconfig.build.json .

## Install app dependencies
# RUN npm install --force
#
ENV PORT 4000
#
EXPOSE $PORT

# Bundle app source
# COPY ./src .

# Creates a "dist" folder with the production build
#RUN npm run build

# Start the server using the production build
#CMD [ "node", "dist/main.js" ]
#CMD [ "npm", "run", "start:dev" ]