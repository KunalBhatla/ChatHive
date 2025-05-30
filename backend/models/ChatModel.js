const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");
const moment = require("moment");
const ParticipantsModel = require("./ParticipantsModel");
const UserModel = require("./UserModel");

const ChatModel = sequelize.define(
  "ChatModel",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    participantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "participantId",
      references: {
        model: ParticipantsModel,
        key: "id",
      },
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "senderId",
      references: {
        model: UserModel,
        key: "id",
      },
    },
    textContent: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    mediaUrl: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    status: {
      type: DataTypes.ENUM("sent", "delivered", "seen"),
      allowNull: false,
      defaultValue: "sent",
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdDateFormatted: {
      type: DataTypes.VIRTUAL,
      get() {
        const createdAt = this.getDataValue("createdAt");
        if (!createdAt) return null;
        return moment(createdAt).fromNow();
      },
      set() {
        throw new Error("You cannot set the formatted created date");
      },
    },
    updatedDateFormatted: {
      type: DataTypes.VIRTUAL,
      get() {
        const updatedAt = this.getDataValue("updatedAt");
        if (!updatedAt) return null;
        return moment(updatedAt).fromNow();
      },
      set() {
        throw new Error("You cannot set the formatted updated date");
      },
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    tableName: "chats",
    indexes: [
      {
        name: "idx_participant_id",
        fields: ["participantId"],
      },
      {
        name: "idx_sender_id",
        fields: ["senderId"],
      },
      {
        name: "idx_created_at",
        fields: ["createdAt"],
      },
    ],
  }
);

module.exports = ChatModel;
