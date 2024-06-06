const movieSelectionTypeService = require("../services/movie-selection-service");
const seatService = require("../services/seat-service");
const createError = require("../utils/create-error");
const tryCatch = require("../utils/try-catch-wrapper");

const movieSelectionController = {};

movieSelectionController.createSelection = tryCatch(async (req, res, next) => {
  const data = req.body;

  const existMovieSelection = await movieSelectionTypeService.findSelectionByMovieId(
    data.movieId
  );
  if (!existMovieSelection) {
    createError({
      message: "Cannot find the movie with the selected type in DB",
      statusCode: 400,
    });
  }
});

module.exports = movieSelectionController;
