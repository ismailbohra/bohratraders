const httpStatus = require('http-status');
const path = require('path');
const catchAsync = require('../utils/catchAsync');
const { successResponseGenerator, errorResponse } = require('../utils/ApiHelpers');

const { adminService } = require('../services');

const assignRole = catchAsync(async (req, res) => {
  try {
    const role = await adminService.assignRole(req.body);
    res.status(httpStatus.CREATED).send(successResponseGenerator(httpStatus.CREATED, 'Role Assigned successfully', role));
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send(errorResponse(httpStatus.BAD_REQUEST, error.message));
  }
});

const unassignRole = catchAsync(async (req, res) => {
  try {
    const role = await adminService.unassignRole(req.body);
    res.status(httpStatus.CREATED).send(successResponseGenerator(httpStatus.CREATED, 'Role unassigned successfully', role));
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send(errorResponse(httpStatus.BAD_REQUEST, error.message));
  }
});

const getRole = catchAsync(async (req, res) => {
  try {
    const user = await adminService.getRoles(req.body);
    res.status(httpStatus.OK).send(successResponseGenerator(httpStatus.OK, 'Roles List fetched Successful', user.role));
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send(errorResponse(httpStatus.BAD_REQUEST, error.message));
  }
});

const getStaffByRole = catchAsync(async (req, res) => {
  try {
    const user = await adminService.getStaffByRoles(req, res);
    res.status(httpStatus.OK).send(successResponseGenerator(httpStatus.OK, 'staff List fetched Successful', user));
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send(errorResponse(httpStatus.BAD_REQUEST, error.message));
  }
});

module.exports = {
  assignRole,
  unassignRole,
  getRole,
  getStaffByRole,
};
