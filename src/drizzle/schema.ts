import { pgTable, varchar, timestamp, text, integer, serial, numeric, uniqueIndex, boolean, foreignKey, bigint, index, primaryKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const householdRole = pgEnum("HouseholdRole", ['ADMIN', 'MEMBER', 'GUEST'])
export const interval = pgEnum("Interval", ['day', 'week', 'month', 'year'])
export const subscriptionStatus = pgEnum("SubscriptionStatus", ['incomplete', 'incomplete_expired', 'trialing', 'active', 'past_due', 'canceled', 'unpaid', 'paused'])
export const usageType = pgEnum("UsageType", ['metered', 'licensed'])


export const prismaMigrations = pgTable("_prisma_migrations", {
	id: varchar({ length: 36 }).primaryKey().notNull(),
	checksum: varchar({ length: 64 }).notNull(),
	finishedAt: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
	migrationName: varchar("migration_name", { length: 255 }).notNull(),
	logs: text(),
	rolledBackAt: timestamp("rolled_back_at", { withTimezone: true, mode: 'string' }),
	startedAt: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

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

export const owner = pgTable("Owner", {
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
	timestamp: timestamp({ precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	uniqueIndex("Owner_owner_id_key").using("btree", table.ownerId.asc().nullsLast().op("text_ops")),
]);

export const balance = pgTable("Balance", {
	balanceId: text("balance_id").notNull(),
	available: numeric({ precision: 65, scale:  30 }).notNull(),
	current: numeric({ precision: 65, scale:  30 }).notNull(),
	limit: numeric({ precision: 65, scale:  30 }).notNull(),
	isoCurrencyCode: text("iso_currency_code").notNull(),
	unofficialCurrencyCode: text("unofficial_currency_code"),
	lastUpdated: timestamp("last_updated", { precision: 3, withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { precision: 3, withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	timestamp: timestamp({ precision: 3, withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
});

export const account = pgTable("Account", {
	accountId: text("account_id").notNull(),
	name: text(),
	type: text(),
	available: numeric({ precision: 65, scale:  30 }),
	current: numeric({ precision: 65, scale:  30 }),
	limit: numeric({ precision: 65, scale:  30 }),
	isoCurrencyCode: text("iso_currency_code"),
	unofficialCurrencyCode: text("unofficial_currency_code"),
	mask: text(),
	officialName: text("official_name"),
	subtype: text(),
	verificationStatus: text("verification_status"),
	persistentAccountId: text("persistent_account_id"),
	annualReturnRate: numeric("annual_return_rate", { precision: 65, scale:  30 }).default('0.00'),
	holderCategory: text("holder_category"),
	balanceId: text("balance_id").notNull(),
	userId: text("user_id").notNull(),
	timestamp: timestamp({ precision: 3, withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	householdId: text("household_id"),
	itemId: text("item_id").notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	createdAt: timestamp("created_at", { precision: 3, withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	uniqueIndex("Account_balance_id_key").using("btree", table.balanceId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.balanceId],
			foreignColumns: [balance.balanceId],
			name: "Account_balance_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.userId],
			name: "Account_user_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.householdId],
			foreignColumns: [household.householdId],
			name: "Account_household_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.itemId],
			foreignColumns: [item.itemId],
			name: "Account_item_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const user = pgTable("User", {
	userId: text("user_id").primaryKey().notNull(),
	email: text().notNull(),
	name: text(),
	emailVerified: boolean("email_verified").default(false),
	phoneVerified: boolean("phone_verified").default(false),
	phone: text(),
	customerId: text("customer_id"),
	createdAt: timestamp("created_at", { precision: 3, withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	uniqueIndex("User_customer_id_key").using("btree", table.customerId.asc().nullsLast().op("text_ops")),
	uniqueIndex("User_email_key").using("btree", table.email.asc().nullsLast().op("text_ops")),
]);

export const household = pgTable("Household", {
	householdId: text("household_id").primaryKey().notNull(),
	name: text().default('Our Household').notNull(),
	createdAt: timestamp("created_at", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, mode: 'string' }).notNull(),
});

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

export const accountHistory = pgTable("AccountHistory", {
	id: serial().primaryKey().notNull(),
	accountId: text("account_id").notNull(),
	name: text().notNull(),
	type: text().notNull(),
	available: numeric({ precision: 65, scale:  30 }).notNull(),
	current: numeric({ precision: 65, scale:  30 }).notNull(),
	limit: numeric({ precision: 65, scale:  30 }).notNull(),
	isoCurrencyCode: text("iso_currency_code").notNull(),
	unofficialCurrencyCode: text("unofficial_currency_code").notNull(),
	userId: text("user_id"),
	timestamp: timestamp({ precision: 3, withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.accountId],
			foreignColumns: [account.accountId],
			name: "AccountHistory_account_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const security = pgTable("Security", {
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
	closePrice: numeric("close_price", { precision: 65, scale:  30 }),
	closePriceAsOf: timestamp("close_price_as_of", { precision: 3, withTimezone: true, mode: 'string' }),
	updateDatetime: timestamp("update_datetime", { precision: 3, withTimezone: true, mode: 'string' }),
	isoCurrencyCode: text("iso_currency_code"),
	unofficialCurrencyCode: text("unofficial_currency_code"),
	marketIdentifierCode: text("market_identifier_code"),
	sector: text(),
	industry: text(),
	optionContractId: integer("option_contract_id"),
	userId: text("user_id").notNull(),
	timestamp: timestamp({ precision: 3, withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.userId],
			name: "Security_user_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

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
	recurringInterval: interval("recurring_interval").notNull(),
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

export const profile = pgTable("Profile", {
	id: serial().primaryKey().notNull(),
	bio: text(),
	userId: text("user_id").notNull(),
}, (table) => [
	uniqueIndex("Profile_user_id_key").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.userId],
			name: "Profile_user_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const householdMember = pgTable("HouseholdMember", {
	memberId: text("member_id").primaryKey().notNull(),
	name: text().notNull(),
	role: householdRole().default('MEMBER').notNull(),
	dob: timestamp({ precision: 3, mode: 'string' }),
	invitedEmail: text("invited_email"),
	inviteStatus: text("invite_status").default('pending').notNull(),
	householdId: text("household_id").notNull(),
	userId: text("user_id"),
}, (table) => [
	index("HouseholdMember_household_id_idx").using("btree", table.householdId.asc().nullsLast().op("text_ops")),
	uniqueIndex("HouseholdMember_household_id_invited_email_key").using("btree", table.householdId.asc().nullsLast().op("text_ops"), table.invitedEmail.asc().nullsLast().op("text_ops")),
	uniqueIndex("HouseholdMember_household_id_user_id_key").using("btree", table.householdId.asc().nullsLast().op("text_ops"), table.userId.asc().nullsLast().op("text_ops")),
	index("HouseholdMember_user_id_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.householdId],
			foreignColumns: [household.householdId],
			name: "HouseholdMember_household_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.userId],
			name: "HouseholdMember_user_id_fkey"
		}).onUpdate("cascade").onDelete("set null"),
]);

export const holdingHistory = pgTable("HoldingHistory", {
	id: serial().primaryKey().notNull(),
	costBasis: numeric("cost_basis", { precision: 65, scale:  30 }).notNull(),
	institutionPrice: numeric("institution_price", { precision: 65, scale:  30 }).notNull(),
	annualReturnRate: numeric("annual_return_rate", { precision: 65, scale:  30 }).default('0.06'),
	institutionPriceAsOf: timestamp("institution_price_as_of", { precision: 3, withTimezone: true, mode: 'string' }).notNull(),
	institutionPriceDatetime: timestamp("institution_price_datetime", { precision: 3, withTimezone: true, mode: 'string' }),
	institutionValue: numeric("institution_value", { precision: 65, scale:  30 }).notNull(),
	isoCurrencyCode: text("iso_currency_code"),
	unofficialCurrencyCode: text("unofficial_currency_code"),
	vestedQuantity: numeric("vested_quantity", { precision: 65, scale:  30 }),
	vestedValue: numeric("vested_value", { precision: 65, scale:  30 }).notNull(),
	quantity: numeric({ precision: 65, scale:  30 }).notNull(),
	accountId: text("account_id").notNull(),
	securityId: text("security_id").notNull(),
	createdAt: timestamp("created_at", { precision: 3, withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	userId: text("user_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.accountId, table.securityId, table.userId],
			foreignColumns: [holding.accountId, holding.securityId, holding.userId],
			name: "HoldingHistory_security_id_user_id_account_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const securityHistory = pgTable("SecurityHistory", {
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
	closePrice: numeric("close_price", { precision: 65, scale:  30 }),
	closePriceAsOf: timestamp("close_price_as_of", { precision: 3, withTimezone: true, mode: 'string' }),
	updateDatetime: timestamp("update_datetime", { precision: 3, withTimezone: true, mode: 'string' }),
	isoCurrencyCode: text("iso_currency_code"),
	unofficialCurrencyCode: text("unofficial_currency_code"),
	marketIdentifierCode: text("market_identifier_code"),
	sector: text(),
	industry: text(),
	optionContractId: integer("option_contract_id"),
	timestamp: timestamp({ precision: 3, withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	securityId: text("security_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.securityId],
			foreignColumns: [security.securityId],
			name: "SecurityHistory_security_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const holding = pgTable("Holding", {
	costBasis: numeric("cost_basis", { precision: 65, scale:  30 }).notNull(),
	institutionPrice: numeric("institution_price", { precision: 65, scale:  30 }).notNull(),
	institutionPriceAsOf: timestamp("institution_price_as_of", { precision: 3, withTimezone: true, mode: 'string' }).notNull(),
	institutionPriceDatetime: timestamp("institution_price_datetime", { precision: 3, withTimezone: true, mode: 'string' }),
	institutionValue: numeric("institution_value", { precision: 65, scale:  30 }).notNull(),
	annualReturnRate: numeric("annual_return_rate", { precision: 65, scale:  30 }).default('0.06'),
	isoCurrencyCode: text("iso_currency_code").notNull(),
	unofficialCurrencyCode: text("unofficial_currency_code"),
	vestedQuantity: numeric("vested_quantity", { precision: 65, scale:  30 }),
	vestedValue: numeric("vested_value", { precision: 65, scale:  30 }).notNull(),
	quantity: numeric({ precision: 65, scale:  30 }).notNull(),
	accountId: text("account_id").notNull(),
	securityId: text("security_id").notNull(),
	timestamp: timestamp({ precision: 3, withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	userId: text("user_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.securityId],
			foreignColumns: [security.securityId],
			name: "Holding_security_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.userId],
			name: "Holding_user_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.accountId],
			foreignColumns: [account.accountId],
			name: "Holding_account_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.accountId, table.securityId, table.userId], name: "Holding_pkey"}),
]);
