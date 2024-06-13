const express = require("express");
const movieSelectionController = require("../controllers/movie-selection-controller");
const { adminAuthenticate, movieSelectionValidator } = require("../middlewares");
const movieSelectionRouter = express.Router();

movieSelectionRouter.post(
  "/",
  adminAuthenticate,
  movieSelectionValidator,
  movieSelectionController.createSelection
);

movieSelectionRouter.patch(
  "/update/:movieId",
  adminAuthenticate,
  movieSelectionController.updateSelection
);

movieSelectionRouter.delete(
  "/delete/:movieId",
  adminAuthenticate,
  movieSelectionController.deleteSelection
);
movieSelectionRouter.get(
  "/:selectionType",
  movieSelectionController.getMovieSelectionBySelectionType
);
movieSelectionRouter.get("/", movieSelectionController.getMovieSelectionByForAllMovie);

movieSelectionRouter.get(
  "/:movieId",
  movieSelectionController.getMovieSelectionByMovieId
);

module.exports = movieSelectionRouter;
