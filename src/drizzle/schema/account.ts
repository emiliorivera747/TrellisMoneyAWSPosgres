import { pgTable, varchar, timestamp, text, integer, serial, numeric, uniqueIndex, boolean, foreignKey, bigint, index, primaryKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { relations } from "drizzle-orm";
import { balance, user, household, item } from "@/src/drizzle/schema/schema";

/**
 *  Account schema
 *
 */
export const account = pgTable(
  "Account",
  {
    accountId: text("account_id").notNull(),
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
    persistentAccountId: text("persistent_account_id"),
    annualReturnRate: numeric("annual_return_rate", {
      precision: 65,
      scale: 30,
    }).default("0.00"),
    holderCategory: text("holder_category"),
    balanceId: text("balance_id").notNull(),
    userId: text("user_id").notNull(),
    timestamp: timestamp({
      precision: 3,
      withTimezone: true,
      mode: "string",
    }).default(sql`CURRENT_TIMESTAMP`),
    householdId: text("household_id"),
    itemId: text("item_id").notNull(),
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
      columns: [table.userId],
      foreignColumns: [user.userId],
      name: "Account_user_id_fkey",
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
  ]
);

/**
 * Schema for "AccountHistory" table storing historical account data.
 *
 * Columns:
 * - `id`: Primary key.
 * - `accountId`: FK to `account.accountId`, not null.
 * - `name`, `type`: Account details, not null.
 * - `available`, `current`, `limit`: Financial data, high precision, not null.
 * - `isoCurrencyCode`, `unofficialCurrencyCode`: Currency codes, not null.
 * - `userId`: Associated user, nullable.
 * - `timestamp`: Record creation time, defaults to current, not null.
 *
 * FK:
 * - `AccountHistory_account_id_fkey`: References `account.accountId`, cascades on update/delete.
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
 * Represents the schema for the "Balance" table in the database.
 *
 * @property balanceId - Unique identifier for the balance record.
 * @property available - The available balance with a precision of 65 and scale of 30.
 * @property current - The current balance with a precision of 65 and scale of 30.
 * @property limit - The balance limit with a precision of 65 and scale of 30.
 * @property isoCurrencyCode - ISO currency code associated with the balance.
 * @property unofficialCurrencyCode - Unofficial currency code, if applicable.
 * @property lastUpdated - Timestamp indicating the last update, stored as a string with timezone.
 * @property updatedAt - Timestamp indicating when the record was last updated, defaults to the current timestamp.
 * @property timestamp - General timestamp for the record, defaults to the current timestamp.
 */
export const balance = pgTable("Balance", {
  balanceId: text("balance_id").notNull(),
  available: numeric({ precision: 65, scale: 30 }).notNull(),
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
 * Defines the relationships for the `account` entity.
 * 
 * @remarks
 * This function establishes the following relationships:
 * - `balance`: A one-to-one relationship with the `balance` entity, linked via `balanceId`.
 * - `user`: A one-to-one relationship with the `user` entity, linked via `userId`.
 * - `household`: A one-to-one relationship with the `household` entity, linked via `householdId`.
 * - `item`: A one-to-one relationship with the `item` entity, linked via `itemId`.
 * - `accountHistories`: A one-to-many relationship with the `accountHistory` entity.
 * - `holdings`: A one-to-many relationship with the `holding` entity.
 */
export const accountRelations = relations(account, ({ one, many }) => ({
  balance: one(balance, {
    fields: [account.balanceId],
    references: [balance.balanceId],
  }),
  user: one(user, {
    fields: [account.userId],
    references: [user.userId],
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
 * Defines the relationships for the `balance` entity.
 * Establishes a one-to-many relationship with the `account` entity.
 */
export const balanceRelations = relations(balance, ({ many }) => ({
  accounts: many(account),
}));


/**
 * Defines the relationships for the `accountHistory` table.
 * Establishes a one-to-one relationship with the `account` table
 * using `accountId` as the foreign key.
 */
export const accountHistoryRelations = relations(accountHistory, ({ one }) => ({
  account: one(account, {
    fields: [accountHistory.accountId],
    references: [account.accountId],
  }),
}));
