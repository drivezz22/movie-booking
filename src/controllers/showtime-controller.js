const { showtimeService, movieService, bookingService } = require("../services");
const { tryCatch, createError } = require("../utils");

const showtimeController = {};

showtimeController.createShowtime = tryCatch(async (req, res, next) => {
  const data = req.body;
  const existMovie = await movieService.getMovieById(data.movieId);

  if (!existMovie) {
    createError({
      message: "No movie in DB",
      statusCode: 400,
    });
  }

  await showtimeService.createShowtime(data);
  res.status(201).json({ message: "Showtime is created" });
});

showtimeController.createManyShowtime = tryCatch(async (req, res, next) => {
  const data = req.body;
  data.map(async (el) => {
    const existMovie = await movieService.getMovieById(el.movieId);
    if (!existMovie) {
      createError({
        message: "No movie in DB",
        statusCode: 400,
      });
    }
  });

  await showtimeService.createManyShowtime(data);
  res.status(201).json({ message: "Showtimes are created" });
});

showtimeController.deleteShowtimeByDateAndTheater = tryCatch(async (req, res, next) => {
  const { date, theaterId } = req.params;
  const dateFormat = new Date(date);
  const existShowtimeList = await showtimeService.getShowtimeByDateAndTheater(
    dateFormat,
    +theaterId
  );
  console.log("existShowtimeList", existShowtimeList);

  const showtimeIdList = existShowtimeList.map((el) => el.id);

  const existBookingList = await bookingService.findBookingByShowtimeIdList(
    showtimeIdList
  );

  console.log("existBookingList", existBookingList);
  if (!existBookingList) {
    createError({ message: "Some showtime is booking", statusCode: 400 });
  }

  await showtimeService.deleteShowtimeByDateAndTheater(dateFormat, +theaterId);
  res.status(204).end();
});

showtimeController.getShowtime = tryCatch(async (req, res, next) => {
  const { showtimeId } = req.params;
  const existShowtime = await showtimeService.getShowtimeById(+showtimeId);
  if (!existShowtime) {
    createError({ message: "There is no showtime", statusCode: 400 });
  }
  res.status(200).json({ showtimeData: existShowtime });
});

showtimeController.getShowtimeByStartEndDate = tryCatch(async (req, res, next) => {
  const { startDate, endDate } = req.params;
  const startDateFormat = new Date(startDate);
  const endDateFormat = new Date(endDate);
  const existShowtimeList = await showtimeService.getShowtimeByStartEndDate(
    startDateFormat,
    endDateFormat
  );
  if (existShowtimeList.lenght === 0) {
    createError({ message: "There is no showtime", statusCode: 400 });
  }
  res.status(200).json({ showtimeData: existShowtimeList });
});

showtimeController.getShowtimeByMovieStartEndDate = tryCatch(async (req, res, next) => {
  const { movieId, startDate, endDate } = req.params;
  const startDateFormat = new Date(startDate);
  const endDateFormat = new Date(endDate);
  const existShowtimeList = await showtimeService.getShowtimeByMovieStartEndDate(
    +movieId,
    startDateFormat,
    endDateFormat
  );
  if (existShowtimeList.lenght === 0) {
    createError({ message: "There is no showtime", statusCode: 400 });
  }
  res.status(200).json({ showtimeData: existShowtimeList });
});

module.exports = showtimeController;
