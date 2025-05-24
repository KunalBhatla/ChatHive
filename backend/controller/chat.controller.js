const { sendInternalServerError } = require("../helpers/errorHelper");
const { getAllUsersHelper } = require("../helpers/userHelper");

const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersHelper({
      attributes: ["id", "fullName", "firstName", "lastName", "profilePic"],
    });
    if (!users) {
      return res.status(400).json({ message: "Internal server error" });
    }

    res.status(200).json({ data: users });
  } catch (error) {
    sendInternalServerError({ res, error, functionName: "getAllUsers" });
  }
};
module.exports = {
  getAllUsers,
};
