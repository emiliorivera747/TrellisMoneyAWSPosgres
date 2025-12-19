/*
  Warnings:

  - The `recurring_usage_type` column on the `Price` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `current_period_end` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `current_period_start` on the `Subscription` table. All the data in the column will be lost.
  - The `start_date` column on the `Subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_at` column on the `Subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_at` column on the `Subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `canceled_at` column on the `Subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ended_at` column on the `Subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `trial_end` column on the `Subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `trial_start` column on the `Subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UsageType" AS ENUM ('metered', 'licensed');

-- AlterTable
ALTER TABLE "Price" DROP COLUMN "recurring_usage_type",
ADD COLUMN     "recurring_usage_type" "UsageType" NOT NULL DEFAULT 'licensed';

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "current_period_end",
DROP COLUMN "current_period_start",
ADD COLUMN     "cancel_at" INTEGER,
DROP COLUMN "start_date",
ADD COLUMN     "start_date" INTEGER,
DROP COLUMN "created_at",
ADD COLUMN     "created_at" INTEGER,
DROP COLUMN "updated_at",
ADD COLUMN     "updated_at" INTEGER,
DROP COLUMN "canceled_at",
ADD COLUMN     "canceled_at" INTEGER,
DROP COLUMN "ended_at",
ADD COLUMN     "ended_at" INTEGER,
DROP COLUMN "trial_end",
ADD COLUMN     "trial_end" INTEGER,
DROP COLUMN "trial_start",
ADD COLUMN     "trial_start" INTEGER;
