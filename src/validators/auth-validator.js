const Joi = require("joi");

const authValidateSchema = {};

authValidateSchema.register = Joi.object({
  email: Joi.string().email({ tlds: false }),
  name: Joi.string().required().trim(),
  phone: Joi.string().pattern(/^\d{10}$/),
  password: Joi.string()
    .required()
    .pattern(/^[0-9a-zA-Z]{6,}$/),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).strip(),
});

authValidateSchema.login = Joi.object({
  email: Joi.string().email({ tlds: false }),
  password: Joi.string().required(),
});

module.exports = authValidateSchema;
