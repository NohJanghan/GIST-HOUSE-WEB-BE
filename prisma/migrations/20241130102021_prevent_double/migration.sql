/*
  Warnings:

  - A unique constraint covering the columns `[date,hour,facilityId]` on the table `place_reservation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `place_reservation_date_hour_facilityId_key` ON `place_reservation`(`date`, `hour`, `facilityId`);
