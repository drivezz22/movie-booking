const dayjs = require("dayjs");
const { PAYMENT_TYPE } = require("../constants");
const { bookingService, bookingSeatDetialService, seatService } = require("../services");
const { tryCatch } = require("../utils");

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

  if (deleteBookingIdList.length > 0) {
    await bookingService.deleteBookingsByIdList(deleteBookingIdList);
    await bookingSeatDetialService.deleteBookingSeatsByIdList(deleteBookingSeatIdList);
  }

  next();
});

module.exports = failedBookingCheck;
