/*
  Warnings:

  - You are about to drop the `_HouseholdMembers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updated_at` to the `Household` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_HouseholdMembers" DROP CONSTRAINT "_HouseholdMembers_A_fkey";

-- DropForeignKey
ALTER TABLE "_HouseholdMembers" DROP CONSTRAINT "_HouseholdMembers_B_fkey";

-- AlterTable
ALTER TABLE "Household" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" SET DEFAULT 'Our Household';

-- DropTable
DROP TABLE "_HouseholdMembers";

-- CreateTable
CREATE TABLE "HouseholdMember" (
    "member_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "dob" TIMESTAMP(3),
    "invited_email" TEXT,
    "invite_status" TEXT NOT NULL DEFAULT 'pending',
    "household_id" TEXT NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "HouseholdMember_pkey" PRIMARY KEY ("member_id")
);

-- CreateIndex
CREATE INDEX "HouseholdMember_household_id_idx" ON "HouseholdMember"("household_id");

-- CreateIndex
CREATE INDEX "HouseholdMember_user_id_idx" ON "HouseholdMember"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "HouseholdMember_household_id_user_id_key" ON "HouseholdMember"("household_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "HouseholdMember_household_id_invited_email_key" ON "HouseholdMember"("household_id", "invited_email");

-- AddForeignKey
ALTER TABLE "Household" ADD CONSTRAINT "Household_head_of_household_id_fkey" FOREIGN KEY ("head_of_household_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseholdMember" ADD CONSTRAINT "HouseholdMember_household_id_fkey" FOREIGN KEY ("household_id") REFERENCES "Household"("household_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseholdMember" ADD CONSTRAINT "HouseholdMember_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
