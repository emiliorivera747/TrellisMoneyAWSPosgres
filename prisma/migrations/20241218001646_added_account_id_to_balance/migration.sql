/*
  Warnings:

  - You are about to drop the column `accountId` on the `Balance` table. All the data in the column will be lost.
  - Added the required column `account_id` to the `Balance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_accountId_fkey";

-- AlterTable
ALTER TABLE "Balance" DROP COLUMN "accountId",
ADD COLUMN     "account_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;
