ALTER TABLE "Holding" DROP CONSTRAINT "Holding_household_member_id_fkey";
--> statement-breakpoint
DROP INDEX "Holding_household_member_id_idx";--> statement-breakpoint
DROP INDEX "Holding_household_member_id_security_id_idx";--> statement-breakpoint
ALTER TABLE "Holding" DROP COLUMN "household_member_id";