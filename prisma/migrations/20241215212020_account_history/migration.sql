-- CreateTable
CREATE TABLE "AccountHistory" (
    "id" SERIAL NOT NULL,
    "account_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "available" DECIMAL(65,30) NOT NULL,
    "current" DECIMAL(65,30) NOT NULL,
    "limit" DECIMAL(65,30) NOT NULL,
    "iso_currency_code" TEXT NOT NULL,
    "unofficial_currency_code" TEXT NOT NULL,
    "user_id" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccountHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AccountHistory" ADD CONSTRAINT "AccountHistory_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;
