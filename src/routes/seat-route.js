const express = require("express");
const seatController = require("../controllers/seat-controller");
const {
  adminAuthenticate,
  seatPriceValidator,
  seatStatusValidator,
} = require("../middlewares");

const seatRouter = express.Router();

seatRouter.post(
  "/:theaterId/price",
  adminAuthenticate,
  seatPriceValidator,
  seatController.updatePrice
);

seatRouter.post(
  "/:theaterId/status",
  adminAuthenticate,
  seatStatusValidator,
  seatController.updateStatus
);

seatRouter.get("/:theaterId", seatController.getSeatDetail);

module.exports = seatRouter;
