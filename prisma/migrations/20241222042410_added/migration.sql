/*
  Warnings:

  - Added the required column `user_id` to the `HoldingHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HoldingHistory" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "HoldingHistory" ADD CONSTRAINT "HoldingHistory_security_id_user_id_account_id_fkey" FOREIGN KEY ("security_id", "user_id", "account_id") REFERENCES "Holding"("security_id", "user_id", "account_id") ON DELETE CASCADE ON UPDATE CASCADE;
