const httpStatus = require("http-status-codes");
const {
  successResponseGenerator,
  errorResponse,
} = require("../utils/ApiHelpers");
const { orderService } = require("../services");

const registerOrder = async (req, res) => {
  try {
    await orderService.createOrder(req);
    res
      .status(httpStatus.CREATED)
      .send(
        successResponseGenerator(
          httpStatus.CREATED,
          "order created successfully",
          req.body.email
        )
      );
  } catch (error) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(errorResponse(httpStatus.BAD_REQUEST, error.message));
  }
};
const getOrder = async (req, res) => {
  try {
    const user = await orderService.getOrder(req);
    res
      .status(httpStatus.OK)
      .send(
        successResponseGenerator(
          httpStatus.OK,
          "order List fetched Successful",
          user
        )
      );
  } catch (error) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(errorResponse(httpStatus.BAD_REQUEST, error.message));
  }
};

const updateOrder = async (req, res) => {
  try {
    const user = await orderService.updateOrder(req);
    res
      .status(httpStatus.OK)
      .send(
        successResponseGenerator(
          httpStatus.OK,
          "order updated sucessfuly",
          req.body
        )
      );
  } catch (error) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(errorResponse(httpStatus.BAD_REQUEST, error.message));
  }
};
const deleteOrder = async (req, res) => {
  try {
    const user = await orderService.deleteOrder(req);
    res
      .status(httpStatus.OK)
      .send(
        successResponseGenerator(
          httpStatus.OK,
          "order removed Successful",
          user.role
        )
      );
  } catch (error) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(errorResponse(httpStatus.BAD_REQUEST, error.message));
  }
};
module.exports = {
  registerOrder,
  getOrder,
  updateOrder,
  deleteOrder,
};
