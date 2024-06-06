const express = require("express");
const movieSelectionController = require("../controllers/movie-selection-controller");
const { adminAuthenticate } = require("../middlewares");

const movieSelectionRouter = express.Router();

movieSelectionRouter.post(
  "/",
  adminAuthenticate,
  movieSelectionController.createSelection
);
movieSelectionRouter.delete(
  "/delete/:movieId",
  adminAuthenticate,
  movieSelectionController.deleteSelection
);
movieSelectionRouter.get("/", movieSelectionController.getMovieSelectionBySelectionType);

module.exports = movieSelectionRouter;
