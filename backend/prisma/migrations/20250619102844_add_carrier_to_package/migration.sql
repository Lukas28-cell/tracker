/*
  Warnings:

  - Added the required column `carrier` to the `Package` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "carrier" TEXT NOT NULL;
