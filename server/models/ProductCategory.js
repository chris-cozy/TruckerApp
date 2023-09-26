const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ProductCategory = sequelize.define("ProductCategory", {
  name: {
    type: DataTypes.STRING(100),
    unique: true,
  },
});

module.exports = ProductCategory;
