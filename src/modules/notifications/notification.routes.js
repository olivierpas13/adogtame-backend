const express = require('express');
const notificationController = require('./notification.controller');

const router = express.Router();


// Route to update a notification by ID
router.put('/:id', notificationController.updateNotification);

// Route to get all notifications for a specific user
router.get('/user/:userId', notificationController.getUserNotifications);

// Route to post a new notification to a specific user
router.post('/user/:userId', notificationController.createUserNotification);

// Route to delete a notification by ID
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;