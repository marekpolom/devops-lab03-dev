FROM node:14

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
RUN yarn install

COPY . ./

CMD ["yarn", "start"]