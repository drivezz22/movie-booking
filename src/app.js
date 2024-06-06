require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");
const authenticate = require("./middlewares/authenticate");
const authRouter = require("./routes/auth-route");
const movieRouter = require("./routes/movie-route");
const seatRouter = require("./routes/seat-route");
const movieSelectionRouter = require("./routes/movie-selection-route");
const showtimeRouter = require("./routes/showtime-route");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/movies", authenticate, movieRouter);
app.use("/seats", authenticate, seatRouter);
app.use("/movie-selection-types", authenticate, movieSelectionRouter);
app.use("/showtimes", authenticate, showtimeRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port : ${PORT}`));
