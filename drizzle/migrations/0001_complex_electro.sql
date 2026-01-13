ALTER TABLE "HoldingHistory" DROP CONSTRAINT "HoldingHistory_security_id_user_id_account_id_fkey";
--> statement-breakpoint
ALTER TABLE "Holding" DROP CONSTRAINT "Holding_pkey";--> statement-breakpoint
ALTER TABLE "Account" ADD PRIMARY KEY ("account_id");--> statement-breakpoint
ALTER TABLE "Holding" ADD COLUMN "holding_id" text PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "HoldingHistory" ADD COLUMN "holding_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "HoldingHistory" ADD CONSTRAINT "HoldingHistory_holding_id_fkey" FOREIGN KEY ("holding_id") REFERENCES "public"."Holding"("holding_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE UNIQUE INDEX "Holding_account_id_security_id_user_id_key" ON "Holding" USING btree ("account_id" text_ops,"security_id" text_ops,"user_id" text_ops);