const httpStatus = require("http-status-codes");
const ApiError = require("../utils/ApiError");
const {pick,generateRegexQuery} = require("../utils/pick");
const { Product } = require("../models");


const createProduct = async (userBody) => {
  try {
    const user = await Product.create(userBody);
    if (!user) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Something went wrong"
      );
    }
  } catch (error) {
    console.error("product create service has error", error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};
const getProduct = async (req) => {
  try {
    const filter = pick(req.query,["productId","price","featured","name"]);
    const { findParams, sortParams } =generateRegexQuery(req.query,["productId","price","featured","name"])
    console.log(findParams)
    console.log(sortParams)
    const user = await Product.find(findParams).sort(sortParams);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "Product Not Found");
    }
    return user;
  } catch (error) {
    console.error("Product Service -> getAll got error " + error.message);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong"
    );
  }
};
const updateProduct = async (req) => {
  try {
    const user = await Product.findOne({ productId: req.body.productId });
    if (!user) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Something went wrong"
      );
    }

    await Product.findOneAndUpdate({ productId: req.body.productId }, req.body);
  } catch (error) {
    console.error("product update service has error", error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};
const deleteProduct = async (req) => {
  try {
    const user = await Product.deleteOne({ productId: req.body.productId });
    if (!user) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "product not found Something went wrong"
      );
    }
    return user;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
