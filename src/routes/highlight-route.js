const express = require("express");
const {
  adminAuthenticate,
  highlightDatatypeConvert,
  createHighlightValidator,
  updateHighlightValidator,
  upload,
} = require("../middlewares");
const highlightController = require("../controllers/highlight-controller");

const highlightRouter = express.Router();

highlightRouter.post(
  "/",
  adminAuthenticate,
  upload.single("coverImagePath"),
  highlightDatatypeConvert,
  createHighlightValidator,
  highlightController.createHighlight
);

highlightRouter.patch(
  "/:movieId",
  adminAuthenticate,
  upload.single("coverImagePath"),
  highlightDatatypeConvert,
  updateHighlightValidator,
  highlightController.updateHighlight
);

highlightRouter.delete(
  "/:movieId",
  adminAuthenticate,
  highlightController.deleteHighlight
);
highlightRouter.get("/", highlightController.getAllHighlight);

module.exports = highlightRouter;
