/*
  Warnings:

  - You are about to drop the column `invite_status` on the `HouseholdMember` table. All the data in the column will be lost.
  - You are about to drop the column `invited_email` on the `HouseholdMember` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `HouseholdMember` table without a default value. This is not possible if the table is not empty.
  - Made the column `household_id` on table `HouseholdMember` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "HouseholdMember" DROP CONSTRAINT "HouseholdMember_household_id_fkey";

-- DropIndex
DROP INDEX "HouseholdMember_household_id_invited_email_key";

-- AlterTable
ALTER TABLE "HouseholdMember" DROP COLUMN "invite_status",
DROP COLUMN "invited_email",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "household_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "HouseholdMember" ADD CONSTRAINT "HouseholdMember_household_id_fkey" FOREIGN KEY ("household_id") REFERENCES "Household"("household_id") ON DELETE RESTRICT ON UPDATE CASCADE;
