import {
  pgTable,
  timestamp,
  text,
  date,
  numeric,
  boolean,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { holding } from "@/drizzle/schema";

/**
 * Security schema - Represents financial securities (stocks, bonds, etc.) with pricing and metadata
 */
export const security = pgTable("Security", {
  securityId: text("security_id").primaryKey().notNull(),
  institutionId: text("institution_id"),
  proxySecurityId: text("proxy_security_id"),
  securityName: text("security_name"),
  tickerSymbol: text("ticker_symbol"),
  isCashEquivalent: boolean("is_cash_equivalent"),
  type: text("type"),
  closePrice: numeric("close_price", { precision: 20, scale: 8 }),
  closePriceAsOf: date("close_price_as_of"),
  updateDatetime: timestamp("update_datetime", {
    precision: 3,
    withTimezone: true,
    mode: "string",
  }),
  isoCurrencyCode: text("iso_currency_code"),
  sector: text("sector"),
  industry: text("industry"),
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
});

/**
 * Security relations - Links to holdings
 */
export const securityRelations = relations(security, ({ many }) => ({
  holdings: many(holding),
}));
