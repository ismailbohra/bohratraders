const httpStatus = require("http-status");
const { orderModel, userModel } = require("../models");
const ApiError = require("../utils/ApiError");
const {pick} = require("../utils/pick");
const { jwtEncode } = require("../middlewares/authorization");

const createOrder = async (req) => {
  const session = await orderModel.startSession();
  try {
    session.startTransaction();
    const user = await userModel.findOne({ usreId: req.body.userId });
    if (!user) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "user not found");
    }
    const order = await orderModel.create(req.body);
    if (!order) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "order create service not worked"
      );
    }
    await userModel.findOneAndUpdate(
      { userId: req.body.userId },
      { $push: { orders: user.orders } }
    );

    await session.commitTransaction();
    return order.orderId;
  } catch (error) {
    console.error("order create service has error", error.message);
    await session.abortTransaction();
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  } finally {
    session.endSession();
  }
};

const updateOrder = async (req) => {
  const session = await orderModel.startSession();
  try {
    session.startTransaction();
    const orderOld = await orderModel.findOne({ orderId: req.body.orderId });
    if (!orderOld) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "order not found");
    }
    const updateorder = await orderModel.findOneAndUpdate({orderId:req.body.orderId},req.body);
    if (!updateorder) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "order update service not worked"
      );
    }

    await session.commitTransaction();
    return req.body.orderId;
  } catch (error) {
    console.error("order update service has error", error.message);
    await session.abortTransaction();
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  } finally {
    session.endSession();
  }
};
const deleteOrder = async (req) => {
  const session = await orderModel.startSession();
  try {
    session.startTransaction();
    const orderOld = await orderModel.findOne({ orderId: req.body.orderId });
    if (!orderOld) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "order not found");
    }
    const deleteorder = await orderModel.findOneAndDelete({orderId:req.body.orderId});
    if (!deleteorder) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "order delete service not worked"
      );
    }

    await session.commitTransaction();
    return req.body.orderId;
  } catch (error) {
    console.error("order delete service has error", error.message);
    await session.abortTransaction();
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  } finally {
    session.endSession();
  }
};
const getOrder = async (req) => {
  try {
    const filter = pick(req.query, ["userId", "orderId"]);
    const user = await orderModel.find(filter, { password: 0 });
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "order Not Found");
    }
    return user;
  } catch (error) {
    console.error("Order Service -> getAll got error " + error.message);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong"
    );
  }
};
module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
};
