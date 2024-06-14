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
    const data = req.body;
    console.log(data);
    if (data.userId !== req.user.id) {
      createError({ message: "Unauthorized to execute this action", statusCode: 400 });
    }

    if (data.seatQuery.length === 0) {
      createError({ message: "No seatId in query params", statusCode: 400 });
    }

    if (data.seatQuery.length > 3) {
      createError({ message: "Seat limit: 3 seats per booking", statusCode: 400 });
    }

    const existSeatList = await seatService.findSeatsByIdList(data.seatQuery);
    if (data.seatQuery.length !== existSeatList.length) {
      createError({ message: "Some seatId not in DB", statusCode: 400 });
    }

    const existShowtime = await showtimeService.getShowtimeById(data.showtimeId);
    if (!existShowtime) {
      createError({ message: "No showtime is DB", statusCode: 400 });
    }

    const bookingSeatData = {};
    for (let idx in data.seatQuery) {
      bookingSeatData[BOOKING_SEAT_DETAIL_COL[idx]] = data.seatQuery[idx];
    }

    const bookedSeat = await seatService.findBookedSeatsByIdList(data.seatQuery);

    if (bookedSeat.length > 0) {
      createError({ message: "Seats are already booked", statusCode: 400 });
    }

    const existSeat = await seatService.findSeatsByIdList(data.seatQuery);

    existSeat.forEach((el) => {
      if (el.theaterId !== existShowtime.theaterId) {
        createError({ message: "Seat are wrong theater", statusCode: 400 });
      }
    });

    const bookingSeatDetial = await bookingSeatDetialService.createBookingSeats(
      bookingSeatData
    );

    const qrCodePaymentName = `${QRCODE_IMAGE_DIR}/${new Date().getTime()}${Math.round(
      Math.random() * 100000
    )}_QRCODE_PAYMENT.png`;

    await QRCode.toFile(qrCodePaymentName, data.paymentPath);
    const qrCodeImagePath = await uploadService.upload(qrCodePaymentName);

    const bookingData = {
      ...data,
      bookingSeatsDetailId: bookingSeatDetial.id,
      qrCodeImagePath,
      paymentTypeId: PAYMENT_TYPE.PENDING,
    };

    delete bookingData.paymentPath;
    delete bookingData.seatQuery;

    const booking = await bookingService.createBooking(bookingData);
    await seatService.updateBookedStatusByIdList(data.seatQuery);

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

bookingController.getBookingByShowtimeId = tryCatch(async (req, res, next) => {
  const { showtimeId } = req.params;
  const bookingDataList = await bookingService.findBookingByShowtimeId(+showtimeId);
  if (bookingDataList.length === 0) {
    createError({ message: "No showtime", statusCode: 400 });
  }

  res.status(200).json({ bookingDataList });
});

module.exports = bookingController;
