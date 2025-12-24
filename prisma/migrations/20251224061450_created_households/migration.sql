/*
  Warnings:

  - Added the required column `created_by_member_id` to the `Household` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Household" ADD COLUMN     "created_by_member_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Household" ADD CONSTRAINT "Household_created_by_member_id_fkey" FOREIGN KEY ("created_by_member_id") REFERENCES "HouseholdMember"("member_id") ON DELETE RESTRICT ON UPDATE CASCADE;
