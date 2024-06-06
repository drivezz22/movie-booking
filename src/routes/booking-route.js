const express = require("express");
const { createBookingValidator } = require("../middlewares/validator");
const bookingController = require("../controllers/booking-controller");
const failedBookingCheck = require("../middlewares/fail-booking");

const bookingRouter = express.Router();

bookingRouter.post("/", createBookingValidator, bookingController.createBooking);
bookingRouter.patch("/success/:bookingId", bookingController.successUpdate);
bookingRouter.get("/", failedBookingCheck, bookingController.getAllBooking);
module.exports = bookingRouter;
