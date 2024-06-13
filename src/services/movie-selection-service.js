const prisma = require("../models/prisma");

const movieSelectionTypeService = {};

movieSelectionTypeService.findSelectionByMovieId = (movieId) =>
  prisma.movieSelection.findFirst({ where: { movieId } });

movieSelectionTypeService.findSelectionBySelectionType = (movieSelectTypeId) =>
  prisma.movieSelection.findMany({ where: { movieSelectTypeId } });

movieSelectionTypeService.findSelectionByAllMovie = () =>
  prisma.movieSelection.findMany();

movieSelectionTypeService.findSelectionByMovieIdSelectionType = (
  movieId,
  movieSelectTypeId
) => prisma.movieSelection.findFirst({ where: { movieId, movieSelectTypeId } });

movieSelectionTypeService.createSelection = (data) =>
  prisma.movieSelection.create({ data });

movieSelectionTypeService.deleteSelectionByMovieId = (movieId) =>
  prisma.movieSelection.deleteMany({ where: { movieId } });

movieSelectionTypeService.updateSelectionByMovieId = (movieId, data) =>
  prisma.movieSelection.updateMany({ data, where: { movieId } });

module.exports = movieSelectionTypeService;
