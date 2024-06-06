const { SEAT_STATUS } = require("../constants");
const prisma = require("../models/prisma");

const seatService = {};

seatService.findSeatById = (id) => prisma.seat.findUnique({ where: { id } });

seatService.findSeatsByIdList = (idList) =>
  prisma.seat.findMany({ where: { id: { in: idList } } });

seatService.findBookedSeatsByIdList = (idList) =>
  prisma.seat.findMany({
    where: { id: { in: idList }, statusTypeId: SEAT_STATUS.BOOKED },
  });

seatService.findSeatByTheaterRowCol = (theaterId, row, column) =>
  prisma.seat.findFirst({ where: { theaterId, row, column } });

seatService.findSeatsByTheaterSeatType = (theaterId, seatTypeId) =>
  prisma.seat.findFirst({ where: { theaterId, seatTypeId } });

seatService.updatePriceByTheaterSeatType = (price, theaterId, seatTypeId) =>
  prisma.seat.updateMany({ data: { price }, where: { theaterId, seatTypeId } });

seatService.updateStatusById = (statusTypeId, seatId) =>
  prisma.seat.update({ data: { statusTypeId }, where: { id: seatId } });

seatService.updateBookedStatusByIdList = (seatIdList) =>
  prisma.seat.updateMany({
    data: { statusTypeId: SEAT_STATUS.BOOKED },
    where: { id: { in: seatIdList } },
  });

seatService.updateAvailableStatusByIdList = (seatIdList) =>
  prisma.seat.updateMany({
    data: { statusTypeId: SEAT_STATUS.AVAILABLE },
    where: { id: { in: seatIdList } },
  });

module.exports = seatService;
