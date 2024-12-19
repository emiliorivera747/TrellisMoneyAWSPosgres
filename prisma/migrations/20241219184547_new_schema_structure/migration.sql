-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT,
    "email_verified" BOOLEAN DEFAULT false,
    "phone_verified" BOOLEAN DEFAULT false,
    "phone" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "bio" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "account_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "available" DECIMAL(65,30) NOT NULL,
    "current" DECIMAL(65,30) NOT NULL,
    "limit" DECIMAL(65,30) NOT NULL,
    "iso_currency_code" TEXT NOT NULL,
    "unofficial_currency_code" TEXT NOT NULL,
    "mask" TEXT,
    "officail_name" TEXT,
    "subtype" TEXT,
    "verification_status" TEXT,
    "persistent_account_id" TEXT,
    "holder_catergory" TEXT,
    "balance_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
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
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccountHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "item_id" TEXT NOT NULL,
    "institution_id" TEXT NOT NULL,
    "institution_name" TEXT NOT NULL,
    "webhook" TEXT NOT NULL,
    "request_id" TEXT NOT NULL,
    "update_type" TEXT NOT NULL,
    "consent_expiration_time" TEXT NOT NULL,
    "accountId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Balance" (
    "balance_id" TEXT NOT NULL,
    "available" DECIMAL(65,30) NOT NULL,
    "current" DECIMAL(65,30) NOT NULL,
    "limit" DECIMAL(65,30) NOT NULL,
    "iso_currency_code" TEXT NOT NULL,
    "unofficial_currency_code" TEXT,
    "last_updated" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "timestamp" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
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
CREATE TABLE "Holding" (
    "cost_basis" DECIMAL(65,30) NOT NULL,
    "institution_price" DECIMAL(65,30) NOT NULL,
    "institution_price_as_of" TIMESTAMP(3) NOT NULL,
    "institution_price_datetime" TIMESTAMP(3),
    "institution_value" DECIMAL(65,30) NOT NULL,
    "iso_currency_code" TEXT NOT NULL,
    "unofficial_currency_code" TEXT,
    "vested_quantity" DECIMAL(65,30),
    "vested_value" DECIMAL(65,30) NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "account_id" TEXT NOT NULL,
    "security_id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Holding_pkey" PRIMARY KEY ("account_id","security_id")
);

-- CreateTable
CREATE TABLE "HoldingHistory" (
    "id" SERIAL NOT NULL,
    "holding_id" INTEGER NOT NULL,
    "cost_basis" DECIMAL(65,30) NOT NULL,
    "institution_price" DECIMAL(65,30) NOT NULL,
    "institution_price_as_of" TIMESTAMP(3) NOT NULL,
    "institution_price_datetime" TIMESTAMP(3),
    "institution_value" DECIMAL(65,30) NOT NULL,
    "iso_currency_code" TEXT NOT NULL,
    "unofficial_currency_code" TEXT,
    "vested_quantity" DECIMAL(65,30),
    "vested_value" DECIMAL(65,30) NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "account_id" TEXT NOT NULL,
    "security_id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "holding_account_id" TEXT NOT NULL,
    "holding_security_id" TEXT NOT NULL,

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
    "close_price_as_of" TIMESTAMP(3),
    "update_datetime" TIMESTAMP(3),
    "iso_currency_code" TEXT,
    "unofficial_currency_code" TEXT,
    "market_identifier_code" TEXT,
    "sector" TEXT,
    "industry" TEXT,
    "option_contract_id" INTEGER,
    "user_id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "SecurityHistory" (
    "id" SERIAL NOT NULL,
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
    "close_price_as_of" TIMESTAMP(3),
    "update_datetime" TIMESTAMP(3),
    "iso_currency_code" TEXT,
    "unofficial_currency_code" TEXT,
    "market_identifier_code" TEXT,
    "sector" TEXT,
    "industry" TEXT,
    "option_contract_id" INTEGER,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SecurityHistory_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_account_id_key" ON "Account"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_balance_id_key" ON "Account"("balance_id");

-- CreateIndex
CREATE UNIQUE INDEX "Item_item_id_key" ON "Item"("item_id");

-- CreateIndex
CREATE UNIQUE INDEX "Balance_balance_id_key" ON "Balance"("balance_id");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_owner_id_key" ON "Owner"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Security_security_id_key" ON "Security"("security_id");

-- CreateIndex
CREATE UNIQUE INDEX "FixedIncome_securityId_key" ON "FixedIncome"("securityId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_balance_id_fkey" FOREIGN KEY ("balance_id") REFERENCES "Balance"("balance_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountHistory" ADD CONSTRAINT "AccountHistory_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_security_id_fkey" FOREIGN KEY ("security_id") REFERENCES "Security"("security_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HoldingHistory" ADD CONSTRAINT "HoldingHistory_holding_account_id_holding_security_id_fkey" FOREIGN KEY ("holding_account_id", "holding_security_id") REFERENCES "Holding"("account_id", "security_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Security" ADD CONSTRAINT "Security_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecurityHistory" ADD CONSTRAINT "SecurityHistory_security_id_fkey" FOREIGN KEY ("security_id") REFERENCES "Security"("security_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FixedIncome" ADD CONSTRAINT "FixedIncome_securityId_fkey" FOREIGN KEY ("securityId") REFERENCES "Security"("security_id") ON DELETE RESTRICT ON UPDATE CASCADE;
