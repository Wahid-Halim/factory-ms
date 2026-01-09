"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const RawMaterialLot = sequelize.define(
  "RawMaterialLot",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    invoice_no: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    supplier: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    weight_kg: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0.01,
      },
    },

    cost_afn: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    warehouse_location: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    remaining_weight_kg: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },

    received_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "RawMaterialLot",
    tableName: "raw_material_lots",
    timestamps: false, // because we manually use created_at & updated_at
  }
);

module.exports = RawMaterialLot;
