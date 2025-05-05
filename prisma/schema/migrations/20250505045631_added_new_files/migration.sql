-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('free', 'premium');

-- CreateEnum
CREATE TYPE "SubscriptionPeriod" AS ENUM ('monthly', 'yearly');

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
    "annual_return_rate" DECIMAL(65,30) DEFAULT 0.00,
    "holder_category" TEXT,
    "balance_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "timestamp" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "item_id" TEXT NOT NULL,
    "updated_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP
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
    "timestamp" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Holding" (
    "cost_basis" DECIMAL(65,30) NOT NULL,
    "institution_price" DECIMAL(65,30) NOT NULL,
    "institution_price_as_of" TIMESTAMPTZ(3) NOT NULL,
    "institution_price_datetime" TIMESTAMPTZ(3),
    "institution_value" DECIMAL(65,30) NOT NULL,
    "annual_return_rate" DECIMAL(65,30) DEFAULT 0.06,
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
    "annual_return_rate" DECIMAL(65,30) DEFAULT 0.06,
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
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "bio" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "email_verified" BOOLEAN DEFAULT false,
    "phone_verified" BOOLEAN DEFAULT false,
    "phone" TEXT,
    "customer_id" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
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
    "timestamp" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP
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

-- CreateTable
CREATE TABLE "Subscription" (
    "_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "plan" "Plan" NOT NULL,
    "period" "SubscriptionPeriod" NOT NULL,
    "status" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("_id")
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
    "user_id" TEXT NOT NULL
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

-- CreateIndex
CREATE UNIQUE INDEX "Account_account_id_key" ON "Account"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_balance_id_key" ON "Account"("balance_id");

-- CreateIndex
CREATE UNIQUE INDEX "Balance_balance_id_key" ON "Balance"("balance_id");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_owner_id_key" ON "Owner"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_id_key" ON "Profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_customer_id_key" ON "User"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "Security_security_id_key" ON "Security"("security_id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_user_id_key" ON "Subscription"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Item_item_id_key" ON "Item"("item_id");

-- CreateIndex
CREATE UNIQUE INDEX "FixedIncome_securityId_key" ON "FixedIncome"("securityId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_balance_id_fkey" FOREIGN KEY ("balance_id") REFERENCES "Balance"("balance_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountHistory" ADD CONSTRAINT "AccountHistory_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_security_id_fkey" FOREIGN KEY ("security_id") REFERENCES "Security"("security_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HoldingHistory" ADD CONSTRAINT "HoldingHistory_security_id_user_id_account_id_fkey" FOREIGN KEY ("security_id", "user_id", "account_id") REFERENCES "Holding"("security_id", "user_id", "account_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Security" ADD CONSTRAINT "Security_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecurityHistory" ADD CONSTRAINT "SecurityHistory_security_id_fkey" FOREIGN KEY ("security_id") REFERENCES "Security"("security_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FixedIncome" ADD CONSTRAINT "FixedIncome_securityId_fkey" FOREIGN KEY ("securityId") REFERENCES "Security"("security_id") ON DELETE RESTRICT ON UPDATE CASCADE;
