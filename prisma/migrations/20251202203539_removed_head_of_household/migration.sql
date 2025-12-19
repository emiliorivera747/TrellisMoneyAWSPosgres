/*
  Warnings:

  - You are about to drop the column `head_of_household_id` on the `Household` table. All the data in the column will be lost.
  - The `role` column on the `HouseholdMember` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "HouseholdRole" AS ENUM ('ADMIN', 'MEMBER', 'GUEST');

-- DropForeignKey
ALTER TABLE "Household" DROP CONSTRAINT "Household_head_of_household_id_fkey";

-- DropIndex
DROP INDEX "Household_head_of_household_id_key";

-- AlterTable
ALTER TABLE "Household" DROP COLUMN "head_of_household_id";

-- AlterTable
ALTER TABLE "HouseholdMember" DROP COLUMN "role",
ADD COLUMN     "role" "HouseholdRole" NOT NULL DEFAULT 'MEMBER';
