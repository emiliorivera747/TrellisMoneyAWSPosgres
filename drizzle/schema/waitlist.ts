import { pgTable, timestamp, text, uniqueIndex } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

/**
 * Waitlist schema - Stores emails of users interested in joining the app
 *
 * @field id - UUID primary key
 * @field email - Email address (unique, not null)
 * @field createdAt - UTC with timezone (default: CURRENT_TIMESTAMP)
 */
export const waitlist = pgTable(
  "Waitlist",
  {
    id: text()
      .primaryKey()
      .notNull()
      .default(sql`gen_random_uuid()`),
    email: text().notNull().unique(),
    createdAt: timestamp("created_at", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [uniqueIndex("Waitlist_email_key").on(table.email)]
);
