/*
  Warnings:

  - A unique constraint covering the columns `[head_of_household_id]` on the table `Household` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `head_of_household_id` to the `Household` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Household" ADD COLUMN     "head_of_household_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Household_head_of_household_id_key" ON "Household"("head_of_household_id");

-- AddForeignKey
ALTER TABLE "Household" ADD CONSTRAINT "Household_head_of_household_id_fkey" FOREIGN KEY ("head_of_household_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
