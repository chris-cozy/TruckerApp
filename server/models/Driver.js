const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Driver = sequelize.define(
  "Driver",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "Users",
        key: "user_id",
      },
    },
    vehicle_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Vehicles",
        key: "vehicle_id",
      },
    },
    sponsor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Sponsors",
        key: "user_id",
      },
    },
    address_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Addresses",
        key: "address_id",
      },
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    drivers_license_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    cdl_class: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    years_of_experience: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    accident_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    violation_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    suspended_license_incident: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    point_balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: false, // Disable Sequelize's default timestamps (created_at, updated_at)
  }
);

module.exports = Driver;
