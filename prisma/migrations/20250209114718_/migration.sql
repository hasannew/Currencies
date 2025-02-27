/*
  Warnings:

  - You are about to drop the `_usertoprivilages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `privilages` table. If the table is not empty, all the data it contains will be lost.

*/


-- CreateTable
CREATE TABLE `issue` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(50) NULL,
    `topic` VARCHAR(50) NULL,
    `message` VARCHAR(50) NULL,
    `userid` VARCHAR(50) NOT NULL,
    `date` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
