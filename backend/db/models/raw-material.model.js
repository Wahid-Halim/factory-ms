"use strict";
const sequelize = require("../../config/database");
const { DataTypes } = require("sequelize");

const RawMaterial = sequelize.define(
  "RawMaterial",
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
    timestamps: true,
    tableName: "raw_materials",
    hooks: {
      beforeValidate: (lot) => {
        if (!lot.invoice_no) {
          const now = new Date();
          const yy = String(now.getFullYear()).slice(-2);
          const mm = String(now.getMonth() + 1).padStart(2, "0");
          const dd = String(now.getDate()).padStart(2, "0");
          const datePart = yy + mm + dd;

          const randomPart = Math.floor(1000 + Math.random() * 9000);

          lot.invoice_no = `INV-${datePart}-${randomPart}`;
        }
      },
    },
  }
);

module.exports = RawMaterial;
