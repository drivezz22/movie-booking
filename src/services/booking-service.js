const prisma = require("../models/prisma");

const bookingService = {};

bookingService.createBooking = (data) => prisma.booking.create({ data });
bookingService.getBookingById = (id) => prisma.booking.findUnique({ where: { id } });
bookingService.updateBookingById = (id, data) =>
  prisma.booking.update({ data, where: { id } });
bookingService.getBookingListByUserId = (userId) =>
  prisma.booking.findMany({ where: { userId } });
bookingService.deleteBookingsByIdList = (IdList) =>
  prisma.booking.deleteMany({ where: { id: { in: IdList } } });

module.exports = bookingService;
