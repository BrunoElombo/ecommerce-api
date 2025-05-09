-- AlterTable
ALTER TABLE `product` MODIFY `price` DECIMAL(10, 2) NULL,
    MODIFY `stock` INTEGER NULL DEFAULT 0;
