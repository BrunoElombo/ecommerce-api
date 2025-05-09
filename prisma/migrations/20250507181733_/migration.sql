/*
  Warnings:

  - You are about to drop the column `name` on the `productvariation` table. All the data in the column will be lost.
  - Added the required column `variationId` to the `ProductVariation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `productvariation` DROP COLUMN `name`,
    ADD COLUMN `variationId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Variation` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductVariation` ADD CONSTRAINT `ProductVariation_variationId_fkey` FOREIGN KEY (`variationId`) REFERENCES `Variation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
