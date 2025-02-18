# Links

[Refinamento Miro](https://miro.com/app/board/uXjVLwJJRCM=/?moveToWidget=3458764612521512499&cot=14)

[Doc OpenApi](https://brain-agriculture-app-f5f681bfb210.herokuapp.com/api)

[Dashboard Total de Fazendas (desativado devido aos custos)](https://jb-tecnology.metabaseapp.com/public/dashboard/cc8c54ab-a2de-40be-8253-3a5a809f4a38)

[Dashboard Total de Hectares (desativado devido aos custos)](https://jb-tecnology.metabaseapp.com/public/dashboard/9a33594c-0949-4b01-906c-1e2bc49f8a31)

![Dashboard Total de Fazendas](asset/total-fazendas.png)

![Dashboard Total de Hectares](asset/total-hectares.png)


# Requirements:

- @nestjs/cli
- Docker
- docker-compose

# To run project
```bash
$ git checkout master
```

```bash
$ npm i -g @nestjs/cli
```

```bash
$ npm i
```

- Setting you .env based ON .env.default
- Go to the root folder and RUN

```bash
$ docker compose up -d
```

- Apply migrations

```bash
$ npm run db:migrate
```

```bash
$ npm run start
```

# To run unit test

```bash
$ npm run test
```

# To run e2e test

- Navigate to the src/module/agriculture-control/\_\_test\_\_ folder and RUN

```bash
$ docker compose up -d
```

- apply migrations on database test:

```bash
$ npm run test:db:setup
```

- execute e2e tests RUN

```bash
$ npm run test:e2e
```

# To Access production application (Desabilitado momentaneamente em razão dos custos)
- Use this URL: __https://brain-agriculture-app-f5f681bfb210.herokuapp.com__

# Aditional information
- To create Farm, is needed to provide a producerId, becouse it you need create one producer first.
- To create Agricultural Crop, is needed to provida a farmId, becouse it you need create one farm first.
