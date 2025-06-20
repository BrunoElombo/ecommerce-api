/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `ProductVariation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ProductVariation_value_key` ON `ProductVariation`(`value`);
