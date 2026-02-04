/*
  Warnings:

  - Made the column `manufacturer` on table `medicines` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "medicines" ALTER COLUMN "manufacturer" SET NOT NULL;
