const prisma = require("../models/prisma");

const bookingSeatDetailService = {};

bookingSeatDetailService.createBookingSeats = (data) =>
  prisma.bookingSeatsDetail.create({ data });

bookingSeatDetailService.deleteBookingSeatsByIdList = (idList) =>
  prisma.bookingSeatsDetail.deleteMany({ where: { id: { in: idList } } });

bookingSeatDetailService.getBookingSeatsByIdList = (idList) =>
  prisma.bookingSeatsDetail.findMany({ where: { id: { in: idList } } });

module.exports = bookingSeatDetailService;
