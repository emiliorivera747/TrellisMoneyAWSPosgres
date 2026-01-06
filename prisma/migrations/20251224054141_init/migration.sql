/*
  Warnings:

  - Added the required column `member_id` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `member_id` to the `Holding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `member_id` to the `HoldingHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `member_id` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `member_id` to the `Security` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "member_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AccountHistory" ADD COLUMN     "member_id" TEXT;

-- AlterTable
ALTER TABLE "Holding" ADD COLUMN     "member_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "HoldingHistory" ADD COLUMN     "member_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "member_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Security" ADD COLUMN     "member_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "HouseholdMember"("member_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "HouseholdMember"("member_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "HouseholdMember"("member_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Security" ADD CONSTRAINT "Security_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "HouseholdMember"("member_id") ON DELETE RESTRICT ON UPDATE CASCADE;
