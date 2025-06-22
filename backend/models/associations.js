const ChatModel = require("./ChatModel");
const ParticipantsModel = require("./ParticipantsModel");
const UserModel = require("./UserModel");

function setupAssociations() {
  ParticipantsModel.hasMany(ChatModel, {
    foreignKey: "participantId",
    as: "messages",
  });

  ChatModel.belongsTo(ParticipantsModel, {
    foreignKey: "participantId",
    as: "participant",
  });

  ParticipantsModel.belongsTo(UserModel, {
    foreignKey: "user1Id",
    as: "user1",
  });

  ParticipantsModel.belongsTo(UserModel, {
    foreignKey: "user2Id",
    as: "user2",
  });

  UserModel.hasMany(ChatModel, {
    foreignKey: "senderId",
    as: "sentMessages",
  });

  ChatModel.belongsTo(UserModel, {
    foreignKey: "senderId",
    as: "sender",
  });

  UserModel.hasMany(ParticipantsModel, {
    foreignKey: "user1Id",
    // as: "participants1",
  });

  UserModel.hasMany(ParticipantsModel, {
    foreignKey: "user2Id",
    // as: "participants2",
  });
}

module.exports = setupAssociations;
