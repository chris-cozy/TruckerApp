//-----MODULE INITIATION AND SETUP-----//
const { Sequelize } = require("sequelize");
require("dotenv").config({ path: "../.env" });

//-----CONNECTION SETUP-----//
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  dialect: "mysql", // Specify the database dialect
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("MySQL connected");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
