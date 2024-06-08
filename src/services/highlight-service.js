const prisma = require("../models/prisma");

const highlightService = {};

highlightService.createHighlight = (data) => prisma.highlight.create({ data });

highlightService.getHighlightByMovieId = (movieId) =>
  prisma.highlight.findFirst({ where: { movieId } });

highlightService.updateHighlightById = (id, data) =>
  prisma.highlight.update({ data, where: { id } });

highlightService.deleteHighlightByMovieId = (movieId) =>
  prisma.highlight.deleteMany({ where: { movieId } });

highlightService.getAllHighlight = () => prisma.highlight.findMany();

module.exports = highlightService;
