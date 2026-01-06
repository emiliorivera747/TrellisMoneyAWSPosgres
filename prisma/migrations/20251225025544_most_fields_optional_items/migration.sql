-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "institution_id" DROP NOT NULL,
ALTER COLUMN "update_type" DROP NOT NULL,
ALTER COLUMN "consent_expiration_time" DROP NOT NULL,
ALTER COLUMN "available_products" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "billed_products" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "products" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "consented_products" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "consented_data_scopes" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "consented_use_cases" SET DEFAULT ARRAY[]::TEXT[];
