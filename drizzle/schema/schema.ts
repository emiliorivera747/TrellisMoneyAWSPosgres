import {
  pgTable,
  varchar,
  timestamp,
  text,
  integer,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

/**
 * PrismaMigrations schema - Internal Prisma migration tracking table
 */
export const prismaMigrations = pgTable("_prisma_migrations", {
  id: varchar({ length: 36 }).primaryKey().notNull(),
  checksum: varchar({ length: 64 }).notNull(),
  finishedAt: timestamp("finished_at", { withTimezone: true, mode: "string" }),
  migrationName: varchar("migration_name", { length: 255 }).notNull(),
  logs: text(),
  rolledBackAt: timestamp("rolled_back_at", {
    withTimezone: true,
    mode: "string",
  }),
  startedAt: timestamp("started_at", { withTimezone: true, mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});
