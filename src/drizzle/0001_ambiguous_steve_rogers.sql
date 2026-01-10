ALTER TABLE "Price" ALTER COLUMN "recurring_interval" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Household" ADD COLUMN "user_id" text;