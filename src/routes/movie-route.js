const express = require("express");
const adminAuthenticate = require("../middlewares/admin-authenticate");
const { movieValidator } = require("../middlewares/validator");
const movieController = require("../controllers/movie-controller");
const movieRouter = express.Router();

movieRouter.post("/", adminAuthenticate, movieValidator, movieController.createMovie);

movieRouter.patch(
  "/:movieId",
  adminAuthenticate,
  movieValidator,
  movieController.updateMovie
);

movieRouter.delete("/:movieId", adminAuthenticate, movieController.deleteMovie);

movieRouter.get("/:movieId", movieController.getMovie);

movieRouter.get("/", movieController.getAllMovie);

module.exports = movieRouter;
