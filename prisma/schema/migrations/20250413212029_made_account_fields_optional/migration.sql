/*
  Warnings:

  - You are about to drop the column `officail_name` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "officail_name",
ADD COLUMN     "official_name" TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "available" DROP NOT NULL,
ALTER COLUMN "current" DROP NOT NULL,
ALTER COLUMN "limit" DROP NOT NULL,
ALTER COLUMN "iso_currency_code" DROP NOT NULL,
ALTER COLUMN "unofficial_currency_code" DROP NOT NULL;
