const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Point = sequelize.define(
  "Point",
  {
    point_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Drivers",
        key: "user_id",
      },
    },
    sponsor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Sponsors",
        key: "user_id",
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.TIMESTAMP,
      allowNull: false,
    },
  },
  {
    timestamps: false, // Disable Sequelize's default timestamps (created_at, updated_at)
  }
);

module.exports = Point;
