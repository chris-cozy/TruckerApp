const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Organization = sequelize.define(
  "Organization",
  {
    organization_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    address_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Addresses",
        key: "address_id",
      },
    },
  },
  {
    timestamps: false, // Disable Sequelize's default timestamps (created_at, updated_at)
  }
);

module.exports = Organization;
