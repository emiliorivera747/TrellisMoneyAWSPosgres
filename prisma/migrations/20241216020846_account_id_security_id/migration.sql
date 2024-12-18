/*
  Warnings:

  - You are about to drop the column `securitySecurity_id` on the `Holding` table. All the data in the column will be lost.
  - The `holding_id` column on the `Holding` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[account_id,security_id]` on the table `Holding` will be added. If there are existing duplicate values, this will fail.
  - Made the column `user_id` on table `Account` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_user_id_fkey";

-- DropIndex
DROP INDEX "Holding_holding_id_key";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "user_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Holding" DROP COLUMN "securitySecurity_id",
DROP COLUMN "holding_id",
ADD COLUMN     "holding_id" SERIAL NOT NULL,
ADD CONSTRAINT "Holding_pkey" PRIMARY KEY ("holding_id");

-- CreateIndex
CREATE UNIQUE INDEX "Holding_account_id_security_id_key" ON "Holding"("account_id", "security_id");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
