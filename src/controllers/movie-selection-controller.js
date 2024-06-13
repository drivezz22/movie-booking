const { MOVIE_SELECT_TYPE } = require("../constants");
const { movieSelectionTypeService, movieService } = require("../services");
const { tryCatch, createError } = require("../utils");

const movieSelectionController = {};

movieSelectionController.createSelection = tryCatch(async (req, res, next) => {
  const data = req.body;

  const existMovie = await movieService.getMovieById(data.movieId);

  if (!existMovie) {
    createError({
      message: "No movie in DB",
      statusCode: 400,
    });
  }

  const existMovieSelection = await movieSelectionTypeService.findSelectionByMovieId(
    data.movieId
  );

  if (existMovieSelection) {
    createError({
      message: "The movie already has selection type",
      statusCode: 400,
    });
  }

  if (!Object.values(MOVIE_SELECT_TYPE).includes(data.movieSelectTypeId)) {
    createError({
      message: "The movieSelectTypeId is wrong",
      statusCode: 400,
    });
  }

  await movieSelectionTypeService.createSelection(data);
  res.status(201).json({ message: "Movie selection is created" });
});

movieSelectionController.updateSelection = tryCatch(async (req, res, next) => {
  const data = req.body;
  const { movieId } = req.params;

  const existMovieSelection = await movieSelectionTypeService.findSelectionByMovieId(
    +movieId
  );

  if (!existMovieSelection) {
    createError({
      message: "The movie is no selection type",
      statusCode: 400,
    });
  }

  if (!Object.values(MOVIE_SELECT_TYPE).includes(data.movieSelectTypeId)) {
    createError({
      message: "The movieSelectTypeId is wrong",
      statusCode: 400,
    });
  }

  await movieSelectionTypeService.updateSelectionByMovieId(+movieId, data);
  res.status(201).json({ message: "Movie selection is updated" });
});

movieSelectionController.deleteSelection = tryCatch(async (req, res, next) => {
  const { movieId } = req.params;
  const existMovieSelection = await movieSelectionTypeService.findSelectionByMovieId(
    +movieId
  );
  if (!existMovieSelection) {
    createError({
      message: "The movie is no selection type",
      statusCode: 400,
    });
  }
  await movieSelectionTypeService.deleteSelectionByMovieId(+movieId);
  res.status(204).end();
});

movieSelectionController.getMovieSelectionBySelectionType = tryCatch(
  async (req, res, next) => {
    const { selectionType } = req.params;
    const movieSelectTypeId = MOVIE_SELECT_TYPE[selectionType.toUpperCase()];

    if (!movieSelectTypeId) {
      createError({
        message: "No this selection type",
        statusCode: 400,
      });
    }

    const existMovieSelectionList =
      await movieSelectionTypeService.findSelectionBySelectionType(movieSelectTypeId);

    if (existMovieSelectionList.length === 0) {
      createError({
        message: "No movie selection in DB",
        statusCode: 400,
      });
    }
    res.status(200).json({ movieDataList: existMovieSelectionList });
  }
);

movieSelectionController.getMovieSelectionByForAllMovie = tryCatch(
  async (req, res, next) => {
    const existMovieSelectionList =
      await movieSelectionTypeService.findSelectionByAllMovie();

    res.status(200).json({ movieDataList: existMovieSelectionList });
  }
);

movieSelectionController.getMovieSelectionByMovieId = tryCatch(async (req, res, next) => {
  const { movieId } = req.params;
  const existMovieSelection = await movieSelectionTypeService.findSelectionByMovieId(
    +movieId
  );
  res.status(200).json({ movieData: existMovieSelection });
});

module.exports = movieSelectionController;
