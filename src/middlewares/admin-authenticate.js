const jwtService = require("../services/jwt-service");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");
const tryCatch = require("../utils/try-catch-wrapper");

const adminAuthenticate = tryCatch(async (req, res, next) => {
  if (!req.user.isAdmin) {
    createError({
      message: "User has no access rights",
      statusCode: 403,
    });
  }

  next();
});

module.exports = adminAuthenticate;
