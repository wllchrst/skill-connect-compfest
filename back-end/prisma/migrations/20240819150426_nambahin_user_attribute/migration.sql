/*
  Warnings:

  - Added the required column `currentEducation` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experienceYears` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interest` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `learningResource` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skill` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toolls` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `currentEducation` VARCHAR(191) NOT NULL,
    ADD COLUMN `experienceYears` INTEGER NOT NULL,
    ADD COLUMN `interest` VARCHAR(191) NOT NULL,
    ADD COLUMN `language` VARCHAR(191) NOT NULL,
    ADD COLUMN `learningResource` VARCHAR(191) NOT NULL,
    ADD COLUMN `skill` VARCHAR(191) NOT NULL,
    ADD COLUMN `toolls` VARCHAR(191) NOT NULL;
