const { PrismaClient } = require("@prisma/client");
const { seatTypeData } = require("./mock/seatTypeData");
const { statusTypeData } = require("./mock/statusTypeData");
const { theaterData } = require("./mock/theaterData");
const { paymentTypeData } = require("./mock/paymentTypeData");
const { genreTypeData } = require("./mock/genreTypeData");
const { movieSelectTypeData } = require("./mock/movieSelectTypeData");
const { seatData } = require("./mock/seatData");
const { userData } = require("./mock/userData");

const prisma = new PrismaClient();

const initialRun = async () => {
  await prisma.user.createMany({ data: userData });
  await prisma.seatType.createMany({ data: seatTypeData });
  await prisma.statusType.createMany({ data: statusTypeData });
  await prisma.theater.createMany({ data: theaterData });
  await prisma.paymentType.createMany({ data: paymentTypeData });
  await prisma.genreType.createMany({ data: genreTypeData });
  await prisma.movieSelectType.createMany({ data: movieSelectTypeData });
  await prisma.seat.createMany({ data: seatData });
};
initialRun();
