const express = require("express");
const authController = require("../controllers/auth-controller");
const { loginValidator, registerValidator, authenticate } = require("../middlewares");

const authRouter = express.Router();

authRouter.post("/register", registerValidator, authController.register);
authRouter.post("/login", loginValidator, authController.login);
authRouter.get("/get-me", authenticate, authController.getMe);

module.exports = authRouter;
