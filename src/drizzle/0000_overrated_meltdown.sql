
CREATE TYPE "public"."HouseholdRole" AS ENUM('ADMIN', 'MEMBER', 'GUEST');--> statement-breakpoint
CREATE TYPE "public"."Interval" AS ENUM('day', 'week', 'month', 'year');--> statement-breakpoint
CREATE TYPE "public"."SubscriptionStatus" AS ENUM('incomplete', 'incomplete_expired', 'trialing', 'active', 'past_due', 'canceled', 'unpaid', 'paused');--> statement-breakpoint
CREATE TYPE "public"."UsageType" AS ENUM('metered', 'licensed');--> statement-breakpoint
CREATE TABLE "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "TransactionStatus" (
	"id" serial PRIMARY KEY NOT NULL,
	"last_successful_update" timestamp(3) with time zone NOT NULL,
	"last_failed_update" timestamp(3) with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "WebhookStatus" (
	"id" serial PRIMARY KEY NOT NULL,
	"sent_at" timestamp(3) with time zone NOT NULL,
	"code_sent" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "OptionContract" (
	"id" serial PRIMARY KEY NOT NULL,
	"contract_type" text NOT NULL,
	"expiration_date" text NOT NULL,
	"strike_price" numeric(65, 30) NOT NULL,
	"underlying_security_ticker" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Owner" (
	"owner_id" text NOT NULL,
	"name" text,
	"phone_number" text,
	"phone_type" text,
	"phone_primary" boolean,
	"email" text NOT NULL,
	"email_type" text,
	"email_primary" boolean,
	"street" text,
	"region" text,
	"address" text,
	"city" text,
	"state" text,
	"postal_code" text,
	"country" text,
	"address_primary" boolean,
	"accountId" text NOT NULL,
	"timestamp" timestamp(3) DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "Balance" (
	"balance_id" text NOT NULL,
	"available" numeric(65, 30) NOT NULL,
	"current" numeric(65, 30) NOT NULL,
	"limit" numeric(65, 30) NOT NULL,
	"iso_currency_code" text NOT NULL,
	"unofficial_currency_code" text,
	"last_updated" timestamp(3) with time zone,
	"updated_at" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP,
	"timestamp" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "Account" (
	"account_id" text NOT NULL,
	"name" text,
	"type" text,
	"available" numeric(65, 30),
	"current" numeric(65, 30),
	"limit" numeric(65, 30),
	"iso_currency_code" text,
	"unofficial_currency_code" text,
	"mask" text,
	"official_name" text,
	"subtype" text,
	"verification_status" text,
	"persistent_account_id" text,
	"annual_return_rate" numeric(65, 30) DEFAULT '0.00',
	"holder_category" text,
	"balance_id" text NOT NULL,
	"user_id" text NOT NULL,
	"timestamp" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP,
	"household_id" text,
	"item_id" text NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP,
	"created_at" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "User" (
	"user_id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"email_verified" boolean DEFAULT false,
	"phone_verified" boolean DEFAULT false,
	"phone" text,
	"customer_id" text,
	"created_at" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Household" (
	"household_id" text PRIMARY KEY NOT NULL,
	"name" text DEFAULT 'Our Household' NOT NULL,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Item" (
	"item_id" text PRIMARY KEY NOT NULL,
	"institution_id" text NOT NULL,
	"institution_name" text,
	"webhook" text,
	"auth_method" text,
	"request_id" text NOT NULL,
	"update_type" text NOT NULL,
	"consent_expiration_time" text NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"available_products" text[],
	"billed_products" text[],
	"products" text[],
	"error" text,
	"consented_products" text[],
	"consented_data_scopes" text[],
	"consented_use_cases" text[],
	"access_token" text NOT NULL,
	"user_id" text NOT NULL,
	"household_id" text
);
--> statement-breakpoint
CREATE TABLE "AccountHistory" (
	"id" serial PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"available" numeric(65, 30) NOT NULL,
	"current" numeric(65, 30) NOT NULL,
	"limit" numeric(65, 30) NOT NULL,
	"iso_currency_code" text NOT NULL,
	"unofficial_currency_code" text NOT NULL,
	"user_id" text,
	"timestamp" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Security" (
	"security_id" text NOT NULL,
	"isin" text,
	"cusip" text,
	"sedol" text,
	"institution_security_id" text,
	"institution_id" text,
	"proxy_security_id" text,
	"name" text,
	"ticker_symbol" text,
	"is_cash_equivalent" boolean,
	"type" text,
	"close_price" numeric(65, 30),
	"close_price_as_of" timestamp(3) with time zone,
	"update_datetime" timestamp(3) with time zone,
	"iso_currency_code" text,
	"unofficial_currency_code" text,
	"market_identifier_code" text,
	"sector" text,
	"industry" text,
	"option_contract_id" integer,
	"user_id" text NOT NULL,
	"timestamp" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "FixedIncome" (
	"id" serial PRIMARY KEY NOT NULL,
	"yield_rate_percentage" numeric(65, 30),
	"yield_rate_type" text,
	"maturity_date" text,
	"issue_date" text,
	"face_value" numeric(65, 30),
	"securityId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Subscription" (
	"subscription_id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"customer_id" text NOT NULL,
	"price_id" text,
	"status" "SubscriptionStatus" DEFAULT 'incomplete' NOT NULL,
	"start_date" integer,
	"trial_start" integer,
	"trial_end" integer,
	"ended_at" integer,
	"cancel_at" integer,
	"cancel_at_period_end" boolean DEFAULT false NOT NULL,
	"created_at" integer,
	"updated_at" integer,
	"canceled_at" integer
);
--> statement-breakpoint
CREATE TABLE "Price" (
	"price_id" text PRIMARY KEY NOT NULL,
	"product_id" text NOT NULL,
	"currency" text NOT NULL,
	"unit_amount" bigint NOT NULL,
	"recurring_interval" "Interval" NOT NULL,
	"recurring_interval_count" integer DEFAULT 1,
	"recurring_usage_type" "UsageType" DEFAULT 'licensed' NOT NULL,
	"active" boolean DEFAULT false NOT NULL,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Product" (
	"product_id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"bio" text,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "HouseholdMember" (
	"member_id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"role" "HouseholdRole" DEFAULT 'MEMBER' NOT NULL,
	"dob" timestamp(3),
	"invited_email" text,
	"invite_status" text DEFAULT 'pending' NOT NULL,
	"household_id" text NOT NULL,
	"user_id" text
);
--> statement-breakpoint
CREATE TABLE "HoldingHistory" (
	"id" serial PRIMARY KEY NOT NULL,
	"cost_basis" numeric(65, 30) NOT NULL,
	"institution_price" numeric(65, 30) NOT NULL,
	"annual_return_rate" numeric(65, 30) DEFAULT '0.06',
	"institution_price_as_of" timestamp(3) with time zone NOT NULL,
	"institution_price_datetime" timestamp(3) with time zone,
	"institution_value" numeric(65, 30) NOT NULL,
	"iso_currency_code" text,
	"unofficial_currency_code" text,
	"vested_quantity" numeric(65, 30),
	"vested_value" numeric(65, 30) NOT NULL,
	"quantity" numeric(65, 30) NOT NULL,
	"account_id" text NOT NULL,
	"security_id" text NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "SecurityHistory" (
	"id" serial PRIMARY KEY NOT NULL,
	"isin" text,
	"cusip" text,
	"sedol" text,
	"institution_security_id" text,
	"institution_id" text,
	"proxy_security_id" text,
	"name" text,
	"ticker_symbol" text,
	"is_cash_equivalent" boolean,
	"type" text,
	"close_price" numeric(65, 30),
	"close_price_as_of" timestamp(3) with time zone,
	"update_datetime" timestamp(3) with time zone,
	"iso_currency_code" text,
	"unofficial_currency_code" text,
	"market_identifier_code" text,
	"sector" text,
	"industry" text,
	"option_contract_id" integer,
	"timestamp" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"security_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Holding" (
	"cost_basis" numeric(65, 30) NOT NULL,
	"institution_price" numeric(65, 30) NOT NULL,
	"institution_price_as_of" timestamp(3) with time zone NOT NULL,
	"institution_price_datetime" timestamp(3) with time zone,
	"institution_value" numeric(65, 30) NOT NULL,
	"annual_return_rate" numeric(65, 30) DEFAULT '0.06',
	"iso_currency_code" text NOT NULL,
	"unofficial_currency_code" text,
	"vested_quantity" numeric(65, 30),
	"vested_value" numeric(65, 30) NOT NULL,
	"quantity" numeric(65, 30) NOT NULL,
	"account_id" text NOT NULL,
	"security_id" text NOT NULL,
	"timestamp" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"user_id" text NOT NULL,
	CONSTRAINT "Holding_pkey" PRIMARY KEY("account_id","security_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "Account" ADD CONSTRAINT "Account_balance_id_fkey" FOREIGN KEY ("balance_id") REFERENCES "public"."Balance"("balance_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Account" ADD CONSTRAINT "Account_household_id_fkey" FOREIGN KEY ("household_id") REFERENCES "public"."Household"("household_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Account" ADD CONSTRAINT "Account_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."Item"("item_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Item" ADD CONSTRAINT "Item_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Item" ADD CONSTRAINT "Item_household_id_fkey" FOREIGN KEY ("household_id") REFERENCES "public"."Household"("household_id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "AccountHistory" ADD CONSTRAINT "AccountHistory_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "public"."Account"("account_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Security" ADD CONSTRAINT "Security_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "FixedIncome" ADD CONSTRAINT "FixedIncome_securityId_fkey" FOREIGN KEY ("securityId") REFERENCES "public"."Security"("security_id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_price_id_fkey" FOREIGN KEY ("price_id") REFERENCES "public"."Price"("price_id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Price" ADD CONSTRAINT "Price_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."Product"("product_id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "HouseholdMember" ADD CONSTRAINT "HouseholdMember_household_id_fkey" FOREIGN KEY ("household_id") REFERENCES "public"."Household"("household_id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "HouseholdMember" ADD CONSTRAINT "HouseholdMember_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "HoldingHistory" ADD CONSTRAINT "HoldingHistory_security_id_user_id_account_id_fkey" FOREIGN KEY ("account_id","security_id","user_id") REFERENCES "public"."Holding"("account_id","security_id","user_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "SecurityHistory" ADD CONSTRAINT "SecurityHistory_security_id_fkey" FOREIGN KEY ("security_id") REFERENCES "public"."Security"("security_id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_security_id_fkey" FOREIGN KEY ("security_id") REFERENCES "public"."Security"("security_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "public"."Account"("account_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE UNIQUE INDEX "Owner_owner_id_key" ON "Owner" USING btree ("owner_id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Account_balance_id_key" ON "Account" USING btree ("balance_id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "User_customer_id_key" ON "User" USING btree ("customer_id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "User_email_key" ON "User" USING btree ("email" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "FixedIncome_securityId_key" ON "FixedIncome" USING btree ("securityId" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Subscription_user_id_key" ON "Subscription" USING btree ("user_id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Profile_user_id_key" ON "Profile" USING btree ("user_id" text_ops);--> statement-breakpoint
CREATE INDEX "HouseholdMember_household_id_idx" ON "HouseholdMember" USING btree ("household_id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "HouseholdMember_household_id_invited_email_key" ON "HouseholdMember" USING btree ("household_id" text_ops,"invited_email" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "HouseholdMember_household_id_user_id_key" ON "HouseholdMember" USING btree ("household_id" text_ops,"user_id" text_ops);--> statement-breakpoint
CREATE INDEX "HouseholdMember_user_id_idx" ON "HouseholdMember" USING btree ("user_id" text_ops);
*/