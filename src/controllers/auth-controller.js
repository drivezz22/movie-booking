const { hashService, jwtService, userService } = require("../services");
const { tryCatch, createError } = require("../utils");

const authController = {};

authController.register = tryCatch(async (req, res, next) => {
  const data = req.input;
  const existEmail = await userService.findUserByEmail(data?.email);
  const existPhone = await userService.findUserByPhone(data?.phone);

  if (existPhone || existEmail) {
    createError({
      message: "Email or phone number is already in use",
      statusCode: 400,
    });
  }

  data.password = await hashService.hash(data.password);
  await userService.createUser(data);
  res.status(201).json({ message: "user created" });
});

authController.login = tryCatch(async (req, res, next) => {
  const data = req.input;
  const existUser = await userService.findUserByEmail(data?.email);
  if (!existUser) {
    createError({
      message: "Email or password is incorrect",
      statusCode: 400,
    });
  }
  const isMatch = await hashService.compare(data.password, existUser.password);
  if (!isMatch) {
    createError({
      message: "Email or password is incorrect",
      statusCode: 400,
    });
  }

  const accessToken = jwtService.sign({ id: existUser.id });

  res.status(200).json({ accessToken });
});

authController.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};

module.exports = authController;
