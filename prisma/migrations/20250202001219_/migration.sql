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
