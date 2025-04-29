-- AlterTable
ALTER TABLE `user` ADD COLUMN `refreshToken` VARCHAR(191) NULL,
    ADD COLUMN `verified` DATETIME(3) NULL,
    MODIFY `isActive` BOOLEAN NOT NULL DEFAULT false;
