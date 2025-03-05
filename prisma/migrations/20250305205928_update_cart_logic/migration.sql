/*
  Warnings:

  - You are about to drop the column `productId` on the `CartItem` table. All the data in the column will be lost.
  - Added the required column `productOptionId` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_productId_fkey";

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "productId",
ADD COLUMN     "productOptionId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productOptionId_fkey" FOREIGN KEY ("productOptionId") REFERENCES "Color_quantities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
