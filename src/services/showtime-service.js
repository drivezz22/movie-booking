const prisma = require("../models/prisma");

const showtimeService = {};

showtimeService.findShowtimesByDateAndTheaterId = (date, theaterId) =>
  prisma.showtime.findMany({ where: { date, theaterId } });

showtimeService.createShowtime = (data) => prisma.showtime.create({ data });

showtimeService.updateShowtimeByShowtimeId = (id, data) =>
  prisma.showtime.update({ data, where: { id } });

showtimeService.deleteShowtimeByShowtimeId = (id) =>
  prisma.showtime.delete({ where: { id } });

showtimeService.getShowtimeById = (id) => prisma.showtime.findUnique({ where: { id } });

showtimeService.getShowtimesByMovieIdAndTheaterId = (movieId, theaterId) =>
  prisma.showtime.findMany({ where: { movieId, theaterId } });

showtimeService.getShowtimesByDate = (date) =>
  prisma.showtime.findMany({ where: { date } });

module.exports = showtimeService;
