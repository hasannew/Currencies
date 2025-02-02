-- CreateTable
CREATE TABLE `privilages` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NULL,
    `userId` VARCHAR(50) NULL,
    `userType` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_UserToprivilages` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_UserToprivilages_AB_unique`(`A`, `B`),
    INDEX `_UserToprivilages_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_UserToprivilages` ADD CONSTRAINT `_UserToprivilages_A_fkey` FOREIGN KEY (`A`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserToprivilages` ADD CONSTRAINT `_UserToprivilages_B_fkey` FOREIGN KEY (`B`) REFERENCES `privilages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
