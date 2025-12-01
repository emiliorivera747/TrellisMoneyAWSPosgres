/*
  Warnings:

  - The primary key for the `Household` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Household` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - The primary key for the `_HouseholdMembers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `household_id` was added to the `Household` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_household_id_fkey";

-- DropForeignKey
ALTER TABLE "Household" DROP CONSTRAINT "Household_head_of_household_id_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_household_id_fkey";

-- DropForeignKey
ALTER TABLE "_HouseholdMembers" DROP CONSTRAINT "_HouseholdMembers_A_fkey";

-- DropForeignKey
ALTER TABLE "_HouseholdMembers" DROP CONSTRAINT "_HouseholdMembers_B_fkey";

-- DropIndex
DROP INDEX "User_user_id_key";

-- AlterTable
ALTER TABLE "Household" DROP CONSTRAINT "Household_pkey",
DROP COLUMN "id",
ADD COLUMN     "household_id" TEXT NOT NULL,
ADD CONSTRAINT "Household_pkey" PRIMARY KEY ("household_id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");

-- AlterTable
ALTER TABLE "_HouseholdMembers" DROP CONSTRAINT "_HouseholdMembers_AB_pkey",
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_HouseholdMembers_AB_pkey" PRIMARY KEY ("A", "B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_household_id_fkey" FOREIGN KEY ("household_id") REFERENCES "Household"("household_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_household_id_fkey" FOREIGN KEY ("household_id") REFERENCES "Household"("household_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HouseholdMembers" ADD CONSTRAINT "_HouseholdMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "Household"("household_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HouseholdMembers" ADD CONSTRAINT "_HouseholdMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
