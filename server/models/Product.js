const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const ProductCategory = require("./ProductCategory");

const Product = sequelize.define("Product", {
  name: DataTypes.STRING(100),
  description: DataTypes.TEXT,
  image_url: DataTypes.STRING(255),
  condition: DataTypes.STRING(20),
  price: DataTypes.DECIMAL(10, 2),
});

Product.belongsTo(ProductCategory, { foreignKey: "category_id" });

module.exports = Product;
