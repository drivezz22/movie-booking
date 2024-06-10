const QRCode = require("qrcode");
const fs = require("fs-extra");
const {
  BOOKING_SEAT_DETAIL_COL,
  PAYMENT_TYPE,
  QRCODE_IMAGE_DIR,
} = require("../constants");
const {
  seatService,
  bookingSeatDetialService,
  bookingService,
  uploadService,
  showtimeService,
} = require("../services");
const { tryCatch, createError } = require("../utils");

const bookingController = {};

bookingController.createBooking = async (req, res, next) => {
  try {
    const seatQuery = JSON.parse(req.query.seatIdList);
    const data = req.body;

    if (data.userId !== req.user.id) {
      createError({ message: "Unauthorized to execute this action", statusCode: 400 });
    }

    if (seatQuery.length === 0) {
      createError({ message: "No seatId in query params", statusCode: 400 });
    }

    if (seatQuery.length > 3) {
      createError({ message: "Seat limit: 3 seats per booking", statusCode: 400 });
    }

    const existSeatList = await seatService.findSeatsByIdList(seatQuery);
    if (seatQuery.length !== existSeatList.length) {
      createError({ message: "Some seatId not in DB", statusCode: 400 });
    }

    const existShowtime = await showtimeService.getShowtimeById(data.showtimeId);
    if (!existShowtime) {
      createError({ message: "No showtime is DB", statusCode: 400 });
    }

    const bookingSeatData = {};
    for (let idx in seatQuery) {
      bookingSeatData[BOOKING_SEAT_DETAIL_COL[idx]] = seatQuery[idx];
    }

    const bookedSeat = await seatService.findBookedSeatsByIdList(seatQuery);

    if (bookedSeat.length > 0) {
      createError({ message: "Seats are already booked", statusCode: 400 });
    }

    const existSeat = await seatService.findSeatsByIdList(seatQuery);

    existSeat.forEach((el) => {
      if (el.theaterId !== existShowtime.theaterId) {
        createError({ message: "Seat are wrong theater", statusCode: 400 });
      }
    });

    await seatService.updateBookedStatusByIdList(seatQuery);

    const bookingSeatDetial = await bookingSeatDetialService.createBookingSeats(
      bookingSeatData
    );

    const qrCodePaymentName = `${QRCODE_IMAGE_DIR}/${new Date().getTime()}${Math.round(
      Math.random() * 100000
    )}_QRCODE_PAYMENT.png`;

    await QRCode.toFile(qrCodePaymentName, process.env.FRONTEND_PAYMENT_PATH);

    const qrCodeImagePath = await uploadService.upload(qrCodePaymentName);

    const bookingData = {
      ...data,
      bookingSeatsDetailId: bookingSeatDetial.id,
      qrCodeImagePath,
      paymentTypeId: PAYMENT_TYPE.PENDING,
    };
    const booking = await bookingService.createBooking(bookingData);

    res.status(201).json({ message: "Booking is created", booking });
  } catch (err) {
    next(err);
  } finally {
    fs.emptyDirSync(QRCODE_IMAGE_DIR);
  }
};

bookingController.successUpdate = async (req, res, next) => {
  try {
    const { bookingId } = req.params;

    const existBooking = await bookingService.getBookingById(+bookingId);
    if (!existBooking) {
      createError({ message: "No booking id in DB", statusCode: 400 });
    }

    if (existBooking.paymentTypeId === PAYMENT_TYPE.SUCCESS) {
      createError({ message: "Already Payment", statusCode: 400 });
    }

    await uploadService.delete(existBooking.qrCodeImagePath);

    const qrCodeSuccess = `${QRCODE_IMAGE_DIR}/${new Date().getTime()}${Math.round(
      Math.random() * 100000
    )}_QRCODE_COMPLETED.png`;

    await QRCode.toFile(qrCodeSuccess, JSON.stringify(existBooking));

    existBooking.qrCodeImagePath = await uploadService.upload(qrCodeSuccess);

    const updateBookingData = {
      qrCodeImagePath: existBooking.qrCodeImagePath,
      paymentTypeId: PAYMENT_TYPE.SUCCESS,
    };

    const updateBooking = await bookingService.updateBookingById(
      +bookingId,
      updateBookingData
    );
    res.status(200).json({ message: "Booking is updated", updateBooking });
  } catch (err) {
    next(err);
  } finally {
    fs.emptyDirSync(QRCODE_IMAGE_DIR);
  }
};

bookingController.getAllBooking = tryCatch(async (req, res, next) => {
  const bookingDataList = await bookingService.getBookingListByUserId(req.user.id);
  if (bookingDataList.length === 0) {
    createError({ message: "No booking for this user", statusCode: 400 });
  }

  res.status(200).json({ bookingDataList });
});

module.exports = bookingController;
