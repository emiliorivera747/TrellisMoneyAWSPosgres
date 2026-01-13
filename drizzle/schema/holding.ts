import {
  pgTable,
  timestamp,
  text,
  serial,
  numeric,
  foreignKey,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";

import { user, security, account } from "@/drizzle/schema";

/**
 * Holding schema - Stores investment holdings (securities) within accounts
 * Primary key: holdingId
 * Unique constraint: accountId, securityId, userId
 */
export const holding = pgTable(
  "Holding",
  {
    holdingId: text("holding_id").primaryKey().notNull(),
    accountId: text("account_id").notNull(),
    securityId: text("security_id").notNull(),
    userId: text("user_id").notNull(),
    costBasis: numeric("cost_basis", { precision: 65, scale: 30 }).notNull(),
    institutionPrice: numeric("institution_price", {
      precision: 65,
      scale: 30,
    }).notNull(),
    institutionPriceAsOf: timestamp("institution_price_as_of", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    }).notNull(),
    institutionPriceDatetime: timestamp("institution_price_datetime", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    }),
    institutionValue: numeric("institution_value", {
      precision: 65,
      scale: 30,
    }).notNull(),
    annualReturnRate: numeric("annual_return_rate", {
      precision: 65,
      scale: 30,
    }).default("0.06"),
    isoCurrencyCode: text("iso_currency_code").notNull(),
    unofficialCurrencyCode: text("unofficial_currency_code"),
    vestedQuantity: numeric("vested_quantity", { precision: 65, scale: 30 }),
    vestedValue: numeric("vested_value", {
      precision: 65,
      scale: 30,
    }).notNull(),
    quantity: numeric({ precision: 65, scale: 30 }).notNull(),
    timestamp: timestamp({ precision: 3, withTimezone: true, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.securityId],
      foreignColumns: [security.securityId],
      name: "Holding_security_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.userId],
      name: "Holding_user_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.accountId],
      foreignColumns: [account.accountId],
      name: "Holding_account_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    uniqueIndex("Holding_account_id_security_id_user_id_key").using(
      "btree",
      table.accountId.asc().nullsLast().op("text_ops"),
      table.securityId.asc().nullsLast().op("text_ops"),
      table.userId.asc().nullsLast().op("text_ops")
    ),
  ]
);

/**
 * HoldingHistory schema - Historical snapshots of holding values over time
 */
export const holdingHistory = pgTable(
  "HoldingHistory",
  {
    id: serial().primaryKey().notNull(),
    costBasis: numeric("cost_basis", { precision: 65, scale: 30 }).notNull(),
    institutionPrice: numeric("institution_price", {
      precision: 65,
      scale: 30,
    }).notNull(),
    annualReturnRate: numeric("annual_return_rate", {
      precision: 65,
      scale: 30,
    }).default("0.06"),
    institutionPriceAsOf: timestamp("institution_price_as_of", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    }).notNull(),
    institutionPriceDatetime: timestamp("institution_price_datetime", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    }),
    institutionValue: numeric("institution_value", {
      precision: 65,
      scale: 30,
    }).notNull(),
    isoCurrencyCode: text("iso_currency_code"),
    unofficialCurrencyCode: text("unofficial_currency_code"),
    vestedQuantity: numeric("vested_quantity", { precision: 65, scale: 30 }),
    vestedValue: numeric("vested_value", {
      precision: 65,
      scale: 30,
    }).notNull(),
    quantity: numeric({ precision: 65, scale: 30 }).notNull(),
    holdingId: text("holding_id").notNull(),
    accountId: text("account_id").notNull(),
    securityId: text("security_id").notNull(),
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
    userId: text("user_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.holdingId],
      foreignColumns: [holding.holdingId],
      name: "HoldingHistory_holding_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ]
);

/**
 * HoldingHistory relations - Links to the parent holding via holdingId
 */
export const holdingHistoryRelations = relations(holdingHistory, ({ one }) => ({
  holding: one(holding, {
    fields: [holdingHistory.holdingId],
    references: [holding.holdingId],
  }),
}));

/**
 * Holding relations - Links to security, user, account, and historical records
 */
export const holdingRelations = relations(holding, ({ one, many }) => ({
  holdingHistories: many(holdingHistory),
  security: one(security, {
    fields: [holding.securityId],
    references: [security.securityId],
  }),
  user: one(user, {
    fields: [holding.userId],
    references: [user.userId],
  }),
  account: one(account, {
    fields: [holding.accountId],
    references: [account.accountId],
  }),
}));
