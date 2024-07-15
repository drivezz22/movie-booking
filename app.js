require("dotenv").config();
const {
  notFoundMiddleware,
  errorMiddleware,
  authenticate,
} = require("./src/middlewares");
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const {
  authRouter,
  movieRouter,
  seatRouter,
  movieSelectionRouter,
  showtimeRouter,
  bookingRouter,
  highlightRouter,
  stripeRouter,
} = require("./src/routes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/stripe", stripeRouter);
app.use("/movies", authenticate, movieRouter);
app.use("/seats", authenticate, seatRouter);
app.use("/movie-selection-types", authenticate, movieSelectionRouter);
app.use("/showtimes", authenticate, showtimeRouter);
app.use("/bookings", authenticate, bookingRouter);
app.use("/highlights", authenticate, highlightRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port : ${PORT}`));
