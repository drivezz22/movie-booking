const prisma = require("../models/prisma");

const showtimeService = {};

showtimeService.findShowtimesByDateAndTheaterId = (date, theaterId) =>
  prisma.showtime.findMany({ where: { date, theaterId } });

showtimeService.createShowtime = (data) => prisma.showtime.create({ data });

showtimeService.createManyShowtime = (dataList) =>
  prisma.showtime.createMany({ data: dataList });

showtimeService.updateShowtimeByShowtimeId = (id, data) =>
  prisma.showtime.update({ data, where: { id } });

showtimeService.deleteShowtimeByShowtimeId = (id) =>
  prisma.showtime.delete({ where: { id } });

showtimeService.deleteShowtimeByDateAndTheater = (date, theaterId) =>
  prisma.showtime.deleteMany({ where: { date, theaterId } });

showtimeService.getShowtimeById = (id) =>
  prisma.showtime.findUnique({ where: { id }, include: { movie: true, theater: true } });

showtimeService.getShowtimeByDateAndTheater = (date, theaterId) =>
  prisma.showtime.findMany({ where: { date, theaterId } });

showtimeService.getShowtimeByStartEndDate = (startDate, endDate) =>
  prisma.showtime.findMany({
    where: { AND: [{ date: { gte: startDate } }, { date: { lte: endDate } }] },
    include: { theater: true, movie: true },
  });

showtimeService.getShowtimeByMovieStartEndDate = (movieId, startDate, endDate) =>
  prisma.showtime.findMany({
    where: {
      AND: [{ date: { gte: startDate } }, { date: { lte: endDate } }, { movieId }],
    },
    include: { theater: true, movie: true },
  });

showtimeService.getShowtimesByMovieIdAndTheaterId = (movieId, theaterId) =>
  prisma.showtime.findMany({ where: { movieId, theaterId } });

showtimeService.getShowtimesByDate = (date) =>
  prisma.showtime.findMany({ where: { date } });

module.exports = showtimeService;
