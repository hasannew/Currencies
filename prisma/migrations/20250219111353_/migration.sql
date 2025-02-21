/*
  Warnings:

  - You are about to drop the `_usertoprivilages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `privilages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_usertoprivilages` DROP FOREIGN KEY `_UserToprivilages_A_fkey`;

-- DropForeignKey
ALTER TABLE `_usertoprivilages` DROP FOREIGN KEY `_UserToprivilages_B_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `privilages` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_usertoprivilages`;

-- DropTable
DROP TABLE `privilages`;

-- CreateTable
CREATE TABLE `schedule` (
    `id` VARCHAR(191) NOT NULL,
    `userID` VARCHAR(191) NULL,
    `storeid` VARCHAR(191) NULL,
    `opening_time` VARCHAR(191) NULL,
    `closing_time` VARCHAR(191) NULL,
    `sunday` BOOLEAN NULL,
    `monday` BOOLEAN NULL,
    `tuesday` BOOLEAN NULL,
    `wednesday` BOOLEAN NULL,
    `thursday` BOOLEAN NULL,
    `friday` BOOLEAN NULL,
    `saturday` BOOLEAN NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `schedule_storeid_key`(`storeid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `schedule_storeid_fkey` FOREIGN KEY (`storeid`) REFERENCES `store`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
