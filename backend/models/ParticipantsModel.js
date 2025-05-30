const { DataTypes } = require("sequelize");
const moment = require("moment");
const sequelize = require("../config/dbConnection");

const ParticipantsModel = sequelize.define(
  "ParticipantsModel",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstMove: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user1Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user2Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
        return moment(createdAt).format("MMM DD YYYY");
      },
      set() {
        throw new Error("You cannot set the formatted created date");
      },
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    tableName: "participants",
  }
);

module.exports = ParticipantsModel;
