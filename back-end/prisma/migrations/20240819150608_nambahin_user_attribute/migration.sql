/*
  Warnings:

  - You are about to drop the column `toolls` on the `User` table. All the data in the column will be lost.
  - Added the required column `tools` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `toolls`,
    ADD COLUMN `tools` VARCHAR(191) NOT NULL;
