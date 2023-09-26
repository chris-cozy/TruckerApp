const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Address = require("./Address");

const Organization = sequelize.define("Organization", {
  name: DataTypes.STRING(100),
  biography: DataTypes.TEXT,
});

Organization.belongsTo(Address, { foreignKey: "address_id" });

module.exports = Organization;
