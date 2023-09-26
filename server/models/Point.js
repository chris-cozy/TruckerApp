const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Sponsor = require("./Sponsor");
const Driver = require("./Driver");

const Point = sequelize.define("Point", {
  amount: DataTypes.INTEGER,
  reason: DataTypes.TEXT,
  date: DataTypes.DATE,
});

Point.belongsTo(Sponsor, { foreignKey: "sponsor_id" });
Point.belongsTo(Driver, { foreignKey: "driver_id" });

module.exports = Point;
