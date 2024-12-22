/*
  Warnings:

  - The primary key for the `Holding` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `holding_account_id` on the `HoldingHistory` table. All the data in the column will be lost.
  - You are about to drop the column `holding_security_id` on the `HoldingHistory` table. All the data in the column will be lost.
  - Added the required column `holding_id` to the `HoldingHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HoldingHistory" DROP CONSTRAINT "HoldingHistory_holding_account_id_holding_security_id_fkey";

-- AlterTable
ALTER TABLE "Holding" DROP CONSTRAINT "Holding_pkey",
ADD COLUMN     "holding_id" SERIAL NOT NULL,
ADD CONSTRAINT "Holding_pkey" PRIMARY KEY ("holding_id");

-- AlterTable
ALTER TABLE "HoldingHistory" DROP COLUMN "holding_account_id",
DROP COLUMN "holding_security_id",
ADD COLUMN     "holding_id" INTEGER NOT NULL;
