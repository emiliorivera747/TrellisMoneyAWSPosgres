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
  bigint,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { security } from "@/src/drizzle/schema/security";
import { user } from "@/src/drizzle/schema/user";

/**
 * SubscriptionStatus enum - Possible subscription states in Stripe
 */
export const subscriptionStatus = pgEnum("SubscriptionStatus", [
  "incomplete",
  "incomplete_expired",
  "trialing",
  "active",
  "past_due",
  "canceled",
  "unpaid",
  "paused",
]);
/**
 * Interval enum - Billing interval types for subscriptions
 */
export const interval = pgEnum("Interval", ["day", "week", "month", "year"]);
/**
 * UsageType enum - Usage tracking types for subscriptions
 */
export const usageType = pgEnum("UsageType", ["metered", "licensed"]);

/**
 * FixedIncome schema - Fixed income security details (yield rates, maturity dates)
 */
export const fixedIncome = pgTable(
  "FixedIncome",
  {
    id: serial().primaryKey().notNull(),
    yieldRatePercentage: numeric("yield_rate_percentage", {
      precision: 65,
      scale: 30,
    }),
    yieldRateType: text("yield_rate_type"),
    maturityDate: text("maturity_date"),
    issueDate: text("issue_date"),
    faceValue: numeric("face_value", { precision: 65, scale: 30 }),
    securityId: text().notNull(),
  },
  (table) => [
    uniqueIndex("FixedIncome_securityId_key").using(
      "btree",
      table.securityId.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.securityId],
      foreignColumns: [security.securityId],
      name: "FixedIncome_securityId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
  ]
);

/**
 * FixedIncome relations - Links to parent security
 */
export const fixedIncomeRelations = relations(fixedIncome, ({ one }) => ({
  security: one(security, {
    fields: [fixedIncome.securityId],
    references: [security.securityId],
  }),
}));

/**
 * Subscription schema - Stripe subscription information linked to users
 */
export const subscription = pgTable(
  "Subscription",
  {
    subscriptionId: text("subscription_id").primaryKey().notNull(),
    userId: text("user_id").notNull(),
    customerId: text("customer_id").notNull(),
    priceId: text("price_id"),
    status: subscriptionStatus().default("incomplete").notNull(),
    startDate: integer("start_date"),
    trialStart: integer("trial_start"),
    trialEnd: integer("trial_end"),
    endedAt: integer("ended_at"),
    cancelAt: integer("cancel_at"),
    cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false).notNull(),
    createdAt: integer("created_at"),
    updatedAt: integer("updated_at"),
    canceledAt: integer("canceled_at"),
  },
  (table) => [
    uniqueIndex("Subscription_user_id_key").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.userId],
      name: "Subscription_user_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.priceId],
      foreignColumns: [price.priceId],
      name: "Subscription_price_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
  ]
);

/**
 * Subscription relations - Links to user and price
 */
export const subscriptionRelations = relations(subscription, ({ one }) => ({
  user: one(user, {
    fields: [subscription.userId],
    references: [user.userId],
  }),
  price: one(price, {
    fields: [subscription.priceId],
    references: [price.priceId],
  }),
}));

/**
 * Price schema - Stripe price information linked to products
 */
export const price = pgTable(
  "Price",
  {
    priceId: text("price_id").primaryKey().notNull(),
    productId: text("product_id").notNull(),
    currency: text().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    unitAmount: bigint("unit_amount", { mode: "number" }).notNull(),
    recurringInterval: interval("recurring_interval"),
    recurringIntervalCount: integer("recurring_interval_count").default(1),
    recurringUsageType: usageType("recurring_usage_type")
      .default("licensed")
      .notNull(),
    active: boolean().default(false).notNull(),
    createdAt: timestamp("created_at", { precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 3,
      mode: "string",
    }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.productId],
      foreignColumns: [product.productId],
      name: "Price_product_id_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
  ]
);

/**
 * Price relations - Links to product and subscriptions
 */
export const priceRelations = relations(price, ({ one, many }) => ({
  subscriptions: many(subscription),
  product: one(product, {
    fields: [price.productId],
    references: [product.productId],
  }),
}));

/**
 * Product schema - Stripe product information
 */
export const product = pgTable("Product", {
  productId: text("product_id").primaryKey().notNull(),
  name: text().notNull(),
  description: text(),
  active: boolean().default(true).notNull(),
  createdAt: timestamp("created_at", { precision: 3, mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", {
    precision: 3,
    mode: "string",
  }).notNull(),
});

/**
 * Product relations - Links to associated prices
 */
export const productRelations = relations(product, ({ many }) => ({
  prices: many(price),
}));
