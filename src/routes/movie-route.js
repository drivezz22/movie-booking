const express = require("express");
const adminAuthenticate = require("../middlewares/admin-authenticate");
const {
  updateMovieValidator,
  createMovieValidator,
} = require("../middlewares/validator");
const movieController = require("../controllers/movie-controller");
const movieRouter = express.Router();
const upload = require("../middlewares/upload");
const movieDatatypeConvert = require("../middlewares/movie-datatype-convert");

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
