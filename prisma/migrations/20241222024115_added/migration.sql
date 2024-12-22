/*
  Warnings:

  - The primary key for the `Holding` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `holding_id` on the `Holding` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Holding" DROP CONSTRAINT "Holding_security_id_fkey";

-- DropForeignKey
ALTER TABLE "Holding" DROP CONSTRAINT "Holding_user_id_fkey";

-- AlterTable
ALTER TABLE "Holding" DROP CONSTRAINT "Holding_pkey",
DROP COLUMN "holding_id",
ADD CONSTRAINT "Holding_pkey" PRIMARY KEY ("security_id", "user_id", "account_id");

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_security_id_fkey" FOREIGN KEY ("security_id") REFERENCES "Security"("security_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
