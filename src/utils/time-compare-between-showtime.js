const timeCompareBetweenShowtime = (
  showtimeAStartTime,
  showtimeAEndTime,
  showtimeBStartTime
) => showtimeAStartTime <= showtimeBStartTime && showtimeAEndTime > showtimeBStartTime;

module.exports = timeCompareBetweenShowtime;
