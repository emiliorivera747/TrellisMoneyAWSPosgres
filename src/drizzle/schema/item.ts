import { pgTable, varchar, timestamp, text, integer, serial, numeric, uniqueIndex, boolean, foreignKey, bigint, index, primaryKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { relations } from "drizzle-orm";


export const item = pgTable("Item", {
	itemId: text("item_id").primaryKey().notNull(),
	institutionId: text("institution_id").notNull(),
	institutionName: text("institution_name"),
	webhook: text(),
	authMethod: text("auth_method"),
	requestId: text("request_id").notNull(),
	updateType: text("update_type").notNull(),
	consentExpirationTime: text("consent_expiration_time").notNull(),
	createdAt: timestamp("created_at", { precision: 3, withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
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
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.userId],
			name: "Item_user_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.householdId],
			foreignColumns: [household.householdId],
			name: "Item_household_id_fkey"
		}).onUpdate("cascade").onDelete("set null"),
]);

export const transactionStatus = pgTable("TransactionStatus", {
	id: serial().primaryKey().notNull(),
	lastSuccessfulUpdate: timestamp("last_successful_update", { precision: 3, withTimezone: true, mode: 'string' }).notNull(),
	lastFailedUpdate: timestamp("last_failed_update", { precision: 3, withTimezone: true, mode: 'string' }).notNull(),
});

export const webhookStatus = pgTable("WebhookStatus", {
	id: serial().primaryKey().notNull(),
	sentAt: timestamp("sent_at", { precision: 3, withTimezone: true, mode: 'string' }).notNull(),
	codeSent: text("code_sent").notNull(),
});

export const optionContract = pgTable("OptionContract", {
	id: serial().primaryKey().notNull(),
	contractType: text("contract_type").notNull(),
	expirationDate: text("expiration_date").notNull(),
	strikePrice: numeric("strike_price", { precision: 65, scale:  30 }).notNull(),
	underlyingSecurityTicker: text("underlying_security_ticker").notNull(),
});


export const itemRelations = relations(item, ({one, many}) => ({
	accounts: many(account),
	user: one(user, {
		fields: [item.userId],
		references: [user.userId]
	}),
	household: one(household, {
		fields: [item.householdId],
		references: [household.householdId]
	}),
}));