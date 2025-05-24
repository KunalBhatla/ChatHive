const { sendInternalServerError } = require("../helpers/errorHelper");
const { comparePassword } = require("../helpers/hashHelper");
const { createJsonToken } = require("../helpers/jsonWebTokenHelper");
const { findUserByIdOrEmailHelper, createUserHelper } = require("../helpers/userHelper");
const UserModel = require("../models/UserModel");

const welcome = (req, res) => {
  res.send("hello");
};

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, mobileNumber, password, email } = req.body || {};

    const userExist = await findUserByIdOrEmailHelper({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exist" });
    }

    const user = await createUserHelper({
      data: {
        firstName,
        lastName,
        mobileNumber,
        password,
        email,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Error while creating user" });
    }

    res.status(201).json({ message: "User register successfully" });
  } catch (error) {
    console.log("error", error);
    sendInternalServerError({ res, error, functionName: "registerUser" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByIdOrEmailHelper({ email });
    if (!user) {
      return res.status(400).json({ message: "Enter correct credentials" });
    }
    const isCorrect = await comparePassword(password, user.password);
    if (!isCorrect) return res.status(400).json({ message: "Enter correct credentials" });

    const authToken = createJsonToken({ id: user.id });

    res.status(200).json({ user, message: "Login successfully", authToken });
  } catch (error) {
    sendInternalServerError({ res, error, functionName: "loginUser" });
  }
};

const checkUser = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Authenticated user",
      user,
    });
  } catch (error) {
    console.error("Error while checking the user ->", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  welcome,
  registerUser,
  loginUser,
  checkUser,
};
