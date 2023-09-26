const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Address = sequelize.define("Address", {
  street: DataTypes.STRING(255),
  city: DataTypes.STRING(50),
  state: DataTypes.STRING(50),
  zipcode: DataTypes.STRING(10),
});

module.exports = Address;
