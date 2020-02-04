// DB Setup
const Sequelize = require("sequelize");

const sequelize = new Sequelize("backendExpressApi", "client", "password", {
  host: "localhost",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
