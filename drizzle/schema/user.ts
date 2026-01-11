import {
  pgTable,
  timestamp,
  text,
  uniqueIndex,
  boolean,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";

import {
  account,
  item,
  security,
  subscription,
  profile,
  holding,
  householdMember,
} from "@/drizzle/schema";

/**
 * User schema - Core user account information with authentication and Stripe customer linkage
 */
export const user = pgTable(
  "User",
  {
    userId: text("user_id").primaryKey().notNull(),
    email: text().notNull(),
    name: text(),
    emailVerified: boolean("email_verified").default(false),
    phoneVerified: boolean("phone_verified").default(false),
    phone: text(),
    customerId: text("customer_id"),
    createdAt: timestamp("created_at", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    uniqueIndex("User_customer_id_key").using(
      "btree",
      table.customerId.asc().nullsLast().op("text_ops")
    ),
    uniqueIndex("User_email_key").using(
      "btree",
      table.email.asc().nullsLast().op("text_ops")
    ),
  ]
);

/**
 * User relations - Links to accounts, items, securities, subscriptions, profiles, household members, and holdings
 */
export const userRelations = relations(user, ({ many }) => ({
  accounts: many(account),
  items: many(item),
  securities: many(security),
  subscriptions: many(subscription),
  profiles: many(profile),
  householdMembers: many(householdMember),
  holdings: many(holding),
}));
