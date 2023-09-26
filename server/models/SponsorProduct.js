const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Sponsor = require("./Sponsor");
const Product = require("./Product");

const SponsorProduct = sequelize.define("SponsorProduct", {});

SponsorProduct.belongsTo(Sponsor, { foreignKey: "sponsor_id" });
SponsorProduct.belongsTo(Product, { foreignKey: "product_id" });

module.exports = SponsorProduct;
