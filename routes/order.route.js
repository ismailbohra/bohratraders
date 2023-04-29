const express = require("express");
const router = express.Router();
const {orderController} = require("../controller");

router.route("/createOrder").post(orderController.registerOrder); //create
router.route("/getOrder").get(orderController.getOrder); //get all with condition price lower rating higher as per query params
router.route("/updateOrder").put(orderController.updateOrder); // update
router.route("/deleteOrder").delete(orderController.deleteOrder); // delete

module.exports = router;
