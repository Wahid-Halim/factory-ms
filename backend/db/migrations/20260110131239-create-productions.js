// migrations/XXXXXX-create-productions.js
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("productions", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      batch_code: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      material_used_kg: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      output_cartons: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      waste_kg: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("productions");
  },
};
