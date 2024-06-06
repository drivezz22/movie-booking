const express = require("express");
const adminAuthenticate = require("../middlewares/admin-authenticate");
const showtimeController = require("../controllers/showtime-controller");
const showtimeDateTimeValidate = require("../middlewares/showtime-time-datetime-validate");
const showtimeRouter = express.Router();
const {
  createShowtimeValidator,
  updateShowtimeValidator,
} = require("../middlewares/validator");

showtimeRouter.post(
  "/",
  adminAuthenticate,
  showtimeDateTimeValidate,
  createShowtimeValidator,
  showtimeController.createShowtime
);

showtimeRouter.patch(
  "/:showtimeId/update",
  adminAuthenticate,
  showtimeDateTimeValidate,
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
