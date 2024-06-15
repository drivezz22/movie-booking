const express = require("express");
const bookingController = require("../controllers/booking-controller");
const { createBookingValidator, failedBookingCheck } = require("../middlewares");

const bookingRouter = express.Router();

bookingRouter.post("/", createBookingValidator, bookingController.createBooking);
bookingRouter.patch("/success/:bookingId", bookingController.successUpdate);
bookingRouter.get("/", failedBookingCheck, bookingController.getAllBooking);
bookingRouter.get(
  "/showtime/:showtimeId/",
  failedBookingCheck,
  bookingController.getBookingByShowtimeId
);
bookingRouter.get("/:bookingId", failedBookingCheck, bookingController.getBookingById);

bookingRouter.get(
  "/showtime/:showtimeId/booked-seat",
  failedBookingCheck,
  bookingController.getBookedSeat
);

module.exports = bookingRouter;
