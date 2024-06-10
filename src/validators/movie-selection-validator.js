const Joi = require("joi");

const movieSeletionValidateSchema = {};

movieSeletionValidateSchema.selectionType = Joi.object({
  movieId: Joi.number(),
  movieSelectTypeId: Joi.number(),
});

module.exports = movieSeletionValidateSchema;
