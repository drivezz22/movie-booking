const Joi = require("joi");
const { paymentType } = require("../models/prisma");

const bookingValidateSchema = {};

bookingValidateSchema.createBooking = Joi.object({
  showtimeId: Joi.number().required(),
  userId: Joi.number().required(),
});

module.exports = bookingValidateSchema;
