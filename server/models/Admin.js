const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Admin = sequelize.define("Admin", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  first_name: DataTypes.STRING(50),
  last_name: DataTypes.STRING(50),
});

Admin.belongsTo(User, { foreignKey: "user_id" });

module.exports = Admin;
