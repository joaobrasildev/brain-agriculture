FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY .env .env

RUN npm install --production

COPY . .

RUN npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d ./database/typeorm/migration.datasource.ts

EXPOSE 3000

CMD ["npm", "start"]
