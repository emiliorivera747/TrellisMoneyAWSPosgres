/*
  Warnings:

  - You are about to drop the column `timestamp` on the `HoldingHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HoldingHistory" DROP COLUMN "timestamp",
ADD COLUMN     "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
