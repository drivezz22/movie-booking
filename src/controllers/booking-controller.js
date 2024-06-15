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
const { theater } = require("../models/prisma");

const bookingController = {};

bookingController.createBooking = async (req, res, next) => {
  try {
    const data = req.body;
    data.userId = req.user.id;
    if (data.seatQuery.length === 0) {
      createError({ message: "No seatId in query params", statusCode: 400 });
    }

    if (data.seatQuery.length > 3) {
      createError({ message: "Seat limit: 3 seats per booking", statusCode: 400 });
    }

    const existShowtime = await showtimeService.getShowtimeById(data.showtimeId);
    if (!existShowtime) {
      createError({ message: "No showtime is DB", statusCode: 400 });
    }

    const existSeats = await seatService.findSeatsByIdList(data.seatQuery);

    existSeats.forEach((el) => {
      if (el.theaterId !== existShowtime.theaterId) {
        createError({ message: "Seat are wrong theater", statusCode: 400 });
      }
    });

    const existSeatList = await seatService.findSeatsByIdList(data.seatQuery);
    if (data.seatQuery.length !== existSeatList.length) {
      createError({ message: "Some seatId not in DB", statusCode: 400 });
    }
    const allBookingByShowTimeId = await bookingService.findBookingByShowtimeId(
      data.showtimeId
    );

    const getAllBookedIdList = allBookingByShowTimeId.map((el) => [
      el.bookingSeatsDetail.seatId1,
      el.bookingSeatsDetail.seatId2,
      el.bookingSeatsDetail.seatId3,
    ]);
    const flatArray = getAllBookedIdList.flat().filter((n) => n);

    if (data.seatQuery.some((el) => flatArray.includes(el))) {
      createError({ message: "Seats are already booked", statusCode: 400 });
    }

    const bookingSeatData = {};
    for (let idx in data.seatQuery) {
      bookingSeatData[BOOKING_SEAT_DETAIL_COL[idx]] = data.seatQuery[idx];
    }

    const bookingSeatDetial = await bookingSeatDetialService.createBookingSeats(
      bookingSeatData
    );

    const bookingData = {
      ...data,
      bookingSeatsDetailId: bookingSeatDetial.id,
      qrCodeImagePath: "waiting upload",
      paymentTypeId: PAYMENT_TYPE.PENDING,
    };

    delete bookingData.paymentPath;
    delete bookingData.seatQuery;

    const booking = await bookingService.createBooking(bookingData);

    const qrCodePaymentName = `${QRCODE_IMAGE_DIR}/${new Date().getTime()}${Math.round(
      Math.random() * 100000
    )}_QRCODE_PAYMENT.png`;

    await QRCode.toFile(qrCodePaymentName, `${process.env.PAYMENT_PATH}/${booking.id}`);
    const qrCodeImagePath = await uploadService.upload(qrCodePaymentName);

    const updateDate = await bookingService.updateBookingById(booking.id, {
      qrCodeImagePath,
    });

    res.status(201).json({ message: "Booking is created", booking: updateDate });
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

bookingController.getAllBooking = tryCatch(async (req, res) => {
  const bookingDataList = await bookingService.getBookingListByUserId(req.user.id);
  if (bookingDataList.length === 0) {
    createError({ message: "No booking for this user", statusCode: 400 });
  }

  res.status(200).json({ bookingDataList });
});

bookingController.getBookingByShowtimeId = tryCatch(async (req, res) => {
  const { showtimeId } = req.params;
  const bookingDataList = await bookingService.findBookingByShowtimeId(+showtimeId);
  if (bookingDataList.length === 0) {
    return res.status(200).json({});
  }

  res.status(200).json({ bookingDataList });
});

bookingController.getBookingById = tryCatch(async (req, res) => {
  const { bookingId } = req.params;
  const bookingData = await bookingService.getBookingByIdAndUserId(
    +bookingId,
    req.user.id
  );

  if (!bookingData) {
    createError({ message: "No booking", statusCode: 400 });
  }

  res.status(200).json({ bookingData });
});

bookingController.getBookedSeat = tryCatch(async (req, res) => {
  const { showtimeId } = req.params;
  const allBookingByShowTimeId = await bookingService.findBookingByShowtimeId(
    +showtimeId
  );
  const seatData = [];
  allBookingByShowTimeId.map((el) => {
    if (el.bookingSeatsDetail.seatId1) {
      seatData.push({
        row: el.bookingSeatsDetail.seat1.row,
        column: el.bookingSeatsDetail.seat1.column,
        theaterId: el.showtime.theater.id,
      });
    }
    if (el.bookingSeatsDetail.seatId2) {
      seatData.push({
        row: el.bookingSeatsDetail.seat2.row,
        column: el.bookingSeatsDetail.seat2.column,
        theaterId: el.showtime.theater.id,
      });
    }
    if (el.bookingSeatsDetail.seatId3)
      seatData.push({
        row: el.bookingSeatsDetail.seat3.row,
        column: el.bookingSeatsDetail.seat3.column,
        theaterId: el.showtime.theater.id,
      });
    return seatData;
  });

  res.status(200).json({ bookedSeats: seatData });
});

module.exports = bookingController;
