-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(10) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Movie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `movieName` VARCHAR(191) NOT NULL,
    `movieSynopsis` TEXT NULL,
    `genreId1` INTEGER NULL,
    `genreId2` INTEGER NULL,
    `genreId3` INTEGER NULL,
    `movieImagePath` VARCHAR(191) NULL,
    `movieTrailerPath` VARCHAR(191) NULL,
    `durationInMin` INTEGER NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GenreType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `genreType` ENUM('ACTION', 'ANIMATION', 'ADVENTURE', 'COMEDY', 'DRAMA', 'THRILLER', 'ROMANCE', 'HORROR', 'FANTASY', 'MUSICAL', 'CRIME') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MovieSelection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `movieId` INTEGER NOT NULL,
    `movieSelectTypeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MovieSelectType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `movieSelectType` ENUM('HIGHLIGHT', 'CURRENTLY', 'UPCOMING') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Theater` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `theaterName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Showtime` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `theaterId` INTEGER NOT NULL,
    `movieId` INTEGER NOT NULL,
    `date` DATE NOT NULL,
    `startMovieTime` TIME NOT NULL,
    `endMovieTime` TIME NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `theaterId` INTEGER NOT NULL,
    `statusTypeId` INTEGER NOT NULL,
    `seatTypeId` INTEGER NOT NULL,
    `row` VARCHAR(1) NOT NULL,
    `column` VARCHAR(1) NOT NULL,
    `price` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SeatType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `seatTypeName` ENUM('NORMAL', 'PREMIUM') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StatusType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `statusType` ENUM('AVAILABLE', 'UNAVAILABLE', 'BOOKED') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookingSeatsDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `seatId1` INTEGER NOT NULL,
    `seatId2` INTEGER NULL,
    `seatId3` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `showtimeId` INTEGER NOT NULL,
    `bookingSeatsDetailId` INTEGER NOT NULL,
    `paymentTypeId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `qrCodeImagePath` VARCHAR(191) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaymentType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paymentStatus` ENUM('PENDING', 'SUCCESS') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Movie` ADD CONSTRAINT `Movie_genreId1_fkey` FOREIGN KEY (`genreId1`) REFERENCES `GenreType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Movie` ADD CONSTRAINT `Movie_genreId2_fkey` FOREIGN KEY (`genreId2`) REFERENCES `GenreType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Movie` ADD CONSTRAINT `Movie_genreId3_fkey` FOREIGN KEY (`genreId3`) REFERENCES `GenreType`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieSelection` ADD CONSTRAINT `MovieSelection_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieSelection` ADD CONSTRAINT `MovieSelection_movieSelectTypeId_fkey` FOREIGN KEY (`movieSelectTypeId`) REFERENCES `MovieSelectType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Showtime` ADD CONSTRAINT `Showtime_theaterId_fkey` FOREIGN KEY (`theaterId`) REFERENCES `Theater`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Showtime` ADD CONSTRAINT `Showtime_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seat` ADD CONSTRAINT `Seat_theaterId_fkey` FOREIGN KEY (`theaterId`) REFERENCES `Theater`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seat` ADD CONSTRAINT `Seat_statusTypeId_fkey` FOREIGN KEY (`statusTypeId`) REFERENCES `StatusType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seat` ADD CONSTRAINT `Seat_seatTypeId_fkey` FOREIGN KEY (`seatTypeId`) REFERENCES `SeatType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookingSeatsDetail` ADD CONSTRAINT `BookingSeatsDetail_seatId1_fkey` FOREIGN KEY (`seatId1`) REFERENCES `Seat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookingSeatsDetail` ADD CONSTRAINT `BookingSeatsDetail_seatId2_fkey` FOREIGN KEY (`seatId2`) REFERENCES `Seat`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookingSeatsDetail` ADD CONSTRAINT `BookingSeatsDetail_seatId3_fkey` FOREIGN KEY (`seatId3`) REFERENCES `Seat`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_showtimeId_fkey` FOREIGN KEY (`showtimeId`) REFERENCES `Showtime`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_bookingSeatsDetailId_fkey` FOREIGN KEY (`bookingSeatsDetailId`) REFERENCES `BookingSeatsDetail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_paymentTypeId_fkey` FOREIGN KEY (`paymentTypeId`) REFERENCES `PaymentType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
