/*
  Warnings:

  - You are about to drop the column `account_id` on the `Security` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Security" DROP CONSTRAINT "Security_account_id_fkey";

-- AlterTable
ALTER TABLE "Security" DROP COLUMN "account_id";
