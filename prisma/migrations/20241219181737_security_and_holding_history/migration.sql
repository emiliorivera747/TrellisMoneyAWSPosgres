-- CreateTable
CREATE TABLE "HoldingHistory" (
    "id" SERIAL NOT NULL,
    "holding_id" INTEGER NOT NULL,
    "cost_basis" DECIMAL(65,30) NOT NULL,
    "institution_price" DECIMAL(65,30) NOT NULL,
    "institution_price_as_of" TIMESTAMP(3) NOT NULL,
    "institution_price_datetime" TIMESTAMP(3),
    "institution_value" DECIMAL(65,30) NOT NULL,
    "iso_currency_code" TEXT NOT NULL,
    "unofficial_currency_code" TEXT,
    "vested_quantity" DECIMAL(65,30),
    "vested_value" DECIMAL(65,30) NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "account_id" TEXT NOT NULL,
    "security_id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "holding_account_id" TEXT NOT NULL,
    "holding_security_id" TEXT NOT NULL,

    CONSTRAINT "HoldingHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecurityHistory" (
    "id" SERIAL NOT NULL,
    "security_id" TEXT NOT NULL,
    "isin" TEXT,
    "cusip" TEXT,
    "sedol" TEXT,
    "institution_security_id" TEXT,
    "institution_id" TEXT,
    "proxy_security_id" TEXT,
    "name" TEXT,
    "ticker_symbol" TEXT,
    "is_cash_equivalent" BOOLEAN,
    "type" TEXT,
    "close_price" DECIMAL(65,30),
    "close_price_as_of" TIMESTAMP(3),
    "update_datetime" TIMESTAMP(3),
    "iso_currency_code" TEXT,
    "unofficial_currency_code" TEXT,
    "market_identifier_code" TEXT,
    "sector" TEXT,
    "industry" TEXT,
    "option_contract_id" INTEGER,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SecurityHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HoldingHistory" ADD CONSTRAINT "HoldingHistory_holding_account_id_holding_security_id_fkey" FOREIGN KEY ("holding_account_id", "holding_security_id") REFERENCES "Holding"("account_id", "security_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecurityHistory" ADD CONSTRAINT "SecurityHistory_security_id_fkey" FOREIGN KEY ("security_id") REFERENCES "Security"("security_id") ON DELETE RESTRICT ON UPDATE CASCADE;
