import { z } from 'zod';

export const environmentSchema = z.enum(['test', 'development', 'production']);

const isProduction = process.env.NODE_ENV == 'production';

const databaseSchema = z.object({
  host: z.string(),
  database: z.string(),
  password: z.string(),
  port: z.coerce.number(),
  url: isProduction ? z.string().optional() : z.string(),
  username: z.string(),
});

export const configSchema = z.object({
  env: environmentSchema,
  port: z.coerce.number().positive().int(),
  database: databaseSchema,
});
