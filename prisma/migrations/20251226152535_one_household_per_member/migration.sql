/*
  Warnings:

  - You are about to drop the column `created_by_member_id` on the `Household` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[member_id]` on the table `Holding` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[household_id]` on the table `HouseholdMember` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[created_household_id]` on the table `HouseholdMember` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `HouseholdMember` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `household_id` to the `HoldingHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `household_id` to the `Security` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Household" DROP CONSTRAINT "Household_created_by_member_id_fkey";

-- DropForeignKey
ALTER TABLE "HouseholdMember" DROP CONSTRAINT "HouseholdMember_household_id_fkey";

-- DropIndex
DROP INDEX "Household_created_by_member_id_idx";

-- AlterTable
ALTER TABLE "Holding" ADD COLUMN     "household_id" TEXT;

-- AlterTable
ALTER TABLE "HoldingHistory" ADD COLUMN     "household_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Household" DROP COLUMN "created_by_member_id";

-- AlterTable
ALTER TABLE "HouseholdMember" ADD COLUMN     "created_household_id" TEXT,
ALTER COLUMN "household_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Security" ADD COLUMN     "household_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Holding_member_id_key" ON "Holding"("member_id");

-- CreateIndex
CREATE UNIQUE INDEX "HouseholdMember_household_id_key" ON "HouseholdMember"("household_id");

-- CreateIndex
CREATE UNIQUE INDEX "HouseholdMember_created_household_id_key" ON "HouseholdMember"("created_household_id");

-- CreateIndex
CREATE UNIQUE INDEX "HouseholdMember_user_id_key" ON "HouseholdMember"("user_id");

-- AddForeignKey
ALTER TABLE "HouseholdMember" ADD CONSTRAINT "HouseholdMember_household_id_fkey" FOREIGN KEY ("household_id") REFERENCES "Household"("household_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseholdMember" ADD CONSTRAINT "HouseholdMember_created_household_id_fkey" FOREIGN KEY ("created_household_id") REFERENCES "Household"("household_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_household_id_fkey" FOREIGN KEY ("household_id") REFERENCES "Household"("household_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Security" ADD CONSTRAINT "Security_household_id_fkey" FOREIGN KEY ("household_id") REFERENCES "Household"("household_id") ON DELETE RESTRICT ON UPDATE CASCADE;
