ALTER TABLE "Account" ALTER COLUMN "available_balance" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "Account" ALTER COLUMN "current_balance" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "Account" ALTER COLUMN "limit_amount" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "Account" ALTER COLUMN "expected_annual_return_rate" SET DEFAULT 0.06;