import {
  pgTable,
  timestamp,
  text,
  integer,
  serial,
  numeric,
  uniqueIndex,
  boolean,
  foreignKey,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";

import { user } from "@/src/drizzle/schema/user";
import { holding } from "@/src/drizzle/schema/holding";
import { fixedIncome } from "@/src/drizzle/schema/stripe";

export const security = pgTable(
  "Security",
  {
    securityId: text("security_id").notNull(),
    isin: text(),
    cusip: text(),
    sedol: text(),
    institutionSecurityId: text("institution_security_id"),
    institutionId: text("institution_id"),
    proxySecurityId: text("proxy_security_id"),
    name: text(),
    tickerSymbol: text("ticker_symbol"),
    isCashEquivalent: boolean("is_cash_equivalent"),
    type: text(),
    closePrice: numeric("close_price", { precision: 65, scale: 30 }),
    closePriceAsOf: timestamp("close_price_as_of", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    }),
    updateDatetime: timestamp("update_datetime", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    }),
    isoCurrencyCode: text("iso_currency_code"),
    unofficialCurrencyCode: text("unofficial_currency_code"),
    marketIdentifierCode: text("market_identifier_code"),
    sector: text(),
    industry: text(),
    optionContractId: integer("option_contract_id"),
    userId: text("user_id").notNull(),
    timestamp: timestamp({
      precision: 3,
      withTimezone: true,
      mode: "string",
    }).default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.userId],
      name: "Security_user_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
  ]
);

export const securityHistory = pgTable(
  "SecurityHistory",
  {
    id: serial().primaryKey().notNull(),
    isin: text(),
    cusip: text(),
    sedol: text(),
    institutionSecurityId: text("institution_security_id"),
    institutionId: text("institution_id"),
    proxySecurityId: text("proxy_security_id"),
    name: text(),
    tickerSymbol: text("ticker_symbol"),
    isCashEquivalent: boolean("is_cash_equivalent"),
    type: text(),
    closePrice: numeric("close_price", { precision: 65, scale: 30 }),
    closePriceAsOf: timestamp("close_price_as_of", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    }),
    updateDatetime: timestamp("update_datetime", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    }),
    isoCurrencyCode: text("iso_currency_code"),
    unofficialCurrencyCode: text("unofficial_currency_code"),
    marketIdentifierCode: text("market_identifier_code"),
    sector: text(),
    industry: text(),
    optionContractId: integer("option_contract_id"),
    timestamp: timestamp({ precision: 3, withTimezone: true, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    securityId: text("security_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.securityId],
      foreignColumns: [security.securityId],
      name: "SecurityHistory_security_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
  ]
);

export const owner = pgTable(
  "Owner",
  {
    ownerId: text("owner_id").notNull(),
    name: text(),
    phoneNumber: text("phone_number"),
    phoneType: text("phone_type"),
    phonePrimary: boolean("phone_primary"),
    email: text().notNull(),
    emailType: text("email_type"),
    emailPrimary: boolean("email_primary"),
    street: text(),
    region: text(),
    address: text(),
    city: text(),
    state: text(),
    postalCode: text("postal_code"),
    country: text(),
    addressPrimary: boolean("address_primary"),
    accountId: text().notNull(),
    timestamp: timestamp({ precision: 3, mode: "string" }).default(
      sql`CURRENT_TIMESTAMP`
    ),
  },
  (table) => [
    uniqueIndex("Owner_owner_id_key").using(
      "btree",
      table.ownerId.asc().nullsLast().op("text_ops")
    ),
  ]
);

export const securityRelations = relations(security, ({ one, many }) => ({
  user: one(user, {
    fields: [security.userId],
    references: [user.userId],
  }),
  fixedIncomes: many(fixedIncome),
  securityHistories: many(securityHistory),
  holdings: many(holding),
}));

export const securityHistoryRelations = relations(
  securityHistory,
  ({ one }) => ({
    security: one(security, {
      fields: [securityHistory.securityId],
      references: [security.securityId],
    }),
  })
);
