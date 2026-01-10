"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Production extends Model {
    static associate(models) {
      Production.belongsToMany(models.RawMaterial, {
        through: models.ProductionRawMaterial,
        foreignKey: "production_id",
        otherKey: "raw_material_id",
        as: "rawMaterials",
      });
      Production.hasMany(models.ProductionRawMaterial, {
        foreignKey: "production_id",
        as: "productionRawMaterials",
      });
    }
  }

  Production.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      batch_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      material_used_kg: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: { min: 0.01 },
      },
      output_cartons: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1 },
      },
      waste_kg: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: { min: 0 },
      },
    },
    {
      tableName: "productions",
      sequelize,
      modelName: "Production",
      hooks: {
        beforeValidate: (production) => {
          if (!production.batch_code) {
            const now = new Date();
            const yy = String(now.getFullYear()).slice(-2);
            const mm = String(now.getMonth() + 1).padStart(2, "0");
            const dd = String(now.getDate()).padStart(2, "0");
            const datePart = yy + mm + dd;
            const randomPart = Math.floor(1000 + Math.random() * 9000);
            production.batch_code = `BATCH-${datePart}-${randomPart}`;
          }
        },
      },
    }
  );

  return Production;
};
