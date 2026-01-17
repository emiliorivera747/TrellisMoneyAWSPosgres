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
 * 
 * @field userId - UUID primary key
 * @field customerId - Stripe Customer ID (unique, nullable)
 * @field email - User email address (unique, not null)
 * @field userName - User name (nullable)
 * @field emailVerified - Email confirmation status (default: false)
 * @field phoneVerified - Phone/SMS verification status (default: false)
 * @field phone - E.164 format recommended (+1...)
 * @field createdAt - UTC with timezone (default: now())
 * @field updatedAt - Use trigger to auto-update (default: now())
 */
export const user = pgTable(
  "User",
  {
    userId: text("user_id").primaryKey().notNull(),
    customerId: text("customer_id").unique(),
    email: text().notNull().unique(),
    userName: text("user_name"),
    emailVerified: boolean("email_verified").default(false),
    phoneVerified: boolean("phone_verified").default(false),
    phone: text(),
    createdAt: timestamp("created_at", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    })
      .default(sql`now()`)
      .notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    })
      .default(sql`now()`)
      .notNull(),
  },
  (table) => [
    uniqueIndex("User_customer_id_key").on(table.customerId),
    uniqueIndex("User_email_key").on(table.email),
  ]
);

/**
 * User relations - Links to items, subscriptions, profile, household members, and households created
 */
export const userRelations = relations(user, ({ one, many }) => ({
  items: many(item),
  subscriptions: many(subscription),
  profile: one(profile, {
    fields: [user.userId],
    references: [profile.userId],
  }),
  householdMembers: many(householdMember),
  householdsCreated: many(household, {
    relationName: "createdByUser",
  }),
}));
