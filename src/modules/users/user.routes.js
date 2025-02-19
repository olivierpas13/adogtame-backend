const express = require('express');
const userController = require('./user.controller.js');
const router = express.Router();

router.get('/:id', userController.getUserById);

router.put('/edit/:id', userController.editUser);

router.patch('/toggle-favorite/:id', userController.toggleFavorite);

router.get("/rescuers/get-all", userController.getRescuers);

router.get("/shelters/get-all", userController.getShelters);

module.exports = router;