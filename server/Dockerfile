# stage : install dependency

FROM node:lts As base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# stage : build

FROM node:20-alpine AS build

WORKDIR /app

COPY --from=base /app/dist ./dist

COPY package*.json ./

RUN npm install

EXPOSE 3001

CMD npm run start
