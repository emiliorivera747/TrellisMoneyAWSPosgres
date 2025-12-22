-- Step 1: Temporarily drop the dependent foreign key constraints
ALTER TABLE "AccountHistory" DROP CONSTRAINT IF EXISTS "AccountHistory_account_id_fkey";
ALTER TABLE "Holding"        DROP CONSTRAINT IF EXISTS "Holding_account_id_fkey";

-- Step 2: Drop the old unique index (now safe)
DROP INDEX IF EXISTS "Account_account_id_key";

-- Step 3: Add the primary key constraint on account_id
ALTER TABLE "Account" ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("account_id");

-- Step 4: Recreate the foreign keys pointing to the new primary key
ALTER TABLE "AccountHistory"
ADD CONSTRAINT "AccountHistory_account_id_fkey"
FOREIGN KEY ("account_id") REFERENCES "Account"("account_id")
ON DELETE CASCADE;

ALTER TABLE "Holding"
ADD CONSTRAINT "Holding_account_id_fkey"
FOREIGN KEY ("account_id") REFERENCES "Account"("account_id")
ON DELETE CASCADE;