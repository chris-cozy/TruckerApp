const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Organization = require("./Organization");

const Sponsor = sequelize.define("Sponsor", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  biography: DataTypes.TEXT,
  first_name: DataTypes.STRING(50),
  last_name: DataTypes.STRING(50),
  phone_number: DataTypes.STRING(15),
});

Sponsor.belongsTo(User, { foreignKey: "user_id" });
Sponsor.belongsTo(Organization, { foreignKey: "organization_id" });

module.exports = Sponsor;
