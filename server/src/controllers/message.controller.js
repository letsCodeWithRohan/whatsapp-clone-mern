const Message = require("../models/message.model")

const sendMessage = async (req, res) => {
    try {
        const sentMessage = await Message.create({
            senderId: req.user._id,
            receiverId: req.params.receiverId,
            message: req.body.message
        })
        res.status(201).json({
            sentMessage,
            message: "Message sent"
        })
    } catch (error) {
        console.log("[Send Message Error]:", error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const getMessages = async (req, res) => {
    try {
        // Fetch all messages between the two users
        const allMessages = await Message.find({
            $or: [{
            senderId: req.params.senderId,
            receiverId: req.user._id
            }, {
            receiverId: req.params.senderId,
            senderId: req.user._id
            }]
        }).populate('senderId')

        // Mark all messages sent to the current user from the other user as seen
        await Message.updateMany({
            senderId: req.params.senderId,
            receiverId: req.user._id,
            seen: false
        }, {
            seen: true
        })

        res.json({
            messages: allMessages
        })
    } catch (error) {
        console.log("[Fetch Messages Error]:", error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const markSingleMessage = async (req,res) => {
    try {
        await Message.updateOne({
            _id : req.params.messageId
        },{
            seen: true
        })
        res.status(200).json({
            success: true,
            message: "Single Message Marked"
        })
    } catch (error) {
        console.log("[Mark Single Message Error]:", error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const markMultipleMessages = async (req,res) => {
    try {
        await Message.updateMany({
            receiverId : req.user._id,
            // senderId: 
        },{
            seen: true
        })
        res.status(200).json({
            success: true,
            message: "Single Message Marked"
        })
    } catch (error) {
        console.log("[Mark Multiple Messages Error]:", error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

module.exports = {
    sendMessage,
    getMessages,
    markSingleMessage,
    markMultipleMessages
}