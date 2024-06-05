const prisma = require("../models/prisma");

const movieService = {};

movieService.createMovie = (data) => prisma.movie.create({ data });
movieService.updateMovieById = (movieId, data) =>
  prisma.movie.update({ data, where: { id: movieId } });
movieService.getMovieById = (movieId) =>
  prisma.movie.findUnique({ where: { id: movieId } });
movieService.deleteMovieById = (movieId) =>
  prisma.movie.delete({ where: { id: movieId } });
movieService.getAllMovie = () => prisma.movie.findMany();

module.exports = movieService;
