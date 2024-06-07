const { MOVIE_SELECT_TYPE } = require("../constants");
const { movieSelectionTypeService } = require("../services");
const { tryCatch, createError } = require("../utils");

const movieSelectionController = {};

movieSelectionController.createSelection = tryCatch(async (req, res, next) => {
  const data = req.body;

  const existMovieSelectionList = await movieSelectionTypeService.findSelectionByMovieId(
    data.movieId
  );

  if (existMovieSelectionList.length > 0) {
    existMovieSelectionList.forEach((el) => {
      if (el.movieSelectTypeId === MOVIE_SELECT_TYPE.UPCOMING) {
        createError({
          message: "Cannot add selection type because the movie is already upcoming",
          statusCode: 400,
        });
      }

      if (
        data.movieSelectTypeId === MOVIE_SELECT_TYPE.UPCOMING &&
        (el.movieSelectTypeId === MOVIE_SELECT_TYPE.HIGHLIGHT ||
          el.movieSelectTypeId === MOVIE_SELECT_TYPE.CURRENTLY)
      ) {
        createError({
          message:
            "Cannot add selection type because the movie is already another selection",
          statusCode: 400,
        });
      }

      if (el.movieSelectTypeId === data.movieSelectTypeId) {
        createError({
          message: "This movie already contains the selected movie",
          statusCode: 400,
        });
      }
    });
  }
  if (
    data.movieSelectTypeId === MOVIE_SELECT_TYPE.HIGHLIGHT &&
    existMovieSelectionList.length === 0
  ) {
    createError({
      message:
        "Cannot add highlight on this movie, please add movie in currently selection before",
      statusCode: 400,
    });
  }

  await movieSelectionTypeService.createSelection(data);
  res.status(201).json({ message: "Movie selection is created" });
});

movieSelectionController.deleteSelection = tryCatch(async (req, res, next) => {
  const { movieSelectType } = req.query;
  const movieSelectTypeId = MOVIE_SELECT_TYPE[movieSelectType.toUpperCase()];
  const { movieId } = req.params;
  const existMovieSelection =
    await movieSelectionTypeService.findSelectionByMovieIdSelectionType(
      +movieId,
      movieSelectTypeId
    );
  if (!existMovieSelection) {
    createError({
      message: "No movie selection in DB",
      statusCode: 400,
    });
  }

  await movieSelectionTypeService.deleteSelectionById(existMovieSelection.id);
  res.status(204).end();
});

movieSelectionController.getMovieSelectionBySelectionType = tryCatch(
  async (req, res, next) => {
    const { movieSelectType } = req.query;
    const movieSelectTypeId = MOVIE_SELECT_TYPE[movieSelectType.toUpperCase()];

    const existMovieSelectionList =
      await movieSelectionTypeService.findSelectionBySelectionType(movieSelectTypeId);

    if (existMovieSelectionList.length === 0 || movieSelectType) {
      createError({
        message: "No movie selection in DB",
        statusCode: 400,
      });
    }
    res.status(200).json({ movieDataList: existMovieSelectionList });
  }
);

module.exports = movieSelectionController;
