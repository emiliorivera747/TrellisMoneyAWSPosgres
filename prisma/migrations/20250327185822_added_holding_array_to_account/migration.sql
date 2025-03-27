-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;
