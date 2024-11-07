import mongoose from 'mongoose'


const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Messages',
        required: false
    }],
    createdAt: {
        type:Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    isPrivate: {
        type: Boolean,
        default: false
    }
});


channelSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

channelSchema.pre('findOneAndUpdate', function (next) {
    this.set({ updatedAt: Date.now() });
    next();
});


const Channel = mongoose.model('Channel', channelSchema);

export default Channel;

