# Stage : install dependency

FROM node:lts AS base

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

COPY . .

# Stage : build

FROM node:20-alpine AS build

WORKDIR /app

COPY --from=base /app/node_modules ./node_modules/

COPY --from=base /app/dist ./dist

COPY package*.json tsconfig.json ./

EXPOSE 3001

CMD npm run start
