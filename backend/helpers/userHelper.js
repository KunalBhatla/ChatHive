const UserModel = require("../models/UserModel");

const findUserByIdOrEmailHelper = async ({ id = null, email = null }) => {
  try {
    return await UserModel.findOne({
      where: {
        ...(id && { id }),
        ...(email && { email }),
      },
    });
  } catch (error) {
    return null;
  }
};

const createUserHelper = async ({ data }) => {
  try {
    return await UserModel.create(data);
  } catch (error) {
    return null;
  }
};

module.exports = {
  findUserByIdOrEmailHelper,
  createUserHelper,
};
