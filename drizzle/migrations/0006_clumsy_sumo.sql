ALTER TABLE "Account" DROP CONSTRAINT "Account_user_id_fkey";
--> statement-breakpoint
ALTER TABLE "Account" ALTER COLUMN "balance_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Account" DROP COLUMN "user_id";