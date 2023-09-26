//-----MODULE INITIATION AND SETUP-----//
const mysql = require("mysql2");
require("dotenv").config({ path: "../.env" });

//-----CONNECTION SETUP-----//
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("MySQL connected");
});

module.exports = connection;
