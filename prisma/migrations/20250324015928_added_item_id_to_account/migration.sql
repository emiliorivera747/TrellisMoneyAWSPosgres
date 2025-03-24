/*
  Warnings:

  - A unique constraint covering the columns `[item_id]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `item_id` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "item_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_item_id_key" ON "Account"("item_id");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;
