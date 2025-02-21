/*
  Warnings:

  - You are about to drop the column `city` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `privilages` on the `user` table. All the data in the column will be lost.

*/




-- CreateTable
CREATE TABLE `privilges` (
    `id` VARCHAR(191) NOT NULL,
    `userID` VARCHAR(50) NULL,
    `name` VARCHAR(50) NULL,
    `details` VARCHAR(100) NULL,
    `date` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_UserToprivilges` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_UserToprivilges_AB_unique`(`A`, `B`),
    INDEX `_UserToprivilges_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_UserToprivilges` ADD CONSTRAINT `_UserToprivilges_A_fkey` FOREIGN KEY (`A`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserToprivilges` ADD CONSTRAINT `_UserToprivilges_B_fkey` FOREIGN KEY (`B`) REFERENCES `privilges`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
