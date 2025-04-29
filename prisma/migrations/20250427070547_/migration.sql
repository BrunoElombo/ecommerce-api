/*
  Warnings:

  - You are about to drop the column `isDefault` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `addressId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `orderNumber` on the `order` table. All the data in the column will be lost.
  - The values [REFUNDED,FAILED] on the enum `Order_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `variantId` on the `orderitem` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `_categorytoproduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productimage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productvariant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `refreshtoken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `review` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postalCode` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `firstName` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `_categorytoproduct` DROP FOREIGN KEY `_CategoryToProduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_categorytoproduct` DROP FOREIGN KEY `_CategoryToProduct_B_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_addressId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_variantId_fkey`;

-- DropForeignKey
ALTER TABLE `productimage` DROP FOREIGN KEY `ProductImage_productId_fkey`;

-- DropForeignKey
ALTER TABLE `productvariant` DROP FOREIGN KEY `ProductVariant_productId_fkey`;

-- DropForeignKey
ALTER TABLE `refreshtoken` DROP FOREIGN KEY `RefreshToken_userId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_productId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_userId_fkey`;

-- DropIndex
DROP INDEX `Order_orderNumber_key` ON `order`;

-- DropIndex
DROP INDEX `Product_sku_key` ON `product`;

-- AlterTable
ALTER TABLE `address` DROP COLUMN `isDefault`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `zipCode`,
    ADD COLUMN `postalCode` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `isActive`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `addressId`,
    DROP COLUMN `orderNumber`,
    MODIFY `status` ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    MODIFY `total` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `orderitem` DROP COLUMN `variantId`,
    MODIFY `price` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `isActive`,
    DROP COLUMN `sku`,
    ADD COLUMN `categoryId` VARCHAR(191) NOT NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    ADD COLUMN `slug` VARCHAR(191) NOT NULL,
    MODIFY `price` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `isActive`,
    ADD COLUMN `phone` VARCHAR(191) NULL,
    MODIFY `firstName` VARCHAR(191) NOT NULL,
    MODIFY `lastName` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_categorytoproduct`;

-- DropTable
DROP TABLE `productimage`;

-- DropTable
DROP TABLE `productvariant`;

-- DropTable
DROP TABLE `refreshtoken`;

-- DropTable
DROP TABLE `review`;

-- CreateIndex
CREATE UNIQUE INDEX `Category_name_key` ON `Category`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Product_slug_key` ON `Product`(`slug`);

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
