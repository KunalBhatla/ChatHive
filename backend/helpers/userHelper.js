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

const getAllUsersHelper = async ({ isDeleted = 0, attributes = [] } = {}) => {
  try {
    const where = {};
    if (typeof isDeleted !== "undefined") {
      where.isDeleted = isDeleted;
    }

    const options = { where };
    if (attributes.length) {
      options.attributes = attributes;
    }

    return await UserModel.findAll(options);
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};

module.exports = {
  findUserByIdOrEmailHelper,
  createUserHelper,
  getAllUsersHelper,
};
