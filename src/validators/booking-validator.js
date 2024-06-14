const Joi = require("joi");

const bookingValidateSchema = {};

bookingValidateSchema.createBooking = Joi.object({
  showtimeId: Joi.number().required(),
  userId: Joi.number().required(),
  totalPrice: Joi.number().required(),
  paymentPath: Joi.string().required(),
  seatQuery: Joi.array(),
});

module.exports = bookingValidateSchema;
