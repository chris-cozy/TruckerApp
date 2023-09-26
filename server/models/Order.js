const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Driver = require("./Driver");

const Order = sequelize.define("Order", {
  product_ids: DataTypes.ARRAY(DataTypes.INTEGER),
  points_cost: DataTypes.INTEGER,
  usd_cost: DataTypes.DECIMAL(10, 2),
  date: DataTypes.DATE,
});

Order.belongsTo(Driver, { foreignKey: "driver_id" });

module.exports = Order;
