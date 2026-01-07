-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('incomplete', 'incomplete_expired', 'trialing', 'active', 'past_due', 'canceled', 'unpaid', 'paused');

-- CreateEnum
CREATE TYPE "Interval" AS ENUM ('day', 'week', 'month', 'year');

-- CreateEnum
CREATE TYPE "UsageType" AS ENUM ('metered', 'licensed');

-- CreateEnum
CREATE TYPE "HouseholdRole" AS ENUM ('ADMIN', 'MEMBER', 'GUEST');

-- CreateTable
CREATE TABLE "Account" (
    "account_id" TEXT NOT NULL,
    "name" TEXT,
    "type" TEXT,
    "available" DECIMAL(65,30),
    "current" DECIMAL(65,30),
    "limit" DECIMAL(65,30),
    "iso_currency_code" TEXT,
    "unofficial_currency_code" TEXT,
    "mask" TEXT,
    "official_name" TEXT,
    "subtype" TEXT,
    "verification_status" TEXT,
    "persistent_account_id" TEXT,
    "expected_expected_annual_return_rate" DECIMAL(65,30) DEFAULT 0.00,
    "holder_category" TEXT,
    "balance_id" TEXT,
    "user_id" TEXT NOT NULL,
    "timestamp" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "household_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "updated_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "AccountHistory" (
    "id" SERIAL NOT NULL,
    "account_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "available" DECIMAL(65,30) NOT NULL,
    "current" DECIMAL(65,30) NOT NULL,
    "limit" DECIMAL(65,30) NOT NULL,
    "iso_currency_code" TEXT NOT NULL,
    "unofficial_currency_code" TEXT NOT NULL,
    "user_id" TEXT,
    "timestamp" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccountHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Balance" (
    "balance_id" TEXT NOT NULL,
    "available" DECIMAL(65,30) NOT NULL,
    "current" DECIMAL(65,30) NOT NULL,
    "limit" DECIMAL(65,30) NOT NULL,
    "iso_currency_code" TEXT NOT NULL,
    "unofficial_currency_code" TEXT,
    "last_updated" TIMESTAMPTZ(3),
    "updated_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "timestamp" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("balance_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "email_verified" BOOLEAN DEFAULT false,
    "phone_verified" BOOLEAN DEFAULT false,
    "phone" TEXT,
    "customer_id" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Item" (
    "item_id" TEXT NOT NULL,
    "institution_id" TEXT NOT NULL,
    "institution_name" TEXT,
    "webhook" TEXT,
    "auth_method" TEXT,
    "request_id" TEXT NOT NULL,
    "update_type" TEXT NOT NULL,
    "consent_expiration_time" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "available_products" TEXT[],
    "billed_products" TEXT[],
    "products" TEXT[],
    "error" TEXT,
    "consented_products" TEXT[],
    "consented_data_scopes" TEXT[],
    "consented_use_cases" TEXT[],
    "access_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "household_id" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "TransactionStatus" (
    "id" SERIAL NOT NULL,
    "last_successful_update" TIMESTAMPTZ(3) NOT NULL,
    "last_failed_update" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "TransactionStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebhookStatus" (
    "id" SERIAL NOT NULL,
    "sent_at" TIMESTAMPTZ(3) NOT NULL,
    "code_sent" TEXT NOT NULL,

    CONSTRAINT "WebhookStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OptionContract" (
    "id" SERIAL NOT NULL,
    "contract_type" TEXT NOT NULL,
    "expiration_date" TEXT NOT NULL,
    "strike_price" DECIMAL(65,30) NOT NULL,
    "underlying_security_ticker" TEXT NOT NULL,

    CONSTRAINT "OptionContract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FixedIncome" (
    "id" SERIAL NOT NULL,
    "yield_rate_percentage" DECIMAL(65,30),
    "yield_rate_type" TEXT,
    "maturity_date" TEXT,
    "issue_date" TEXT,
    "face_value" DECIMAL(65,30),
    "securityId" TEXT NOT NULL,

    CONSTRAINT "FixedIncome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "subscription_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "price_id" TEXT,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'incomplete',
    "start_date" INTEGER,
    "trial_start" INTEGER,
    "trial_end" INTEGER,
    "ended_at" INTEGER,
    "cancel_at" INTEGER,
    "cancel_at_period_end" BOOLEAN NOT NULL DEFAULT false,
    "created_at" INTEGER,
    "updated_at" INTEGER,
    "canceled_at" INTEGER,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("subscription_id")
);

-- CreateTable
CREATE TABLE "Price" (
    "price_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "unit_amount" BIGINT NOT NULL,
    "recurring_interval" "Interval" NOT NULL,
    "recurring_interval_count" INTEGER DEFAULT 1,
    "recurring_usage_type" "UsageType" NOT NULL DEFAULT 'licensed',
    "active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("price_id")
);

-- CreateTable
CREATE TABLE "Product" (
    "product_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "bio" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owner" (
    "owner_id" TEXT NOT NULL,
    "name" TEXT,
    "phone_number" TEXT,
    "phone_type" TEXT,
    "phone_primary" BOOLEAN,
    "email" TEXT NOT NULL,
    "email_type" TEXT,
    "email_primary" BOOLEAN,
    "street" TEXT,
    "region" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postal_code" TEXT,
    "country" TEXT,
    "address_primary" BOOLEAN,
    "accountId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Household" (
    "household_id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Our Household',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Household_pkey" PRIMARY KEY ("household_id")
);

-- CreateTable
CREATE TABLE "HouseholdMember" (
    "member_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "HouseholdRole" NOT NULL DEFAULT 'MEMBER',
    "dob" TIMESTAMP(3),
    "invited_email" TEXT,
    "invite_status" TEXT NOT NULL DEFAULT 'pending',
    "household_id" TEXT NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "HouseholdMember_pkey" PRIMARY KEY ("member_id")
);

-- CreateTable
CREATE TABLE "Holding" (
    "cost_basis" DECIMAL(65,30) NOT NULL,
    "institution_price" DECIMAL(65,30) NOT NULL,
    "institution_price_as_of" TIMESTAMPTZ(3) NOT NULL,
    "institution_price_datetime" TIMESTAMPTZ(3),
    "institution_value" DECIMAL(65,30) NOT NULL,
    "expected_expected_annual_return_rate" DECIMAL(65,30) DEFAULT 0.06,
    "iso_currency_code" TEXT NOT NULL,
    "unofficial_currency_code" TEXT,
    "vested_quantity" DECIMAL(65,30),
    "vested_value" DECIMAL(65,30) NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "account_id" TEXT NOT NULL,
    "security_id" TEXT NOT NULL,
    "timestamp" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Holding_pkey" PRIMARY KEY ("security_id","user_id","account_id")
);

-- CreateTable
CREATE TABLE "HoldingHistory" (
    "id" SERIAL NOT NULL,
    "cost_basis" DECIMAL(65,30) NOT NULL,
    "institution_price" DECIMAL(65,30) NOT NULL,
    "expected_expected_annual_return_rate" DECIMAL(65,30) DEFAULT 0.06,
    "institution_price_as_of" TIMESTAMPTZ(3) NOT NULL,
    "institution_price_datetime" TIMESTAMPTZ(3),
    "institution_value" DECIMAL(65,30) NOT NULL,
    "iso_currency_code" TEXT,
    "unofficial_currency_code" TEXT,
    "vested_quantity" DECIMAL(65,30),
    "vested_value" DECIMAL(65,30) NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "account_id" TEXT NOT NULL,
    "security_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "HoldingHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Security" (
    "security_id" TEXT NOT NULL,
    "isin" TEXT,
    "cusip" TEXT,
    "sedol" TEXT,
    "institution_security_id" TEXT,
    "institution_id" TEXT,
    "proxy_security_id" TEXT,
    "name" TEXT,
    "ticker_symbol" TEXT,
    "is_cash_equivalent" BOOLEAN,
    "type" TEXT,
    "close_price" DECIMAL(65,30),
    "close_price_as_of" TIMESTAMPTZ(3),
    "update_datetime" TIMESTAMPTZ(3),
    "iso_currency_code" TEXT,
    "unofficial_currency_code" TEXT,
    "market_identifier_code" TEXT,
    "sector" TEXT,
    "industry" TEXT,
    "option_contract_id" INTEGER,
    "user_id" TEXT NOT NULL,
    "timestamp" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Security_pkey" PRIMARY KEY ("security_id")
);

-- CreateTable
CREATE TABLE "SecurityHistory" (
    "id" SERIAL NOT NULL,
    "isin" TEXT,
    "cusip" TEXT,
    "sedol" TEXT,
    "institution_security_id" TEXT,
    "institution_id" TEXT,
    "proxy_security_id" TEXT,
    "name" TEXT,
    "ticker_symbol" TEXT,
    "is_cash_equivalent" BOOLEAN,
    "type" TEXT,
    "close_price" DECIMAL(65,30),
    "close_price_as_of" TIMESTAMPTZ(3),
    "update_datetime" TIMESTAMPTZ(3),
    "iso_currency_code" TEXT,
    "unofficial_currency_code" TEXT,
    "market_identifier_code" TEXT,
    "sector" TEXT,
    "industry" TEXT,
    "option_contract_id" INTEGER,
    "timestamp" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "security_id" TEXT NOT NULL,

    CONSTRAINT "SecurityHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_balance_id_key" ON "Account"("balance_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_customer_id_key" ON "User"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "FixedIncome_securityId_key" ON "FixedIncome"("securityId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_user_id_key" ON "Subscription"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_id_key" ON "Profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_owner_id_key" ON "Owner"("owner_id");

-- CreateIndex
CREATE INDEX "HouseholdMember_household_id_idx" ON "HouseholdMember"("household_id");

-- CreateIndex
CREATE INDEX "HouseholdMember_user_id_idx" ON "HouseholdMember"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "HouseholdMember_household_id_user_id_key" ON "HouseholdMember"("household_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "HouseholdMember_household_id_invited_email_key" ON "HouseholdMember"("household_id", "invited_email");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_balance_id_fkey" FOREIGN KEY ("balance_id") REFERENCES "Balance"("balance_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_household_id_fkey" FOREIGN KEY ("household_id") REFERENCES "Household"("household_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountHistory" ADD CONSTRAINT "AccountHistory_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_household_id_fkey" FOREIGN KEY ("household_id") REFERENCES "Household"("household_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FixedIncome" ADD CONSTRAINT "FixedIncome_securityId_fkey" FOREIGN KEY ("securityId") REFERENCES "Security"("security_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_price_id_fkey" FOREIGN KEY ("price_id") REFERENCES "Price"("price_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseholdMember" ADD CONSTRAINT "HouseholdMember_household_id_fkey" FOREIGN KEY ("household_id") REFERENCES "Household"("household_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseholdMember" ADD CONSTRAINT "HouseholdMember_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_security_id_fkey" FOREIGN KEY ("security_id") REFERENCES "Security"("security_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HoldingHistory" ADD CONSTRAINT "HoldingHistory_security_id_user_id_account_id_fkey" FOREIGN KEY ("security_id", "user_id", "account_id") REFERENCES "Holding"("security_id", "user_id", "account_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Security" ADD CONSTRAINT "Security_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecurityHistory" ADD CONSTRAINT "SecurityHistory_security_id_fkey" FOREIGN KEY ("security_id") REFERENCES "Security"("security_id") ON DELETE RESTRICT ON UPDATE CASCADE;
