/*
  Warnings:

  - You are about to drop the `_UserToprivilages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `privilages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_UserToprivilages` DROP FOREIGN KEY `_UserToprivilages_A_fkey`;

-- DropForeignKey
ALTER TABLE `_UserToprivilages` DROP FOREIGN KEY `_UserToprivilages_B_fkey`;

-- DropTable
DROP TABLE `_UserToprivilages`;

-- DropTable
DROP TABLE `privilages`;
