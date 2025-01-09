FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY .env .env

RUN npm install --production

RUN npm db:migrate

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
