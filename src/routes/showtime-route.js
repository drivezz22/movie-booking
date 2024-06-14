const express = require("express");
const showtimeController = require("../controllers/showtime-controller");
const {
  adminAuthenticate,
  createShowtimeValidator,
  showtimeDateTimeValidator,
} = require("../middlewares");

const showtimeRouter = express.Router();

showtimeRouter.post(
  "/",
  adminAuthenticate,
  showtimeDateTimeValidator,
  createShowtimeValidator,
  showtimeController.createShowtime
);

showtimeRouter.delete(
  "/date/:date/theater/:theaterId",
  adminAuthenticate,
  showtimeController.deleteShowtimeByDateAndTheater
);

showtimeRouter.get(
  "/startDate/:startDate/endDate/:endDate",
  showtimeController.getShowtimeByStartEndDate
);

showtimeRouter.get(
  "/movie/:movieId/startDate/:startDate/endDate/:endDate",
  showtimeController.getShowtimeByMovieStartEndDate
);

showtimeRouter.get("/:showtimeId", showtimeController.getShowtime);

module.exports = showtimeRouter;
