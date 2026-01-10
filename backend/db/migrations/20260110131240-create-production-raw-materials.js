// migrations/XXXXXX-create-production-raw-materials.js
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("production_raw_materials", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      production_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "productions",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      raw_material_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "raw_materials",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      weight_used_kg: {
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

    await queryInterface.addIndex("production_raw_materials", [
      "production_id",
    ]);
    await queryInterface.addIndex("production_raw_materials", [
      "raw_material_id",
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("production_raw_materials");
  },
};
