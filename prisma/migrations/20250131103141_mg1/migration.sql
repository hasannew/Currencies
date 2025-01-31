-- CreateTable
CREATE TABLE `employees` (
    `id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(50) NULL,
    `last_name` VARCHAR(50) NULL,
    `email` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `city` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NULL,
    `tokenExpiracy` DATETIME(3) NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `verificationDate` DATETIME(3) NULL,
    `type` VARCHAR(191) NOT NULL DEFAULT 'customer',

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OAuthUser` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `refreshToken` TEXT NULL,
    `accessToken` TEXT NULL,
    `tokenExpiry` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `type` VARCHAR(191) NOT NULL DEFAULT 'customer',

    UNIQUE INDEX `OAuthUser_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `currency` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NULL,
    `store_name` VARCHAR(50) NULL,
    `state` VARCHAR(50) NULL,
    `city` VARCHAR(50) NULL,
    `sale_price` DOUBLE NULL DEFAULT 0,
    `purchase_price` DOUBLE NULL DEFAULT 0,
    `date` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `store` (
    `id` VARCHAR(191) NOT NULL,
    `userID` VARCHAR(191) NULL,
    `name` VARCHAR(50) NULL,
    `state` VARCHAR(50) NULL,
    `city` VARCHAR(50) NULL,
    `address` VARCHAR(50) NULL,
    `email` VARCHAR(100) NULL,
    `phone` VARCHAR(100) NULL,
    `currencies` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `offer` (
    `id` VARCHAR(191) NOT NULL,
    `currency` VARCHAR(100) NULL,
    `price` DOUBLE NULL,
    `date` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bulletin` (
    `id` VARCHAR(191) NOT NULL,
    `storeid` VARCHAR(191) NULL,
    `date` DATETIME(3) NULL,
    `state` VARCHAR(50) NULL,
    `city` VARCHAR(50) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    INDEX `bulletin_storeid_idx`(`storeid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `price` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NULL,
    `sale_price` DOUBLE NOT NULL DEFAULT 0,
    `sale_std` DOUBLE NOT NULL DEFAULT 0,
    `purchase_price` DOUBLE NOT NULL DEFAULT 0,
    `purchase_std` DOUBLE NOT NULL DEFAULT 0,
    `sale_percentageChange` DOUBLE NULL DEFAULT 0,
    `purchase_percentageChange` DOUBLE NULL DEFAULT 0,
    `max_sale_price` DOUBLE NULL DEFAULT 0,
    `min_sale_price` DOUBLE NULL DEFAULT 0,
    `max_purchase_price` DOUBLE NULL DEFAULT 0,
    `min_purchase_price` DOUBLE NULL DEFAULT 0,
    `state` VARCHAR(50) NULL,
    `city` VARCHAR(50) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favorite` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NULL,
    `userid` VARCHAR(50) NOT NULL,
    `date` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_bulletinTocurrency` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_bulletinTocurrency_AB_unique`(`A`, `B`),
    INDEX `_bulletinTocurrency_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bulletin` ADD CONSTRAINT `bulletin_storeid_fkey` FOREIGN KEY (`storeid`) REFERENCES `store`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_bulletinTocurrency` ADD CONSTRAINT `_bulletinTocurrency_A_fkey` FOREIGN KEY (`A`) REFERENCES `bulletin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_bulletinTocurrency` ADD CONSTRAINT `_bulletinTocurrency_B_fkey` FOREIGN KEY (`B`) REFERENCES `currency`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
