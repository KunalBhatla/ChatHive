const ChatModel = require("./ChatModel");
const ParticipantsModel = require("./ParticipantsModel");
const UserModel = require("./UserModel");

function setupAssociations() {
  // 1. Participants ↔ Chat
  ParticipantsModel.hasMany(ChatModel, {
    foreignKey: "participantId",
    as: "messages",
  });

  ChatModel.belongsTo(ParticipantsModel, {
    foreignKey: "participantId",
    as: "participant",
  });

  // 2. Participants ↔ User (user1 and user2)
  ParticipantsModel.belongsTo(UserModel, {
    foreignKey: "user1Id",
    as: "user1",
    constraints: false, // Avoids constraint conflicts
  });

  ParticipantsModel.belongsTo(UserModel, {
    foreignKey: "user2Id",
    as: "user2",
    constraints: false,
  });

  // Reverse (User → Participants)
  UserModel.hasMany(ParticipantsModel, {
    foreignKey: "user1Id",
    as: "participantsAsUser1",
  });

  UserModel.hasMany(ParticipantsModel, {
    foreignKey: "user2Id",
    as: "participantsAsUser2",
  });

  // 3. Chat ↔ User (sender only)
  UserModel.hasMany(ChatModel, {
    foreignKey: "senderId",
    as: "sentMessages",
  });

  ChatModel.belongsTo(UserModel, {
    foreignKey: "senderId",
    as: "sender",
  });
}

module.exports = setupAssociations;
