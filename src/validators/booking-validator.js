const Joi = require("joi");

const bookingValidateSchema = {};

bookingValidateSchema.createBooking = Joi.object({
  showtimeId: Joi.number().required(),
  totalPrice: Joi.number().required(),
  seatQuery: Joi.array(),
});

module.exports = bookingValidateSchema;
