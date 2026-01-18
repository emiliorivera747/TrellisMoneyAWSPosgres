ALTER TABLE "_prisma_migrations" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "_prisma_migrations" CASCADE;--> statement-breakpoint
DROP INDEX "Account_household_member_id_type_idx";--> statement-breakpoint
CREATE INDEX "Account_household_member_id_type_idx" ON "Account" USING btree ("household_member_id" text_ops,"type");