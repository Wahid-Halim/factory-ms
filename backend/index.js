require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

//router
const rawMaterialRoutes = require("./routes/raw-material.routes.js");

app.use(cors());
app.use(express.json());

app.use("/api/v1/raw-material", rawMaterialRoutes);

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
