const { Op, Sequelize } = require("sequelize");
const ParticipantsModel = require("../models/ParticipantsModel");
const UserModel = require("../models/UserModel");
const ChatModel = require("../models/ChatModel");

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

const getAllUsersWithLastMessageHelper = async ({ currentUserId } = {}) => {
  try {
    const user = await UserModel.findAll({
      where: {
        isDeleted: 0,
      },
      attributes: ["id", "firstName", "lastName", "profilePic", "fullName"],
      include: [
        {
          model: ParticipantsModel,
          where: {
            [Op.or]: [
              { user1Id: Sequelize.col("UserModel.id"), user2Id: currentUserId },
              { user1Id: currentUserId, user2Id: Sequelize.col("UserModel.id") },
            ],
          },
          include: [
            {
              model: ChatModel,
              as: "messages",
              limit: 1,
              separate: true,
              order: [["createdAt", "DESC"]],
            },
          ],
          required: false,
        },
      ],
    });

    const result = Array.isArray(user)
      ? user.map((item = {}) => {
          const {
            id = null,
            firstName = "",
            lastName = "",
            fullName = "",
            profilePic = null,
            ParticipantsModels = [],
          } = item;

          const participant = ParticipantsModels?.[0];
          const lastMessage = participant?.messages?.[0]?.textContent || null;

          return {
            id,
            firstName,
            lastName,
            fullName,
            profilePic,
            lastMessage,
          };
        })
      : [];

    return result;
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};

module.exports = {
  findUserByIdOrEmailHelper,
  createUserHelper,
  getAllUsersHelper,
  getAllUsersWithLastMessageHelper,
};
