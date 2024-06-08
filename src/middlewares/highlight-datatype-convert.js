const highlightDatatypeConvert = (req, res, next) => {
  if (req.body?.movieId) {
    req.body.movieId = +req.body.movieId;
  }
  next();
};

module.exports = highlightDatatypeConvert;
