// main router

const express = require("express");

const dogRoutes = require("./modules/dogs/dog.routes");

const router = express.Router();

router.use("/dogs", dogRoutes);

router.get("/health", (req, res) => {
  res.send("Welcome to the Adogtame API");
});

module.exports = router;
