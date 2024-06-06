const express = require("express");
const showtimeController = require("../controllers/showtime-controller");
const {
  adminAuthenticate,
  createShowtimeValidator,
  showtimeDateTimeValidator,
  updateShowtimeValidator,
} = require("../middlewares");

const showtimeRouter = express.Router();

showtimeRouter.post(
  "/",
  adminAuthenticate,
  showtimeDateTimeValidator,
  createShowtimeValidator,
  showtimeController.createShowtime
);

showtimeRouter.patch(
  "/:showtimeId/update",
  adminAuthenticate,
  showtimeDateTimeValidator,
  updateShowtimeValidator,
  showtimeController.updateShowtime
);

showtimeRouter.delete(
  "/:showtimeId/delete",
  adminAuthenticate,
  showtimeController.deleteShowtime
);

showtimeRouter.get("/:showtimeId", showtimeController.getShowtime);

showtimeRouter.get(
  "/movie/:movieId/theater/:theaterId",
  showtimeController.getShowtimeByMovieAndTheater
);

module.exports = showtimeRouter;
