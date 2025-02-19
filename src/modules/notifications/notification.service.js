const notificationRepository = require('./notification.repository');

class NotificationService {
    constructor() {
        this.notificationRepository = notificationRepository;
    }

    async updateNotification(notificationId, updateData) {
        try {
            return await this.notificationRepository.updateNotification(notificationId, updateData);
        } catch (error) {
            throw new Error('Error updating notification: ' + error.message);
        }
    }

    async getUserNotifications(userId) {
        try {
            return await this.notificationRepository.getUserNotifications(userId);
        } catch (error) {
            throw new Error('Error fetching user notifications: ' + error.message);
        }
    }

    async createUserNotification(notificationData) {
        try {
            return await this.notificationRepository.createUserNotification(notificationData);
        } catch (error) {
            throw new Error('Error creating user notification: ' + error.message);
        }
    }

    async deleteNotification(notificationId) {
        try {
            return await this.notificationRepository.deleteNotification(notificationId);
        } catch (error) {
            throw new Error('Error deleting notification: ' + error.message);
        }
    }
}

module.exports = new NotificationService();