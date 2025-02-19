const express = require('express');
const userController = require('./user.controller.js');
const router = express.Router();

router.get('/:id', userController.getUserById);

router.put('/edit/:id', userController.editUser);

module.exports = router;