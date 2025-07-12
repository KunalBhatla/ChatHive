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

// const getAllUsersHelper = async ({
//   isDeleted = 0,
//   attributes = [],
//   withUnreadCount = false,
//   req,
// } = {}) => {
//   try {
//     const where = {};
//     if (typeof isDeleted !== "undefined") {
//       where.isDeleted = isDeleted;
//     }

//     const options = { where };
//     if (attributes.length) {
//       options.attributes = attributes;
//     }

//     if (withUnreadCount) {
//       const { id: currentUserId } = req.user;
//       options.include = [
//         {
//           model: ParticipantsModel,
//           where: {
//             [Op.or]: [
//               {
//                 [Op.and]: [
//                   { user1Id: Sequelize.col("UserModel.id") },
//                   { user2Id: currentUserId },
//                 ],
//               },
//               {
//                 [Op.and]: [
//                   { user1Id: currentUserId },
//                   { user2Id: Sequelize.col("UserModel.id") },
//                 ],
//               },
//             ],
//           },
//           require: false,
//           include: {
//             model: ChatModel,
//             as: "messages",
//             where: {
//               status: "sent",
//             },
//             require: false,
//           },
//         },
//       ];
//     }
//     const data = await UserModel.findAll(options);
//     return data;
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return null;
//   }
// };

const getAllUsersHelper = async ({
  isDeleted = 0,
  attributes = [],
  withUnreadCount = false,
  withLastMessage = false,
  excludeCurrentUser = false,
  req,
} = {}) => {
  try {
    const { id: currentUserId } = req.user;

    const where = {
      isDeleted,
      ...(excludeCurrentUser && { id: { [Op.ne]: currentUserId } }),
    };

    const options = {
      where,
    };

    // Directly apply selected attributes, if passed
    if (attributes.length) {
      options.attributes = attributes;
    }

    const includeFields = [];

    // 🔹 Add Unread Count
    if (withUnreadCount) {
      includeFields.push([
        Sequelize.literal(`(
          SELECT COUNT(*)
          FROM chats AS messages
          INNER JOIN participants AS p ON messages.participantId = p.id
          WHERE
            (
              (p.user1Id = UserModel.id AND p.user2Id = ${currentUserId})
              OR
              (p.user2Id = UserModel.id AND p.user1Id = ${currentUserId})
            )
            AND messages.senderId = UserModel.id
            AND messages.status = 'sent'
        )`),
        "unreadNotificationCount",
      ]);
    }

    // 🔹 Add Last Message + Timestamp
    if (withLastMessage) {
      includeFields.push(
        [
          Sequelize.literal(`(
            SELECT textContent
            FROM chats AS messages
            INNER JOIN participants AS p ON messages.participantId = p.id
            WHERE
              (
                (p.user1Id = UserModel.id AND p.user2Id = ${currentUserId})
                OR
                (p.user2Id = UserModel.id AND p.user1Id = ${currentUserId})
              )
            ORDER BY messages.createdAt DESC
            LIMIT 1
          )`),
          "lastMessage",
        ],
        [
          Sequelize.literal(`(
            SELECT messages.createdAt
            FROM chats AS messages
            INNER JOIN participants AS p ON messages.participantId = p.id
            WHERE
              (
                (p.user1Id = UserModel.id AND p.user2Id = ${currentUserId})
                OR
                (p.user2Id = UserModel.id AND p.user1Id = ${currentUserId})
              )
            ORDER BY messages.createdAt DESC
            LIMIT 1
          )`),
          "lastMessageTime",
        ]
      );
    }

    // If we need to include virtual fields
    if (includeFields.length > 0) {
      options.attributes = {
        include: includeFields,
      };
    }

    const users = await UserModel.findAll(options);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};

const getAllUsersWithLastMessageHelper = async ({ currentUserId } = {}) => {
  try {
    const users = await UserModel.findAll({
      where: {
        isDeleted: 0,
      },
      attributes: ["id", "firstName", "lastName", "profilePic", "fullName"],
      include: [
        {
          model: ParticipantsModel,
          where: {
            [Op.or]: [
              {
                [Op.and]: [
                  { user1Id: Sequelize.col("UserModel.id") },
                  { user2Id: currentUserId },
                ],
              },
              {
                [Op.and]: [
                  { user1Id: currentUserId },
                  { user2Id: Sequelize.col("UserModel.id") },
                ],
              },
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

    const result = Array.isArray(users)
      ? users.map((item = {}) => {
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

const updateNotificationByUserIdHelper = async ({
  userId,
  type = "increment",
  by = 1,
}) => {
  try {
    const user = await UserModel.findOne({
      where: {
        id: userId,
        isDeleted: 0,
      },
    });
    if (!user) {
      return null;
    }

    const operation =
      type === "decrement" || type.toLowerCase().startsWith("dec")
        ? "decrement"
        : "increment";

    await user[operation]("notificationCount", { by });

    return user;
  } catch (error) {
    console.error("Error updateNotificationByUserId:", error);
    return null;
  }
};

module.exports = {
  findUserByIdOrEmailHelper,
  createUserHelper,
  getAllUsersHelper,
  getAllUsersWithLastMessageHelper,
  updateNotificationByUserIdHelper,
};
