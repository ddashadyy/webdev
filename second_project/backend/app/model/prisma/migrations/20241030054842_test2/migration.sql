/*
  Warnings:

  - You are about to drop the column `urlImage` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "urlImage",
ADD COLUMN     "url_image" TEXT;
