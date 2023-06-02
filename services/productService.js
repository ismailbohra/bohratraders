const httpStatus = require("http-status-codes");
const ApiError = require("../utils/ApiError");
const { pick, generateRegexQuery } = require("../utils/pick");
const { Product } = require("../models");
const { uploadDocs } = require("./uploadService");
const path = require("path");
const fs = require("fs");

const createProduct = async (req) => {
  try {
    const user = await Product.create(req.body);
    if (!user) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Something went wrong"
      );
    }
    return user.productId;
  } catch (error) {
    console.error("product create service has error", error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};
const uploadProductImg = async (req, res) => {
  try {
    const user = await Product.findOne({ productId: req.query.productId });
    if (!user) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Something went wrong"
      );
    }
    const fileNameOfDOC = await uploadDocs(req, res)
      .then((fileName) => {
        return fileName;
      })
      .catch((err) => {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
      });
    const product = await Product.findOneAndUpdate(
      { productId: req.query.productId },
      {
        image_link: `http://localhost:5000/v1/product/image?productId=${fileNameOfDOC}`,
      }
    );
    if (!product) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Something went wrong"
      );
    }
    return product.image_link;
  } catch (error) {
    console.error("product create service has error", error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getProduct = async (req) => {
  try {
    const { findParams, sortParams } = generateRegexQuery(req.query, [
      "productId",
      "price",
      "featured",
      "name",
    ]);
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
const getProductsById = async (req) => {
  try {
    const filter = { productId: { $in: req.body.productIds } };
    const user = await Product.find(filter);
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

const getProductImage = async (req, res) => {
  try {
    const [partBeforeDot] = req.query.productId.split(".");
    const user = await Product.findOne({ productId: partBeforeDot });
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User does not exist");
    }
    const filenameWithQuery = user.image_link.substring(user.image_link.lastIndexOf("/") + 1);
    const filename = filenameWithQuery.substring(
      filenameWithQuery.indexOf("=") + 1
    );
    const imagePath = path.join(__dirname, "../uploads/", `${filename}`);
    if (fs.existsSync(imagePath)) {
      return fs.readFileSync(imagePath);
    } else {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "image not found");
    }
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};
module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsById,
  uploadProductImg,
  getProductImage,
};
