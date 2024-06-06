const createError = require("../utils/create-error");
const {
  authValidateSchema,
  bookingValidateSchema,
  movieSeletionValidateSchema,
  movieValidateSchema,
  seatValidateSchema,
  showtimeValidateSchema,
} = require("../validators");

const validatorWrapper = (schema, req, res, next) => {
  const { value, error } = schema.validate(req.body);
  if (error) {
    return createError({ message: error.details[0].message, statusCode: 400 });
  }
  req.input = value;
  next();
};

exports.registerValidator = (req, res, next) =>
  validatorWrapper(authValidateSchema.register, req, res, next);
exports.loginValidator = (req, res, next) =>
  validatorWrapper(authValidateSchema.login, req, res, next);
exports.createMovieValidator = (req, res, next) =>
  validatorWrapper(movieValidateSchema.createMovie, req, res, next);
exports.updateMovieValidator = (req, res, next) =>
  validatorWrapper(movieValidateSchema.updateMovie, req, res, next);
exports.seatPriceValidator = (req, res, next) =>
  validatorWrapper(seatValidateSchema.price, req, res, next);
exports.seatStatusValidator = (req, res, next) =>
  validatorWrapper(seatValidateSchema.status, req, res, next);
exports.movieSelectionValidator = (req, res, next) =>
  validatorWrapper(movieSeletionValidateSchema.selectionType, req, res, next);
exports.createShowtimeValidator = (req, res, next) =>
  validatorWrapper(showtimeValidateSchema.createShowtime, req, res, next);
exports.updateShowtimeValidator = (req, res, next) =>
  validatorWrapper(showtimeValidateSchema.updateShowtime, req, res, next);
exports.createBookingValidator = (req, res, next) =>
  validatorWrapper(bookingValidateSchema.createBooking, req, res, next);
