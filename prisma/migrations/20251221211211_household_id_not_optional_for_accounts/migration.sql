/*
  Warnings:

  - Made the column `household_id` on table `Account` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "household_id" SET NOT NULL;
