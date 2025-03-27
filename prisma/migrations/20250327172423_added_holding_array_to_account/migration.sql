/*
  Warnings:

  - You are about to drop the column `holder_catergory` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "holder_catergory",
ADD COLUMN     "holder_category" TEXT;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;
