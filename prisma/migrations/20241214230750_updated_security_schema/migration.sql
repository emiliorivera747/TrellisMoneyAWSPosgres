/*
  Warnings:

  - You are about to drop the column `accountId` on the `Holding` table. All the data in the column will be lost.
  - You are about to drop the column `securityId` on the `Holding` table. All the data in the column will be lost.
  - Added the required column `account_id` to the `Holding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `security_id` to the `Holding` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Holding" DROP CONSTRAINT "Holding_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Holding" DROP CONSTRAINT "Holding_securitySecurity_id_fkey";

-- AlterTable
ALTER TABLE "Holding" DROP COLUMN "accountId",
DROP COLUMN "securityId",
ADD COLUMN     "account_id" TEXT NOT NULL,
ADD COLUMN     "security_id" TEXT NOT NULL,
ALTER COLUMN "vested_quantity" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Owner" ADD COLUMN     "timestamp" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Security" ADD COLUMN     "update_datetime" TIMESTAMP(3),
ALTER COLUMN "isin" DROP NOT NULL,
ALTER COLUMN "cusip" DROP NOT NULL,
ALTER COLUMN "sedol" DROP NOT NULL,
ALTER COLUMN "institution_security_id" DROP NOT NULL,
ALTER COLUMN "institution_id" DROP NOT NULL,
ALTER COLUMN "proxy_security_id" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "ticker_symbol" DROP NOT NULL,
ALTER COLUMN "is_cash_equivalent" DROP NOT NULL,
ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "close_price" DROP NOT NULL,
ALTER COLUMN "close_price_as_of" DROP NOT NULL,
ALTER COLUMN "iso_currency_code" DROP NOT NULL,
ALTER COLUMN "unofficial_currency_code" DROP NOT NULL,
ALTER COLUMN "market_identifier_code" DROP NOT NULL,
ALTER COLUMN "sector" DROP NOT NULL,
ALTER COLUMN "industry" DROP NOT NULL,
ALTER COLUMN "option_contract_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "OptionContract" (
    "id" SERIAL NOT NULL,
    "contract_type" TEXT NOT NULL,
    "expiration_date" TEXT NOT NULL,
    "strike_price" DECIMAL(65,30) NOT NULL,
    "underlying_security_ticker" TEXT NOT NULL,
    "securityId" TEXT NOT NULL,

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
CREATE UNIQUE INDEX "OptionContract_securityId_key" ON "OptionContract"("securityId");

-- CreateIndex
CREATE UNIQUE INDEX "FixedIncome_securityId_key" ON "FixedIncome"("securityId");

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_security_id_fkey" FOREIGN KEY ("security_id") REFERENCES "Security"("security_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptionContract" ADD CONSTRAINT "OptionContract_securityId_fkey" FOREIGN KEY ("securityId") REFERENCES "Security"("security_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FixedIncome" ADD CONSTRAINT "FixedIncome_securityId_fkey" FOREIGN KEY ("securityId") REFERENCES "Security"("security_id") ON DELETE RESTRICT ON UPDATE CASCADE;
