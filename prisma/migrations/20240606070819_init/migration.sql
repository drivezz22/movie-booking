/*
  Warnings:

  - You are about to alter the column `startMovieTime` on the `showtime` table. The data in that column could be lost. The data in that column will be cast from `Time(0)` to `DateTime(3)`.
  - You are about to alter the column `endMovieTime` on the `showtime` table. The data in that column could be lost. The data in that column will be cast from `Time(0)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `showtime` MODIFY `startMovieTime` DATETIME(3) NOT NULL,
    MODIFY `endMovieTime` DATETIME(3) NOT NULL;
