
class NotificationRepository {
    async updateNotification(id, data) {
        try {
            const notification = await Notification.findByIdAndUpdate(id, data, { new: true });
            if (!notification) {
                throw new Error('Notification not found');
            }
            return notification;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getUserNotifications(userId) {
        try {
            const notifications = await Notification.find({ userId });
            return notifications;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createUserNotification( data) {
        try {
            const notification = new Notification(data);
            await notification.save();
            return notification;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteNotification(id) {
        try {
            const notification = await Notification.findByIdAndDelete(id);
            if (!notification) {
                throw new Error('Notification not found');
            }
            return { message: 'Notification deleted successfully' };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new NotificationRepository();
