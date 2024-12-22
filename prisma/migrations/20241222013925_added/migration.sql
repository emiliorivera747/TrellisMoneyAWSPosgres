-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_security_id_fkey" FOREIGN KEY ("security_id") REFERENCES "Security"("security_id") ON DELETE SET NULL ON UPDATE CASCADE;
