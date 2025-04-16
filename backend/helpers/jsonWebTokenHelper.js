const jwt = require("jsonwebtoken");

module.exports.createJsonToken = ({ data }) => {
  return jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn: "2h",
  });
};
