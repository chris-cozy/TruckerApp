const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Vehicle = require("./Vehicle");
const Sponsor = require("./Sponsor");
const Address = require("./Address");

const Driver = sequelize.define("Driver", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  biography: DataTypes.TEXT,
  first_name: DataTypes.STRING(50),
  last_name: DataTypes.STRING(50),
  phone_number: DataTypes.STRING(15),
  date_of_birth: DataTypes.DATE,
  drivers_license_number: DataTypes.STRING(20),
  cdl_class: DataTypes.STRING(10),
  years_of_experience: DataTypes.INTEGER,
  accident_count: DataTypes.INTEGER,
  violation_count: DataTypes.INTEGER,
  suspended_license_incident: DataTypes.BOOLEAN,
  point_balance: DataTypes.INTEGER,
});

Driver.belongsTo(User, { foreignKey: "user_id" });
Driver.belongsTo(Vehicle, { foreignKey: "vehicle_id" });
Driver.belongsTo(Sponsor, { foreignKey: "sponsor_id" });
Driver.belongsTo(Address, { foreignKey: "address_id" });

module.exports = Driver;
