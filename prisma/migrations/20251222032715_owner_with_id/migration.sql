-- AlterTable
ALTER TABLE "Owner" ADD CONSTRAINT "Owner_pkey" PRIMARY KEY ("owner_id");

-- DropIndex
DROP INDEX "Owner_owner_id_key";
