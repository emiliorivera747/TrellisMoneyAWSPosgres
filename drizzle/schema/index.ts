// Export all tables and relations
export * from "./user";
export * from "./account";
export * from "./holding";
export * from "./household";
export * from "./item";
export * from "./profile";
export * from "./security";
export * from "./stripe";
export * from "./net-worth";

// Import tables for type inference
import { user } from "./user";
import { account, accountType, accountVerificationStatus } from "./account";
import { holding } from "./holding";
import { household, householdMember, householdRole } from "./household";
import { item, itemStatus } from "./item";
import { profile } from "./profile";
import { security } from "./security";
import {
  subscription,
  price,
  product,
  subscriptionStatus,
  recurringInterval,
  usageType,
} from "./stripe";
import { netWorthSnapshot } from "./net-worth";

// Export User types
/**
 * Represents a user record from the database.
 * @export
 * @typedef {typeof user.$inferSelect} User
 */
export type User = typeof user.$inferSelect;

/**
 * Represents data for inserting a new user record.
 * @export
 * @typedef {typeof user.$inferInsert} UserInsert
 */
export type UserInsert = typeof user.$inferInsert;

// Export Account types
/**
 * Represents an account record from the database.
 * @export
 * @typedef {typeof account.$inferSelect} Account
 */
export type Account = typeof account.$inferSelect;

/**
 * Represents data for inserting a new account record.
 * @export
 * @typedef {typeof account.$inferInsert} AccountInsert
 */
export type AccountInsert = typeof account.$inferInsert;

// Export Holding types
/**
 * Represents a holding record from the database.
 * @export
 * @typedef {typeof holding.$inferSelect} Holding
 */
export type Holding = typeof holding.$inferSelect;

/**
 * Represents data for inserting a new holding record.
 * @export
 * @typedef {typeof holding.$inferInsert} HoldingInsert
 */
export type HoldingInsert = typeof holding.$inferInsert;

// Export Household types
/**
 * Represents a household record from the database.
 * @export
 * @typedef {typeof household.$inferSelect} Household
 */
export type Household = typeof household.$inferSelect;

/**
 * Represents data for inserting a new household record.
 * @export
 * @typedef {typeof household.$inferInsert} HouseholdInsert
 */
export type HouseholdInsert = typeof household.$inferInsert;

/**
 * Represents a household member record from the database.
 * @export
 * @typedef {typeof householdMember.$inferSelect} HouseholdMember
 */
export type HouseholdMember = typeof householdMember.$inferSelect;

/**
 * Represents data for inserting a new household member record.
 * @export
 * @typedef {typeof householdMember.$inferInsert} HouseholdMemberInsert
 */
export type HouseholdMemberInsert = typeof householdMember.$inferInsert;

// Export Item types
/**
 * Represents an item record from the database.
 * @export
 * @typedef {typeof item.$inferSelect} Item
 */
export type Item = typeof item.$inferSelect;

/**
 * Represents data for inserting a new item record.
 * @export
 * @typedef {typeof item.$inferInsert} ItemInsert
 */
export type ItemInsert = typeof item.$inferInsert;

/**
 * Represents an item status record from the database.
 * @export
 * @typedef {typeof itemStatus.$inferSelect} ItemStatus
 */
export type ItemStatus = typeof itemStatus.$inferSelect;

/**
 * Represents data for inserting a new item status record.
 * @export
 * @typedef {typeof itemStatus.$inferInsert} ItemStatusInsert
 */
export type ItemStatusInsert = typeof itemStatus.$inferInsert;

// Export Profile types
/**
 * Represents a profile record from the database.
 * @export
 * @typedef {typeof profile.$inferSelect} Profile
 */
export type Profile = typeof profile.$inferSelect;

/**
 * Represents data for inserting a new profile record.
 * @export
 * @typedef {typeof profile.$inferInsert} ProfileInsert
 */
export type ProfileInsert = typeof profile.$inferInsert;

// Export Security types
/**
 * Represents a security record from the database.
 * @export
 * @typedef {typeof security.$inferSelect} Security
 */
export type Security = typeof security.$inferSelect;

/**
 * Represents data for inserting a new security record.
 * @export
 * @typedef {typeof security.$inferInsert} SecurityInsert
 */
export type SecurityInsert = typeof security.$inferInsert;

// Export Stripe types
/**
 * Represents a subscription record from the database.
 * @export
 * @typedef {typeof subscription.$inferSelect} Subscription
 */
export type Subscription = typeof subscription.$inferSelect;

/**
 * Represents data for inserting a new subscription record.
 * @export
 * @typedef {typeof subscription.$inferInsert} SubscriptionInsert
 */
export type SubscriptionInsert = typeof subscription.$inferInsert;

/**
 * Represents a price record from the database.
 * @export
 * @typedef {typeof price.$inferSelect} Price
 */
export type Price = typeof price.$inferSelect;

/**
 * Represents data for inserting a new price record.
 * @export
 * @typedef {typeof price.$inferInsert} PriceInsert
 */
export type PriceInsert = typeof price.$inferInsert;

/**
 * Represents a product record from the database.
 * @export
 * @typedef {typeof product.$inferSelect} Product
 */
export type Product = typeof product.$inferSelect;

/**
 * Represents data for inserting a new product record.
 * @export
 * @typedef {typeof product.$inferInsert} ProductInsert
 */
export type ProductInsert = typeof product.$inferInsert;

// Export Net Worth types
/**
 * Represents a net worth snapshot record from the database.
 * @export
 * @typedef {typeof netWorthSnapshot.$inferSelect} NetWorthSnapshot
 */
export type NetWorthSnapshot = typeof netWorthSnapshot.$inferSelect;

/**
 * Represents data for inserting a new net worth snapshot record.
 * @export
 * @typedef {typeof netWorthSnapshot.$inferInsert} NetWorthSnapshotInsert
 */
export type NetWorthSnapshotInsert = typeof netWorthSnapshot.$inferInsert;

// Export Enum types
/**
 * Represents the role of a household member.
 * @export
 * @typedef {(typeof householdRole.enumValues)[number]} HouseholdRole
 */
export type HouseholdRole = (typeof householdRole.enumValues)[number];

/**
 * Represents the status of a subscription.
 * @export
 * @typedef {(typeof subscriptionStatus.enumValues)[number]} SubscriptionStatus
 */
export type SubscriptionStatus = (typeof subscriptionStatus.enumValues)[number];

/**
 * Represents the recurring interval for a subscription.
 * @export
 * @typedef {(typeof recurringInterval.enumValues)[number]} RecurringInterval
 */
export type RecurringInterval = (typeof recurringInterval.enumValues)[number];

/**
 * Represents the usage type for a subscription.
 * @export
 * @typedef {(typeof usageType.enumValues)[number]} UsageType
 */
export type UsageType = (typeof usageType.enumValues)[number];

/**
 * Represents the type of an account.
 * @export
 * @typedef {(typeof accountType.enumValues)[number]} AccountType
 */
export type AccountType = (typeof accountType.enumValues)[number];

/**
 * Represents the verification status of an account.
 * @export
 * @typedef {(typeof accountVerificationStatus.enumValues)[number]} AccountVerificationStatus
 */
export type AccountVerificationStatus =
  (typeof accountVerificationStatus.enumValues)[number];
