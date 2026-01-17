// Export all tables and relations
export * from "./user";
export * from "./account";
export * from "./holding";
export * from "./household";
export * from "./item";
export * from "./profile";
export * from "./security";
export * from "./stripe";

// Import tables for type inference
import { user } from "./user";
import {
  account,
  accountType,
  accountVerificationStatus,
} from "./account";
import { holding } from "./holding";
import {
  household,
  householdMember,
  householdRole,
} from "./household";
import {
  item,
  itemStatus,
} from "./item";
import { profile } from "./profile";
import {
  security,
  securityType,
} from "./security";
import {
  subscription,
  price,
  product,
  subscriptionStatus,
  recurringInterval,
  usageType,
} from "./stripe";

// Export User types
export type User = typeof user.$inferSelect;
export type UserInsert = typeof user.$inferInsert;

// Export Account types
export type Account = typeof account.$inferSelect;
export type AccountInsert = typeof account.$inferInsert;

// Export Holding types
export type Holding = typeof holding.$inferSelect;
export type HoldingInsert = typeof holding.$inferInsert;

// Export Household types
export type Household = typeof household.$inferSelect;
export type HouseholdInsert = typeof household.$inferInsert;
export type HouseholdMember = typeof householdMember.$inferSelect;
export type HouseholdMemberInsert = typeof householdMember.$inferInsert;

// Export Item types
export type Item = typeof item.$inferSelect;
export type ItemInsert = typeof item.$inferInsert;
export type ItemStatus = typeof itemStatus.$inferSelect;
export type ItemStatusInsert = typeof itemStatus.$inferInsert;

// Export Profile types
export type Profile = typeof profile.$inferSelect;
export type ProfileInsert = typeof profile.$inferInsert;

// Export Security types
export type Security = typeof security.$inferSelect;
export type SecurityInsert = typeof security.$inferInsert;

// Export Stripe types
export type Subscription = typeof subscription.$inferSelect;
export type SubscriptionInsert = typeof subscription.$inferInsert;
export type Price = typeof price.$inferSelect;
export type PriceInsert = typeof price.$inferInsert;
export type Product = typeof product.$inferSelect;
export type ProductInsert = typeof product.$inferInsert;


// Export Enum types
export type HouseholdRole = typeof householdRole.enumValues[number];
export type SubscriptionStatus = typeof subscriptionStatus.enumValues[number];
export type RecurringInterval = typeof recurringInterval.enumValues[number];
export type UsageType = typeof usageType.enumValues[number];
export type AccountType = typeof accountType.enumValues[number];
export type AccountVerificationStatus =
  typeof accountVerificationStatus.enumValues[number];
export type SecurityType = typeof securityType.enumValues[number];
