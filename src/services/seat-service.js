const prisma = require("../models/prisma");

const seatService = {};

seatService.findSeatByTheaterRowCol = (theaterId, row, column) =>
  prisma.seat.findFirst({ where: { theaterId, row, column } });

seatService.findSeatsByTheaterSeatType = (theaterId, seatTypeId) =>
  prisma.seat.findFirst({ where: { theaterId, seatTypeId } });

seatService.updatePriceByTheaterSeatType = (price, theaterId, seatTypeId) =>
  prisma.seat.updateMany({ data: { price }, where: { theaterId, seatTypeId } });

seatService.updateStatusById = (statusTypeId, seatId) =>
  prisma.seat.update({ data: { statusTypeId }, where: { id: seatId } });

module.exports = seatService;
