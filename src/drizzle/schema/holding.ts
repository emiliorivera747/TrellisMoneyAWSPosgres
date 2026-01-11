import {
  pgTable,
  timestamp,
  text,
  serial,
  numeric,
  foreignKey,
  primaryKey,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";

import { security } from "@/src/drizzle/schema/security";
import { user } from "@/src/drizzle/schema/user";
import { account } from "@/src/drizzle/schema/account";

/**
 * Holding schema - Stores investment holdings (securities) within accounts
 * Composite primary key: accountId, securityId, userId
 */
export const holding = pgTable(
  "Holding",
  {
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
    accountId: text("account_id").notNull(),
    securityId: text("security_id").notNull(),
    timestamp: timestamp({ precision: 3, withTimezone: true, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    userId: text("user_id").notNull(),
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
    primaryKey({
      columns: [table.accountId, table.securityId, table.userId],
      name: "Holding_pkey",
    }),
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
      columns: [table.accountId, table.securityId, table.userId],
      foreignColumns: [holding.accountId, holding.securityId, holding.userId],
      name: "HoldingHistory_security_id_user_id_account_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ]
);

/**
 * HoldingHistory relations - Links to the parent holding via composite key
 */
export const holdingHistoryRelations = relations(holdingHistory, ({ one }) => ({
  holding: one(holding, {
    fields: [
      holdingHistory.accountId,
      holdingHistory.securityId,
      holdingHistory.userId,
    ],
    references: [holding.accountId, holding.securityId, holding.userId],
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
