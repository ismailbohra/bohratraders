const httpStatus = require("http-status");
const { userModel } = require("../models");
const ApiError = require("../utils/ApiError");
const { processQueryForOrder } = require("../utils/pick");

const createOrder = async (req) => {
  const session = await userModel.startSession();
  try {
    session.startTransaction();
    const user = await userModel.findOne({ userId: req.body.userId });
    console.log(user);
    if (!user) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "user not found");
    }

    const order = user.orders;
    order.push(req.body.order);
    await userModel.findOneAndUpdate(
      { userId: req.body.userId },
      { orders: order }
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
  const session = await userModel.startSession();
  try {
    session.startTransaction();
    const orderOld = await userModel.findOne({
      "orders.orderId": req.body.orderId,
    });
    if (!orderOld) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "order not found");
    }
    const new_order = orderOld.orders.map((element) => {
      if (element.orderId == req.body.orderId) {
        return req.body;
      }
      return element;
    });
    const updateorder = await userModel.findOneAndUpdate(
      { "orders.orderId": req.body.orderId },
      { orders: new_order }
    );
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
  const session = await userModel.startSession();
  try {
    session.startTransaction();
    const orderOld = await userModel.findOne({
      "orders.orderId": req.body.orderId,
    });
    if (!orderOld) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "order not found");
    }
    const new_order = orderOld.orders.filter(
      (element) => element.orderId !== req.body.orderId
    );

    const updateorder = await userModel.findOneAndUpdate(
      { "orders.orderId": req.body.orderId },
      { orders: new_order }
    );
    if (!updateorder) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "order update service not worked"
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
    const filter = processQueryForOrder(req.query, [
      "userId",
      "orderId",
      "status",
    ]);
    if (req.query.orderId) {
      const user = await userModel.find(
        {
          "orders.orderId": req.query.orderId,
        },
        {
          _id: 0,
          orders: {
            $elemMatch: {
              orderId: req.query.orderId,
            },
          },
        }
      );
      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "order Not Found");
      }
      return user;
    }
    const user = await userModel.find(filter);
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
