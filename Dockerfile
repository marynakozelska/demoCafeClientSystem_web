FROM node:19-alpine AS build

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci
COPY . .
RUN npm run build --prod

EXPOSE 4200

CMD ["npm", "start"]
