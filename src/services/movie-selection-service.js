const prisma = require("../models/prisma");

const movieSelectionTypeService = {};

movieSelectionTypeService.findSelectionByMovieId = (movieId) =>
  prisma.movieSelection.findMany({ where: { movieId } });

movieSelectionTypeService.findSelectionByMovieIdAndSelectionTypeId = (
  movieId,
  movieSelectTypeId
) => prisma.movieSelection.findFirst({ where: { movieId, movieSelectTypeId } });

module.exports = movieSelectionTypeService;
