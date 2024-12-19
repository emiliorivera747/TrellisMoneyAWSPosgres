-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "timestamp" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "AccountHistory" ALTER COLUMN "timestamp" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "Balance" ALTER COLUMN "last_updated" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "timestamp" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "Holding" ALTER COLUMN "institution_price_as_of" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "institution_price_datetime" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "timestamp" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "HoldingHistory" ALTER COLUMN "institution_price_as_of" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "institution_price_datetime" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "timestamp" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "Security" ALTER COLUMN "close_price_as_of" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "update_datetime" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "timestamp" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "SecurityHistory" ALTER COLUMN "close_price_as_of" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "update_datetime" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "timestamp" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(3);
