/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AccountHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Balance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FixedIncome` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Holding` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HoldingHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OptionContract` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Owner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Security` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SecurityHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TransactionStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WebhookStatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_balance_id_fkey";

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_item_id_fkey";

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_user_id_fkey";

-- DropForeignKey
ALTER TABLE "AccountHistory" DROP CONSTRAINT "AccountHistory_account_id_fkey";

-- DropForeignKey
ALTER TABLE "FixedIncome" DROP CONSTRAINT "FixedIncome_securityId_fkey";

-- DropForeignKey
ALTER TABLE "Holding" DROP CONSTRAINT "Holding_account_id_fkey";

-- DropForeignKey
ALTER TABLE "Holding" DROP CONSTRAINT "Holding_security_id_fkey";

-- DropForeignKey
ALTER TABLE "Holding" DROP CONSTRAINT "Holding_user_id_fkey";

-- DropForeignKey
ALTER TABLE "HoldingHistory" DROP CONSTRAINT "HoldingHistory_security_id_user_id_account_id_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Security" DROP CONSTRAINT "Security_user_id_fkey";

-- DropForeignKey
ALTER TABLE "SecurityHistory" DROP CONSTRAINT "SecurityHistory_security_id_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_user_id_fkey";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "AccountHistory";

-- DropTable
DROP TABLE "Balance";

-- DropTable
DROP TABLE "FixedIncome";

-- DropTable
DROP TABLE "Holding";

-- DropTable
DROP TABLE "HoldingHistory";

-- DropTable
DROP TABLE "Item";

-- DropTable
DROP TABLE "OptionContract";

-- DropTable
DROP TABLE "Owner";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "Security";

-- DropTable
DROP TABLE "SecurityHistory";

-- DropTable
DROP TABLE "Subscription";

-- DropTable
DROP TABLE "TransactionStatus";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "WebhookStatus";

-- DropEnum
DROP TYPE "Plan";

-- DropEnum
DROP TYPE "SubscriptionPeriod";
