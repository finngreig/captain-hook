FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

# EXPOSE webhook_port
# EXPOSE internal_port

CMD [ "node", "app.js" ]