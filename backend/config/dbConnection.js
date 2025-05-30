const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("chathivetwo", "root", "", {
  dialect: "mysql",
  logging: false,
  host: "localhost",
});

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (error) {
    console.log("Error while connecting database.");
  }
})();

module.exports = sequelize;
