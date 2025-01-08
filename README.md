# Links

[Refinamento Miro](https://miro.com/app/board/uXjVLwJJRCM=/?moveToWidget=3458764612521512499&cot=14).

[Doc OpenApi](http://localhost:3000/api).

# Requirements:

- @nestjs/cli
- Docker
- docker-compose

# To run project
```bash
$ git checkout develop
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