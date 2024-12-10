-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "userId" SET DATA TYPE TEXT;

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
    "timestamp" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER
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
CREATE TABLE "Holding" (
    "holding_id" TEXT NOT NULL,
    "cost_basis" DECIMAL(65,30) NOT NULL,
    "institution_price" DECIMAL(65,30) NOT NULL,
    "institution_price_as_of" TIMESTAMP(3) NOT NULL,
    "institution_price_datetime" TIMESTAMP(3) NOT NULL,
    "institution_value" DECIMAL(65,30) NOT NULL,
    "iso_currency_code" TEXT NOT NULL,
    "unofficial_currency_code" TEXT NOT NULL,
    "vested_quantity" DECIMAL(65,30) NOT NULL,
    "vested_value" DECIMAL(65,30) NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "accountId" TEXT NOT NULL,
    "securityId" TEXT NOT NULL,
    "securitySecurity_id" TEXT
);

-- CreateTable
CREATE TABLE "Security" (
    "security_id" TEXT NOT NULL,
    "isin" TEXT NOT NULL,
    "cusip" TEXT NOT NULL,
    "sedol" TEXT NOT NULL,
    "institution_security_id" TEXT NOT NULL,
    "institution_id" TEXT NOT NULL,
    "proxy_security_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ticker_symbol" TEXT NOT NULL,
    "is_cash_equivalent" BOOLEAN NOT NULL,
    "type" TEXT NOT NULL,
    "close_price" DECIMAL(65,30) NOT NULL,
    "close_price_as_of" TIMESTAMP(3) NOT NULL,
    "iso_currency_code" TEXT NOT NULL,
    "unofficial_currency_code" TEXT NOT NULL,
    "market_identifier_code" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "option_contract_id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Balance" (
    "balance_id" TEXT NOT NULL,
    "available" DECIMAL(65,30) NOT NULL,
    "current" DECIMAL(65,30) NOT NULL,
    "limit" DECIMAL(65,30) NOT NULL,
    "iso_currency_code" TEXT NOT NULL,
    "unofficial_currency_code" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "accountId" TEXT NOT NULL
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
    "accountId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_account_id_key" ON "Account"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "Item_item_id_key" ON "Item"("item_id");

-- CreateIndex
CREATE UNIQUE INDEX "Holding_holding_id_key" ON "Holding"("holding_id");

-- CreateIndex
CREATE UNIQUE INDEX "Security_security_id_key" ON "Security"("security_id");

-- CreateIndex
CREATE UNIQUE INDEX "Balance_balance_id_key" ON "Balance"("balance_id");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_owner_id_key" ON "Owner"("owner_id");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_securitySecurity_id_fkey" FOREIGN KEY ("securitySecurity_id") REFERENCES "Security"("security_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Security" ADD CONSTRAINT "Security_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Owner" ADD CONSTRAINT "Owner_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;
