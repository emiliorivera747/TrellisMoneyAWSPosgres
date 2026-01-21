import {
  pgTable,
  timestamp,
  text,
  numeric,
  foreignKey,
  index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";

import { security, account, householdMember } from "@/drizzle/schema";

/**
 * Holding schema - Stores investment holdings (securities) within accounts
 */
export const holding = pgTable(
  "Holding",
  {
    holdingId: text("holding_id").primaryKey().notNull(),
    accountId: text("account_id"),
    securityId: text("security_id").notNull(),
    householdMemberId: text("household_member_id").notNull(),
    institutionPrice: numeric("institution_price", {
      precision: 20,
      scale: 8,
    }),
    institutionPriceAsOf: timestamp("institution_price_as_of", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    }),
    institutionPriceDatetime: timestamp("institution_price_datetime", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    }),
    institutionValue: numeric("institution_value", {
      precision: 24,
      scale: 8,
    }),
    costBasis: numeric("cost_basis", { precision: 24, scale: 8 }),
    quantity: numeric("quantity", { precision: 20, scale: 8 }),
    isoCurrencyCode: text("iso_currency_code"),
    vestedQuantity: numeric("vested_quantity", { precision: 20, scale: 8 }),
    vestedValue: numeric("vested_value", {
      precision: 24,
      scale: 8,
    }),
    expectedAnnualReturnRate: numeric("expected_annual_return_rate", {
      precision: 6,
      scale: 4,
    }),
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
    index("Holding_account_id_idx").using(
      "btree",
      table.accountId.asc().nullsLast().op("text_ops")
    ),
    index("Holding_household_member_id_idx").using(
      "btree",
      table.householdMemberId.asc().nullsLast().op("text_ops")
    ),
    index("Holding_security_id_idx").using(
      "btree",
      table.securityId.asc().nullsLast().op("text_ops")
    ),
    index("Holding_household_member_id_security_id_idx").using(
      "btree",
      table.householdMemberId.asc().nullsLast().op("text_ops"),
      table.securityId.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.accountId],
      foreignColumns: [account.accountId],
      name: "Holding_account_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
    foreignKey({
      columns: [table.securityId],
      foreignColumns: [security.securityId],
      name: "Holding_security_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
    foreignKey({
      columns: [table.householdMemberId],
      foreignColumns: [householdMember.householdMemberId],
      name: "Holding_household_member_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
  ]
);

/**
 * Holding relations - Links to security, account, and household member
 */
export const holdingRelations = relations(holding, ({ one }) => ({
  security: one(security, {
    fields: [holding.securityId],
    references: [security.securityId],
  }),
  account: one(account, {
    fields: [holding.accountId],
    references: [account.accountId],
  }),
  householdMember: one(householdMember, {
    fields: [holding.householdMemberId],
    references: [householdMember.householdMemberId],
  }),
}));
