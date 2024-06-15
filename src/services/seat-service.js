const prisma = require("../models/prisma");

const seatService = {};

seatService.findSeatById = (id) => prisma.seat.findUnique({ where: { id } });

seatService.findSeatsByIdList = (idList) =>
  prisma.seat.findMany({ where: { id: { in: idList } } });

seatService.findSeatByTheaterRowCol = (theaterId, row, column) =>
  prisma.seat.findFirst({ where: { theaterId, row: row, column } });

seatService.findSeatsByTheaterSeatType = (theaterId, seatTypeId) =>
  prisma.seat.findFirst({ where: { theaterId, seatTypeId } });

seatService.updatePriceByTheaterSeatType = (price, theaterId, seatTypeId) =>
  prisma.seat.updateMany({ data: { price }, where: { theaterId, seatTypeId } });

module.exports = seatService;
