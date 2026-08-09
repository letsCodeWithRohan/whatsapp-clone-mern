const userModel = require('../models/user.model')
const Message = require('../models/message.model')
const { decrypt } = require("../utils/cryptoUtilities")
const { uploadToCloudinary } = require('../config/cloudinary')

const getAllUsers = async (req, res) => {
    try {
        const currentUserId = req.user._id;
        const users = await userModel.find({ _id: { $ne: currentUserId } }).select('-password')
        const usersWithLastMsg = await Promise.all(
            users.map(async (user) => {
                // Get last message between current user and this user
                const lastMessage = await Message.findOne({
                    $or: [
                        { senderId: currentUserId, receiverId: user._id },
                        { senderId: user._id, receiverId: currentUserId }
                    ]
                })
                    .sort({ createdAt: -1 })
                    .lean();

                // Get unread message count from this user to current user
                const unreadCount = await Message.countDocuments({
                    senderId: user._id,
                    receiverId: currentUserId,
                    seen: false
                });

                return {
                    _id: user._id,
                    fullname: user.fullname,
                    profilePicture: user.profilePicture,
                    username: user.username,
                    gender: user.gender,
                    createdAt: user.createdAt,
                    email: user.email,
                    lastMessage: lastMessage ? decrypt(lastMessage?.message, lastMessage?.iv) : null || null,
                    lastMessageSenderId: lastMessage?.senderId || null,
                    lastMessageTime: lastMessage?.createdAt || null,
                    unreadCount,
                    lastSeen: user.lastSeen
                };
            })
        );
        res.status(200).json({
            users: usersWithLastMsg
        })
    } catch (error) {
        console.log("[Users Fetch Error]: ", error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateFullname = async (req, res) => {
    try {
        const { fullname } = req.body;
        const userId = req.user._id;

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { fullname },
            { new: true }
        ).select('-password -createdAt -updatedAt -__v -lastSeen');

        res.status(200).json({
            message: 'Fullname updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.log("[Update Fullname Error]: ", error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateBio = async (req, res) => {
    try {
        const { bio } = req.body;
        const userId = req.user._id;

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { bio },
            { new: true }
        ).select('-password -createdAt -updatedAt -__v -lastSeen');

        res.status(200).json({
            message: 'Bio updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.log("[Update Bio Error]: ", error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Pass the file buffer to Cloudinary
        const result = await uploadToCloudinary(req.file.buffer);

        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            { profilePicture: result.secure_url },
            { new: true }
        ).select('-password -createdAt -updatedAt -__v -lastSeen');

        res.status(200).json({
            message: 'Profile picture updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.log("[Update Profile Picture Error]: ", error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getAllUsers,
    updateFullname,
    updateBio,
    updateProfilePicture
}