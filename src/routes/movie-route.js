const express = require("express");
const movieController = require("../controllers/movie-controller");
const {
  adminAuthenticate,
  movieDatatypeConvert,
  upload,
  createMovieValidator,
  updateMovieValidator,
} = require("../middlewares");

const movieRouter = express.Router();

movieRouter.post(
  "/",
  adminAuthenticate,
  upload.single("movieImagePath"),
  movieDatatypeConvert,
  createMovieValidator,
  movieController.createMovie
);

movieRouter.patch(
  "/:movieId",
  adminAuthenticate,
  upload.single("movieImagePath"),
  movieDatatypeConvert,
  updateMovieValidator,
  movieController.updateMovie
);

movieRouter.delete("/:movieId", adminAuthenticate, movieController.deleteMovie);
movieRouter.get("/:movieId", movieController.getMovie);
movieRouter.get("/", movieController.getAllMovie);

module.exports = movieRouter;
