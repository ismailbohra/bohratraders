const httpStatus = require("http-status-codes");
const {
  successResponseGenerator,
  errorResponse,
} = require("../utils/ApiHelpers");
const {productService} = require("../services");

const registerProduct = async (req, res) => {
  try {
    const productId=await productService.createProduct(req);
    res
      .status(httpStatus.CREATED)
      .send(
        successResponseGenerator(
          httpStatus.CREATED,
          "product created successfully",
          productId
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
const getProductsById = async (req, res) => {
  try {
    const user = await productService.getProductsById(req);
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
const uploadProductImg = async (req, res) => {
  try {
    const image_link = await productService.uploadProductImg(req,res);
    res
      .status(httpStatus.OK)
      .send(
        successResponseGenerator(
          httpStatus.OK,
          "product image updated Successful",
          image_link
        )
      );
  } catch (error) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send(errorResponse(httpStatus.BAD_REQUEST, error.message));
  }
};
const getProductPhotograph = async (req, res) => {
  try {
    const file = await productService.getProductImage(req, res);
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    res.end(file, 'binary');
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(errorResponse(httpStatus.INTERNAL_SERVER_ERROR, error.message));
  }
}
module.exports = {
  registerProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsById,
  uploadProductImg,
  getProductPhotograph
};
