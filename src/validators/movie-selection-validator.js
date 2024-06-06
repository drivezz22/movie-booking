const Joi = require("joi");

const movieSeletionValidateSchema = {};

movieSeletionValidateSchema.selectionType = Joi.object({
  movieId: Joi.number(),
  movieSelectionTypeId: Joi.number(),
});

module.exports = movieSeletionValidateSchema;
