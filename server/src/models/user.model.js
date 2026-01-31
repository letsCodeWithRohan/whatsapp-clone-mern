const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    },
    gender:{
        type: String,
        enum: ['male','female'],
        default: 'male'
    },
    profilePicture: {
        type: String,
        default: ''
    },
    bio:{
        type: String,
        default: 'available'
    },
    lastSeen: {
        type: Date,
        default: Date.now
    }
},{
    timestamps: true
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel