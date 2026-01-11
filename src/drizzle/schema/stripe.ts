import { pgTable, varchar, timestamp, text, integer, serial, numeric, uniqueIndex, boolean, foreignKey, bigint, index, primaryKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { relations } from "drizzle-orm";


export const subscriptionStatus = pgEnum("SubscriptionStatus", ['incomplete', 'incomplete_expired', 'trialing', 'active', 'past_due', 'canceled', 'unpaid', 'paused'])
export const interval = pgEnum("Interval", ['day', 'week', 'month', 'year'])
export const usageType = pgEnum("UsageType", ['metered', 'licensed'])

export const fixedIncome = pgTable("FixedIncome", {
	id: serial().primaryKey().notNull(),
	yieldRatePercentage: numeric("yield_rate_percentage", { precision: 65, scale:  30 }),
	yieldRateType: text("yield_rate_type"),
	maturityDate: text("maturity_date"),
	issueDate: text("issue_date"),
	faceValue: numeric("face_value", { precision: 65, scale:  30 }),
	securityId: text().notNull(),
}, (table) => [
	uniqueIndex("FixedIncome_securityId_key").using("btree", table.securityId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.securityId],
			foreignColumns: [security.securityId],
			name: "FixedIncome_securityId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const subscription = pgTable("Subscription", {
	subscriptionId: text("subscription_id").primaryKey().notNull(),
	userId: text("user_id").notNull(),
	customerId: text("customer_id").notNull(),
	priceId: text("price_id"),
	status: subscriptionStatus().default('incomplete').notNull(),
	startDate: integer("start_date"),
	trialStart: integer("trial_start"),
	trialEnd: integer("trial_end"),
	endedAt: integer("ended_at"),
	cancelAt: integer("cancel_at"),
	cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false).notNull(),
	createdAt: integer("created_at"),
	updatedAt: integer("updated_at"),
	canceledAt: integer("canceled_at"),
}, (table) => [
	uniqueIndex("Subscription_user_id_key").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.userId],
			name: "Subscription_user_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.priceId],
			foreignColumns: [price.priceId],
			name: "Subscription_price_id_fkey"
		}).onUpdate("cascade").onDelete("set null"),
]);

export const price = pgTable("Price", {
	priceId: text("price_id").primaryKey().notNull(),
	productId: text("product_id").notNull(),
	currency: text().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	unitAmount: bigint("unit_amount", { mode: "number" }).notNull(),
	recurringInterval: interval("recurring_interval"),
	recurringIntervalCount: integer("recurring_interval_count").default(1),
	recurringUsageType: usageType("recurring_usage_type").default('licensed').notNull(),
	active: boolean().default(false).notNull(),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.productId],
			foreignColumns: [product.productId],
			name: "Price_product_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const product = pgTable("Product", {
	productId: text("product_id").primaryKey().notNull(),
	name: text().notNull(),
	description: text(),
	active: boolean().default(true).notNull(),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).notNull(),
});