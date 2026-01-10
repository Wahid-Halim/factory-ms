const express = require("express");
const router = express.Router();

const { addRawMaterial } = require("../controllers/raw-material.controller.js");

router.post("/", addRawMaterial);

module.exports = router;
