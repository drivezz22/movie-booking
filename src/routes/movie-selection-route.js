const express = require("express");
const adminAuthenticate = require("../middlewares/admin-authenticate");
const authenticate = require("../middlewares/authenticate");
const movieSelectionController = require("../controllers/movie-selection-controller");
const movieSelectionRouter = express.Router();

movieSelectionRouter.post(
  "/",
  authenticate,
  adminAuthenticate,
  movieSelectionController.createSelection
);
movieSelectionRouter.delete(
  "/delete/:movieId",
  authenticate,
  adminAuthenticate,
  movieSelectionController.deleteSelection
);
movieSelectionRouter.get(
  "/",
  authenticate,
  movieSelectionController.getMovieSelectionBySelectionType
);

module.exports = movieSelectionRouter;
