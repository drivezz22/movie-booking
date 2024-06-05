const Joi = require("joi");

const movieValidateSchema = {};

movieValidateSchema.createMovie = Joi.object({
  movieName: Joi.string().required().trim(),
  movieSynopsis: Joi.string().allow(""),
  genreId1: Joi.number().allow(null),
  genreId2: Joi.number().allow(null).invalid(Joi.ref("genreId1")),
  genreId3: Joi.number().allow(null).invalid(Joi.ref("genreId1"), Joi.ref("genreId2")),
  movieImagePath: Joi.string().allow(""),
  movieTrailerPath: Joi.string().allow(""),
  durationInMin: Joi.number().allow(null),
});

module.exports = movieValidateSchema;
