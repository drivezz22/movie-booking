const { MOVIE_IMAGE_DIR } = require("../constants");
const {
  uploadService,
  movieService,
  highlightService,
  movieSelectionTypeService,
} = require("../services");
const { tryCatch, createError } = require("../utils");
const fs = require("fs-extra");

const movieController = {};

movieController.createMovie = async (req, res, next) => {
  try {
    const data = req.body;
    if (req.file) {
      data.movieImagePath = await uploadService.upload(req.file.path);
    }

    const result = await movieService.createMovie(data);
    res.status(201).json({ message: "Movie is created", movieData: result });
  } catch (err) {
    next(err);
  } finally {
    fs.emptyDirSync(MOVIE_IMAGE_DIR);
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

    if (req.file) {
      if (existMovie.movieImagePath) {
        await uploadService.delete(existMovie.movieImagePath);
      }
      data.movieImagePath = await uploadService.upload(req.file.path);
    }

    const result = await movieService.updateMovieById(+movieId, data);
    res.status(200).json({ message: "Movie is updated", movieData: result });
  } catch (err) {
    next(err);
  } finally {
    fs.emptyDirSync(MOVIE_IMAGE_DIR);
  }
};

movieController.deleteMovie = tryCatch(async (req, res, next) => {
  const { movieId } = req.params;
  const existMovie = await movieService.getMovieById(+movieId);
  if (!existMovie) {
    return res.status(204).end();
  }

  if (existMovie.movieImagePath) {
    await uploadService.delete(existMovie.movieImagePath);
  }

  await highlightService.deleteHighlightByMovieId(+movieId);
  await movieSelectionTypeService.deleteSelectionByMovieId(+movieId);
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
  if (existAllMovie.length === 0) {
    createError({ message: "No movie in DB", statusCode: 400 });
  }

  res.status(200).json({ movieDataList: existAllMovie });
});

module.exports = movieController;
