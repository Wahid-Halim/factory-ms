"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("raw_materials", {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("raw_materials");
  },
};
