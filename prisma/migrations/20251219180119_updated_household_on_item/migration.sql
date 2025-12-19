/*
  Warnings:

  - Made the column `household_id` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_household_id_fkey";

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "household_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_household_id_fkey" FOREIGN KEY ("household_id") REFERENCES "Household"("household_id") ON DELETE RESTRICT ON UPDATE CASCADE;
