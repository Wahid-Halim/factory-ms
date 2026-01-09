const express = require("express");
const router = express.Router();

const { addJumbo } = require("../controllers/jumbo.controller.js");

router.post("/", addJumbo);

module.exports = router;
