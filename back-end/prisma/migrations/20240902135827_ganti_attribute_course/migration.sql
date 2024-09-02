/*
  Warnings:

  - You are about to drop the column `courseDescription` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `courseLink` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `courseName` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `coursePrice` on the `Course` table. All the data in the column will be lost.
  - Added the required column `description` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Course` DROP COLUMN `courseDescription`,
    DROP COLUMN `courseLink`,
    DROP COLUMN `courseName`,
    DROP COLUMN `coursePrice`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `level` DOUBLE NOT NULL,
    ADD COLUMN `link` VARCHAR(191) NOT NULL,
    ADD COLUMN `rating` DOUBLE NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
