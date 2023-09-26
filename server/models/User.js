const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  user_type: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [["driver", "sponsor", "admin"]],
    },
  },
});

module.exports = User;
