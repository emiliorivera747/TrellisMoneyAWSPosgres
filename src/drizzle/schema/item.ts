import {
  pgTable,
  timestamp,
  text,
  serial,
  numeric,
  foreignKey,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";

import { household } from "@/src/drizzle/schema/household";
import { account } from "@/src/drizzle/schema/account";
import { user } from "@/src/drizzle/schema/user";

/**
 * Item schema - Represents a Plaid connection/item with access tokens and consent information
 */
export const item = pgTable(
  "Item",
  {
    itemId: text("item_id").primaryKey().notNull(),
    institutionId: text("institution_id").notNull(),
    institutionName: text("institution_name"),
    webhook: text(),
    authMethod: text("auth_method"),
    requestId: text("request_id").notNull(),
    updateType: text("update_type").notNull(),
    consentExpirationTime: text("consent_expiration_time").notNull(),
    createdAt: timestamp("created_at", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    availableProducts: text("available_products").array(),
    billedProducts: text("billed_products").array(),
    products: text().array(),
    error: text(),
    consentedProducts: text("consented_products").array(),
    consentedDataScopes: text("consented_data_scopes").array(),
    consentedUseCases: text("consented_use_cases").array(),
    accessToken: text("access_token").notNull(),
    userId: text("user_id").notNull(),
    householdId: text("household_id"),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.userId],
      name: "Item_user_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
    foreignKey({
      columns: [table.householdId],
      foreignColumns: [household.householdId],
      name: "Item_household_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
  ]
);

/**
 * TransactionStatus schema - Tracks last successful and failed transaction update timestamps
 */
export const transactionStatus = pgTable("TransactionStatus", {
  id: serial().primaryKey().notNull(),
  lastSuccessfulUpdate: timestamp("last_successful_update", {
    precision: 3,
    withTimezone: true,
    mode: "string",
  }).notNull(),
  lastFailedUpdate: timestamp("last_failed_update", {
    precision: 3,
    withTimezone: true,
    mode: "string",
  }).notNull(),
});

/**
 * WebhookStatus schema - Tracks webhook delivery status and codes
 */
export const webhookStatus = pgTable("WebhookStatus", {
  id: serial().primaryKey().notNull(),
  sentAt: timestamp("sent_at", {
    precision: 3,
    withTimezone: true,
    mode: "string",
  }).notNull(),
  codeSent: text("code_sent").notNull(),
});

/**
 * OptionContract schema - Stores option contract details (type, expiration, strike price)
 */
export const optionContract = pgTable("OptionContract", {
  id: serial().primaryKey().notNull(),
  contractType: text("contract_type").notNull(),
  expirationDate: text("expiration_date").notNull(),
  strikePrice: numeric("strike_price", { precision: 65, scale: 30 }).notNull(),
  underlyingSecurityTicker: text("underlying_security_ticker").notNull(),
});

/**
 * Item relations - Links to user, household, and associated accounts
 */
export const itemRelations = relations(item, ({ one, many }) => ({
  accounts: many(account),
  user: one(user, {
    fields: [item.userId],
    references: [user.userId],
  }),
  household: one(household, {
    fields: [item.householdId],
    references: [household.householdId],
  }),
}));
