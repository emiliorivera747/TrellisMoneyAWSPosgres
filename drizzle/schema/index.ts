// Export all tables and relations
export * from "./user";
export * from "./account";
export * from "./holding";
export * from "./household";
export * from "./item";
export * from "./profile";
export * from "./security";
export * from "./stripe";
export * from "./schema";

// Import tables for type inference
import { user } from "./user";
import {
  account,
  accountHistory,
  balance,
} from "./account";
import {
  holding,
  holdingHistory,
} from "./holding";
import {
  household,
  householdMember,
  householdRole,
} from "./household";
import {
  item,
  transactionStatus,
  webhookStatus,
  optionContract,
} from "./item";
import { profile } from "./profile";
import {
  security,
  securityHistory,
  owner,
} from "./security";
import {
  fixedIncome,
  subscription,
  price,
  product,
  subscriptionStatus,
  interval,
  usageType,
} from "./stripe";
import { prismaMigrations } from "./schema";

// Export User types
export type User = typeof user.$inferSelect;
export type UserInsert = typeof user.$inferInsert;

// Export Account types
export type Account = typeof account.$inferSelect;
export type AccountInsert = typeof account.$inferInsert;
export type AccountHistory = typeof accountHistory.$inferSelect;
export type AccountHistoryInsert = typeof accountHistory.$inferInsert;
export type Balance = typeof balance.$inferSelect;
export type BalanceInsert = typeof balance.$inferInsert;

// Export Holding types
export type Holding = typeof holding.$inferSelect;
export type HoldingInsert = typeof holding.$inferInsert;
export type HoldingHistory = typeof holdingHistory.$inferSelect;
export type HoldingHistoryInsert = typeof holdingHistory.$inferInsert;

// Export Household types
export type Household = typeof household.$inferSelect;
export type HouseholdInsert = typeof household.$inferInsert;
export type HouseholdMember = typeof householdMember.$inferSelect;
export type HouseholdMemberInsert = typeof householdMember.$inferInsert;

// Export Item types
export type Item = typeof item.$inferSelect;
export type ItemInsert = typeof item.$inferInsert;
export type TransactionStatus = typeof transactionStatus.$inferSelect;
export type TransactionStatusInsert = typeof transactionStatus.$inferInsert;
export type WebhookStatus = typeof webhookStatus.$inferSelect;
export type WebhookStatusInsert = typeof webhookStatus.$inferInsert;
export type OptionContract = typeof optionContract.$inferSelect;
export type OptionContractInsert = typeof optionContract.$inferInsert;

// Export Profile types
export type Profile = typeof profile.$inferSelect;
export type ProfileInsert = typeof profile.$inferInsert;

// Export Security types
export type Security = typeof security.$inferSelect;
export type SecurityInsert = typeof security.$inferInsert;
export type SecurityHistory = typeof securityHistory.$inferSelect;
export type SecurityHistoryInsert = typeof securityHistory.$inferInsert;
export type Owner = typeof owner.$inferSelect;
export type OwnerInsert = typeof owner.$inferInsert;

// Export Stripe types
export type FixedIncome = typeof fixedIncome.$inferSelect;
export type FixedIncomeInsert = typeof fixedIncome.$inferInsert;
export type Subscription = typeof subscription.$inferSelect;
export type SubscriptionInsert = typeof subscription.$inferInsert;
export type Price = typeof price.$inferSelect;
export type PriceInsert = typeof price.$inferInsert;
export type Product = typeof product.$inferSelect;
export type ProductInsert = typeof product.$inferInsert;

// Export Schema types
export type PrismaMigrations = typeof prismaMigrations.$inferSelect;
export type PrismaMigrationsInsert = typeof prismaMigrations.$inferInsert;

// Export Enum types
export type HouseholdRole = typeof householdRole.enumValues[number];
export type SubscriptionStatus = typeof subscriptionStatus.enumValues[number];
export type Interval = typeof interval.enumValues[number];
export type UsageType = typeof usageType.enumValues[number];
