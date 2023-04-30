const express = require("express");
const router = express.Router();
const Controller = require("../controller/product.controller");

router.route("/createProduct").post(Controller.registerProduct); //create
router.route("/getProduct").get(Controller.getProduct); //get all with condition price lower rating higher as per query params
router.route("/updateProduct").put(Controller.updateProduct); // update
router.route("/deleteProduct").delete(Controller.deleteProduct); // delete

module.exports = router;