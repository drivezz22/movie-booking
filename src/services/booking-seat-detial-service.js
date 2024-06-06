const prisma = require("../models/prisma");

const bookingSeatDetialService = {};

bookingSeatDetialService.createBookingSeats = (data) =>
  prisma.bookingSeatsDetail.create({ data });

bookingSeatDetialService.deleteBookingSeatsByIdList = (idList) =>
  prisma.bookingSeatsDetail.deleteMany({ where: { id: { in: idList } } });

bookingSeatDetialService.getBookingSeatsByIdList = (idList) =>
  prisma.bookingSeatsDetail.findMany({ where: { id: { in: idList } } });

module.exports = bookingSeatDetialService;
