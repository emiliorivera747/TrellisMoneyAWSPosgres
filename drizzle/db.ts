import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema/index";

declare global {
  var pgPool: Pool | undefined;
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set! Check Vercel environment variables.");
}

export const client =
  global.pgPool ??
  new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
    max: 10,
  });

if (process.env.NODE_ENV !== "production") global.pgPool = client;

// { schema } enables relational queries
export const db = drizzle(client, { schema, casing: "snake_case" });
