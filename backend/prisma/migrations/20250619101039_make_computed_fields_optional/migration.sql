/*
  Warnings:

  - You are about to drop the column `carrier` on the `Package` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Package" DROP COLUMN "carrier",
ALTER COLUMN "volumetricWeight" DROP NOT NULL,
ALTER COLUMN "finalWeight" DROP NOT NULL,
ALTER COLUMN "weightCategory" DROP NOT NULL,
ALTER COLUMN "shippingCost" DROP NOT NULL;
