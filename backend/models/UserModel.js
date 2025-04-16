const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");
const moment = require("moment");
const { hashPassword } = require("../helpers/hashHelper");

const UserModel = sequelize.define(
  "UserModel",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.getDataValue("firstName")} ${
          this.getDataValue("lastName")?.trim() || ""
        }`;
      },
      set() {
        throw new Error("You cannot set the fullname");
      },
    },
    mobileNumber: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePic: {
      type: DataTypes.STRING,
      defaultValue: null,
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
    tableName: "users",
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await hashPassword(user.password);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await hashPassword(user.password);
        }
      },
    },
  }
);

module.exports = UserModel;
``;
