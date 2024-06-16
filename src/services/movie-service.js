const prisma = require("../models/prisma");

const movieService = {};

movieService.createMovie = (data) => prisma.movie.create({ data });

movieService.updateMovieById = (movieId, data) =>
  prisma.movie.update({ data, where: { id: movieId } });

movieService.getMovieById = (movieId) =>
  prisma.movie.findUnique({ where: { id: movieId } });

movieService.deleteMovieById = (movieId) =>
  prisma.movie.deleteMany({
    where: { id: movieId },
  });

movieService.getAllMovie = () =>
  prisma.movie.findMany({
    include: {
      genre1: true,
      genre2: true,
      genre3: true,
      movieSelections: true,
      highlights: true,
    },
  });

module.exports = movieService;
