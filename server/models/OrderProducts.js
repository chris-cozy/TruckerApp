const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const OrderProduct = sequelize.define(
  "OrderProduct",
  {
    order_product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Orders",
        key: "order_id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Products",
        key: "product_id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    points_cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false, // Disable Sequelize's default timestamps (created_at, updated_at)
    uniqueKeys: {
      unique_order_product: {
        fields: ["order_id", "product_id"],
      },
    },
  }
);

module.exports = OrderProduct;
