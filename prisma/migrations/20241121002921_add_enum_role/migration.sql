-- CreateTable
CREATE TABLE `place_reservation` (
    `reservation_id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `hour` INTEGER NOT NULL,
    `facilityId` INTEGER NOT NULL,

    PRIMARY KEY (`reservation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `place_reservation` ADD CONSTRAINT `place_reservation_facilityId_fkey` FOREIGN KEY (`facilityId`) REFERENCES `facility`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
