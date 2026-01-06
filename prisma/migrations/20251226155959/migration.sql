/*
  Warnings:

  - You are about to drop the column `created_household_id` on the `HouseholdMember` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[created_by_id]` on the table `Household` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "HouseholdMember" DROP CONSTRAINT "HouseholdMember_created_household_id_fkey";

-- DropIndex
DROP INDEX "HouseholdMember_created_household_id_key";

-- AlterTable
ALTER TABLE "Household" ADD COLUMN     "created_by_id" TEXT;

-- AlterTable
ALTER TABLE "HouseholdMember" DROP COLUMN "created_household_id";

-- CreateIndex
CREATE UNIQUE INDEX "Household_created_by_id_key" ON "Household"("created_by_id");

-- AddForeignKey
ALTER TABLE "Household" ADD CONSTRAINT "Household_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "HouseholdMember"("member_id") ON DELETE SET NULL ON UPDATE CASCADE;
