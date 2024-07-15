const hashService = require("./hash-service");
const jwtService = require("./jwt-service");
const userService = require("./user-service");
const bookingSeatDetailService = require("./booking-seat-detial-service");
const bookingService = require("./booking-service");
const seatService = require("./seat-service");
const uploadService = require("./upload-service");
const showtimeService = require("./showtime-service");
const movieService = require("./movie-service");
const movieSelectionTypeService = require("./movie-selection-service");
const highlightService = require("./highlight-service");

module.exports = {
  hashService,
  jwtService,
  userService,
  bookingSeatDetailService,
  bookingService,
  seatService,
  uploadService,
  showtimeService,
  movieService,
  movieSelectionTypeService,
  highlightService,
};
