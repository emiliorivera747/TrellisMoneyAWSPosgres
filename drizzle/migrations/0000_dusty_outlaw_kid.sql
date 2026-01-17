CREATE TYPE "public"."AccountType" AS ENUM('DEPOSITORY', 'CREDIT', 'LOAN', 'INVESTMENT', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."AccountVerificationStatus" AS ENUM('AUTOMATICALLY_VERIFIED', 'PENDING_MANUAL_VERIFICATION', 'DATABASE_INSIGHTS_PASS', 'FAILED');--> statement-breakpoint
CREATE TYPE "public"."HouseholdRole" AS ENUM('ADMIN', 'MEMBER', 'GUEST');--> statement-breakpoint
CREATE TYPE "public"."SecurityType" AS ENUM('CASH', 'CRYPTOCURRENCY', 'DERIVATIVE', 'EQUITY', 'ETF', 'FIXED', 'LOAN', 'MUTUAL', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."RecurringInterval" AS ENUM('DAY', 'WEEK', 'MONTH', 'YEAR');--> statement-breakpoint
CREATE TYPE "public"."SubscriptionStatus" AS ENUM('INCOMPLETE', 'INCOMPLETE_EXPIRED', 'TRIALING', 'ACTIVE', 'PAST_DUE', 'CANCELED', 'UNPAID', 'PAUSED');--> statement-breakpoint
CREATE TYPE "public"."UsageType" AS ENUM('METERED', 'LICENSED');--> statement-breakpoint
CREATE TABLE "Account" (
	"account_id" text PRIMARY KEY NOT NULL,
	"available_balance" numeric(28, 8),
	"current_balance" numeric(28, 8),
	"limit_amount" numeric(28, 8),
	"mask" varchar(4),
	"account_name" text NOT NULL,
	"official_name" text,
	"type" "AccountType" NOT NULL,
	"subtype" varchar(50),
	"expected_annual_return_rate" numeric(6, 4),
	"holder_category" varchar(20),
	"persistent_account_id" text,
	"verification_status" "AccountVerificationStatus",
	"verification_name" text,
	"item_id" text NOT NULL,
	"household_member_id" text NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Holding" (
	"holding_id" text PRIMARY KEY NOT NULL,
	"institution_price" numeric(20, 8),
	"institution_price_as_of" timestamp(3) with time zone,
	"institution_price_datetime" timestamp(3) with time zone,
	"institution_value" numeric(24, 8),
	"cost_basis" numeric(24, 8),
	"quantity" numeric(20, 8),
	"iso_currency_code" text,
	"vested_quantity" numeric(20, 8),
	"vested_value" numeric(24, 8),
	"expected_annual_return_rate" numeric(6, 4),
	"account_id" text,
	"security_id" text NOT NULL,
	"household_member_id" text NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "Household" (
	"household_id" text PRIMARY KEY NOT NULL,
	"household_name" text DEFAULT 'Our Household',
	"created_by_user_id" text,
	"created_at" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "HouseholdMember" (
	"household_member_id" text PRIMARY KEY NOT NULL,
	"email" text,
	"name" text NOT NULL,
	"role" "HouseholdRole" DEFAULT 'MEMBER' NOT NULL,
	"household_id" text NOT NULL,
	"user_id" text,
	"created_at" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "User" (
	"user_id" text PRIMARY KEY NOT NULL,
	"customer_id" text,
	"email" text NOT NULL,
	"full_name" text,
	"email_verified" boolean DEFAULT false,
	"phone_verified" boolean DEFAULT false,
	"phone" text,
	"created_at" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "User_customer_id_unique" UNIQUE("customer_id"),
	CONSTRAINT "User_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "Item" (
	"item_id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"institution_id" text,
	"institution_name" text,
	"access_token" text NOT NULL,
	"webhook" text,
	"error_type" text,
	"error_code" text,
	"created_at" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "ItemStatus" (
	"item_id" text PRIMARY KEY NOT NULL,
	"transactions_last_successful_update" timestamp(3) with time zone,
	"transactions_last_failed" timestamp(3) with time zone,
	"last_sync_cursor" text,
	"updated_at" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "Profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"bio" text,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Security" (
	"security_id" text PRIMARY KEY NOT NULL,
	"institution_id" text,
	"proxy_security_id" text,
	"security_name" text,
	"ticker_symbol" text,
	"is_cash_equivalent" boolean,
	"type" "SecurityType",
	"subtype" text,
	"close_price" numeric(20, 8),
	"close_price_as_of" date,
	"update_datetime" timestamp(3) with time zone,
	"iso_currency_code" text,
	"sector" text,
	"industry" text,
	"created_at" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "Price" (
	"price_id" text PRIMARY KEY NOT NULL,
	"currency" varchar(3) NOT NULL,
	"unit_amount" bigint NOT NULL,
	"recurring_interval" "RecurringInterval",
	"recurring_interval_count" integer DEFAULT 1,
	"recurring_usage_type" "UsageType" DEFAULT 'LICENSED' NOT NULL,
	"active" boolean DEFAULT false,
	"product_id" text NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "Product" (
	"product_id" text PRIMARY KEY NOT NULL,
	"product_name" text NOT NULL,
	"description" text,
	"active" boolean DEFAULT true,
	"created_at" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "Subscription" (
	"subscription_id" text PRIMARY KEY NOT NULL,
	"status" "SubscriptionStatus" DEFAULT 'INCOMPLETE' NOT NULL,
	"start_date" timestamp(3) with time zone,
	"trial_start" timestamp(3) with time zone,
	"trial_end" timestamp(3) with time zone,
	"ended_at" timestamp(3) with time zone,
	"cancel_at" timestamp(3) with time zone,
	"canceled_at" timestamp(3) with time zone,
	"cancel_at_period_end" boolean DEFAULT false,
	"stripe_customer_id" text,
	"user_id" text NOT NULL,
	"price_id" text NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Account" ADD CONSTRAINT "Account_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."Item"("item_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Account" ADD CONSTRAINT "Account_household_member_id_fkey" FOREIGN KEY ("household_member_id") REFERENCES "public"."HouseholdMember"("household_member_id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "public"."Account"("account_id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_security_id_fkey" FOREIGN KEY ("security_id") REFERENCES "public"."Security"("security_id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_household_member_id_fkey" FOREIGN KEY ("household_member_id") REFERENCES "public"."HouseholdMember"("household_member_id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Household" ADD CONSTRAINT "Household_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."User"("user_id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "HouseholdMember" ADD CONSTRAINT "HouseholdMember_household_id_fkey" FOREIGN KEY ("household_id") REFERENCES "public"."Household"("household_id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "HouseholdMember" ADD CONSTRAINT "HouseholdMember_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Item" ADD CONSTRAINT "Item_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ItemStatus" ADD CONSTRAINT "ItemStatus_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."Item"("item_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Price" ADD CONSTRAINT "Price_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."Product"("product_id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_price_id_fkey" FOREIGN KEY ("price_id") REFERENCES "public"."Price"("price_id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "Account_item_id_idx" ON "Account" USING btree ("item_id" text_ops);--> statement-breakpoint
CREATE INDEX "Account_household_member_id_idx" ON "Account" USING btree ("household_member_id" text_ops);--> statement-breakpoint
CREATE INDEX "Account_household_member_id_type_idx" ON "Account" USING btree ("household_member_id" text_ops,"type");--> statement-breakpoint
CREATE INDEX "Holding_account_id_idx" ON "Holding" USING btree ("account_id" text_ops);--> statement-breakpoint
CREATE INDEX "Holding_household_member_id_idx" ON "Holding" USING btree ("household_member_id" text_ops);--> statement-breakpoint
CREATE INDEX "Holding_security_id_idx" ON "Holding" USING btree ("security_id" text_ops);--> statement-breakpoint
CREATE INDEX "Holding_household_member_id_security_id_idx" ON "Holding" USING btree ("household_member_id" text_ops,"security_id" text_ops);--> statement-breakpoint
CREATE INDEX "HouseholdMember_household_id_idx" ON "HouseholdMember" USING btree ("household_id" text_ops);--> statement-breakpoint
CREATE INDEX "HouseholdMember_user_id_idx" ON "HouseholdMember" USING btree ("user_id" text_ops);--> statement-breakpoint
CREATE INDEX "HouseholdMember_household_id_user_id_idx" ON "HouseholdMember" USING btree ("household_id" text_ops,"user_id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "User_customer_id_key" ON "User" USING btree ("customer_id");--> statement-breakpoint
CREATE UNIQUE INDEX "User_email_key" ON "User" USING btree ("email");--> statement-breakpoint
CREATE INDEX "Item_user_id_idx" ON "Item" USING btree ("user_id" text_ops);--> statement-breakpoint
CREATE INDEX "Item_institution_id_idx" ON "Item" USING btree ("institution_id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Profile_user_id_key" ON "Profile" USING btree ("user_id" text_ops);--> statement-breakpoint
CREATE INDEX "Price_product_id_idx" ON "Price" USING btree ("product_id" text_ops);--> statement-breakpoint
CREATE INDEX "Subscription_user_id_idx" ON "Subscription" USING btree ("user_id" text_ops);