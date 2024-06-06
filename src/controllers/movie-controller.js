const movieService = require("../services/movie-service");
const uploadService = require("../services/upload-service");
const createError = require("../utils/create-error");
const tryCatch = require("../utils/try-catch-wrapper");
const fs = require("fs-extra");
const movieController = {};

movieController.createMovie = async (req, res, next) => {
  try {
    const data = req.body;
    if (req.file) {
      const movieImageUrl = await uploadService.upload(req.file.path);
      data.movieImagePath = movieImageUrl;
    }

    await movieService.createMovie(data);
    res.status(201).json({ message: "Movie is created" });
  } catch (err) {
    next(err);
  } finally {
    fs.emptyDirSync("./public/images");
  }
};

movieController.updateMovie = async (req, res, next) => {
  try {
    const data = req.body;
    const { movieId } = req.params;
    const existMovie = await movieService.getMovieById(+movieId);
    if (!existMovie) {
      createError({ message: "No movie in DB", statusCode: 400 });
    }

    if (existMovie.movieImagePath) {
      await uploadService.delete(existMovie.movieImagePath);
    }
    if (req.file) {
      const movieImageUrl = await uploadService.upload(req.file.path);
      data.movieImagePath = movieImageUrl;
    }

    await movieService.updateMovieById(+movieId, data);
    res.status(200).json({ message: "Movie is updated" });
  } catch (err) {
    next(err);
  } finally {
    fs.emptyDirSync("./public/images");
  }
};

movieController.deleteMovie = tryCatch(async (req, res, next) => {
  const { movieId } = req.params;
  const existMovie = await movieService.getMovieById(+movieId);
  if (!existMovie) {
    createError({ message: "No movie in DB", statusCode: 400 });
  }

  if (existMovie.movieImagePath) {
    await uploadService.delete(existMovie.movieImagePath);
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
