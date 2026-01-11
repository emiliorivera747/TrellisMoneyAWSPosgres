import { relations } from "drizzle-orm/relations";
import { balance, account, user, household, item, accountHistory, security, fixedIncome, subscription, price, product, profile, householdMember, holding, holdingHistory, securityHistory } from "@/src/drizzle/schema/schema";

export const accountRelations = relations(account, ({one, many}) => ({
	balance: one(balance, {
		fields: [account.balanceId],
		references: [balance.balanceId]
	}),
	user: one(user, {
		fields: [account.userId],
		references: [user.userId]
	}),
	household: one(household, {
		fields: [account.householdId],
		references: [household.householdId]
	}),
	item: one(item, {
		fields: [account.itemId],
		references: [item.itemId]
	}),
	accountHistories: many(accountHistory),
	holdings: many(holding),
}));

export const balanceRelations = relations(balance, ({many}) => ({
	accounts: many(account),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	items: many(item),
	securities: many(security),
	subscriptions: many(subscription),
	profiles: many(profile),
	householdMembers: many(householdMember),
	holdings: many(holding),
}));

export const householdRelations = relations(household, ({many}) => ({
	accounts: many(account),
	items: many(item),
	householdMembers: many(householdMember),
}));

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

export const accountHistoryRelations = relations(accountHistory, ({one}) => ({
	account: one(account, {
		fields: [accountHistory.accountId],
		references: [account.accountId]
	}),
}));

export const securityRelations = relations(security, ({one, many}) => ({
	user: one(user, {
		fields: [security.userId],
		references: [user.userId]
	}),
	fixedIncomes: many(fixedIncome),
	securityHistories: many(securityHistory),
	holdings: many(holding),
}));

export const fixedIncomeRelations = relations(fixedIncome, ({one}) => ({
	security: one(security, {
		fields: [fixedIncome.securityId],
		references: [security.securityId]
	}),
}));

export const subscriptionRelations = relations(subscription, ({one}) => ({
	user: one(user, {
		fields: [subscription.userId],
		references: [user.userId]
	}),
	price: one(price, {
		fields: [subscription.priceId],
		references: [price.priceId]
	}),
}));

export const priceRelations = relations(price, ({one, many}) => ({
	subscriptions: many(subscription),
	product: one(product, {
		fields: [price.productId],
		references: [product.productId]
	}),
}));

export const productRelations = relations(product, ({many}) => ({
	prices: many(price),
}));

export const profileRelations = relations(profile, ({one}) => ({
	user: one(user, {
		fields: [profile.userId],
		references: [user.userId]
	}),
}));

export const householdMemberRelations = relations(householdMember, ({one}) => ({
	household: one(household, {
		fields: [householdMember.householdId],
		references: [household.householdId]
	}),
	user: one(user, {
		fields: [householdMember.userId],
		references: [user.userId]
	}),
}));

export const holdingHistoryRelations = relations(holdingHistory, ({one}) => ({
	holding: one(holding, {
		fields: [
		  holdingHistory.accountId,
		  holdingHistory.securityId,
		  holdingHistory.userId,
		],
		references: [
		  holding.accountId,
		  holding.securityId,
		  holding.userId,
		],
	  }),
}));

export const holdingRelations = relations(holding, ({one, many}) => ({
	holdingHistories: many(holdingHistory),
	security: one(security, {
		fields: [holding.securityId],
		references: [security.securityId]
	}),
	user: one(user, {
		fields: [holding.userId],
		references: [user.userId]
	}),
	account: one(account, {
		fields: [holding.accountId],
		references: [account.accountId]
	}),
}));

export const securityHistoryRelations = relations(securityHistory, ({one}) => ({
	security: one(security, {
		fields: [securityHistory.securityId],
		references: [security.securityId]
	}),
}));