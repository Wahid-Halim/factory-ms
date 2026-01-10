"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProductionRawMaterial extends Model {
    static associate(models) {
      ProductionRawMaterial.belongsTo(models.Production, {
        foreignKey: "production_id",
      });
      ProductionRawMaterial.belongsTo(models.RawMaterial, {
        foreignKey: "raw_material_id",
      });
    }
  }

  ProductionRawMaterial.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      production_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "productions",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      raw_material_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "raw_materials",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      weight_used_kg: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: { min: 0.01 },
      },
    },
    {
      tableName: "production_raw_materials",
      sequelize,
      modelName: "ProductionRawMaterial",
    }
  );

  return ProductionRawMaterial;
};
