const JumboRoll = require("../db/models/jumboroll.model");


const addJumbo = async (req, res) => {
  try {
    const { weight_kg, remaining_weight, supplier, warehouse } = req.body;

    const newJumbo = await JumboRoll.create({
      weight_kg,
      remaining_weight,
      supplier,
      warehouse,
    });

    return res.status(201).json({ success: true, data: newJumbo });
  } catch (error) {
    console.error("Error creating JumboRoll:", error); // see full error
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addJumbo,
};
