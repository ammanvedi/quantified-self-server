FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./dist ./
EXPOSE 3090
CMD [ "node", "index.js" ]