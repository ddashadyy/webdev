/*
  Warnings:

  - You are about to drop the column `productId` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Cart` table. All the data in the column will be lost.
  - The primary key for the `WishList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productId` on the `WishList` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `WishList` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `WishList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `WishList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_productId_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "WishList" DROP CONSTRAINT "WishList_productId_fkey";

-- DropForeignKey
ALTER TABLE "WishList" DROP CONSTRAINT "WishList_userId_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "productId",
DROP COLUMN "userId",
ADD COLUMN     "product_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "WishList" DROP CONSTRAINT "WishList_pkey",
DROP COLUMN "productId",
DROP COLUMN "userId",
ADD COLUMN     "product_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "WishList_pkey" PRIMARY KEY ("user_id", "product_id");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
