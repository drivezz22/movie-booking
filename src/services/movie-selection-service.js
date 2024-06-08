const prisma = require("../models/prisma");

const movieSelectionTypeService = {};

movieSelectionTypeService.findSelectionByMovieId = (movieId) =>
  prisma.movieSelection.findFirst({ where: { movieId } });

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

movieSelectionTypeService.updateSelectionById = (id, data) =>
  prisma.movieSelection.update({ data, where: { id } });

module.exports = movieSelectionTypeService;
