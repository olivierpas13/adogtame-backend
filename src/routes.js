// main router

const express = require("express");

const dogRoutes = require("./modules/dogs/dog.routes");

const userRoutes = require("./modules/users/user.routes");

const router = express.Router();

router.use("/dogs", dogRoutes);

router.use("/users", userRoutes);

router.get("/health", (req, res) => {
  res.send("Welcome to the Adogtame API");
});

module.exports = router;
