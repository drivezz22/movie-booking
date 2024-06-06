const express = require("express");
const adminAuthenticate = require("../middlewares/admin-authenticate");
const authenticate = require("../middlewares/authenticate");
const movieSelectionController = require("../controllers/movie-selection-controller");
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
