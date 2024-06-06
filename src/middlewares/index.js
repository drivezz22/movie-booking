const notFoundMiddleware = require("./not-found");
const errorMiddleware = require("./error");
const authenticate = require("./authenticate");

module.exports = { notFoundMiddleware, errorMiddleware, authenticate };
