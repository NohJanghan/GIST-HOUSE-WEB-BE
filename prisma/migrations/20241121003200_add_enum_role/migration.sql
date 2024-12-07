/*
  Warnings:

  - Added the required column `studentId` to the `place_reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `place_reservation` ADD COLUMN `studentId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `student` (
    `id` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'HOUSE', 'USER') NOT NULL DEFAULT 'USER',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `place_reservation` ADD CONSTRAINT `place_reservation_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
