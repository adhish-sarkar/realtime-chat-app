import mongoose from 'mongoose'

const messagesSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    messageType: {
        type: String,
        required: true,
        enum: ['text', 'image', 'file'],
    },
    content: {
        type: String,
        required: function () {
            return this.messageType === 'text';
        },
    },
    fileUrl: {
        type: String,
        required: function () {
            return this.messageType === 'file';
        },
    },
    timeStamps: {
        type: Date,
        default: Date.now,
    },
});

const Messages = mongoose.model('Messages', messagesSchema);

export default Messages;