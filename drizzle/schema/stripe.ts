import {
  pgTable,
  timestamp,
  text,
  varchar,
  integer,
  boolean,
  foreignKey,
  bigint,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";

import { user } from "@/drizzle/schema";

/**
 * SubscriptionStatus enum - Possible subscription states in Stripe
 */
export const subscriptionStatus = pgEnum("SubscriptionStatus", [
  "INCOMPLETE",
  "INCOMPLETE_EXPIRED",
  "TRIALING",
  "ACTIVE",
  "PAST_DUE",
  "CANCELED",
  "UNPAID",
  "PAUSED",
]);

/**
 * RecurringInterval enum - Billing interval types for subscriptions
 */
export const recurringInterval = pgEnum("RecurringInterval", [
  "DAY",
  "WEEK",
  "MONTH",
  "YEAR",
]);

/**
 * UsageType enum - Usage tracking types for subscriptions
 */
export const usageType = pgEnum("UsageType", ["METERED", "LICENSED"]);

/**
 * Subscription schema - Stripe subscription information linked to users
 */
export const subscription = pgTable(
  "Subscription",
  {
    subscriptionId: text("subscription_id").primaryKey().notNull(),
    status: subscriptionStatus().default("INCOMPLETE").notNull(),
    startDate: timestamp("start_date", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    }),
    trialStart: timestamp("trial_start", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    }),
    trialEnd: timestamp("trial_end", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    }),
    endedAt: timestamp("ended_at", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    }),
    cancelAt: timestamp("cancel_at", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    }),
    canceledAt: timestamp("canceled_at", {
      precision: 3,
      withTimezone: true,
      mode: "string",
    }),
    cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false),
    stripeCustomerId: text("stripe_customer_id"),
    userId: text("user_id").notNull(),
    priceId: text("price_id").notNull(),
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
    index("Subscription_user_id_idx").using(
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
      .onDelete("restrict"),
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
    currency: varchar("currency", { length: 3 }).notNull(),
    unitAmount: bigint("unit_amount", { mode: "number" }).notNull(),
    recurringInterval: recurringInterval("recurring_interval"),
    recurringIntervalCount: integer("recurring_interval_count").default(1),
    recurringUsageType: usageType("recurring_usage_type")
      .default("LICENSED")
      .notNull(),
    active: boolean().default(false),
    productId: text("product_id").notNull(),
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
    index("Price_product_id_idx").using(
      "btree",
      table.productId.asc().nullsLast().op("text_ops")
    ),
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
  productName: text("product_name").notNull(),
  description: text(),
  active: boolean().default(true),
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
 * Product relations - Links to associated prices
 */
export const productRelations = relations(product, ({ many }) => ({
  prices: many(price),
}));
