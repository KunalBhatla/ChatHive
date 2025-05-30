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
