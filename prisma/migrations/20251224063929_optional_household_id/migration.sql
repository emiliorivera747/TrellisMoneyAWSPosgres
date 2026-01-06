-- DropForeignKey
ALTER TABLE "Household" DROP CONSTRAINT "Household_created_by_member_id_fkey";

-- AlterTable
ALTER TABLE "Household" ALTER COLUMN "created_by_member_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Household" ADD CONSTRAINT "Household_created_by_member_id_fkey" FOREIGN KEY ("created_by_member_id") REFERENCES "HouseholdMember"("member_id") ON DELETE SET NULL ON UPDATE CASCADE;
