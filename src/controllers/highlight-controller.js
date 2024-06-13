const { MOVIE_IMAGE_DIR } = require("../constants");
const { uploadService, highlightService, movieService } = require("../services");
const { tryCatch, createError } = require("../utils");
const fs = require("fs-extra");

const highlightController = {};

highlightController.createHighlight = async (req, res, next) => {
  try {
    const data = req.body;

    const existMovie = await movieService.getMovieById(data.movieId);
    if (!existMovie) {
      createError({ message: "No movie in DB", statusCode: 400 });
    }

    const existHighlight = await highlightService.getHighlightByMovieId(data.movieId);
    if (existHighlight) {
      createError({ message: "This movie is in Highlight", statusCode: 400 });
    }

    if (!req.file) {
      createError({ message: "No cover image", statusCode: 400 });
    }

    data.coverImagePath = await uploadService.upload(req.file.path);

    const result = await highlightService.createHighlight(data);
    res.status(201).json({ message: "Highlight is created", highlightData: result });
  } catch (err) {
    next(err);
  } finally {
    fs.emptyDirSync(MOVIE_IMAGE_DIR);
  }
};

highlightController.updateHighlight = async (req, res, next) => {
  try {
    const data = req.body;
    const { movieId } = req.params;

    const existHighlight = await highlightService.getHighlightByMovieId(+movieId);
    if (!existHighlight) {
      createError({ message: "This movie is not in Highlight", statusCode: 400 });
    }

    if (req.file) {
      if (existHighlight.coverImagePath) {
        await uploadService.delete(existHighlight.coverImagePath);
      }
      data.coverImagePath = await uploadService.upload(req.file.path);
    }

    const result = await highlightService.updateHighlightById(existHighlight.id, data);
    res.status(200).json({ message: "Highlight is updated", highlightData: result });
  } catch (err) {
    next(err);
  } finally {
    fs.emptyDirSync(MOVIE_IMAGE_DIR);
  }
};

highlightController.deleteHighlight = tryCatch(async (req, res, next) => {
  const { movieId } = req.params;
  const existMovie = await highlightService.getHighlightByMovieId(+movieId);
  if (!existMovie) {
    createError({ message: "This movie is not in Highlight", statusCode: 400 });
  }

  if (existMovie.coverImagePath) {
    await uploadService.delete(existMovie.coverImagePath);
  }

  await highlightService.deleteHighlightByMovieId(+movieId);
  res.status(204).end();
});

highlightController.getAllHighlight = tryCatch(async (req, res, next) => {
  const existAllHighlight = await highlightService.getAllHighlight();
  if (existAllHighlight.length === 0) {
    createError({ message: "No highlight in DB", statusCode: 400 });
  }

  res.status(200).json({ highlightList: existAllHighlight });
});

module.exports = highlightController;
