const { PrismaClient } = require("@prisma/client");
const { seatTypeData } = require("./mock/seatTypeData");
const { theaterData } = require("./mock/theaterData");
const { paymentTypeData } = require("./mock/paymentTypeData");
const { genreTypeData } = require("./mock/genreTypeData");
const { movieSelectTypeData } = require("./mock/movieSelectTypeData");
const { seatData } = require("./mock/seatData");
const { userData } = require("./mock/userData");
const { movieData } = require("./mock/movieData");

const prisma = new PrismaClient();

const initialRun = async () => {
  await prisma.user.createMany({ data: userData });
  await prisma.seatType.createMany({ data: seatTypeData });
  await prisma.theater.createMany({ data: theaterData });
  await prisma.paymentType.createMany({ data: paymentTypeData });
  await prisma.genreType.createMany({ data: genreTypeData });
  await prisma.movie.createMany({ data: movieData });
  await prisma.movieSelectType.createMany({ data: movieSelectTypeData });
  await prisma.seat.createMany({ data: seatData });
};
initialRun();
