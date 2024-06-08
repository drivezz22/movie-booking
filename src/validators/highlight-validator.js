const Joi = require("joi");

const highlightValidateSchema = {};

highlightValidateSchema.create = Joi.object({
  movieId: Joi.number().required(),
  coverImagePath: Joi.string(),
  highlightWord: Joi.string().allow(""),
});

highlightValidateSchema.update = Joi.object({
  coverImagePath: Joi.string().allow(""),
  highlightWord: Joi.string().allow(""),
});

module.exports = highlightValidateSchema;
