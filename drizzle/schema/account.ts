import {
  pgTable,
  timestamp,
  text,
  serial,
  numeric,
  uniqueIndex,
  foreignKey,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { household, item, holding, householdMember } from "@/drizzle/schema";

/**
 * Balance schema - Stores account balance information (available, current, limit) with currency codes
 */
export const balance = pgTable("Balance", {
  balanceId: text("balance_id").notNull().primaryKey(),
  current: numeric({ precision: 65, scale: 30 }).notNull(),
  limit: numeric({ precision: 65, scale: 30 }).notNull(),
  isoCurrencyCode: text("iso_currency_code").notNull(),
  unofficialCurrencyCode: text("unofficial_currency_code"),
  lastUpdated: timestamp("last_updated", {
    precision: 3,
    withTimezone: true,
    mode: "string",
  }),
  updatedAt: timestamp("updated_at", {
    precision: 3,
    withTimezone: true,
    mode: "string",
  }).default(sql`CURRENT_TIMESTAMP`),
  timestamp: timestamp({
    precision: 3,
    withTimezone: true,
    mode: "string",
  }).default(sql`CURRENT_TIMESTAMP`),
});

/**
 * Account schema - Stores financial account information from Plaid connections
 * Links accounts to users, households, items, and balances
 */
export const account = pgTable(
  "Account",
  {
    accountId: text("account_id").primaryKey().notNull(),
    householdId: text("household_id"),
    itemId: text("item_id").notNull(),
    balanceId: text("balance_id"),
    memberId: text("member_id").notNull(),
    persistentAccountId: text("persistent_account_id"),
    name: text(),
    type: text(),
    available: numeric({ precision: 65, scale: 30 }),
    current: numeric({ precision: 65, scale: 30 }),
    limit: numeric({ precision: 65, scale: 30 }),
    isoCurrencyCode: text("iso_currency_code"),
    unofficialCurrencyCode: text("unofficial_currency_code"),
    mask: text(),
    officialName: text("official_name"),
    subtype: text(),
    verificationStatus: text("verification_status"),
    annualReturnRate: numeric("annual_return_rate", {
      precision: 65,
      scale: 30,
    }).default("0.00"),
    holderCategory: text("holder_category"),
    timestamp: timestamp({
      precision: 3,
      withTimezone: true,
      mode: "string",
    }).default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    }).default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp("created_at", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    }).default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    uniqueIndex("Account_balance_id_key").using(
      "btree",
      table.balanceId.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.balanceId],
      foreignColumns: [balance.balanceId],
      name: "Account_balance_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.householdId],
      foreignColumns: [household.householdId],
      name: "Account_household_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.itemId],
      foreignColumns: [item.itemId],
      name: "Account_item_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.memberId],
      foreignColumns: [householdMember.memberId],
      name: "Account_member_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
  ]
);

/**
 * AccountHistory schema - Historical snapshots of account balances and details over time
 */
export const accountHistory = pgTable(
  "AccountHistory",
  {
    id: serial().primaryKey().notNull(),
    accountId: text("account_id").notNull(),
    name: text().notNull(),
    type: text().notNull(),
    available: numeric({ precision: 65, scale: 30 }).notNull(),
    current: numeric({ precision: 65, scale: 30 }).notNull(),
    limit: numeric({ precision: 65, scale: 30 }).notNull(),
    isoCurrencyCode: text("iso_currency_code").notNull(),
    unofficialCurrencyCode: text("unofficial_currency_code").notNull(),
    userId: text("user_id"),
    timestamp: timestamp({ precision: 3, withTimezone: true, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.accountId],
      foreignColumns: [account.accountId],
      name: "AccountHistory_account_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ]
);

/**
 * Account relations - Links to balance, user, household, item, account histories, and holdings
 */
export const accountRelations = relations(account, ({ one, many }) => ({
  balance: one(balance, {
    fields: [account.balanceId],
    references: [balance.balanceId],
  }),
  member: one(householdMember, {
    fields: [account.memberId],
    references: [householdMember.memberId],
  }),
  household: one(household, {
    fields: [account.householdId],
    references: [household.householdId],
  }),
  item: one(item, {
    fields: [account.itemId],
    references: [item.itemId],
  }),
  accountHistories: many(accountHistory),
  holdings: many(holding),
}));

/**
 * Balance relations - Links to associated accounts
 */
export const balanceRelations = relations(balance, ({ many }) => ({
  accounts: many(account),
}));

/**
 * AccountHistory relations - Links to parent account
 */
export const accountHistoryRelations = relations(accountHistory, ({ one }) => ({
  account: one(account, {
    fields: [accountHistory.accountId],
    references: [account.accountId],
  }),
}));
