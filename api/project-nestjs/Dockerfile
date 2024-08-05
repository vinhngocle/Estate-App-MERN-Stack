# FROM node:18

# WORKDIR /usr/src/app

# COPY package.json /.
# COPY yarn-lock ./

# RUN yarn install

# COPY . .

FROM node:18

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 3000

CMD ["yarn", "run", "start:prod"]