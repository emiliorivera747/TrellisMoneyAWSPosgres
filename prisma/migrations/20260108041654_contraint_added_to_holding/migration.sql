/*
  Warnings:

  - The primary key for the `Holding` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `timestamp` on the `Holding` table. All the data in the column will be lost.
  - You are about to alter the column `cost_basis` on the `Holding` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(20,2)`.
  - You are about to alter the column `institution_price` on the `Holding` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(20,8)`.
  - You are about to alter the column `institution_value` on the `Holding` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(20,2)`.
  - You are about to alter the column `expected_annual_return_rate` on the `Holding` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,4)`.
  - You are about to alter the column `vested_quantity` on the `Holding` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(20,8)`.
  - You are about to alter the column `vested_value` on the `Holding` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(20,2)`.
  - You are about to alter the column `quantity` on the `Holding` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(20,8)`.
  - You are about to drop the `HoldingHistory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[security_id,user_id,account_id]` on the table `Holding` will be added. If there are existing duplicate values, this will fail.
  - The required column `holding_id` was added to the `Holding` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updated_at` to the `Holding` table without a default value. This is not possible if the table is not empty.
  - Made the column `expected_annual_return_rate` on table `Holding` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "HoldingHistory" DROP CONSTRAINT "HoldingHistory_security_id_user_id_account_id_fkey";

-- AlterTable
ALTER TABLE "Holding" DROP CONSTRAINT "Holding_pkey",
DROP COLUMN "timestamp",
ADD COLUMN     "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "holding_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMPTZ(3) NOT NULL,
ALTER COLUMN "cost_basis" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "institution_price" SET DATA TYPE DECIMAL(20,8),
ALTER COLUMN "institution_value" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "expected_annual_return_rate" SET NOT NULL,
ALTER COLUMN "expected_annual_return_rate" SET DATA TYPE DECIMAL(5,4),
ALTER COLUMN "iso_currency_code" DROP NOT NULL,
ALTER COLUMN "vested_quantity" SET DATA TYPE DECIMAL(20,8),
ALTER COLUMN "vested_value" SET DATA TYPE DECIMAL(20,2),
ALTER COLUMN "quantity" SET DATA TYPE DECIMAL(20,8),
ADD CONSTRAINT "Holding_pkey" PRIMARY KEY ("holding_id");

-- DropTable
DROP TABLE "HoldingHistory";

-- CreateIndex
CREATE INDEX "Holding_security_id_user_id_account_id_idx" ON "Holding"("security_id", "user_id", "account_id");

-- CreateIndex
CREATE INDEX "Holding_user_id_idx" ON "Holding"("user_id");

-- CreateIndex
CREATE INDEX "Holding_account_id_idx" ON "Holding"("account_id");

-- CreateIndex
CREATE INDEX "Holding_member_id_idx" ON "Holding"("member_id");

-- CreateIndex
CREATE UNIQUE INDEX "Holding_security_id_user_id_account_id_key" ON "Holding"("security_id", "user_id", "account_id");
