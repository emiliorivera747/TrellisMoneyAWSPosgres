ALTER TABLE "Item" ALTER COLUMN "institution_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Item" ALTER COLUMN "update_type" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Item" ALTER COLUMN "consent_expiration_time" DROP NOT NULL;