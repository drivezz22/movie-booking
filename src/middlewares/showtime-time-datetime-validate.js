const createError = require("../utils/create-error");
const tryCatch = require("../utils/try-catch-wrapper");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const dayjs = require("dayjs");
const {
  timeConvertInputToDateTime,
  timeConvertFromDB,
  timeConvert,
} = require("../utils/time-convert");
const showtimeService = require("../services/showtime-service");
const { timeCompareBetweenShowtime } = require("../utils/time-compare-between-showtime");

dayjs.extend(customParseFormat);

const showtimeDateTimeValidator = tryCatch(async (req, res, next) => {
  const data = req.body;
  const tmp = data.date;

  if (!dayjs(data?.date, "YYYY-MM-DD", true).isValid()) {
    createError({ message: "date should be YYYY-MM-DD format" });
  }

  if (
    !dayjs(data?.startMovieTime, "HH:mm", true).isValid() ||
    !dayjs(data?.endMovieTime, "HH:mm", true).isValid()
  ) {
    createError({ message: "Time should be HH:mm format" });
  }

  if (data?.startMovieTime && data?.endMovieTime) {
    if (data?.endMovieTime <= data?.startMovieTime) {
      createError({ message: "end time should be more than start time" });
    }
  }

  data.date = timeConvertInputToDateTime(`${tmp} 00:00`);
  data.startMovieTime = timeConvertInputToDateTime(`${tmp} ${data.startMovieTime}`);
  data.endMovieTime = timeConvertInputToDateTime(`${tmp} ${data.endMovieTime}`);

  const existShowtimeList = await showtimeService.findShowtimesByDateAndTheaterId(
    data.date,
    data.theaterId
  );

  if (existShowtimeList) {
    existShowtimeList.forEach((el) => {
      const isOverlapStartTime = timeCompareBetweenShowtime(
        timeConvertFromDB(el.startMovieTime),
        timeConvertFromDB(el.endMovieTime),
        timeConvert(data.startMovieTime)
      );
      if (isOverlapStartTime) {
        createError({
          message: "Time is overlap compare with other showtime",
          statusCode: 400,
        });
      }

      const isOverlapEndTime = timeCompareBetweenShowtime(
        timeConvert(data.startMovieTime),
        timeConvert(data.endMovieTime),
        timeConvertFromDB(el.startMovieTime)
      );
      if (isOverlapEndTime) {
        createError({
          message: "Time is overlap compare with other showtime",
          statusCode: 400,
        });
      }
    });
  }

  req.body = data;

  next();
});

module.exports = showtimeDateTimeValidator;
