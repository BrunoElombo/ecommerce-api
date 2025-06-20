/*
  Warnings:

  - You are about to drop the `_cartitemtoproductvariation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sku]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `variationId` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_cartitemtoproductvariation` DROP FOREIGN KEY `_CartItemToProductVariation_A_fkey`;

-- DropForeignKey
ALTER TABLE `_cartitemtoproductvariation` DROP FOREIGN KEY `_CartItemToProductVariation_B_fkey`;

-- DropIndex
DROP INDEX `ProductVariation_value_key` ON `productvariation`;

-- AlterTable
ALTER TABLE `cartitem` ADD COLUMN `variationId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_cartitemtoproductvariation`;

-- CreateIndex
CREATE UNIQUE INDEX `CartItem_sku_key` ON `CartItem`(`sku`);

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_variationId_fkey` FOREIGN KEY (`variationId`) REFERENCES `ProductVariation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
