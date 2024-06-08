const authValidateSchema = require("./auth-validator");
const bookingValidateSchema = require("./booking-validator");
const movieSeletionValidateSchema = require("./movie-selection-validator");
const movieValidateSchema = require("./movie-validator");
const seatValidateSchema = require("./seat-validator");
const showtimeValidateSchema = require("./showtime-validation");
const highlightValidateSchema = require("./highlight-validator");

module.exports = {
  authValidateSchema,
  bookingValidateSchema,
  movieSeletionValidateSchema,
  movieValidateSchema,
  seatValidateSchema,
  showtimeValidateSchema,
  highlightValidateSchema,
};
