const prisma = require("../models/prisma");

const bookingService = {};

bookingService.createBooking = (data) => prisma.booking.create({ data });
bookingService.getBookingById = (id) => prisma.booking.findUnique({ where: { id } });
bookingService.updateBookingById = (id, data) =>
  prisma.booking.update({ data, where: { id } });
bookingService.getBookingListByUserId = (userId) =>
  prisma.booking.findMany({
    where: { userId },
    include: {
      showtime: { include: { movie: true, theater: true } },
      bookingSeatsDetail: { include: { seat1: true, seat2: true, seat3: true } },
      paymentType: true,
    },
  });
bookingService.deleteBookingsByIdList = (IdList) =>
  prisma.booking.deleteMany({ where: { id: { in: IdList } } });

bookingService.findBookingByShowtimeIdList = (showtimeIdList) =>
  prisma.booking.findMany({ where: { showtimeId: { in: showtimeIdList } } });

bookingService.findBookingByShowtimeId = (showtimeId) =>
  prisma.booking.findMany({
    where: { showtimeId },
    include: {
      bookingSeatsDetail: { include: { seat1: true, seat2: true, seat3: true } },
      showtime: { include: { theater: true } },
    },
  });

bookingService.getBookingByIdAndUserId = (bookingId, userId) =>
  prisma.booking.findFirst({ where: { id: bookingId, userId: userId } });

module.exports = bookingService;
