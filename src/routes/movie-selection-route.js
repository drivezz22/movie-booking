const express = require("express");
const adminAuthenticate = require("../middlewares/admin-authenticate");
const authenticate = require("../middlewares/authenticate");
const movieSelectionRouter = express.Router();

movieSelectionRouter.post("/", authenticate, adminAuthenticate, () => {});

module.exports = movieSelectionRouter;
