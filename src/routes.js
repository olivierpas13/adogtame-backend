// main router

const express = require("express");

const dogRoutes = require("./modules/dogs/dog.routes");

const userRoutes = require("./modules/users/user.routes");

const notificationRoutes = require("./modules/notifications/notification.routes");

const requestRoutes = require("./modules/requests/request.routes");

const router = express.Router();

router.use("/dogs", dogRoutes);

router.use("/users", userRoutes);

router.use('/notifications', notificationRoutes);

router.use('/requests', requestRoutes);

router.get("/health", (req, res) => {
  res.send("Welcome to the Adogtame API");
});

module.exports = router;
