const notFoundMiddleware = require("./not-found");
const errorMiddleware = require("./error");
const authenticate = require("./authenticate");
const failedBookingCheck = require("./fail-booking");
const adminAuthenticate = require("./admin-authenticate");
const upload = require("./upload");
const movieDatatypeConvert = require("./movie-datatype-convert");
const showtimeDateTimeValidator = require("./showtime-time-datetime-validate");

const {
  registerValidator,
  loginValidator,
  createBookingValidator,
  updateMovieValidator,
  createMovieValidator,
  seatPriceValidator,
  seatStatusValidator,
  createShowtimeValidator,
  updateShowtimeValidator,
} = require("./validator");

module.exports = {
  notFoundMiddleware,
  errorMiddleware,
  authenticate,
  registerValidator,
  loginValidator,
  createBookingValidator,
  failedBookingCheck,
  adminAuthenticate,
  upload,
  movieDatatypeConvert,
  updateMovieValidator,
  createMovieValidator,
  seatPriceValidator,
  seatStatusValidator,
  createShowtimeValidator,
  updateShowtimeValidator,
  showtimeDateTimeValidator,
};
