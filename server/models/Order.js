const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define(
  "Order",
  {
    order_id: {
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
    points_cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usd_cost: {
      type: DataTypes.DECIMAL(10, 2),
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

module.exports = Order;
