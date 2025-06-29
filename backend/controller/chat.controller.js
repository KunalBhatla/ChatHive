const {
  checkParticipantsHelper,
  createParticipantsHelper,
  createMessageRecordHelper,
  fetchParticipantMessagesHelper,
} = require("../helpers/chatHelper");
const { sendInternalServerError } = require("../helpers/errorHelper");
const {
  getAllUsersHelper,
  getAllUsersWithLastMessageHelper,
} = require("../helpers/userHelper");
const { getIOWithOnlineUsers } = require("../config/socket");

const getAllUsers = async (req, res) => {
  try {
    // const users = await getAllUsersHelper({
    //   attributes: ["id", "fullName", "firstName", "lastName", "profilePic"],
    // });
    const users = await getAllUsersWithLastMessageHelper({
      currentUserId: req.user.id,
    });
    if (!users) {
      return res.status(400).json({ message: "Internal server error" });
    }

    res.status(200).json({ data: users });
  } catch (error) {
    sendInternalServerError({ res, error, functionName: "getAllUsers" });
  }
};

const sendMessageToReceiver = async (req, res) => {
  try {
    const { id: senderId } = req.user;
    const { receiverId, content } = req.body;
    const { io, onlineUsers } = getIOWithOnlineUsers();

    const receiverSocketId = onlineUsers.get(Number(receiverId));
    const isReceiverOnline = !!receiverSocketId;

    let participantsDetail = await checkParticipantsHelper({
      senderId,
      receiverId: Number(receiverId),
    });

    if (!participantsDetail) {
      participantsDetail = await createParticipantsHelper({
        senderId,
        receiverId: Number(receiverId),
      });
    }

    const { id: participantId } = participantsDetail;

    const createdMessage = await createMessageRecordHelper({
      senderId,
      participantId,
      textContent: content,
      status: isReceiverOnline ? "delivered" : "sent",
    });

    if (!createdMessage) {
      return res.status(500).json({ message: "Error while sending the message" });
    }

    const messagePayload = {
      createdDateFormatted: createdMessage.createdDateFormatted,
      mediaUrl: createdMessage.dataValues.mediaUrl,
      participantId: createdMessage.dataValues.participantId,
      isDeleted: createdMessage.dataValues.isDeleted,
      id: createdMessage.dataValues.id,
      status: createdMessage.dataValues.status,
      textContent: createdMessage.dataValues.textContent,
      senderId,
    };

    io.to([receiverSocketId, onlineUsers.get(Number(senderId))]).emit(
      "newChatMessage",
      messagePayload
    );

    return res.status(200).json({ message: "Message send successfully" });
  } catch (error) {
    sendInternalServerError({ res, error, functionName: "sendMessageToReceiver" });
  }
};

const fetchMessages = async (req, res) => {
  try {
    const { id: senderId } = req.user;
    const { id: receiverId } = req.body;

    if (!receiverId) {
      return res.status(400).json({ message: "Receiver ID is required." });
    }

    let participantsDetail = await checkParticipantsHelper({
      senderId,
      receiverId: Number(receiverId),
    });

    if (!participantsDetail || !participantsDetail.id) {
      return res.status(200).json({ data: [] });
    }

    const messages = await fetchParticipantMessagesHelper({
      participantId: participantsDetail?.id,
    });

    return res.status(200).json({ data: messages || [] });
  } catch (error) {
    console.error("Error in fetchMessages:", error);
    sendInternalServerError({ res, error, functionName: "fetchMessages" });
  }
};

module.exports = {
  getAllUsers,
  sendMessageToReceiver,
  fetchMessages,
};
