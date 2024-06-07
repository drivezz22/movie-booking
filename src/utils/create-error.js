module.exports.createError = (detail) => {
  const error = new Error(detail.message);
  error.statusCode = detail.statusCode;
  throw error;
};
