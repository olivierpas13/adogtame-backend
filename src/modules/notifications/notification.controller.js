const Notification = require('./notification.model');

class NotificationController {
     async updateNotification(req, res) {
        try {
            const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!notification) {
                return res.status(404).send({ message: 'Notification not found' });
            }
            res.send(notification);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

     async getUserNotifications(req, res) {
        try {
            const notifications = await Notification.find({ userId: req.params.userId });
            res.send(notifications);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

     async createUserNotification(req, res) {
        try {
            const notification = new Notification({
                userId: req.params.userId,
                ...req.body
            });
            await notification.save();
            console.log(notification);
            res.status(201).send(notification);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

     async deleteNotification(req, res) {
        try {
            const notification = await Notification.findByIdAndDelete(req.params.id);
            if (!notification) {
                return res.status(404).send({ message: 'Notification not found' });
            }
            res.send({ message: 'Notification deleted successfully' });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}

module.exports = new NotificationController();
