"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("raw_materials", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },

      invoice_no: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      supplier: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      weight_kg: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        validate: { min: 0.01 },
      },
      cost_afn: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        validate: { min: 0 },
      },
      warehouse_location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      remaining_weight_kg: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        validate: { min: 0 },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("raw_materials");
  },
};
