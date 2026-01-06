/*
  Warnings:

  - A unique constraint covering the columns `[household_id,email]` on the table `HouseholdMember` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "HouseholdMember_household_id_email_key" ON "HouseholdMember"("household_id", "email");
