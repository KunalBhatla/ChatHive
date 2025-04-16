const bcrypt = require("bcrypt");
const saltRounds = 10;

// 🔐 Hash a plain password
const hashPassword = async (plainPassword) => {
  try {
    const hash = await bcrypt.hash(plainPassword, saltRounds);
    return hash;
  } catch (err) {
    console.error("Error hashing password:", err);
    throw err;
  }
};

// 🔍 Compare plain password with hashed one
const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch; // true or false
  } catch (err) {
    console.error("Error comparing passwords:", err);
    throw err;
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};
