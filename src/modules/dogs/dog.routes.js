const express = require('express');
const dogController = require('./dog.controller.js');
const router = express.Router();

// Get all dogs
router.get('/', dogController.getAllDogs);

// Get all dogs of a specific user
router.get('/user/:userId', dogController.getDogsByOwnerId);

// Get a single dog by ID
router.get('/:id', dogController.getDogById);

// Create a new dog
router.post('/', dogController.createDog);

// Update a dog by ID
router.put('/:id', dogController.updateDog);

// Delete a dog by ID
router.delete('/:id', dogController.deleteDog);

module.exports = router;