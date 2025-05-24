const { sendInternalServerError } = require("../helpers/errorHelper");
const UserModel = require("../models/UserModel");

const getCurrentUserDetails = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("getCurrentUserDetails ->", error);
    sendInternalServerError({ res, error, functionName: "getCurrentUserDetails" });
  }
};

const updateCurrentUserDetails = async (req, res) => {
  try {
    const { firstName, lastName, mobileNumber } = req.body;
    const profile = req.file?.filename || null;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const updateData = { firstName, lastName, mobileNumber };
    if (profile) updateData.profilePic = profile;

    const [updated] = await UserModel.update(updateData, {
      where: { id: userId },
    });

    if (!updated) {
      return res.status(404).json({ message: "Update failed. User not modified." });
    }

    const updatedUser = await UserModel.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("updateCurrentUserDetails error:", error);
    sendInternalServerError({ res, error, functionName: "updateCurrentUserDetails" });
  }
};

module.exports = {
  getCurrentUserDetails,
  updateCurrentUserDetails,
};
