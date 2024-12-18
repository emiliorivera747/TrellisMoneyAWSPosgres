/*
  Warnings:

  - You are about to drop the column `account_id` on the `Balance` table. All the data in the column will be lost.
  - You are about to drop the column `unofficial_currency_code` on the `Balance` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[balance_id]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `balance_id` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_account_id_fkey";

-- DropForeignKey
ALTER TABLE "Holding" DROP CONSTRAINT "Holding_account_id_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Owner" DROP CONSTRAINT "Owner_accountId_fkey";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "balance_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Balance" DROP COLUMN "account_id",
DROP COLUMN "unofficial_currency_code";

-- CreateIndex
CREATE UNIQUE INDEX "Account_balance_id_key" ON "Account"("balance_id");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_balance_id_fkey" FOREIGN KEY ("balance_id") REFERENCES "Balance"("balance_id") ON DELETE RESTRICT ON UPDATE CASCADE;
