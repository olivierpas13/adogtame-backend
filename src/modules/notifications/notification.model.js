const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    type:
    {
        type: String,
        required: true
    },
    dogId: {
        type: Schema.Types.ObjectId,
        ref: 'Dog'
    }
});

module.exports = mongoose.model('Notification', NotificationSchema);