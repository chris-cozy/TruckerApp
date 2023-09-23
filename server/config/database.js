//-----MODULE INITIATION AND SETUP-----//
const mysql = require("mysql");
require("dotenv").config();

//-----CONNECTION SETUP-----//
const connection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("MySQL connection status: " + connection.state);
});

module.exports = connection;
