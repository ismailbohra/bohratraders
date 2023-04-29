const httpStatus = require("http-status");
const { userModel, masterModel } = require("../models");
const ApiError = require("../utils/ApiError");
const pick = require("../utils/pick");

const assignRole = async (requestBody) => {
  const session = await userModel.startSession();
  try {
    session.startTransaction();
    const user = await userModel.findOne({ userId: requestBody.userId });
    if (!user) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "user not found");
    }
    const index = await user.role.findIndex((role) => role.roleId === requestBody.roleId);
    const newRole=await masterModel.findOne({id:requestBody.roleId})
    const roles=user.role
    if (index !== -1) {
      roles[index].active = "0";
    } else {
      roles.push(newRole);
    }
    user.role=roles
    await userModel.findOneAndUpdate(
      { userId: requestBody.userId },user
    );

    await session.commitTransaction();
    return requestBody.roleId;
  } catch (error) {
    await session.abortTransaction();
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  } finally {
    session.endSession();
  }
};

const unassignRole = async (requestBody) => {

}

const getRoles = async (requestBody) => {}

const getStaffByRoles = async (req, res) => {}

module.exports = {
  assignRole,
  unassignRole,
  getRoles,
  getStaffByRoles,
};
