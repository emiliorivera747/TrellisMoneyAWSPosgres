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
ALTER TABLE "public"."Account" DROP CONSTRAINT "Account_balance_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Account" DROP CONSTRAINT "Account_item_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Account" DROP CONSTRAINT "Account_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."AccountHistory" DROP CONSTRAINT "AccountHistory_account_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."FixedIncome" DROP CONSTRAINT "FixedIncome_securityId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Holding" DROP CONSTRAINT "Holding_account_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Holding" DROP CONSTRAINT "Holding_security_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Holding" DROP CONSTRAINT "Holding_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."HoldingHistory" DROP CONSTRAINT "HoldingHistory_security_id_user_id_account_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Item" DROP CONSTRAINT "Item_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Profile" DROP CONSTRAINT "Profile_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Security" DROP CONSTRAINT "Security_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."SecurityHistory" DROP CONSTRAINT "SecurityHistory_security_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Subscription" DROP CONSTRAINT "Subscription_user_id_fkey";

-- DropTable
DROP TABLE "public"."Account";

-- DropTable
DROP TABLE "public"."AccountHistory";

-- DropTable
DROP TABLE "public"."Balance";

-- DropTable
DROP TABLE "public"."FixedIncome";

-- DropTable
DROP TABLE "public"."Holding";

-- DropTable
DROP TABLE "public"."HoldingHistory";

-- DropTable
DROP TABLE "public"."Item";

-- DropTable
DROP TABLE "public"."OptionContract";

-- DropTable
DROP TABLE "public"."Owner";

-- DropTable
DROP TABLE "public"."Profile";

-- DropTable
DROP TABLE "public"."Security";

-- DropTable
DROP TABLE "public"."SecurityHistory";

-- DropTable
DROP TABLE "public"."Subscription";

-- DropTable
DROP TABLE "public"."TransactionStatus";

-- DropTable
DROP TABLE "public"."User";

-- DropTable
DROP TABLE "public"."WebhookStatus";

-- DropEnum
DROP TYPE "public"."Plan";

-- DropEnum
DROP TYPE "public"."SubscriptionPeriod";
