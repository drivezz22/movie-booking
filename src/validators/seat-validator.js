const Joi = require("joi");

const seatValidateSchema = {};

seatValidateSchema.price = Joi.object({
  price: Joi.number(),
  seatTypeId: Joi.number(),
});

seatValidateSchema.status = Joi.object({
  statusTypeId: Joi.number(),
});

module.exports = seatValidateSchema;
