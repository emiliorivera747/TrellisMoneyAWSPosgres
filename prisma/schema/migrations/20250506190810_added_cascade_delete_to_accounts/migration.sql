-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_balance_id_fkey";

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_item_id_fkey";

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_user_id_fkey";

-- DropForeignKey
ALTER TABLE "AccountHistory" DROP CONSTRAINT "AccountHistory_account_id_fkey";

-- DropForeignKey
ALTER TABLE "Holding" DROP CONSTRAINT "Holding_account_id_fkey";

-- DropForeignKey
ALTER TABLE "Holding" DROP CONSTRAINT "Holding_security_id_fkey";

-- DropForeignKey
ALTER TABLE "Holding" DROP CONSTRAINT "Holding_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_balance_id_fkey" FOREIGN KEY ("balance_id") REFERENCES "Balance"("balance_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("item_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountHistory" ADD CONSTRAINT "AccountHistory_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_security_id_fkey" FOREIGN KEY ("security_id") REFERENCES "Security"("security_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
