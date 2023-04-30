const express = require("express");
const router = express.Router();
const {userController} = require("../controller");
const {verifyToken}=require('../middlewares/jwt')

// router.route("/registerUser").post(verifyToken, userController.registerUser);
router.route("/registerUser").post(userController.registerUser);
router.route("/login").post(userController.login); //login
router.route("/getUser").get(userController.getUser); //login
router.route("/changePassword").post(verifyToken, userController.changePassword);
router.route("/forgotPassword").post(userController.forgotPassword);

module.exports = router;
