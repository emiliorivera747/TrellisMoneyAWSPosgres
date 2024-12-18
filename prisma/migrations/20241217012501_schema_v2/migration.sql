/*
  Warnings:

  - You are about to drop the column `securityId` on the `OptionContract` table. All the data in the column will be lost.
  - The `option_contract_id` column on the `Security` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `user_id` to the `Holding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Security` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OptionContract" DROP CONSTRAINT "OptionContract_securityId_fkey";

-- DropIndex
DROP INDEX "OptionContract_securityId_key";

-- AlterTable
ALTER TABLE "Holding" ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "institution_price_datetime" DROP NOT NULL,
ALTER COLUMN "unofficial_currency_code" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OptionContract" DROP COLUMN "securityId";

-- AlterTable
ALTER TABLE "Security" ADD COLUMN     "user_id" TEXT NOT NULL,
DROP COLUMN "option_contract_id",
ADD COLUMN     "option_contract_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Security" ADD CONSTRAINT "Security_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
