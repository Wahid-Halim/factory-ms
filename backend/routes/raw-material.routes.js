const express = require("express");
const router = express.Router();

const {
  addRawMaterial,
  getRawMaterials,
} = require("../controllers/raw-material.controller.js");

router.post("/", addRawMaterial);
router.get("/", getRawMaterials);

module.exports = router;
