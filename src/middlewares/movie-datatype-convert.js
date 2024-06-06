const tryCatch = require("../utils/try-catch-wrapper");

const movieDatatypeConvert = tryCatch(async (req, res, next) => {
  if (req.body?.genreId1) {
    req.body.genreId1 = +req.body.genreId1;
  }
  if (req.body?.genreId2) {
    req.body.genreId2 = +req.body.genreId2;
  }
  if (req.body?.genreId3) {
    req.body.genreId3 = +req.body.genreId3;
  }
  if (req.body?.durationInMin) {
    req.body.durationInMin = +req.body.durationInMin;
  }
  next();
});

module.exports = movieDatatypeConvert;
