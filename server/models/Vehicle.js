const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Vehicle = sequelize.define(
  "Vehicle",
  {
    vehicle_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    vehicle_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    make: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    license_plate: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    registration_expiry: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    insurance_provider: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    insurance_policy_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    insurance_policy_expiry: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false, // Disable Sequelize's default timestamps (created_at, updated_at)
  }
);

module.exports = Vehicle;
