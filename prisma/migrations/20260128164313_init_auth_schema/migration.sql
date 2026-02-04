/*
  Warnings:

  - You are about to drop the column `image` on the `user` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CUSTOMER', 'SELLER', 'ADMIN');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "image",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'CUSTOMER',
ALTER COLUMN "name" DROP NOT NULL;
