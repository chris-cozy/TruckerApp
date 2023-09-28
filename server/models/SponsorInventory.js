const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SponsorInventory = sequelize.define(
  "SponsorInventory",
  {
    inventory_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sponsor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Sponsors",
        key: "user_id",
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
  },
  {
    timestamps: false, // Disable Sequelize's default timestamps (created_at, updated_at)
    uniqueKeys: {
      unique_sponsor_product: {
        fields: ["sponsor_id", "product_id"],
      },
    },
  }
);

module.exports = SponsorInventory;
