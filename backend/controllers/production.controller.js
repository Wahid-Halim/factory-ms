const {
  Production,
  RawMaterial,
  ProductionRawMaterial,
  sequelize,
} = require("../db/models");

// Get all available raw materials with remaining weight
exports.getAvailableRawMaterials = async (req, res) => {
  try {
    const rawMaterials = await RawMaterial.findAll({
      where: {
        remaining_weight_kg: {
          [sequelize.Sequelize.Op.gt]: 0,
        },
      },
      attributes: ["id", "invoice_no", "remaining_weight_kg", "supplier"],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: rawMaterials,
    });
  } catch (error) {
    console.error("Error fetching raw materials:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch raw materials",
      error: error.message,
    });
  }
};

// Create production batch
exports.createProduction = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { raw_materials, material_used_kg, output_cartons, waste_kg } =
      req.body;

    // Validate that raw_materials is an array with items
    if (!Array.isArray(raw_materials) || raw_materials.length === 0) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: "At least one raw material must be selected",
      });
    }

    // Validate total weight allocation
    const totalAllocated = raw_materials.reduce(
      (sum, rm) => sum + parseFloat(rm.weight_used || 0),
      0
    );

    if (Math.abs(totalAllocated - parseFloat(material_used_kg)) > 0.01) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: `Total allocated weight (${totalAllocated} kg) must equal material used (${material_used_kg} kg)`,
      });
    }

    // Check availability and deduct weight
    for (const rm of raw_materials) {
      const rawMaterial = await RawMaterial.findByPk(rm.raw_material_id, {
        transaction: t,
      });

      if (!rawMaterial) {
        await t.rollback();
        return res.status(404).json({
          success: false,
          message: `Raw material with ID ${rm.raw_material_id} not found`,
        });
      }

      if (
        parseFloat(rawMaterial.remaining_weight_kg) <
        parseFloat(rm.weight_used)
      ) {
        await t.rollback();
        return res.status(400).json({
          success: false,
          message: `Insufficient weight for ${rawMaterial.invoice_no}. Available: ${rawMaterial.remaining_weight_kg} kg, Requested: ${rm.weight_used} kg`,
        });
      }

      // Deduct weight
      await rawMaterial.update(
        {
          remaining_weight_kg:
            parseFloat(rawMaterial.remaining_weight_kg) -
            parseFloat(rm.weight_used),
        },
        { transaction: t }
      );
    }

    // Create production batch
    const production = await Production.create(
      {
        material_used_kg,
        output_cartons,
        waste_kg,
        status: "pending",
      },
      { transaction: t }
    );

    // Create junction records
    const junctionData = raw_materials.map((rm) => ({
      production_id: production.id,
      raw_material_id: rm.raw_material_id,
      weight_used_kg: rm.weight_used,
    }));

    await ProductionRawMaterial.bulkCreate(junctionData, { transaction: t });

    await t.commit();

    // Fetch complete production with associations
    const completeProduction = await Production.findByPk(production.id, {
      include: [
        {
          model: RawMaterial,
          as: "rawMaterials",
          through: {
            attributes: ["weight_used_kg"],
          },
          attributes: ["id", "invoice_no", "supplier", "remaining_weight_kg"],
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: "Production batch created successfully",
      data: completeProduction,
    });
  } catch (error) {
    await t.rollback();
    console.error("Error creating production:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create production batch",
      error: error.message,
    });
  }
};

// Get all productions
exports.getAllProductions = async (req, res) => {
  try {
    const productions = await Production.findAll({
      include: [
        {
          model: RawMaterial,
          as: "rawMaterials",
          through: {
            attributes: ["weight_used_kg"],
          },
          attributes: ["id", "invoice_no", "supplier"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: productions,
    });
  } catch (error) {
    console.error("Error fetching productions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch productions",
      error: error.message,
    });
  }
};

// Get single production
exports.getProductionById = async (req, res) => {
  try {
    const { id } = req.params;

    const production = await Production.findByPk(id, {
      include: [
        {
          model: RawMaterial,
          as: "rawMaterials",
          through: {
            attributes: ["weight_used_kg"],
          },
          attributes: [
            "id",
            "invoice_no",
            "supplier",
            "remaining_weight_kg",
          ],
        },
      ],
    });

    if (!production) {
      return res.status(404).json({
        success: false,
        message: "Production batch not found",
      });
    }

    res.status(200).json({
      success: true,
      data: production,
    });
  } catch (error) {
    console.error("Error fetching production:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch production",
      error: error.message,
    });
  }
};

