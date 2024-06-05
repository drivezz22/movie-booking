const createError = require("../utils/create-error");
const authValidateSchema = require("../validators/auth-validator");
const movieValidateSchema = require("../validators/movie-validator");

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
exports.movieValidator = (req, res, next) =>
  validatorWrapper(movieValidateSchema.createMovie, req, res, next);
