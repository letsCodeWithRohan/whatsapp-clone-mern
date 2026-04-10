const userModel = require('../models/user.model')
const Message = require('../models/message.model')
const { decrypt } = require("../utils/cryptoUtilities")
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
                    profilePicture : user.profilePicture,
                    username: user.username,
                    gender: user.gender,
                    createdAt: user.createdAt,
                    email: user.email,
                    lastMessage: lastMessage ? decrypt(lastMessage?.message,lastMessage?.iv) : null || null,
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

module.exports = {
    getAllUsers
}