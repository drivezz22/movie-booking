const express = require("express");
const seatController = require("../controllers/seat-controller");
const { adminAuthenticate, seatPriceValidator } = require("../middlewares");

const seatRouter = express.Router();

seatRouter.patch(
  "/price/:theaterId",
  adminAuthenticate,
  seatPriceValidator,
  seatController.updatePrice
);

seatRouter.get("/:theaterId", seatController.getSeatDetail);
seatRouter.get(
  "/seatId/theaterId/:theaterId/row/:row/column/:column",
  seatController.getSeatId
);

module.exports = seatRouter;
