const { showtimeService, movieService } = require("../services");
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

showtimeController.updateShowtime = tryCatch(async (req, res, next) => {
  const { showtimeId } = req.params;
  const data = req.body;

  const existShowtime = await showtimeService.getShowtimeById(+showtimeId);
  if (!existShowtime) {
    createError({ message: "There is no showtime", statusCode: 400 });
  }

  const existMovie = await movieService.getMovieById(data.movieId);

  if (!existMovie) {
    createError({
      message: "No movie in DB",
      statusCode: 400,
    });
  }

  await showtimeService.updateShowtimeByShowtimeId(+showtimeId, data);
  res.status(200).json({ message: "Showtime is updated" });
});

showtimeController.deleteShowtime = tryCatch(async (req, res, next) => {
  const { showtimeId } = req.params;
  const existShowtime = await showtimeService.getShowtimeById(+showtimeId);
  if (!existShowtime) {
    createError({ message: "There is no showtime", statusCode: 400 });
  }
  await showtimeService.deleteShowtimeByShowtimeId(+showtimeId);
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

showtimeController.getShowtimeByMovieAndTheater = tryCatch(async (req, res, next) => {
  const { movieId, theaterId } = req.params;
  const existShowtimeList = await showtimeService.getShowtimesByMovieIdAndTheaterId(
    +movieId,
    +theaterId
  );
  if (existShowtimeList.length === 0) {
    createError({
      message: "There is no showtime for the movie and thearter",
      statusCode: 400,
    });
  }

  res.status(200).json({ showtimeDataList: existShowtimeList });
});

module.exports = showtimeController;
