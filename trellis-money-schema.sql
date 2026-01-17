CREATE TYPE "account_type" AS ENUM (
  'DEPOSITORY',
  'CREDIT',
  'LOAN',
  'INVESTMENT',
  'OTHER'
);

CREATE TYPE "household_role" AS ENUM (
  'ADMIN',
  'MEMBER',
  'GUEST'
);

CREATE TYPE "security_type" AS ENUM (
  'CASH',
  'CRYPTOCURRENCY',
  'DERIVATIVE',
  'EQUITY',
  'ETF',
  'FIXED',
  'LOAN',
  'MUTUAL',
  'OTHER'
);

CREATE TYPE "subscription_status" AS ENUM (
  'INCOMPLETE',
  'INCOMPLETE_EXPIRED',
  'TRIALING',
  'ACTIVE',
  'PAST_DUE',
  'CANCELED',
  'UNPAID',
  'PAUSED'
);

CREATE TYPE "recurring_interval" AS ENUM (
  'DAY',
  'WEEK',
  'MONTH',
  'YEAR'
);

CREATE TYPE "usage_type" AS ENUM (
  'METERED',
  'LICENSED'
);

CREATE TABLE "user" (
  "user_id" varchar PRIMARY KEY NOT NULL,
  "customer_id" varchar UNIQUE,
  "email" varchar UNIQUE NOT NULL,
  "user_name" varchar,
  "email_verified" boolean DEFAULT false,
  "phone_verified" boolean DEFAULT false,
  "phone" varchar,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "profile" (
  "user_id" varchar PRIMARY KEY,
  "bio" varchar
);

CREATE TABLE "account" (
  "account_id" varchar PRIMARY KEY,
  "available_balance" decimal(15,4),
  "current_balance" decimal(15,4),
  "limit_amount" decimal(15,4),
  "mask" varchar(4),
  "account_name" varchar NOT NULL,
  "official_name" varchar,
  "type" account_type NOT NULL,
  "subtype" varchar(50),
  "expected_annual_return_rate" decimal(5,4),
  "holder_category" varchar(20),
  "persistent_account_id" varchar,
  "verification_status" varchar(50),
  "verification_name" varchar,
  "item_id" varchar NOT NULL,
  "household_member_id" varchar NOT NULL,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "item" (
  "item_id" varchar PRIMARY KEY,
  "user_id" varchar NOT NULL,
  "institution_id" varchar,
  "institution_name" varchar,
  "access_token" varchar NOT NULL,
  "webhook" varchar,
  "error_type" varchar,
  "error_code" varchar,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz
);

CREATE TABLE "item_status" (
  "item_id" varchar PRIMARY KEY,
  "transactions_last_successful_update" timestamptz,
  "transactions_last_failed" timestamptz,
  "last_sync_cursor" varchar,
  "updated_at" timestamptz
);

CREATE TABLE "household" (
  "household_id" varchar PRIMARY KEY,
  "household_name" varchar DEFAULT 'Our Household',
  "created_by_user_id" varchar,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz
);

CREATE TABLE "household_member" (
  "household_member_id" varchar PRIMARY KEY,
  "email" varchar,
  "name" varchar NOT NULL,
  "role" household_role DEFAULT 'MEMBER',
  "household_id" varchar NOT NULL,
  "user_id" varchar,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz
);

CREATE TABLE "security" (
  "security_id" varchar PRIMARY KEY NOT NULL,
  "institution_id" varchar,
  "proxy_security_id" varchar,
  "security_name" varchar,
  "ticker_symbol" varchar,
  "is_cash_equivalent" boolean,
  "type" security_type,
  "subtype" varchar,
  "close_price" decimal,
  "close_price_as_of" date,
  "update_datetime" timestamptz,
  "iso_currency_code" varchar,
  "sector" varchar,
  "industry" varchar,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz
);

CREATE TABLE "subscription" (
  "subscription_id" varchar PRIMARY KEY NOT NULL,
  "status" subscription_status DEFAULT 'INCOMPLETE',
  "start_date" timestamptz,
  "trial_start" timestamptz,
  "trial_end" timestamptz,
  "ended_at" timestamptz,
  "cancel_at" timestamptz,
  "canceled_at" timestamptz,
  "cancel_at_period_end" boolean DEFAULT false,
  "user_id" varchar NOT NULL,
  "price_id" varchar NOT NULL,
  "customer_id" varchar NOT NULL,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz
);

CREATE TABLE "price" (
  "price_id" varchar PRIMARY KEY NOT NULL,
  "currency" varchar(3) NOT NULL,
  "unit_amount" bigint NOT NULL,
  "recurring_interval" recurring_interval,
  "recurring_interval_count" int DEFAULT 1,
  "recurring_usage_type" usage_type DEFAULT 'LICENSED',
  "active" boolean DEFAULT false,
  "product_id" varchar NOT NULL,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz
);

CREATE TABLE "product" (
  "product_id" varchar PRIMARY KEY NOT NULL,
  "product_name" varchar NOT NULL,
  "description" varchar,
  "active" boolean DEFAULT true,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz
);

CREATE TABLE "holding" (
  "holding_id" varchar PRIMARY KEY NOT NULL,
  "institution_price" decimal(20,8),
  "institution_price_as_of" timestamptz,
  "institution_price_datetime" timestamptz,
  "institution_value" decimal(20,4),
  "cost_basis" decimal(20,4),
  "quantity" decimal(20,8),
  "iso_currency_code" varchar,
  "vested_quantity" decimal(20,8),
  "vested_value" decimal(20,4),
  "expected_annual_return_rate" decimal(5,4),
  "account_id" varchar,
  "security_id" varchar NOT NULL,
  "household_member_id" varchar NOT NULL,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz
);

CREATE INDEX ON "account" ("item_id");

CREATE INDEX ON "account" ("household_member_id");

CREATE INDEX ON "item" ("user_id");

CREATE INDEX ON "item" ("institution_id");

CREATE INDEX ON "household_member" ("household_id");

CREATE INDEX ON "household_member" ("user_id");

CREATE INDEX ON "subscription" ("user_id");

CREATE INDEX ON "price" ("product_id");

CREATE INDEX ON "holding" ("account_id");

CREATE INDEX ON "holding" ("household_member_id");

CREATE INDEX ON "holding" ("security_id");

COMMENT ON COLUMN "user"."user_id" IS 'UUID primary key';

COMMENT ON COLUMN "user"."customer_id" IS 'Stripe Customer ID';

COMMENT ON COLUMN "user"."email_verified" IS 'Email confirmation status';

COMMENT ON COLUMN "user"."phone_verified" IS 'Phone/SMS verification status';

COMMENT ON COLUMN "user"."phone" IS 'E.164 format recommended (+1...)';

COMMENT ON COLUMN "user"."created_at" IS 'UTC with timezone';

COMMENT ON COLUMN "user"."updated_at" IS 'Use trigger to auto-update';

COMMENT ON COLUMN "account"."account_id" IS 'Plaid unique immutable identifier (unless account changes significantly)';

COMMENT ON COLUMN "account"."mask" IS 'Last 2-4 characters of account number';

COMMENT ON COLUMN "account"."account_name" IS 'User or institution given name';

COMMENT ON COLUMN "account"."official_name" IS 'Official name from financial institution';

COMMENT ON COLUMN "account"."type" IS 'depository, credit, loan, investment, other';

COMMENT ON COLUMN "account"."subtype" IS 'checking, savings, credit_card, mortgage, 401k, student, etc.';

COMMENT ON COLUMN "account"."holder_category" IS 'personal / business / unrecognized (beta)';

COMMENT ON COLUMN "account"."persistent_account_id" IS 'Stable ID for tokenized accounts (Chase, PNC, US Bank etc.)';

COMMENT ON COLUMN "account"."verification_status" IS 'automatically_verified, pending_manual_verification, database_insights_pass, etc.';

COMMENT ON COLUMN "account"."verification_name" IS 'Name used during micro-deposit / database verification';

COMMENT ON COLUMN "account"."updated_at" IS 'Use trigger to auto-update';

COMMENT ON COLUMN "item"."item_id" IS 'Plaid Item ID - unique per link connection';

COMMENT ON COLUMN "item"."user_id" IS 'Your application user';

COMMENT ON COLUMN "item"."access_token" IS 'ENCRYPT THIS!';

COMMENT ON COLUMN "item"."webhook" IS 'Webhook URL registered for this Item';

COMMENT ON COLUMN "item"."error_type" IS 'e.g. ITEM_ERROR, INSTITUTION_ERROR, ...';

COMMENT ON COLUMN "item_status"."last_sync_cursor" IS 'for /transactions/sync';

COMMENT ON COLUMN "household"."household_id" IS 'UUID - primary key';

COMMENT ON COLUMN "household"."household_name" IS 'Household / Family / Joint name';

COMMENT ON TABLE "household_member" IS 'UNIQUE (household_id, user_id)
WHERE user_id IS NOT NULL
— must be enforced via SQL partial index
';

COMMENT ON COLUMN "household_member"."household_member_id" IS 'UUID';

COMMENT ON COLUMN "household_member"."email" IS 'Primary contact - usually required';

COMMENT ON COLUMN "household_member"."name" IS 'How this member appears in the household';

COMMENT ON COLUMN "household_member"."role" IS 'ADMIN / MEMBER / GUEST';

COMMENT ON TABLE "security" IS 'UNIQUE (ticker_symbol, iso_currency_code)
WHERE ticker_symbol IS NOT NULL
  AND iso_currency_code IS NOT NULL
— enforce via SQL partial index
';

COMMENT ON COLUMN "subscription"."customer_id" IS 'Stripe Customer ID';

COMMENT ON COLUMN "price"."currency" IS 'ISO 4217 e.g. USD';

COMMENT ON COLUMN "price"."unit_amount" IS 'in smallest currency unit';

COMMENT ON COLUMN "price"."recurring_interval_count" IS 'e.g. every 3 months = 3';

ALTER TABLE "profile" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("user_id");

ALTER TABLE "account" ADD FOREIGN KEY ("item_id") REFERENCES "item" ("item_id");

ALTER TABLE "account" ADD FOREIGN KEY ("household_member_id") REFERENCES "household_member" ("household_member_id");

ALTER TABLE "item" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("user_id");

ALTER TABLE "item_status" ADD FOREIGN KEY ("item_id") REFERENCES "item" ("item_id");

ALTER TABLE "household" ADD FOREIGN KEY ("created_by_user_id") REFERENCES "user" ("user_id");

ALTER TABLE "household_member" ADD FOREIGN KEY ("household_id") REFERENCES "household" ("household_id");

ALTER TABLE "household_member" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("user_id");

ALTER TABLE "subscription" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("user_id");

ALTER TABLE "subscription" ADD FOREIGN KEY ("price_id") REFERENCES "price" ("price_id");

ALTER TABLE "price" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("product_id");

ALTER TABLE "holding" ADD FOREIGN KEY ("account_id") REFERENCES "account" ("account_id");

ALTER TABLE "holding" ADD FOREIGN KEY ("security_id") REFERENCES "security" ("security_id");

ALTER TABLE "holding" ADD FOREIGN KEY ("household_member_id") REFERENCES "household_member" ("household_member_id");
