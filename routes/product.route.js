const express = require("express");
const router = express.Router();
const Controller = require("../controller/product.controller");

router.route("/").post(Controller.registerProduct); //create
router.route("/").get(Controller.getProduct); //get all with condition price lower rating higher as per query params
router.route("/").put(Controller.updateProduct); // update
router.route("/").delete(Controller.deleteProduct); // delete

module.exports = router;
