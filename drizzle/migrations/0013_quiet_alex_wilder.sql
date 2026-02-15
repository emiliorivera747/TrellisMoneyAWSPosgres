CREATE TYPE "public"."SnapshotSource" AS ENUM('SYSTEM', 'BACKFILL', 'MANUAL');--> statement-breakpoint
CREATE TABLE "NetWorthSnapshot" (
	"net_worth_snapshot_id" varchar PRIMARY KEY NOT NULL,
	"household_id" varchar NOT NULL,
	"snapshot_date" date NOT NULL,
	"snapshot_at" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"total_assets" numeric(28, 8) NOT NULL,
	"total_liabilities" numeric(28, 8) NOT NULL,
	"net_worth" numeric(28, 8) NOT NULL,
	"cash_assets" numeric(28, 8),
	"investment_assets" numeric(28, 8),
	"other_assets" numeric(28, 8),
	"credit_liabilities" numeric(28, 8),
	"loan_liabilities" numeric(28, 8),
	"other_liabilities" numeric(28, 8),
	"calculation_version" varchar,
	"source" "SnapshotSource" DEFAULT 'SYSTEM',
	"created_at" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "NetWorthSnapshot_household_id_snapshot_date_unique" UNIQUE("household_id","snapshot_date")
);
--> statement-breakpoint
CREATE TABLE "Waitlist" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "Waitlist_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "NetWorthSnapshot" ADD CONSTRAINT "NetWorthSnapshot_household_id_fkey" FOREIGN KEY ("household_id") REFERENCES "public"."Household"("household_id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "NetWorthSnapshot_household_id_idx" ON "NetWorthSnapshot" USING btree ("household_id" text_ops);--> statement-breakpoint
CREATE INDEX "NetWorthSnapshot_snapshot_date_idx" ON "NetWorthSnapshot" USING btree ("snapshot_date");--> statement-breakpoint
CREATE UNIQUE INDEX "Waitlist_email_key" ON "Waitlist" USING btree ("email");