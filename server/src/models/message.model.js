const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    senderId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Sender Id required"]
    },
    receiverId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Receiver Id required"]
    },
    message: {
        type: String,
        required: [true, "message is required"]
    },
    image: {
        type: String
    },
    seen: {
        type: Boolean,
        default: false
    },
    iv:{
        type: String
    }
},{timestamps: true})

module.exports = mongoose.model('Message',messageSchema)