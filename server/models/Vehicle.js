const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Vehicle = sequelize.define("Vehicle", {
  vehicle_type: DataTypes.STRING(50),
  make: DataTypes.STRING(50),
  model: DataTypes.STRING(50),
  license_plate: {
    type: DataTypes.STRING(20),
    unique: true,
  },
  registration_expiry: DataTypes.DATE,
  insurance_provider: DataTypes.STRING(100),
  insurance_policy_number: DataTypes.STRING(50),
  insurance_policy_expiry: DataTypes.DATE,
});

module.exports = Vehicle;
