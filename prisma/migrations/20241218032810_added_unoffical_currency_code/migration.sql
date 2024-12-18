-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "holder_catergory" TEXT,
ADD COLUMN     "mask" TEXT,
ADD COLUMN     "officail_name" TEXT,
ADD COLUMN     "persistent_account_id" TEXT,
ADD COLUMN     "subtype" TEXT,
ADD COLUMN     "verification_status" TEXT;

-- AlterTable
ALTER TABLE "Balance" ADD COLUMN     "last_updated" TIMESTAMP(3),
ADD COLUMN     "unofficial_currency_code" TEXT;
