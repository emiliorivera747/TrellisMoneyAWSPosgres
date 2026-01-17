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
  item,
  subscription,
  profile,
  householdMember,
  household,
} from "@/drizzle/schema";

/**
 * User schema - Core user account information with authentication and Stripe customer linkage
 */
export const user = pgTable(
  "User",
  {
    userId: text("user_id").primaryKey().notNull(),
    email: text().notNull(),
    fullName: text("full_name"),
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
 * User relations - Links to items, subscriptions, profiles, and household members
 */
export const userRelations = relations(user, ({ one, many }) => ({
  items: many(item),
  subscriptions: many(subscription),
  profile: one(profile, {
    fields: [user.userId],
    references: [profile.userId],
  }),
  householdMembers: many(householdMember),
  householdsCreated: many(household),
}));
