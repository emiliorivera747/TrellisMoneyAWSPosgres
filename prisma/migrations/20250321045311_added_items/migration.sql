/*
  Warnings:

  - You are about to drop the column `accountId` on the `Item` table. All the data in the column will be lost.
  - Added the required column `access_token` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "accountId",
ADD COLUMN     "access_token" TEXT NOT NULL,
ADD COLUMN     "auth_method" TEXT,
ADD COLUMN     "available_products" TEXT[],
ADD COLUMN     "billed_products" TEXT[],
ADD COLUMN     "consented_data_scopes" TEXT[],
ADD COLUMN     "consented_products" TEXT[],
ADD COLUMN     "consented_use_cases" TEXT[],
ADD COLUMN     "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "error" TEXT,
ADD COLUMN     "products" TEXT[],
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "TransactionStatus" (
    "id" SERIAL NOT NULL,
    "last_successful_update" TIMESTAMPTZ(3) NOT NULL,
    "last_failed_update" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "TransactionStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebhookStatus" (
    "id" SERIAL NOT NULL,
    "sent_at" TIMESTAMPTZ(3) NOT NULL,
    "code_sent" TEXT NOT NULL,

    CONSTRAINT "WebhookStatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
