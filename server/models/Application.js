const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Sponsor = require("./Sponsor");
const Driver = require("./Driver");

const Application = sequelize.define("Application", {
  reason_for_sponsorship: DataTypes.TEXT,
  terms_agreement: DataTypes.BOOLEAN,
});

Application.belongsTo(Sponsor, { foreignKey: "sponsor_id" });
Application.belongsTo(Driver, { foreignKey: "driver_id" });

module.exports = Application;
