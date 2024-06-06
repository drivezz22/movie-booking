const prisma = require("../models/prisma");

const movieSelectionTypeService = {};

movieSelectionTypeService.findSelectionByMovieId = (movieId) =>
  prisma.movieSelection.findMany({ where: { movieId } });

movieSelectionTypeService.findSelectionBySelectionType = (movieSelectTypeId) =>
  prisma.movieSelection.findMany({ where: { movieSelectTypeId } });

movieSelectionTypeService.findSelectionByMovieIdSelectionType = (
  movieId,
  movieSelectTypeId
) => prisma.movieSelection.findFirst({ where: { movieId, movieSelectTypeId } });

movieSelectionTypeService.createSelection = (data) =>
  prisma.movieSelection.create({ data });

movieSelectionTypeService.deleteSelectionById = (id) =>
  prisma.movieSelection.delete({ where: { id } });

module.exports = movieSelectionTypeService;
