/*
  Warnings:

  - You are about to drop the column `variationId` on the `productvariation` table. All the data in the column will be lost.
  - You are about to drop the `variation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `variation` to the `ProductVariation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `productvariation` DROP FOREIGN KEY `ProductVariation_variationId_fkey`;

-- AlterTable
ALTER TABLE `productvariation` DROP COLUMN `variationId`,
    ADD COLUMN `variation` ENUM('COLOR', 'SIZE', 'MATERIAL') NOT NULL;

-- DropTable
DROP TABLE `variation`;
