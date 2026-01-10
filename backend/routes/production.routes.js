const express = require("express");
const router = express.Router();
const productionController = require("../controllers/production.controller");

// Get available raw materials
router.get(
  "/raw-materials/available",
  productionController.getAvailableRawMaterials
);

// Production routes
router.post("/", productionController.createProduction);
router.get("/", productionController.getAllProductions);
router.get("/:id", productionController.getProductionById);

module.exports = router;
