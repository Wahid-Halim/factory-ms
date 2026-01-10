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
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    supplier: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    weight_kg: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: 0.01 },
    },

    cost_afn: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      validate: { min: 0 },
    },

    warehouse_location: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    remaining_weight_kg: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: 0 },
    },
  },
  {
    tableName: "raw_material_lots",

    // Let Sequelize manage timestamps
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",

    hooks: {
      beforeCreate: (rawMaterialLot) => {
        const datePart = new Date()
          .toISOString()
          .slice(0, 10)
          .replace(/-/g, "");
        const randomPart = Math.floor(1000 + Math.random() * 9000);

        rawMaterialLot.invoice_no = `INV-${datePart}-${randomPart}`;
      },
    },
  }
);

module.exports = RawMaterialLot;
