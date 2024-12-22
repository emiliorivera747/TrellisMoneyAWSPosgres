-- DropForeignKey
ALTER TABLE "Holding" DROP CONSTRAINT "Holding_security_id_fkey";

-- DropForeignKey
ALTER TABLE "HoldingHistory" DROP CONSTRAINT "HoldingHistory_holding_account_id_holding_security_id_fkey";

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_security_id_fkey" FOREIGN KEY ("security_id") REFERENCES "Security"("security_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HoldingHistory" ADD CONSTRAINT "HoldingHistory_holding_account_id_holding_security_id_fkey" FOREIGN KEY ("holding_account_id", "holding_security_id") REFERENCES "Holding"("account_id", "security_id") ON DELETE CASCADE ON UPDATE CASCADE;
