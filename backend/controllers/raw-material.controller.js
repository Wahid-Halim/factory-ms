const { RawMaterial } = require("../db/models");

const addRawMaterial = async (req, res) => {
  try {
    const { weight_kg, supplier, warehouse_location, cost_afn } = req.body;

    const newRawMaterial = await RawMaterial.create({
      weight_kg,
      cost_afn,
      supplier,
      warehouse_location,
      remaining_weight_kg: weight_kg, // auto fill
      // invoice_no: DO NOT SEND
    });

    return res.status(201).json({
      success: true,
      data: newRawMaterial,
    });
  } catch (error) {
    console.error("Error creating RawMaterialLot:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

const getRawMaterials = async (req, res) => {
  try {
    const rawMaterials = await RawMaterial.findAll();
    return res.status(201).json({
      success: true,
      data: rawMaterials,
    });
  } catch (error) {}
};

module.exports = { addRawMaterial, getRawMaterials };
