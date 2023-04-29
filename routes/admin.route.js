const express = require('express');
const router = express.Router();
const {adminController} = require("../controller");
const {verifyToken}=require('../middlewares/jwt')

// router.route('/assignRole').post(verifyToken,  adminController.assignRole); //assign role

router.route('/assignRole').post(  adminController.assignRole); //assign role
// router.route('/unassignRole').post(verifyToken, validate(adminValidation.assignRole), adminController.unassignRole); //unassign role
// router.route('/Role').post(verifyToken, adminController.getRole); //get role
// router.route('/getStaffByRole').post(verifyToken, adminController.getStaffByRole); //get role

module.exports = router;
