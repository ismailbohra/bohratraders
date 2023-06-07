const httpStatus = require("http-status");
const { userModel } = require("../models");
const ApiError = require("../utils/ApiError");
const { pick } = require("../utils/pick");
const { jwtEncode } = require("../middlewares/authorization");

const registerUser = async (userBody) => {
  const session = await userModel.startSession();
  try {
    session.startTransaction();
    if (await userModel.isEmailTaken(userBody.email)) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        userBody.email +
          " is already taken. Please try with different Email for login"
      );
    }
    if (await userModel.isMobileNoTaken(userBody.mobileNo)) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        userBody.mobileNo +
          " already exists. Please try with another Mobile Number for login"
      );
    }
    const user = await userModel.create(userBody);
    if (!user) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Something went wrong"
      );
    }

    await session.commitTransaction();
  } catch (error) {
    console.error("User create service has error", error.message);
    await session.abortTransaction();
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  } finally {
    session.endSession();
  }
};

const getUser = async (req) => {
  try {
    const filter = pick(req.query, ["email", "mobileNo", "userId"]);
    const user = await userModel.find(filter, { password: 0 });
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
    }
    return user;
  } catch (error) {
    console.error("User Service -> getAll got error " + error.message);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong"
    );
  }
};

const loginUserWithEmailAndPassword = async (email, password) => {
  try {
    const user = await userModel.findOne({ email });
    if (!user)
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Login Failed! Incorrect email"
      );
    else if (user.isBlocked)
      throw new ApiError(
        httpStatus.OK,
        "Account Blocked..!! Please contact Support!"
      );
    else if (user.status==!"ACTIVE")
      throw new ApiError(
        httpStatus.OK,
        `Account ${user.status}..!! Please contact Admin!`
      );
    else if (!(await user.isPasswordMatch(password)))
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Login Failed! Incorrect password"
      );
    const token = jwtEncode(user.userId, email);
    const userdata = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      mobileNo: user.mobileNo,
      email: user.email,
      orders: user.orders,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      userId: user.userId,
      __v: user.__v,
      token: token,
    };
    return userdata;
  } catch (error) {
    console.error("Login by email service has error", error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const changePassword = () => {};

const forgotPassword = () => {};

module.exports = {
  registerUser,
  loginUserWithEmailAndPassword,
  getUser,
  changePassword,
  forgotPassword,
};
