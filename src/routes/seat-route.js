const express = require("express");
const adminAuthenticate = require("../middlewares/admin-authenticate");
const { seatPriceValidator, seatStatusValidator } = require("../middlewares/validator");
const seatController = require("../controllers/seat-controller");
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
