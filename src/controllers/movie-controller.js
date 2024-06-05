const movieService = require("../services/movie-service");
const createError = require("../utils/create-error");
const tryCatch = require("../utils/try-catch-wrapper");

const movieController = {};

movieController.createMovie = tryCatch(async (req, res, next) => {
  const data = req.body;

  await movieService.createMovie(data);
  res.status(201).json({ message: "Movie is created" });
});

movieController.updateMovie = tryCatch(async (req, res, next) => {
  const data = req.body;
  const { movieId } = req.params;
  const existMovie = await movieService.getMovieById(+movieId);
  if (!existMovie) {
    createError({ message: "No movie in DB", statusCode: 400 });
  }

  await movieService.updateMovieById(+movieId, data);
  res.status(200).json({ message: "Movie is updated" });
});

movieController.deleteMovie = tryCatch(async (req, res, next) => {
  const { movieId } = req.params;
  const existMovie = await movieService.getMovieById(+movieId);
  if (!existMovie) {
    createError({ message: "No movie in DB", statusCode: 400 });
  }

  await movieService.deleteMovieById(+movieId);
  res.status(204).end();
});

movieController.getMovie = tryCatch(async (req, res, next) => {
  const { movieId } = req.params;
  const existMovie = await movieService.getMovieById(+movieId);
  if (!existMovie) {
    createError({ message: "No movie in DB", statusCode: 400 });
  }

  res.status(200).json({ movieData: existMovie });
});

movieController.getAllMovie = tryCatch(async (req, res, next) => {
  const existAllMovie = await movieService.getAllMovie();
  if (!existAllMovie) {
    createError({ message: "No movie in DB", statusCode: 400 });
  }

  res.status(200).json({ movieDataList: existAllMovie });
});

module.exports = movieController;
