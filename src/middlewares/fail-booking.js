const dayjs = require("dayjs");
const bookingService = require("../services/booking-service");
const createError = require("../utils/create-error");
const tryCatch = require("../utils/try-catch-wrapper");
const { PAYMENT_TYPE } = require("../constants");
const bookingSeatDetialService = require("../services/booking-seat-detial-service");
const seatService = require("../services/seat-service");

const failedBookingCheck = tryCatch(async (req, res, next) => {
  const bookingDataList = await bookingService.getBookingListByUserId(req.user.id);

  const currentDatetime = dayjs(new Date());
  const deleteBookingIdList = [];
  const deleteBookingSeatIdList = [];

  bookingDataList.forEach((el) => {
    if (el.paymentTypeId !== PAYMENT_TYPE.SUCCESS) {
      const compareDatetime = dayjs(el.createdAt);
      const diffTime = currentDatetime.diff(compareDatetime, "minute");
      if (diffTime > 10) {
        deleteBookingIdList.push(el.id);
        deleteBookingSeatIdList.push(el.bookingSeatsDetailId);
      }
    }
  });

  const bookingSeatDetial = await bookingSeatDetialService.getBookingSeatsByIdList(
    deleteBookingSeatIdList
  );

  const changeSeatStatusList = [];
  if (bookingSeatDetial.length > 0) {
    bookingSeatDetial.forEach((el) => {
      if (el.seatId1) changeSeatStatusList.push(el.seatId1);
      if (el.seatId2) changeSeatStatusList.push(el.seatId2);
      if (el.seatId3) changeSeatStatusList.push(el.seatId3);
    });
  }

  if (deleteBookingIdList.length > 0) {
    await bookingService.deleteBookingsByIdList(deleteBookingIdList);
    await bookingSeatDetialService.deleteBookingSeatsByIdList(deleteBookingSeatIdList);
    if (changeSeatStatusList.length > 0) {
      await seatService.updateAvailableStatusByIdList(changeSeatStatusList);
    }
  }

  next();
});

module.exports = failedBookingCheck;
