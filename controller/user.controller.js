const httpStatus = require("http-status-codes");
const {
  successResponseGenerator,
  errorResponse,
} = require("../utils/ApiHelpers");
const productService = require("../services");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");

const registerUser = catchAsync(async (req, res) => {
  try {
    await userService.registerUser(req.body);
    res
      .status(httpStatus.CREATED)
      .send(
        successResponseGenerator(
          httpStatus.CREATED,
          "Student created successfully",
          req.body.email
        )
      );
  } catch (error) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(errorResponse(httpStatus.BAD_REQUEST, error.message));
  }
});
const getUser = catchAsync(async (req, res) => {
  try {
    const user = await userService.getUser(req);
    res
      .status(httpStatus.OK)
      .send(
        successResponseGenerator(httpStatus.OK, "Student List Successful", user)
      );
  } catch (error) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(errorResponse(httpStatus.BAD_REQUEST, error.message));
  }
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.loginUserWithEmailAndPassword(
      email,
      password
    );
    res
      .status(httpStatus.OK)
      .send(successResponseGenerator(httpStatus.OK, "Login Successful", user));
  } catch (error) {
    res
      .status(error.statusCode)
      .send(errorResponse(error.statusCode, error.message, email));
  }
});
const changePassword = catchAsync(async (req, res) => {
  try {
    await userService.changePassword(req.body, req.body.id);
    res
      .status(httpStatus.OK)
      .send(
        successResponseGenerator(httpStatus.OK, "Password Updated successfully")
      );
  } catch (error) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(errorResponse(httpStatus.BAD_REQUEST, error.message));
  }
});
const forgotPassword = catchAsync(async (req, res) => {
  try {
    const user = await userService.forgotPassword(req.params.email);
    res
      .status(httpStatus.OK)
      .send(
        successResponseGenerator(
          httpStatus.OK,
          "OTP Sent to: " + req.params.email,
          user.email
        )
      );
  } catch (error) {
    res
      .status(error.statusCode)
      .send(errorResponse(error.statusCode, error.message));
  }
});

module.exports = {
  registerUser,
  login,
  forgotPassword,
  changePassword,
  getUser,
};
