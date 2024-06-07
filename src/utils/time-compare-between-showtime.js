module.exports.timeCompareBetweenShowtime = (
  showtimeAStartTime,
  showtimeAEndTime,
  showtimeBStartTime
) => showtimeAStartTime <= showtimeBStartTime && showtimeAEndTime > showtimeBStartTime;
