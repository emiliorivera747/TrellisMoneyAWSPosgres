import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema/index";

declare global {
  var pgPool: Pool | undefined;
}

export const client =
  global.pgPool ??
  new Pool({
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    user: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    ssl: {
      rejectUnauthorized: false,
    },
    max: 10,
  });

if (process.env.NODE_ENV !== "production") global.pgPool = client;

// { schema } enables relational queries
export const db = drizzle(client, { schema, casing: "snake_case" });
