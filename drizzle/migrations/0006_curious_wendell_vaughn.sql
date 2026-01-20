ALTER TABLE "Item" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "Item" ALTER COLUMN "updated_at" DROP NOT NULL;