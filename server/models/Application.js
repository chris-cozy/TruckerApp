const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Application = sequelize.define(
  "Application",
  {
    application_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Drivers",
        key: "user_id",
      },
    },
    sponsor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Sponsors",
        key: "user_id",
      },
    },
    reason_for_sponsorship: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    terms_agreement: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: false, // Disable Sequelize's default timestamps (created_at, updated_at)
    uniqueKeys: {
      unique_application: {
        fields: ["sponsor_id", "driver_id"],
      },
    },
  }
);
module.exports = Application;
