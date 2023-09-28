const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Sponsor = sequelize.define(
  "Sponsor",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "Users",
        key: "user_id",
      },
    },
    organization_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Organizations",
        key: "organization_id",
      },
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
  },
  {
    timestamps: false, // Disable Sequelize's default timestamps (created_at, updated_at)
  }
);

module.exports = Sponsor;
