const { Op } = require("sequelize");
const ParticipantsModel = require("../models/ParticipantsModel");
const ChatModel = require("../models/ChatModel");

const checkParticipantsHelper = async ({ senderId, receiverId }) => {
  try {
    const exist = await ParticipantsModel.findOne({
      where: {
        [Op.or]: [
          {
            [Op.and]: [{ user1Id: senderId }, { user2Id: receiverId }],
          },
          {
            [Op.and]: [{ user1Id: receiverId }, { user2Id: senderId }],
          },
        ],
      },
    });
    return exist;
  } catch (error) {
    console.log("Error fetching the participants ->", error.message);
    return null;
  }
};

const createParticipantsHelper = async ({ senderId, receiverId }) => {
  try {
    const participant = await ParticipantsModel.create({
      user1Id: senderId,
      user2Id: receiverId,
      firstMove: senderId,
    });
    if (!participant) {
      return null;
    }
    return participant;
  } catch (error) {
    console.log("Error in createParticipantsHelper ->", error.message);
    return null;
  }
};

const createMessageRecordHelper = async (data) => {
  try {
    const message = await ChatModel.create(data);
    if (!message) {
      return null;
    }
    return message;
  } catch (error) {
    console.log("Error in createMessageRecordHelper ->", error.message);
    return null;
  }
};

const fetchParticipantMessagesHelper = async ({ participantId }) => {
  try {
    const messages = await ChatModel.findAll({
      where: { participantId },
      order: [["createdAt", "ASC"]],
      // include: [
      //   {
      //     model: require("../models/UserModel"), // adjust path as needed
      //     as: "sender",
      //     attributes: ["id", "name", "profileImage"], // adjust based on your schema
      //   },
      // ],
    });

    return messages;
  } catch (error) {
    console.log("Error in fetchParticipantMessagesHelper ->", error.message);
    return null;
  }
};

module.exports = {
  checkParticipantsHelper,
  createParticipantsHelper,
  createMessageRecordHelper,
  fetchParticipantMessagesHelper,
};
