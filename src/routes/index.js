const authRouter = require("./auth-route");
const movieRouter = require("./movie-route");
const seatRouter = require("./seat-route");
const movieSelectionRouter = require("./movie-selection-route");
const showtimeRouter = require("./showtime-route");
const bookingRouter = require("./booking-route");

module.exports = {
  authRouter,
  movieRouter,
  seatRouter,
  movieSelectionRouter,
  showtimeRouter,
  bookingRouter,
};
