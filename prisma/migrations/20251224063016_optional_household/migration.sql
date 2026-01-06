-- DropForeignKey
ALTER TABLE "HouseholdMember" DROP CONSTRAINT "HouseholdMember_household_id_fkey";

-- AlterTable
ALTER TABLE "HouseholdMember" ALTER COLUMN "household_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "HouseholdMember" ADD CONSTRAINT "HouseholdMember_household_id_fkey" FOREIGN KEY ("household_id") REFERENCES "Household"("household_id") ON DELETE SET NULL ON UPDATE CASCADE;
