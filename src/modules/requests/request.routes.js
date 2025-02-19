const express = require('express');
const requestController = require('./request.controller');

const router = express.Router();


router.get("/adoptions/:id", requestController.getAdoptionsByDogId);
router.get("/sponsors/:id", requestController.getSponsorsByDogId);
router.get("/users/:user", requestController.getRequestByUser);
router.get("/owner/:owner", requestController.getRequestByOwner);
router.post('/', requestController.createRequest);
router.put('/:id', requestController.updateRequest);
router.delete('/:id', requestController.deleteRequest);

module.exports = router;