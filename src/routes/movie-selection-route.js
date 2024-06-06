const express = require("express");
const adminAuthenticate = require("../middlewares/admin-authenticate");
const authenticate = require("../middlewares/authenticate");
const movieSelectionRouter = express.Router();

movieSelectionRouter.post("/", authenticate, adminAuthenticate, () => {});
movieSelectionRouter.put("/:movieId", authenticate, adminAuthenticate, () => {});
movieSelectionRouter.delete("/:movieId", authenticate, adminAuthenticate, () => {});
movieSelectionRouter.get("/", authenticate, () => {});

module.exports = movieSelectionRouter;
