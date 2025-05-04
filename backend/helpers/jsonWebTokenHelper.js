require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createJsonToken = (data) => {
  if (!data) {
    throw new Error("Data is required to create a token");
  }

  try {
    return jwt.sign(data, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });
  } catch (error) {
    throw new Error("Error while creating JWT: " + error.message);
  }
};
