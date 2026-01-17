import {
  pgTable,
  timestamp,
  text,
  varchar,
  numeric,
  foreignKey,
  index,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { item, holding, householdMember } from "@/drizzle/schema";

/**
 * AccountType enum - Defines account types
 */
export const accountType = pgEnum("AccountType", [
  "DEPOSITORY",
  "CREDIT",
  "LOAN",
  "INVESTMENT",
  "OTHER",
]);

/**
 * AccountVerificationStatus enum - Defines account verification statuses
 */
export const accountVerificationStatus = pgEnum("AccountVerificationStatus", [
  "AUTOMATICALLY_VERIFIED",
  "PENDING_MANUAL_VERIFICATION",
  "DATABASE_INSIGHTS_PASS",
  "FAILED",
]);

/**
 * Account schema - Stores financial account information from Plaid connections
 * Links accounts to items and household members
 */
export const account = pgTable(
  "Account",
  {
    accountId: text("account_id").primaryKey().notNull(),
    availableBalance: numeric("available_balance", {
      precision: 28,
      scale: 8,
    }),
    currentBalance: numeric("current_balance", {
      precision: 28,
      scale: 8,
    }),
    limitAmount: numeric("limit_amount", {
      precision: 28,
      scale: 8,
    }),
    mask: varchar("mask", { length: 4 }),
    accountName: text("account_name").notNull(),
    officialName: text("official_name"),
    type: accountType().notNull(),
    subtype: varchar("subtype", { length: 50 }),
    expectedAnnualReturnRate: numeric("expected_annual_return_rate", {
      precision: 6,
      scale: 4,
    }),
    holderCategory: varchar("holder_category", { length: 20 }),
    persistentAccountId: text("persistent_account_id"),
    verificationStatus: accountVerificationStatus("verification_status"),
    verificationName: text("verification_name"),
    itemId: text("item_id").notNull(),
    householdMemberId: text("household_member_id").notNull(),
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
    index("Account_item_id_idx").using(
      "btree",
      table.itemId.asc().nullsLast().op("text_ops")
    ),
    index("Account_household_member_id_idx").using(
      "btree",
      table.householdMemberId.asc().nullsLast().op("text_ops")
    ),
    index("Account_household_member_id_type_idx").using(
      "btree",
      table.householdMemberId.asc().nullsLast().op("text_ops"),
      table.type.asc().nullsLast()
    ),
    foreignKey({
      columns: [table.itemId],
      foreignColumns: [item.itemId],
      name: "Account_item_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.householdMemberId],
      foreignColumns: [householdMember.householdMemberId],
      name: "Account_household_member_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
  ]
);

/**
 * Account relations - Links to item, household member, and holdings
 */
export const accountRelations = relations(account, ({ one, many }) => ({
  item: one(item, {
    fields: [account.itemId],
    references: [item.itemId],
  }),
  householdMember: one(householdMember, {
    fields: [account.householdMemberId],
    references: [householdMember.householdMemberId],
  }),
  holdings: many(holding),
}));
