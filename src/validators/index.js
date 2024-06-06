const authValidateSchema = require("../validators/auth-validator");
const bookingValidateSchema = require("../validators/booking-validator");
const movieSeletionValidateSchema = require("../validators/movie-selection-validator");
const movieValidateSchema = require("../validators/movie-validator");
const seatValidateSchema = require("../validators/seat-validator");
const showtimeValidateSchema = require("../validators/showtime-validation");

module.exports = {
  authValidateSchema,
  bookingValidateSchema,
  movieSeletionValidateSchema,
  movieValidateSchema,
  seatValidateSchema,
  showtimeValidateSchema,
};
