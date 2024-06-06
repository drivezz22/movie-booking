const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");

dayjs.extend(utc);

exports.timeConvertInputToDateTime = (dateTimeString) => {
  return dayjs(dateTimeString).utc(true).utcOffset(0).format();
};

exports.timeConvertFromDB = (timeString) => {
  return dayjs(timeString).utc().utcOffset(0).format("HH:mm");
};

exports.timeConvert = (timeString) => {
  return dayjs(timeString).utc().format("HH:mm");
};
