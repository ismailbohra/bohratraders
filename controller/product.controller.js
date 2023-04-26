const httpStatus = require("http-status-codes");
const {
  successResponseGenerator,
  errorResponse,
} = require("../utils/ApiHelpers");
const productService = require("../services");

const registerProduct = async (req, res) => {
  try {
    await productService.createProduct(req.body);
    res
      .status(httpStatus.CREATED)
      .send(
        successResponseGenerator(
          httpStatus.CREATED,
          "product created successfully",
          req.body.email
        )
      );
  } catch (error) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(errorResponse(httpStatus.BAD_REQUEST, error.message));
  }
};
const getProduct = async (req, res) => {
  try {
    const user = await productService.getProduct(req);
    res
      .status(httpStatus.OK)
      .send(
        successResponseGenerator(httpStatus.OK, "product List Successful", user)
      );
  } catch (error) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(errorResponse(httpStatus.BAD_REQUEST, error.message));
  }
};
const updateProduct = async (req, res) => {
  try {
    const user = await productService.updateProduct(req);
    res
      .status(httpStatus.OK)
      .send(
        successResponseGenerator(
          httpStatus.OK,
          "product updated sucessfuly",
          req.body
        )
      );
  } catch (error) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(errorResponse(httpStatus.BAD_REQUEST, error.message));
  }
};
const deleteProduct = async (req, res) => {
  try {
    const user = await productService.deleteProduct(req);
    res
      .status(httpStatus.OK)
      .send(
        successResponseGenerator(
          httpStatus.OK,
          "product removed Successful",
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
  registerProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
