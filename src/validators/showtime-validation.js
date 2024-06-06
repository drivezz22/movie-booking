const Joi = require("joi");

const showtimeValidateSchema = {};

showtimeValidateSchema.createShowtime = Joi.object({
  theaterId: Joi.number().required(),
  movieId: Joi.number().required(),
  date: Joi.date().required(),
  startMovieTime: Joi.date().required(),
  endMovieTime: Joi.date().required(),
});

showtimeValidateSchema.updateShowtime = Joi.object({
  theaterId: Joi.number(),
  movieId: Joi.number(),
  date: Joi.date(),
  startMovieTime: Joi.date(),
  endMovieTime: Joi.date(),
});

module.exports = showtimeValidateSchema;
