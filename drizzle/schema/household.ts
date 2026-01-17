import {
  pgTable,
  timestamp,
  text,
  uniqueIndex,
  foreignKey,
  index,
  pgEnum,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { user, account, holding } from "@/drizzle/schema";

/**
 * HouseholdRole enum - Defines member roles within a household
 */
export const householdRole = pgEnum("HouseholdRole", [
  "ADMIN",
  "MEMBER",
  "GUEST",
]);

/**
 * Household schema - Represents a shared household for multiple users
 */
export const household = pgTable(
  "Household",
  {
    householdId: text("household_id").primaryKey().notNull(),
    householdName: text("household_name").default("Our Household"),
    createdByUserId: text("created_by_user_id"),
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
    }),
  },
  (table) => [
    foreignKey({
      columns: [table.createdByUserId],
      foreignColumns: [user.userId],
      name: "Household_created_by_user_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
  ]
);

/**
 * HouseholdMember schema - Links users to households with roles
 */
export const householdMember = pgTable(
  "HouseholdMember",
  {
    householdMemberId: text("household_member_id").primaryKey().notNull(),
    email: text(),
    name: text().notNull(),
    role: householdRole().default("MEMBER").notNull(),
    householdId: text("household_id").notNull(),
    userId: text("user_id"),
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
    }),
  },
  (table) => [
    index("HouseholdMember_household_id_idx").using(
      "btree",
      table.householdId.asc().nullsLast().op("text_ops")
    ),
    index("HouseholdMember_user_id_idx").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops")
    ),
    index("HouseholdMember_household_id_user_id_idx").using(
      "btree",
      table.householdId.asc().nullsLast().op("text_ops"),
      table.userId.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.householdId],
      foreignColumns: [household.householdId],
      name: "HouseholdMember_household_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.userId],
      name: "HouseholdMember_user_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
  ]
);

/**
 * Household relations - Links to household members
 */
export const householdRelations = relations(household, ({ one, many }) => ({
  createdByUser: one(user, {
    fields: [household.createdByUserId],
    references: [user.userId],
  }),
  householdMembers: many(householdMember),
}));

/**
 * HouseholdMember relations - Links to household, user, accounts, and holdings
 */
export const householdMemberRelations = relations(
  householdMember,
  ({ one, many }) => ({
    household: one(household, {
      fields: [householdMember.householdId],
      references: [household.householdId],
    }),
    user: one(user, {
      fields: [householdMember.userId],
      references: [user.userId],
    }),
    accounts: many(account),
    holdings: many(holding),
  })
);
